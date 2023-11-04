import { $Enums, Collection, Prisma, Product } from "@prisma/client";
import { FileWithPath } from "react-dropzone";
export type CartItems = {
  id: string;
  quantity: number;
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface CreateProductProp {
  id: string;
  title: string;
  description: string;
  category: $Enums.Category;
  subCategory: string;
  price: number;
  color: string | string[];
  images: Prisma.JsonValue;
  inventory: number;
  sellerId: string;
  tags: string[];
  collectionIds?: string[]; 
}

export interface CollectionWithProduct extends Collection {
  products: Product[];
}