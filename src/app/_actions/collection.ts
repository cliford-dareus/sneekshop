"use server";

import prisma from "@/libs/prismaDB";
import { $Enums, Product } from "@prisma/client";

type Collection = {};

export const getCollection = async (id: string) => {
  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });

  return collection;
};

export const getSellerStoreCollections = async (input: {
  sellerId: string;
  limit: number;
  offset: number;
}) => {
  const collection = await prisma.collection.findMany({
    take: input.limit,
    skip: input.offset,
    where: {
      sellerId: input.sellerId,
    },
    include: {
      products: {
        
      },
    },
  });

  // console.log(collection)
  const len = collection.length;
  return [len, collection];
};

// CREATE A NEW COLLECTION
export const createCollection = async (input: {
  title: string;
  sellerId: string;
  products: string[];
}) => {
  const isUnique = await prisma.collection.create({
    data: {
      name: input.title,
      sellerId: input.sellerId,
    },
  });

  if (isUnique) {
    throw new Error("Collection already exists");
  }

  const collection = await prisma.collection.create({
    data: {
      name: input.title,
      sellerId: input.sellerId,
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
