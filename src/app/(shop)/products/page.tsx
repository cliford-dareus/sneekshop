import ProductItems from "@/components/productItems";
import React from "react";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const DummyProducts = [
  {
    title: "red shirts",
    price: 100,
    inventory: 500,
    description: "",
    category: "clothing",
    subCategory: "Tops",
  },
  {
    title: "red pants",
    price: 100,
    inventory: 500,
    description: "",
    category: "clothing",
    subCategory: "Bottoms",
  },
];

const Products = async ({searchParams}: Props) => {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = searchParams ?? {};
  const pageCount = 8


  return (
    <section className="container py-4">
      <div className="">
        <h1 className="text-3xl font-koulen">Products</h1>
        <p className="">Lorem ipsum dolor sit amet, adipisicing elit.</p>
      </div>
      <ProductItems pageCount={pageCount}/>
    </section>
  );
};

export default Products;
