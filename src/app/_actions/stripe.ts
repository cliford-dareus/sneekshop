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
  const billingUrl = "http://localhost:3000/billing";
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
      payment: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isSubscribed =
    user.payment?.stripePriceId &&
    user.payment?.stripeCurrentPeriodEnd &&
    user.payment?.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const plan = isSubscribed
    ? subscriptionPlans.find(
        (plan) => plan.stripePriceId === user.payment?.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && user.payment?.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.payment.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: user.payment?.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.payment?.stripeCurrentPeriodEnd,
    stripeCustomerId: user.payment?.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}

export const getSubscriptionInvoices = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const subscriptionId = await prisma.user_payment.findFirst({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCustomerId: true
    },
  });

  if (subscriptionId?.stripeSubscriptionId) {
    const subscription = await stripe.invoices.list(
      {
        subscription: subscriptionId.stripeSubscriptionId
      }
    );
    
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
