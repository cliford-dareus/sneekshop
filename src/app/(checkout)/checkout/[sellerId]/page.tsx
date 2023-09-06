import prisma from "@/libs/prismaDB";
import { getCartLineItems } from "@/app/_actions/cart";
import {
  createPaymentIntent,
  getSellerStripeAccount,
} from "@/app/_actions/stripe";
import { notFound } from "next/navigation";
import CartLineItems from "@/components/checkout/cardLineItems";
import CheckoutProvider from "@/components/checkout/checkoutProvider";
import CheckoutForm from "@/components/checkout/checkout-Form";

type Props = {
  params: {
    sellerId: string;
  };
};

const Page = async ({ params }: Props) => {
  const sellerId = params.sellerId;
  const accountId = await prisma.user_payment.findFirst({
    where: {
      userId: sellerId,
    },
    select: {
      stripeAccountId: true,
    },
  });

  if (!accountId) {
    notFound();
  }

  const { isConnected } = await getSellerStripeAccount({
    sellerId: sellerId as string,
  });

  const cartLineItems = await getCartLineItems(sellerId);

  const amount = cartLineItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const paymentIntent = createPaymentIntent({ sellerId, cartLineItems });

  if(!isConnected || !accountId.stripeAccountId){
    return <h1>STORE IS NOT ACTIVE</h1>
  }

  return (
    <div className="h-screen container py-4">
      <h1 className="text-2xl font-koulen">Checkout</h1>

      <div className="flex gap-4 mt-4">
        {cartLineItems.length ? (
          <div className="flex-1 py-4 border rounded-md border-slate-800 shadow-md">
            <CartLineItems
              cartItems={cartLineItems.map((item) => {
                return {
                  id: item.id,
                  quantity: item.quantity,
                };
              })}
              products={cartLineItems}
            />
          </div>
        ) : (
          <div className="flex-1">
            <h1 className="font-koulen ">ADD ITEMS TO CART</h1>
          </div>
        )}

        {cartLineItems.length && (
          <aside className="p-4 w-[300px] lg:w-[500px] bg-slate-800 rounded-md">
            <h4 className="font-koulen">Payment Details</h4>
            <div>
              <CheckoutProvider
                paymentIntent={paymentIntent}
                storeStripeAccountId={accountId.stripeAccountId}
              >
                <CheckoutForm />
              </CheckoutProvider>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Page;
