import { getCartLineItems } from "@/app/_actions/cart";
import React from "react";

type Props = {
  params: {
    sellerId: string;
  };
};

const Page = async ({ params }: Props) => {
  const sellerId = params.sellerId;

  const cartLineItems = await getCartLineItems(sellerId);
  return <div className="h-[100vh]">Page</div>;
};

export default Page;
