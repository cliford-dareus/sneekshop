import { getCollection } from "@/app/_actions/collection";
import Cards from "@/components/ui/cards";
import { MoveRight } from "lucide-react";
import React from "react";

type Props = {};

const Page = async({ params }: { params: { id: string } }) => {
  const collection = await getCollection(params.id)

  return (
    <div className="text-white py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="font-koulen text-3xl text-slate-300">Collections</h1>
            <MoveRight />
            <p className="font-semibold">
              {collection?.name.toLocaleUpperCase()}
            </p>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {collection?.products.map((product) => (
          <Cards key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
