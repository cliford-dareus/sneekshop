import { getProductsAction } from "@/app/_actions/product";
import ProductItems from "@/components/productItems";
import { formatSortQuery } from "@/config/products";
import { Product } from "@prisma/client";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Products = async ({ searchParams }: Props) => {
  const { page, per_page, sort, categories, subcategories, price_range } =
    searchParams ?? {};

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  const pricerange = typeof price_range === "string" ? price_range : null;
  const orderBy = formatSortQuery(sort);

  const [items, len] = await getProductsAction({
    pricerange,
    offset,
    limit,
    orderBy,
    categories,
    subcategories,
  });

  const pageCount = Math.ceil((len as number) / limit);

  return (
    <section className="container py-4">
      <div className="">
        <h1 className="text-3xl font-koulen">Products</h1>
        <p className="">Lorem ipsum dolor sit amet, adipisicing elit.</p>
      </div>
      <ProductItems pageCount={pageCount} items={items as Product[]} />
    </section>
  );
};

export default Products;
