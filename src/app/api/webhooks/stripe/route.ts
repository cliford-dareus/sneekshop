import Stripe from "stripe";
import prisma from "@/libs/prismaDB";
import { stripe } from "@/libs/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";
  const webhookendpoint = process.env.STRIPE_WEB_HOOK_SECRET_KEY ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookendpoint);
  } catch (err) {
    return NextResponse.json({
      status: 400,
      error: `Webhook signature verification failed, ${err}`,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session?.metadata?.userId) {
        return NextResponse.json({ status: 200, message: "failed" });
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await prisma.user.update({
        where: {
          id: session.metadata?.userId,
        },
        data: {
          subscription: {
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
    }

    case "invoice.payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session?.metadata?.userId) {
        return NextResponse.json({ status: 200, message: "failed" });
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      // Update the price id and set the new period end.
      await prisma.user_subscription.update({
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
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const paymentIntentId = paymentIntent.id;
      const amount = paymentIntent.amount;
      const items = paymentIntent.metadata.items as unknown as {
        productId: string;
        price: number;
        quantity: number;
      }[];

      const pasreItems = JSON.parse(items as unknown as string);
      if (items) {
        try {
          if (!event.account) throw new Error("No account found.");

          const payment = await prisma.user_subscription.findFirst({
            where: {
              stripeAccountId: event.account,
            },
          });

          if (!payment?.userId)
            return new Response("Store not found.", { status: 404 });

          const clientId = JSON.parse(paymentIntent.metadata.userId as string);

          if (!clientId) {
            return new Error("ClientId not parse.");
          }

          // create an order
          await prisma.order.create({
            data: {
              userId: clientId,
              total: Number(amount / 100),
              sellerId: payment.userId,
              email: paymentIntent?.receipt_email as string,
              stripePaymentIntent: paymentIntentId,
              stripePaymentIntentStatus: paymentIntent.status,
              items: items ?? JSON.stringify([]),
              address: "",
            },
          });

          // check inventory
          for (const item of pasreItems) {
            const product = await prisma.product.findFirst({
              where: {
                id: item?.productId,
              },
              select: {
                inventory: true,
                id: true,
              },
            });

            if (!product) {
              throw new Error("Product not found.");
            }

            const inventory = product.inventory - item.quantity;

            if (inventory < 0) {
              throw new Error("Product out of stock.");
            }

            await prisma.product.update({
              where: {
                id: item?.productId,
              },
              data: {
                inventory: product.inventory - item.quantity,
              },
            });
          }

          // clear cart
          await prisma.carts.update({
            where: {
              paymentIntentId,
            },
            data: {
              items: JSON.stringify([]),
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  return new Response(null, { status: 200 });
}
