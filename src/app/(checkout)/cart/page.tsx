import { getCart } from "@/app/_actions";
import CartLineItems from "@/components/checkout/cardLineItems";
import Button from "@/components/ui/button";
import { cookies } from "next/headers";
type Props = {};

const Cart = async ({}: Props) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const [cartItems, cartItemsDetails, uniqueSellerId] = await getCart(cartId);

  console.log(cartItemsDetails);
  console.log(cartItems);
  console.log(uniqueSellerId);

  return (
    <div className="h-screen container py-4">
      <h1 className="text-2xl font-koulen">Shopping Cart</h1>

      <div className="flex gap-4">
        <div className="flex-1 bg-slate-800 p-4">
          {uniqueSellerId.map((sellerId, i) => (
            <div key={i} className="p-4 rounded-md text-white">
              <div>
                {
                  cartItemsDetails?.find(
                    (item) => item.sellerId === sellerId.id
                  )?.seller.name
                }
              </div>
              <CartLineItems
                cartItems={cartItems}
                products={
                  cartItemsDetails?.filter(
                    (item) => item.sellerId === sellerId.id
                  ) ?? []
                }
              />
            </div>
          ))}
        </div>

        <aside className="p-4 w-[300px] bg-slate-800">
          <Button className="bg-red-600 w-full rounded-full">
            Proceed To Checkout
          </Button>
          <div className=""></div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
