"use client";
import React, { ReactNode, useState } from "react";
import Button from "../ui/button";
import { ShoppingCart, X } from "lucide-react";
import CartPreview from "./cart-preview";

type Props = {
  children: ReactNode;
};

const CartButton = ({ children }: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Button className="bg-slate-700" onclick={() => setIsCartOpen(true)}>
        <div className="h-full w-full">
          <ShoppingCart />
        </div>
      </Button>

      {isCartOpen && (
        <>
          <div className="fixed top-0 right-0  h-screen w-[40%] bg-white z-50 p-4">
            <div className="border-b flex item-center justify-between h-[45px] text-black">
              <h1 className="font-koulen text-2xl">Shopping Cart</h1>
              <span
                className="cursor-pointer "
                onClick={() => setIsCartOpen(false)}
              >
                <X />
              </span>
            </div>
            {children}
          </div>

          <div
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="fixed inset-0 h-screen w-screen bg-white z-40 opacity-[.5] blur-md"
          ></div>
        </>
      )}
    </>
  );
};

export default CartButton;
