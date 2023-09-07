import React from "react";
import { cookies } from "next/headers";
import { getCart } from "@/app/_actions/cart";
import Button from "../ui/button";
import Link from "next/link";

type Props = {};

const CartPreview = async (props: Props) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const [cartItems, cartItemsDetails, uniqueSellerId] = await getCart(cartId);

  return (
    <div className="w-full text-black p-4">
        <Button className="bg-red-600">
            <Link href='/cart'>
                View Cart  
            </Link>
        </Button>
      CartPreview
      <h2 className="text-black">Your Cart Is Empty.</h2>
    </div>
  );
};

export default CartPreview;
