import { getProductsAction } from "@/app/_actions/product";
import ProductItems from "@/components/productItems";
import { Product } from "@prisma/client";
import { MoveRight } from "lucide-react";
import React from "react";

type subCategoryPageProps = {
  params: {
    category: Product["category"];
    subcategory: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Page = async ({ params, searchParams }: subCategoryPageProps) => {
  const { page, per_page, sort, price_range } = searchParams ?? {};
  const categories = params.category.toLocaleUpperCase();
  const subcategories = params.subcategory;

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  const pricerange = typeof price_range === "string" ? price_range : null;

  const [items, len] = await getProductsAction({
    pricerange,
    offset,
    limit,
    categories,
    subcategories,
  });

  const pageCount = Math.ceil((len as number) / limit);

  return (
    <div className="text-white container mx-auto py-4">
      <div className="flex items-center gap-4">
        <h1 className="font-koulen text-3xl text-slate-300">{params.category}</h1>
        <MoveRight />
        <p className="font-semibold">
          {params.subcategory.slice(0, 1).toLocaleUpperCase() +
            params.subcategory.slice(1)}
        </p>
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

      <ProductItems items={items as Product[]} pageCount={pageCount} />
    </div>
  );
};

export default Page;
