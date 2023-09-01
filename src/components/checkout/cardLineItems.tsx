"use client";
import type { Product } from "@prisma/client";
import { Minus, Plus, X } from "lucide-react";
import Button from "../ui/button";
import { updateCartItem } from "@/app/_actions/cart";

type Props = {
  cartItems: { id: string; quantity: number }[];
  products: Partial<Product>[];
};

const CartLineItems = ({ cartItems, products }: Props) => {
  return (
    <>
      {products.map((product, i) => {
        const currentProductInCart = cartItems.find(
          (item) => item.id === product.id
        ) as { id: string; quantity: number };

        return (
          <div
            className="shadow-sm shadow-slate-800 rounded-md mt-2 relative border border-slate-900 p-[2px]"
            key={i}
          >
            <Button
              className="absolute right-0 top-0"
              onclick={async () =>
                await updateCartItem({
                  id: currentProductInCart?.id,
                  quantity: 0,
                })
              }
            >
              <X size={20} />
            </Button>
            <div className="flex gap-4">
              <div className="w-[100px] h-[90px] bg-white rounded-md"></div>
              <div className="w-full flex flex-col">
                <>
                  <p>{product.title}</p>
                  <p>{product.tags}</p>
                </>

                <div className="flex justify-between items-center w-full mt-auto">
                  <span>${product.price}</span>

                  <div className="flex gap-2 items-center">
                    <Button
                      className="p-0"
                      onclick={async () =>
                        await updateCartItem({
                          id: currentProductInCart?.id,
                          quantity: currentProductInCart?.quantity - 1,
                        })
                      }
                    >
                      <Minus size={15} />
                    </Button>
                    <div>{currentProductInCart?.quantity}</div>
                    <Button
                      className="p-0"
                      onclick={async () =>
                        await updateCartItem({
                          id: currentProductInCart?.id,
                          quantity: currentProductInCart?.quantity + 1,
                        })
                      }
                    >
                      <Plus size={15} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartLineItems;
// TODO: Add react usestransition calculations indication
