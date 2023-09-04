"use server";
import { stripe } from "@/libs/stripe";
import prisma from "@/libs/prismaDB";
import { subscriptionPlans } from "@/config/subscription-plans";
import { Session } from "next-auth";
import { NextAuthSession } from "../api/auth/[...nextauth]/route";

interface ManageStripeSubscriptionActionProps {
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan: boolean;
  stripePriceId: string;
  email: string;
  userId: string | unknown;
}

export const manageStripeSubscriptionAction = async ({
  isSubscribed,
  stripeCustomerId,
  isCurrentPlan,
  stripePriceId,
  email,
  userId,
}: ManageStripeSubscriptionActionProps) => {
  const billingUrl = "http://localhost:3000/dashboard/billing";
  if (isSubscribed && stripeCustomerId && isCurrentPlan) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId as string,
    },
  });

  return { url: stripeSession.url };
};

export async function getUserSubscriptionPlan(session: NextAuthSession | null) {
  if (!session || !session.user) {
    throw new Error("User not found.");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user?.id as unknown as string,
    },
    include: {
      subscription: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isSubscribed =
    user.subscription?.stripePriceId &&
    user.subscription?.stripeCurrentPeriodEnd &&
    user.subscription?.stripeCurrentPeriodEnd.getTime() + 86_400_000 >
      Date.now();

  const plan = isSubscribed
    ? subscriptionPlans.find(
        (plan) => plan.stripePriceId === user.subscription?.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && user.subscription?.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.subscription.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: user.subscription?.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.subscription?.stripeCurrentPeriodEnd,
    stripeCustomerId: user.subscription?.stripeCustomerId,
    isSubscribed,
    isCanceled,
    store_active: user.subscription?.store_active
  };
}

export const getSubscriptionInvoices = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const subscriptionId = await prisma.user_subscription.findFirst({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCustomerId: true,
    },
  });

  if (subscriptionId?.stripeSubscriptionId) {
    const subscription = await stripe.invoices.list({
      subscription: subscriptionId.stripeSubscriptionId,
    });

    return subscription.data;
  }
};

// CREATE PAYMENT INTENT
export const createPaymentIntent = async (item: any) => {
  // const amount =

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

// MANAGE SELLER STRIPE ACCOUNT
export const createSellerStripeAccount = async (sellerId: string) => {
  const absoluteUrl = "http://localhost:3000/dashboard/";
  const { isConnected, account, payment } = await getSellerStripeAccount({
    sellerId,
  });

  const subscription = await prisma.user_subscription.findFirst({
    where: {
      userId: sellerId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      userId: true,
    },
  });

  if (isConnected && subscription) {
    await prisma.user_subscription.update({
      data: {
        store_active: true,
      },
      where: {
        userId: subscription.userId,
      },
    });
    throw new Error("Store already connected to Stripe.");
  }

  if (account && !account.details_submitted) {
    await stripe.accounts.del(account.id);
  }

  const stripeAccountId =
    payment?.stripeAccountId ?? (await createStripeAccount());

  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${absoluteUrl}/store`,
    return_url: `${absoluteUrl}/store`,
    type: "account_onboarding",
  });

  if (!accountLink?.url) {
    throw new Error("Error creating Stripe account link, please try again.");
  }

  return { url: accountLink.url };

  async function createStripeAccount() {
    const account = await stripe.accounts.create({ type: "standard" });
    if (!account) {
      throw new Error("Error creating Stripe account.");
    }

    if (payment) {
      await prisma.user_payment.update({
        data: {
          stripeAccountId: account.id,
        },
        where: {
          userId: sellerId,
        },
      });
    } else {
      await prisma.user_payment.create({
        data: {
          stripeAccountId: account.id,
          userId: sellerId,
        },
      });
    }

    return account.id;
  }
};
// GET SELLER STRIPE ACCOUNT
export const getSellerStripeAccount = async (input: {
  sellerId: string;
  retrieveAcc?: any;
}) => {
  const retrieveAccount = input.retrieveAcc ?? true;

  const falsyReturn = {
    isConnected: false,
    account: null,
    payment: null,
  };

  try {
    const sellerSub = await prisma.user_subscription.findFirst({
      where: {
        userId: input.sellerId,
      },
      select: {
        stripeSubscriptionId: true,
      },
    });

    if (!sellerSub) return falsyReturn;

    const payment = await prisma.user_payment.findFirst({
      where: {
        userId: input.sellerId,
      },
      select: {
        stripeAccountId: true,
        detailsSubmitted: true,
      },
    });

    if (!payment?.detailsSubmitted && !payment) return falsyReturn;

    if (!retrieveAccount)
      return {
        isConnected: true,
        account: null,
        payment,
      };
    const account = await stripe.accounts.retrieve(
      payment?.stripeAccountId as string
    );
    if (!account) return falsyReturn;

    if (account.details_submitted && !payment.detailsSubmitted) {
      await prisma.$transaction(async (tx) => {
        await tx.user_payment.update({
          data: {
            detailsSubmitted: account.details_submitted,
            stripeAccountCreatedAt: account.created,
          },
          where: {
            userId: input.sellerId,
          },
        });

        await tx.user_subscription.update({
          data: {
            store_active: true,
            stripeAccountId: account.id,
          },
          where: {
            userId: input.sellerId,
          },
        });
      });
    }

    return {
      isConnected: payment?.detailsSubmitted,
      account: account.details_submitted ? account : null,
      payment,
    };
  } catch (error) {
    error instanceof Error && console.error(error.message);
    return falsyReturn;
  }
};
