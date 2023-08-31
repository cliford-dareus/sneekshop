import { Product } from "@prisma/client";

type Props = {
  cartItems: { id: string; quantity: number }[];
  products: Partial<Product>[];
};

const CartLineItems = ({ cartItems, products }: Props) => {
  return (
    <>
      {products.map((product) => {
        const currentProductInCart = cartItems.find(
          (item) => item.id === product.id
        );

        return <div key={product.id}>
            <div className=""></div>
        </div>;
      })}
    </>
  );
};

export default CartLineItems;
