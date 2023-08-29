"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "./button";

type Props = {};

const Carousel = (props: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="flex-[0_0_25%] bg-slate-500 mr-[10px] h-[450px]">
              Slide {i}
            </div>
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
