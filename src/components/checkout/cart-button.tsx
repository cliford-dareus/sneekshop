import React from "react";
import Button from "../ui/button";
import {  ShoppingCart } from "lucide-react";
import classNames from "classnames";

type Props = {};

const CartButton = (props: Props) => {
  return (
    <Button className='bg-slate-700'>
      <div className="h-full w-full">
        <ShoppingCart />
      </div>
    </Button>
  );
};

export default CartButton;
