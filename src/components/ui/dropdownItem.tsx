import { NavItem } from "@/config/site";
import Link from "next/link";
import React from "react";

type Props = {
  item: NavItem
};

const DropdownItem = ({ item }: Props) => {
  return (
    <Link
      href={item.href!}
      className="flex-shrink-0 flex flex-col items-start py-2 px-5 text-base  text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary w-[200px]"
    >
      <p className="font-semibold">{item.title}</p>
      <span className="text-[.8rem] leading-none text-left">
        Lorem ipsum dolor sit amet consectetur .
      </span>
    </Link>
  );
};

export default DropdownItem;
