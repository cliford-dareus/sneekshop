"use server";

import prisma from "@/libs/prismaDB";
import { $Enums, Product } from "@prisma/client";

type Collection = {};

export const getCollections = async () => {};

export const getSellerCollection = async (input: { sellerId: string }) => {
  const collection = await prisma.collection.findMany({
    where: {
      products: {
        every: {
          sellerId: input.sellerId,
        },
      },
    },
  });
  console.log(collection)

  return collection;
};

// CREATE A NEW COLLECTION
export const createCollection = async (input: {
  title: string;
  products: string[];
}) => {
  const isUnique = await prisma.collection.create({
    data: {
        name: input.title,
    }
  });

  if(isUnique){
    throw new Error("Collection already exists");
  }

  const collection = await prisma.collection.create({
    data: {
      name: "kjkkk",
      productIds: input.products,
    },
  });

  return collection;
};

// CHECK IF COLLECTION UNIQUE
export const isCollectionUnique = async (input: { title: string }) => {
  const uniqueColllections = await prisma.collection.findUnique({
    where: {
      name: input.title,
    },
  });

  if (uniqueColllections) {
    throw new Error("Collection already exists.");
  }
};
