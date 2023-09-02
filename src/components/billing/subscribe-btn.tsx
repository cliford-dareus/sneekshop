"use client";
import React, { FormEvent, useTransition } from "react";
import Button from "../ui/button";
import { manageStripeSubscriptionAction } from "@/app/_actions/stripe";

type Props = {
  userId: string | unknown;
  email: string | any;
  stripePriceId: string;
  stripeCustomerId: string | undefined | null;
  isSubscribed: boolean;
  isCurrentPlan: boolean;
};

const SubscribeBtn = ({
  userId,
  email,
  stripePriceId,
  stripeCustomerId,
  isSubscribed,
  isCurrentPlan,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const session = await manageStripeSubscriptionAction({
          userId,
          email,
          stripePriceId,
          stripeCustomerId,
          isSubscribed,
          isCurrentPlan,
        });
         if (session) {
           window.location.href = session.url ?? "/billing";
         }
      } catch (error) {
        console.log(error)
      }
    });
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <Button className="">Subscribe</Button>
      </form>
    </>
  );
};

export default SubscribeBtn;
