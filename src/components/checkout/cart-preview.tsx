import React from "react";
import { cookies } from "next/headers";
import { clearCartActions, getCart } from "@/app/_actions/cart";
import Button from "../ui/button";
import Link from "next/link";
import CartLineItems from "./cardLineItems";
import { Store } from "lucide-react";
import SideCartCta from "./side-cart-cta";

type Props = {};

const CartPreview = async (props: Props) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const [cartItems, cartItemsDetails, uniqueSellerId] = await getCart(cartId);

  return (
    <div className="w-full text-black">
      {cartItemsDetails.length ? (
        <div className="mt-4">
          {uniqueSellerId.map((seller) => (
            <>
              <div className="shadow-lg mt-2 p-2 rounded-md">
                <div key={seller} className="mb-4">
                  <CartLineItems
                    cartItems={cartItems}
                    products={
                      cartItemsDetails.filter(
                        (item) => item.sellerId === seller
                      ) ?? []
                    }
                  />
                </div>

                <div className="flex mt-4 gap-4 items-center px-4 py-1 bg-slate-800 rounded-md">
                  <span className="flex gap-1 items-center text-white">
                    <Store size={15} />
                    Seller
                  </span>
                  <span>
                    {
                      cartItemsDetails?.find((item) => item.sellerId === seller)
                        ?.seller.name
                    }
                  </span>
                  <Button className="ml-auto bg-white">
                    <Link href={`checkout/${seller}`}>Checkout</Link>
                  </Button>
                </div>
              </div>
            </>
          ))}
          <SideCartCta />
        </div>
      ) : (
        <div className="flex-1">
          <h1 className="font-koulen ">ADD ITEMS TO CART</h1>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
