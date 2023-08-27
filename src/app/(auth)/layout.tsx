import Image from "next/image";
import React, { ReactNode } from "react";
import AuthImage from "../../../public/image.jpeg";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex items-center justify-center md:justify-normal bg-black">
      <div className="hidden md:flex w-1/2 h-screen relative">
        <div className="absolute top-4 left-4 z-50">
          <Link href="" className="text-4xl font-koulen">SNEEKSHOP</Link>
        </div>
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src={AuthImage}
          alt=""
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
