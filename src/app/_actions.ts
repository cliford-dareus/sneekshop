"use server";

import prisma from "@/libs/prismaDB";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// ADD NEW ITEM TO EXISTING CART OR CREATE THE CART
export const addToCard = async (item: { id: string; quantity: number }) => {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const cartItems = await prisma.carts.findMany({
    where: {
      id: cartId,
    },
  });

  if (cartItems.length !== 0) {
    const itemInCart = JSON.parse(cartItems[0]?.items as string) as {
      id: string;
      quantity: number;
    }[];

    const cartWithNewItem = itemInCart?.find((i) => i.id === item.id);
    const cartWithOutNewItem = itemInCart.filter((i) => i.id !== item.id);

    if (itemInCart) {
      await prisma.carts.update({
        data: {
          items: itemInCart
            ? JSON.stringify([
                ...cartWithOutNewItem,
                {
                  ...item,
                  quantity: cartWithNewItem
                    ? item.quantity + cartWithNewItem.quantity
                    : item.quantity,
                },
              ])
            : JSON.stringify([item]),
        },
        where: {
          id: cartId,
        },
      });
      revalidatePath("/");
      return;
    }
  } else {
    const newStore = await prisma.carts.create({
      data: {
        items: JSON.stringify([item]),
      },
    });

    cookieStore.set("cartId", String(newStore.id));
    revalidatePath("/");
    return;
  }
};

// GET CART
export const getCart = async (cartId: string | undefined) => {
  const cart = await prisma.carts.findMany({
    where: {
      id: cartId,
    },
    select: {
      id: true,
      items: true,
    },
  });

  const cartItems = JSON.parse(cart[0].items as string) as {
    id: string;
    quantity: number;
  }[];
  const cartItemsDetails = await getCartItemsDetails(cartId, cartItems);

  const uniqueSellerId = [
    ...(new Set(cartItemsDetails?.map((item) => item.seller.id)) as any),
  ];

  return [cartItems, cartItemsDetails, uniqueSellerId];
};

// UPDATE CART ITEMS
export const updateCartItem = async (item: {
  id: string;
  quantity: number;
}) => {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return;

  const cartItems = await prisma.carts.findMany({
    where: {
      id: cartId,
    },
  });

  const itemInCart = JSON.parse(cartItems[0]?.items as string) as {
    id: string;
    quantity: number;
  }[];

  const cartItemsWithOutPassInItem = itemInCart.filter((i) => i.id !== item.id);

  if (item.quantity > 0) {
    await prisma.carts.update({
      data: {
        items:
          cartItemsWithOutPassInItem.length !== 0
            ? JSON.stringify([...cartItemsWithOutPassInItem, item])
            : JSON.stringify([item]),
      },
      where: {
        id: cartId,
      },
    });
  } else {
    await prisma.carts.update({
      data: {
        items:
          cartItemsWithOutPassInItem.length !== 0 && cartItemsWithOutPassInItem
            ? JSON.stringify(cartItemsWithOutPassInItem)
            : JSON.stringify([]),
      },
      where: {
        id: cartId,
      },
    });
  }
  revalidatePath("/");
};

export const deleteCartItems = async () => {};

// GET PRODUCT DETAILS FOR CART ITEMS
export const getCartItemsDetails = async (
  cartId: string | undefined,
  cartItems: {
    id: string;
    quantity: number;
  }[]
) => {
  if (!cartId) return [];
  const productIds = cartItems.map((item) => item.id);
  if (!productIds.length) return [];
  const productDetails = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    include: {
      seller: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return productDetails;
};
