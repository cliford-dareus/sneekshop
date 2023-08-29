import React from "react";
import Dropdown from "../ui/dropdown";
import { siteConfig } from "@/config/site";
import DropdownItem from "../ui/dropdownItem";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="">
      <ul className="flex gap-4">
        <li className="relative">
          <Dropdown items={siteConfig.mainNav} index={0} />
        </li>

        <li className="relative">
          <Dropdown items={siteConfig.mainNav} index={1} />
        </li>

        <li className="relative">
          <Dropdown items={siteConfig.mainNav} index={2} />
        </li>

        <li className="relative">
          <Dropdown items={siteConfig.mainNav} index={3} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
