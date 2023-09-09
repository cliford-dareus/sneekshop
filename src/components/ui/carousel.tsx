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
    images: Prisma.JsonValue;
  }[];
};

const Carousel = ({ items }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const newProduct = items.filter((product) => product.tags.includes("NEW"));

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  return (
    <div className="">
      <div className="overflow-hidden flex-1 mt-4" ref={emblaRef}>
        <div className="flex gap-4 h-full ">
          {newProduct.map((product, i) => (
            <Cards className="flex-[0_0_25%]" key={i} item={product} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 gap-4">
        <Button
          className="w-[55px] h-[55px] rounded-[100%] bg-red-600 flex items-center justify-center"
          onclick={scrollPrev}
        >
          <svg
            width="40"
            height="16"
            viewBox="0 0 51 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50.5 13H10L24 3" stroke="white" stroke-width="6" />
          </svg>
        </Button>

        <Button
          className="w-[55px] h-[55px] rounded-[100%] bg-red-600 flex items-center justify-center"
          onclick={scrollNext}
        >
          <svg
            width="40"
            height="16"
            viewBox="0 0 49 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 13C3.70732 13 28.2114 13 40 13L27.3171 3"
              stroke="white"
              stroke-width="6"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
