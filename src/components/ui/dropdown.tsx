"use client";
import { MainNavItem } from "@/config/site";
import { useState } from "react";
import DropdownItem from "./dropdownItem";

type DropdownProps = {
  items: MainNavItem[];
  index: number;
};

function Dropdown({ items, index }: DropdownProps) {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setdropdownOpen(!dropdownOpen)}
        className="overflow-hidden relative rounded-full flex justify-center items-center hover:cursor-pointer uppercase"
      >
        {items[index].title}
      </div>

      <div
        className={`${
          dropdownOpen
            ? "top-full opacity-100 visible"
            : "top-[110%] invisible opacity-0"
        } absolute left-0 z-40 mt-2 rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}
      >
        {items[index].items?.map((item) => (
          <DropdownItem item={item.title} />
        ))}
        <div
          className="fixed inset-0 -z-[66] opacity-[0] w-screen h-screen"
          onClick={() => setdropdownOpen(false)}
        ></div>
      </div>
    </>
  );
}

export default Dropdown;
