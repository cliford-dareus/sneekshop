"use client";
import React from "react";
import Button from "../ui/button";
import { clearCartActions } from "@/app/_actions/cart";
import Link from "next/link";

type Props = {};

const SideCartCta = (props: Props) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-4 shadow-lg p-2">
      <Button
        className="bg-red-600 text-white"
        onclick={async () => await clearCartActions()}
      >
        Clear Cart
      </Button>
      <Button className="border border-slate-500">
        <Link href="cart">Go to cart</Link>
      </Button>
    </div>
  );
};

export default SideCartCta;
