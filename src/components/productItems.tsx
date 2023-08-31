"use client";

import React from "react";
import Cards from "./ui/cards";
import Button from "./ui/button";
import classNames from "classnames";
import { Product } from "@prisma/client";
import DoubleThumbSlider from "./ui/slider";
import Pagination from "./pageUI/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { productsColors, productsSizes } from "@/config/products";
import { useTransition, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownWideNarrow, ChevronDown, ListFilter, X } from "lucide-react";

type Props = {
  pageCount: number;
  items: Product[]
};

const ProductItems = ({ pageCount, items }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";
  const sort = searchParams.get("sort") ?? "";

  // Create new search params
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Sort by Gender
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({ gender: selectedGender })}`
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGender]);

  // Sort by Size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ size: selectedSize })}`);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize]);

  // Sort by Color
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ color: selectedColor })}`);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  // Sort by Price Range
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  useEffect(() => {
    const [min, max] = debouncedPriceRange;
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceRange]);

  return (
    <>
      <div className="flex gap-4 mt-2 text-black">
        <>
          <span
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-4 py-1 px-4 border cursor-pointer bg-white"
          >
            <ListFilter />
            <span>Filter</span>
          </span>

          {filterOpen && (
            <>
              <div className="fixed top-0 left-0 z-[70] w-[40vw] h-screen bg-white max-w-[500px] p-4">
                <div className="border-b flex item-center justify-between h-[45px]">
                  <h1 className="font-koulen text-2xl">SNEEKSHOP</h1>
                  <span
                    className="cursor-pointer "
                    onClick={() => setFilterOpen(false)}
                  >
                    <X />
                  </span>
                </div>
                <p className="font-bold my-4">Filter</p>

                {/* Gender */}
                <div className="">
                  <p className="font-koulen">Gender</p>
                  <div className="flex">
                    {["Male", "Female", "Unisex"].map((gender) => (
                      <Button
                        key={gender}
                        className=""
                        onclick={() =>
                          setSelectedGender(
                            `${gender.toLowerCase().toString()}`
                          )
                        }
                      >
                        {gender}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* SIZE */}
                <div className="mt-2">
                  <p className="font-koulen">Size</p>
                  <div className="flex flex-wrap">
                    {productsSizes.map((size, i) => (
                      <Button
                        key={i}
                        className=""
                        onclick={() =>
                          setSelectedSize(size.toLowerCase().toString())
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-2">
                  <p className="font-koulen">Price</p>
                  <DoubleThumbSlider
                    min={0}
                    max={300}
                    step={1}
                    onChange={(value) => {
                      console.log(value);
                      setPriceRange([value.min, value.max]);
                    }}
                  />
                </div>

                {/* COLOR */}
                <div className="mt-2">
                  <p className="font-koulen">Color</p>
                  <div className="flex flex-wrap gap-2 py-2">
                    {productsColors.map((color, i) => (
                      <Button
                        onclick={() =>
                          setSelectedColor(color.toLowerCase().toString())
                        }
                        key={i}
                        className=" flex items-center bg-slate-200 rounded-md gap-2
                  "
                      >
                        <div
                          className={classNames(
                            "w-[10px] h-[10px] rotate-[45deg]",
                            `bg-${
                              color === "Black"
                                ? "black"
                                : String(color.toLowerCase() + "-600")
                            }`
                          )}
                        ></div>
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="bg-red-600 mt-4 w-full flex justify-center text-white">
                  Show 80 result
                </Button>
              </div>

              <div
                onClick={() => setFilterOpen(false)}
                className="fixed inset-0 h-screen w-screen bg-white z-50 opacity-[.5] blur-md"
              ></div>
            </>
          )}
        </>
        <span className="flex items-center gap-4 py-1 px-4 border cursor-pointer bg-white">
          <div className="flex items-center">
            <ArrowDownWideNarrow />
            <span>Sort</span>
          </div>

          <ChevronDown />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {items
          .slice(0, 12)
          .map((item) => (
            <Cards className="" key={item.id} item={item}/>
          ))}
      </div>

      <Pagination
        page={page}
        pageCount={pageCount}
        createQueryString={createQueryString}
        isPending={isPending}
        sort={sort}
        pathname={pathname}
        router={router}
        startTransition={startTransition}
        per_page={per_page}
      />
    </>
  );
};

export default ProductItems;
