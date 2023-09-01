import { getCart } from "@/app/_actions/cart";
import CartLineItems from "@/components/checkout/cardLineItems";
import CartSummary from "@/components/checkout/cart-summary";
import Button from "@/components/ui/button";
import { Store } from "lucide-react";
import { cookies } from "next/headers";
type Props = {};

const Cart = async ({}: Props) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const [cartItems, cartItemsDetails, uniqueSellerId] = await getCart(cartId);

  return (
    <div className="h-screen container py-4">
      <h1 className="text-2xl font-koulen">Shopping Cart</h1>

      <div className="flex gap-4 mt-4">
        {cartItemsDetails.length ? (
          <div className="flex-1 py-4 border rounded-md border-slate-800 shadow-md">
            {uniqueSellerId.map((sellerId, i) => (
              <div key={i} className="p-4 rounded-md text-white">
                <CartLineItems
                  cartItems={cartItems}
                  products={
                    cartItemsDetails?.filter(
                      (item) => item.sellerId === sellerId
                    ) ?? []
                  }
                />

                <div className="flex mt-4 gap-4 items-center px-4 py-1 bg-slate-800 rounded-md">
                  <span className="flex gap-1 items-center">
                    <Store size={15} />
                    Seller
                  </span>
                  <span>
                    {
                      cartItemsDetails?.find(
                        (item) => item.sellerId === sellerId
                      )?.seller.name
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1">
            <h1 className="font-koulen ">ADD ITEMS TO CART</h1>
          </div>
        )}

        {cartItems.length && (
          <aside className="p-4 w-[300px] lg:w-[400px] bg-slate-800 rounded-md">
            <Button className="bg-red-600 w-full rounded-full flex justify-center items-center">
              Proceed To Checkout
            </Button>

            <h4 className="mt-4 font-koulen">Price Details</h4>
            <CartSummary
              cartItems={cartItems}
              cartItemsDetails={cartItemsDetails}
            />
            <h4></h4>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Cart;
