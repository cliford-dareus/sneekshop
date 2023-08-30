import React from 'react'
import Button from './button';
import classNames from 'classnames';
import { ShoppingBasket } from 'lucide-react';


type Props = {
  className?: string
}

const Cards = ({className}: Props) => {
  return (
    <div
      className={classNames("shadow-sm shadow-slate-800 rounded-md", className)}
    >
      <div className="h-[300px] bg-slate-800 rounded-md relative">
        <Button className="bg-red-600 absolute bottom-4 right-4 rounded-md">
          <ShoppingBasket />
        </Button>
      </div>
      <div className="flex items-center pt-4 cursor-pointer">
        <div className="text-[.8rem]">
          <p className=''>PRODUCT NAME</p>
          <span className=''>PRICE</span>
        </div>
      </div>
    </div>
  );
}

export default Cards