import Cards from "@/components/ui/cards";
import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import React from "react";

type Props = {};

const Products = (props: Props) => {
  return (
    <section className="container py-4">
      <div className="">
        <h1 className="text-2xl font-koulen">Products</h1>
        <p>Lorem ipsum dolor sit amet, adipisicing elit.</p>

        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-4 py-1 px-4 border cursor-pointer">
            <ArrowDownWideNarrow />
            <span>Sort</span>
          </div>
          <span className="flex items-center gap-4 py-1 px-4 border cursor-pointer">
            <ListFilter />
            Filter
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {new Array(20)
          .fill(0)
          .slice(0, 12)
          .map((i, j) => (
            <Cards className="" key={i} />
          ))}
      </div>

      <div className="h-16 mt-4">pagination</div>
    </section>
  );
};

export default Products;
