import React from 'react'
import Button from './button';
import classNames from 'classnames';


type Props = {
  className?: string
}

const Cards = ({className}: Props) => {
  return (
    <div className={classNames('hadow-sm shadow-slate-800 rounded-md', className)}>
      <div className="h-[300px] bg-slate-800 rounded-md"></div>
      <div className="flex items-center justify-between pt-4">
        <div className="">
          <p>PRODUCT NAME</p>
          <span>PRICE</span>
        </div>

        <Button className="bg-red-600">BUY</Button>
      </div>
    </div>
  );
}

export default Cards