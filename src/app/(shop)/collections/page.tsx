import { getCollections } from "@/app/_actions/collection";
import CollectionItems from "@/components/collectionItems";
import Pagination from "@/components/pageUI/pagination";
import { CollectionWithProduct } from "@/libs/type";
import { Collection, Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const CollectionsPage = async ({ searchParams }: Props) => {
  const { page, per_page, sort } = searchParams ?? {};

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const [collections, len] = (await getCollections({ limit, offset })) as [
    CollectionWithProduct[],
    number
  ];

  const pageCount = Math.ceil((len as number) / limit);

  // console.log(collections)

  return (
    <section className="container py-4">
      <div className="">
        <h1 className="text-3xl font-koulen">Collections</h1>
        <p className="">Lorem ipsum dolor sit amet, adipisicing elit.</p>
      </div>
      {collections ? (
        <CollectionItems collections={collections} pageCount={pageCount} />
      ) : (
        <div>No Collections</div>
      )}
    </section>
  );
};

export default CollectionsPage;
