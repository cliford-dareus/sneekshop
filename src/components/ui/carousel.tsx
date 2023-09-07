"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "./button";
import Cards from "./cards";
import { Prisma } from "@prisma/client";

type Props = {
  items: {
    id: string;
    tags: string[];
    title: string;
    category: string;
    price: number;
    images: Prisma.JsonValue
  }[]
};

const Carousel = ({items}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

   const newProduct = items.filter((product) =>
     product.tags.includes("NEW")
   );

  return (
    <div className="">
      <div className="overflow-hidden flex-1 mt-4" ref={emblaRef}>
        <div className="flex gap-4 h-full ">
          {newProduct.map((product, i) => (
            <Cards className="flex-[0_0_25%]"  key={i} item={product}/>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button className="" onclick={scrollPrev}>
          Prev
        </Button>
        <Button className="" onclick={scrollNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
