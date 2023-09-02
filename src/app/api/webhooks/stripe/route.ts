import prisma from "@/libs/prismaDB";
import { stripe } from "@/libs/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";
  const webhookendpoint = process.env.STRIPE_WEB_HOOK_SECRET_KEY ?? "";

  console.log("CALLED");
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookendpoint);
  } catch (err) {
    return NextResponse.json({
      status: 400,
      error: `Webhook signature verification failed, ${err}`,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return NextResponse.json({ status: 200, message: null });
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          id: session.metadata?.userId,
        },
        data: {
          payment: {
            create: {
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
            },
          },
        },
        include: {
          payment: true,
        },
      });
      console.log("success");
      break;
    case "invoice.payment_succeeded":
      // Update the price id and set the new period end.
      await prisma.user_payment.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
  }

  return new Response(null, { status: 200 });
}
