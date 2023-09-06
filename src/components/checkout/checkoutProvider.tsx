'use client'
import { Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeElementsOptions,
  type Stripe,
  Appearance,
} from "@stripe/stripe-js";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  storeStripeAccountId: string;
  paymentIntent: Promise<{
    clientSecret: string | null;
  }>;
}

const CheckoutProvider = ({
  children,
  storeStripeAccountId,
  paymentIntent,
}: Props) => {
  const stripePromise = React.useMemo(
    () => getStripe(storeStripeAccountId),
    [storeStripeAccountId]
  );

  const client = React.use(paymentIntent);

  if (!client.clientSecret) return null;

  const appearance: Appearance = {
    theme: "stripe",
  };

  const options: StripeElementsOptions = {
    appearance,
    clientSecret: client.clientSecret,
  };

  return (
    <div className="">
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </div>
  );
};

export default CheckoutProvider;

let stripePromise: Promise<Stripe | null>;

export function getStripe(stripeAccountId?: string) {
  if (!void stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
      stripeAccountId ? { stripeAccount: stripeAccountId } : undefined
    );
  }
  return stripePromise;
}
