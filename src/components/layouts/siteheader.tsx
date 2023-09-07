import React from "react";
import Navbar from "./navbar";
import MobileNavbar from "./mobileNavbar";
import Link from "next/link";
import CartButton from "../checkout/cart-button";
import Authactions from "../ui/authactions";
import CartPreview from "../checkout/cart-preview";

type Props = {};

const Siteheader = (props: Props) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex items-center h-[60px]">
        <div className="flex items-center mr-auto">
          <Link href="/" className="mr-8 text-3xl font-koulen">
            <span className="text-red-500">SNEEK</span>SHOP
          </Link>
          <Navbar />
          <MobileNavbar />
        </div>

        <div className="flex items-center gap-4">
          <CartButton>
            <CartPreview />
          </CartButton>
          <Authactions />
        </div>
      </div>
    </header>
  );
};

export default Siteheader;
