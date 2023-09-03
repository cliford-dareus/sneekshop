"use client";
import React, { useTransition } from "react";
import Button from "../ui/button";
import { createSellerStripeAccount } from "@/app/_actions/stripe";

type Props = {
  sellerId: string;
};

const ActiveStoreBtn = ({ sellerId }: Props) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      className="bg-red-600 rounded-md"
      onclick={() => {
        startTransition(async () => {
          try {
            const connection = await createSellerStripeAccount(sellerId);
            window.location.href = connection.url;
          } catch (error) {
            console.log(error);
          }
        });
      }}
    >
      ActiveStoreBtn
    </Button>
  );
};

export default ActiveStoreBtn;
