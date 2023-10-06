"use client";

import Link from "next/link";
import Pagination from "./pageUI/pagination";
import { CollectionProp } from "@/libs/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState, useCallback } from "react";
import Button from "./ui/button";
import { ArrowDownWideNarrow, ChevronDown, ListFilter, X } from "lucide-react";
import { sortOptions } from "@/config/products";


type Props = {
  pageCount: number;
  collections: CollectionProp[];
};

const CollectionItems = ({ collections, pageCount }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "8";
  const sort = searchParams.get("sort") ?? "";

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

  // Sort in descending or ascending order
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({ sort: selectedSort })}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  return (
    <>
      <div className="flex gap-4 mt-2 text-black">
        <>
          <span
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-4 py-1 px-4 border cursor-pointer bg-white rounded-md"
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

        <div className="relative">
          <span
            className="flex items-center gap-4 py-1 px-4 border cursor-pointer bg-white rounded-md"
            onClick={() => setSortOpen(!sortOpen)}
          >
            <div className="flex items-center">
              <ArrowDownWideNarrow />
              <span>Sort</span>
            </div>

            <ChevronDown />
          </span>

          {sortOpen && (
            <div className="absolute top-10 w-[230px] p-4 bg-white z-50 rounded-md">
              {sortOptions.map((option, i) => (
                <div
                  key={option.label}
                  className="py-1  px-4 shadow-lg mt-2 cursor-pointer hover:bg-slate-200 rounded-md"
                  onClick={() => {
                    setSelectedSort(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {collections.map((collection) => (
          <Link
            href={`collection/${collection.id}`}
            className="h-[100px] p-4 relative shadow-md bg-slate-800 rounded-md"
            key={collection.id}
          >
            <h2 className="">{collection.name}</h2>
            <p>
              {collection.products.length}{" "}
              {collection.products.length > 1 ? "Products" : "Product"}
            </p>
          </Link>
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

export default CollectionItems;
