import { CartItemsDetails } from "@/app/_actions";
import { CartItems } from "@/libs/type";
import React, { useMemo } from "react";

type Props = {
  cartItems: CartItems[];
  cartItemsDetails: CartItemsDetails;
};

const CartSummary = ({ cartItems, cartItemsDetails }: Props) => {
  const totalItemsInCart = cartItems.reduce(
    (acc: any, item: CartItems) => acc + item.quantity,
    0
  );

  const itemsInCartWithQuantity = useMemo(() => {
    let newCartItems = [];
    for (let i = 0; i < cartItemsDetails.length; i++) {
      for (let j = 0; j < cartItems.length; j++) {
        if (cartItems[j].id === cartItemsDetails[i].id) {
          const product = {
            id: cartItems[j].id,
            title: cartItemsDetails[i].title,
            price: cartItemsDetails[i].price * cartItems[j].quantity,
            quantity: cartItems[j].quantity
          };
          newCartItems.push(product);
        }
      }
    }
    return newCartItems;
  }, [cartItems, cartItemsDetails]);

  return (
    <div className="mt-2 border border-slate-600 p-4 rounded-md">
      <p>{totalItemsInCart} item</p>
      {itemsInCartWithQuantity?.map(
        (item: {
          id: string;
          title: string;
          quantity: number;
          price: number;
        }) => (
          <div
            key={item?.id}
            className="flex items-center gap-4 w-full text-[.8rem]"
          >
            <p>{item?.quantity}</p>
            <p>{item?.title}</p>
            <p className="ml-auto">$ {item?.price}</p>
          </div>
        )
      )}
    </div>
  );
};

export default CartSummary;
