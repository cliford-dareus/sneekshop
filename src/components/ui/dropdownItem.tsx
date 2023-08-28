import Link from "next/link";
import React from "react";

type Props = {
  item: string;
};

const DropdownItem = ({ item }: Props) => {
  return (
    <Link
      href="javascript:void(0)"
      className="block py-2 px-5 text-base font-semibold text-black hover:bg-primary hover:bg-opacity-5 hover:text-primary"
    >
      {item}
    </Link>
  );
};

export default DropdownItem;
