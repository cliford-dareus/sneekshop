import ProductItems from "@/components/productItems";
import prisma from "@/libs/prismaDB";
import { $Enums, Prisma, Product } from "@prisma/client";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Products = async ({ searchParams }: Props) => {
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
  

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;
  const pricerange = typeof price_range === "string" ? price_range : null;

  // console.log(price_range)

  const getProductsAction = async () => {
    return await prisma.$transaction(async (ctx) => {
      const [min, max] = (pricerange?.split("-") as [string, string]) ?? [
        0, 1000,
      ];
      const category = categories as $Enums.Category;
      const subCategory = subcategories as any;

      // console.log(min, max);

      const items = await ctx.product.findMany({
        take: limit,
        skip: offset,
        orderBy: { title: "asc" },
        where: {
          AND: {
            category,
            subCategory,
            price: {
              gte: Number(min),
              lte: Number(max),
            },
          },
        },
      });

      const len = await ctx.product.count({
        where: {
          AND: {
            category,
            subCategory,
            price: {
              gte: Number(min),
              lte: Number(max),
            },
          },
        },
      });

      return [items, len];
    });
  };

  const [items, len] = await getProductsAction();
  const pageCount = Math.ceil(len as number / limit);

  // console.log(items, len);

  return (
    <section className="container py-4">
      <div className="">
        <h1 className="text-3xl font-koulen">Products</h1>
        <p className="">Lorem ipsum dolor sit amet, adipisicing elit.</p>
      </div>

      {/* {JSON.stringify(items)} */}
      <ProductItems pageCount={pageCount} items={items as Product[]}/>
    </section>
  );
};

export default Products;
