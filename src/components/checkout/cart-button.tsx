"use client";
import React, { ReactNode, useState } from "react";
import Button from "../ui/button";
import { ShoppingCart } from "lucide-react";
import CartPreview from "./cart-preview";

type Props = {
  children: ReactNode
};

const CartButton = ({children}: Props) => {
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
          <div className="fixed top-0 right-0  h-screen w-[40%] bg-white z-50">
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
