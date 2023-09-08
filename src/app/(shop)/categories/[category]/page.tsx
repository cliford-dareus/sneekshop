import { getProductsAction } from "@/app/_actions/product";
import ProductItems from "@/components/productItems";
import { Product } from "@prisma/client";
import React from "react";

type CategoryPageProps ={
  params: {
    category: Product["category"];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}


const Page = async ({params, searchParams }: CategoryPageProps) => {
  const {
    page,
    per_page,
    sort,
    price_range
  } = searchParams ?? {};
  const categories = params.category.toLocaleUpperCase()

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  const pricerange = typeof price_range === "string" ? price_range : null;

  const [items, len] = await getProductsAction({
    pricerange,
    offset,
    limit,
    categories,
  });

  const pageCount = Math.ceil((len as number) / limit);
  return (
    <div className="container mx-auto py-4">
      <h1 className="font-koulen text-3xl">{params.category}</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
      <ProductItems items={items as Product[]} pageCount={pageCount} />
    </div>
  );
};

export default Page;
