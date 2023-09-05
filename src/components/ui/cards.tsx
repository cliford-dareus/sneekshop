"use client";
import React from "react";
import Button from "./button";
import classNames from "classnames";
import { ShoppingBasket } from "lucide-react";
import { Carts, Product } from "@prisma/client";
import { addToCard } from "@/app/_actions/cart";
import Image from "next/image";

type Props = {
  className?: string;
  item: Product;
};

const Cards = ({ className, item }: Props) => {
  const imageUrl = item?.images as { id: string; name: string; url: string }[];
  return (
    <div
      className={classNames("shadow-sm shadow-slate-800 rounded-md", className)}
    >
      <div className="h-[300px] bg-slate-800 rounded-md relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl[0].url}
            alt=""
            width={200}
            height={300}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <Button
          className="bg-red-600 absolute bottom-4 right-4 rounded-md"
          onclick={() => addToCard({ id: item.id, quantity: 1 })}
        >
          <ShoppingBasket />
        </Button>
      </div>
      <div className="flex items-center pt-4 cursor-pointer">
        <div className="text-[.8rem]">
          <p className="">{item?.title}</p>
          <span className="">{item?.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
