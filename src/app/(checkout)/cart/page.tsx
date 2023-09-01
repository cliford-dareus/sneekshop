import { getCart } from "@/app/_actions";
import CartLineItems from "@/components/checkout/cardLineItems";
import Button from "@/components/ui/button";
import { Store } from "lucide-react";
import { cookies } from "next/headers";
type Props = {};

const Cart = async ({}: Props) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const [cartItems, cartItemsDetails, uniqueSellerId] = await getCart(cartId);

  const totalItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const itemsInCartWithQuantity = cartItems.reduce((acc, item) => {
    acc = [
      ...cartItemsDetails.map((i) => {
        return {
          id: item.id,
          title: i.title,
          quantity: item.quantity,
          price: i.price * item.quantity,
        };
      }),
    ];
    return acc;
  }, []);

  return (
    <div className="h-screen container py-4">
      <h1 className="text-2xl font-koulen">Shopping Cart</h1>

      <div className="flex gap-4 mt-4">
        {cartItemsDetails.length !== 0 ? (
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
                        (item) => item.sellerId === sellerId.id
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

        <aside className="p-4 w-[300px] bg-slate-800 rounded-md">
          <Button className="bg-red-600 w-full rounded-full">
            Proceed To Checkout
          </Button>

          <h4 className="mt-4 font-koulen">Price Details</h4>
          <div className="mt-2 border border-slate-600 p-4 rounded-md">
            <p>{totalItemsInCart} item</p>
            {itemsInCartWithQuantity &&
              itemsInCartWithQuantity.map(
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

          <h4></h4>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
