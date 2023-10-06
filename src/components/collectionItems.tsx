import { CollectionProp } from "@/libs/type";
import Link from "next/link";

type Props = {
  pageCount: number;
  collections: CollectionProp[];
};

const CollectionItems = ({ collections, pageCount }: Props) => {
  return (
    <div className="">
      {collections.map((collection) => (
        <div className="" key={collection.id}>
          <div>{collection.name}</div>
          <Link href={`collection/${collection.id}`} className="">
            View
          </Link>
          {/* <div key={collection.id}>
            {collection.products.map((product) => (
              <div key={product.id}>{product.title}</div>
            ))}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CollectionItems;
