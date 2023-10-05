"use client";
import { MainNavItem } from "@/config/site";
import { useState } from "react";
import DropdownItem from "./dropdownItem";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

type DropdownProps = {
  items: MainNavItem[];
  index: number;
};

function Dropdown({ items, index }: DropdownProps) {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => setdropdownOpen(true)}
        onMouseLeave={() =>
          dropdownOpen ? setdropdownOpen(false) : setdropdownOpen(true)
        }
        onClick={() => setdropdownOpen(true)}
        className="relative rounded-full flex justify-center items-center hover:cursor-pointer z-50"
      >
        {items[index].title}

        <div
          className={`${
            dropdownOpen
              ? "top-[1.5em] opacity-100 visible"
              : "top-[110%] invisible opacity-0"
          } absolute left-0 z-40 mt-2 rounded bg-white  shadow-card transition-all`}
        >
          {index === 0 ? (
            <div className="flex">
              <Link href='/' className="min-w-[40px] w-[170px] items-start  bg-red-600 px-4 py-5 flex flex-col justify-center gap-2">
                <ShoppingBasket size={40} />
                <span className="font-koulen">SNEEKSHOP</span>
                <p className="text-[.8rem] leading-none text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </Link>
              <div className="py-5 flex flex-col">
                {items[index].items?.map((item, i) => (
                  <DropdownItem key={i} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-5 flex flex-wrap max-w-[400px] w-max ">
              {items[index].items?.map((item, i) => (
                <DropdownItem key={i} item={item} />
              ))}
            </div>
          )}
        </div>
      </button>
    </>
  );
}

export default Dropdown;
