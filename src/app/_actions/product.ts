"use server";

import { InputProps } from "@/components/forms/createProductForm";
import prisma from "@/libs/prismaDB";
import { $Enums, Product } from "@prisma/client";

type GetProductsProp = {
  pricerange: string | null;
  offset?: number;
  limit?: number;
  categories: string | string[] | undefined;
  subcategories?: string | string[] | undefined;
};

interface ProductForStore extends GetProductsProp {
  sellerId: string;
}

export const getProductsAction = async ({
  pricerange,
  offset,
  limit,
  categories,
  subcategories,
}: GetProductsProp) => {
  return await prisma.$transaction(async (ctx) => {
    const [min, max] = (pricerange?.split("-") as [string, string]) ?? [
      0, 1000,
    ];
    const category = categories as $Enums.Category;
    const subCategory = subcategories as string;

    const items = await ctx.product.findMany({
      take: limit,
      skip: offset,
      orderBy: { title: "asc" },
      where: {
        AND: {
          category,
          subCategory,
          price: {
            gte: Number(min),
            lte: Number(max),
          },
        },
      },
    });

    const len = await ctx.product.count({
      where: {
        AND: {
          category,
          subCategory,
          price: {
            gte: Number(min),
            lte: Number(max),
          },
        },
      },
    });

    return [items, len];
  });
};

export const getSellerStoreProducts = async (input: ProductForStore) => {
  if (!input.sellerId) return [];
  const [min, max] = (input.pricerange?.split("-") as [string, string]) ?? [
    0, 1000,
  ];

  const subscription = await prisma.user_subscription.findFirst({});
  const category = input.categories as $Enums.Category;
  const subCategories = input.subcategories as string;

  const storeProducts = await prisma.product.findMany({
    where: {
      AND: {
        sellerId: input.sellerId,
        category,
        subCategory: subCategories,
        price: {
          gte: Number(min),
          lte: Number(max),
        },
      },
    },
  });


  const len = await prisma.product.count({
    where: {
      AND: {
        sellerId: input.sellerId,
        category,
        subCategory: subCategories,
        price: {
          gte: Number(min),
          lte: Number(max),
        },
      },
    },
  });

  return [len, storeProducts];
};

export const isProductUnique = async (input: {
  id?: string;
  title: string;
}) => {
  const product = await prisma.product.findFirst({
    where: {
      AND: {
        id: input.id,
        title: input.title,
      },
    },
  });

  if (product) {
    throw new Error("Product name already taken.");
  }
};

export const createProduct = async (
  input: Product & { color: string | string[] }
) => {
  const isProductExist = await prisma.product.findFirst({
    where: {
      title: input.title,
    },
  });

  if (isProductExist) {
    throw new Error("Product already exists");
  }

  await prisma.product.create({
    data: {
      title: input.title,
      description: input.description,
      category: input.category,
      subCategory: input.subCategory,
      price: Number(input.price),
      inventory: Number(input.inventory),
      tags: input.tags,
      sellerId: input.sellerId,
      images: input.images ?? JSON.stringify([]),
    },
  });
 
};

export const updateProduct = async () => {};

export const deleteProduct = async () => {};
