import Image from "next/image";
import React from "react";
import Button from "../ui/button";
import { ArrowRight } from "lucide-react";

type Props = {};

const ProductBanner = (props: Props) => {
  return (
    <div className="flex h-full gap-4 relative">
      <Image
        src={
          "https://utfs.io/f/10526bcd-89ea-42fb-8eaa-216a8c974df5_pexels-alex-azabache-3766111.jpg"
        }
        alt=""
        width={400}
        height={400}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-4 right-4 w-[40%] md:w-[30%] lg:w-[20%]">
        <h3 className="text-5xl font-bold font-koulen">up to 50% on watches and more</h3>
        <p>Save on selected watches</p>
        <Button className="border mt-2 flex items-center gap-2">
            <span>Shop Now</span>
            <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ProductBanner;
