"use client";
import { MainNavItem } from "@/config/site";
import { useState } from "react";
import DropdownItem from "./dropdownItem";
import { ShoppingBasket } from "lucide-react";

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
              <div className="min-w-[40px] w-[170px]  bg-slate-700 px-4 py-5 flex flex-col justify-center gap-4">
                <ShoppingBasket size={40} />
                <p className="text-[.8rem] leading-none text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="py-5 flex flex-col">
                {items[index].items?.map((item, i) => (
                  <DropdownItem key={i} item={item.title} />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-5 flex flex-wrap max-w-[400px] w-max ">
              {items[index].items?.map((item, i) => (
                <DropdownItem key={i} item={item.title} />
              ))}
            </div>
          )}
        </div>
      </button>
    </>
  );
}

export default Dropdown;
