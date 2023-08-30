'use client'

import React from 'react'
import Cards from './ui/cards';
import { ArrowDownWideNarrow, ChevronDown } from 'lucide-react';
import Filter from './filter';

type Props = {}

const ProductItems = ({}: Props) => {
  return (
    <>
      <div className="flex gap-4 mt-2 text-black">
        <Filter />
        <span className="flex items-center gap-4 py-1 px-4 border cursor-pointer bg-white">
          <div className="flex items-center">
            <ArrowDownWideNarrow />
            <span>Sort</span>
          </div>

          <ChevronDown />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {new Array(20)
          .fill(0)
          .slice(0, 12)
          .map((i, j) => (
            <Cards className="" key={i} />
          ))}
      </div>


    </>
  );
}

export default ProductItems