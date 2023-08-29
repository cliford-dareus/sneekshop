import Button from "@/components/ui/button";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="text-white py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-koulen">Products</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <Button className="bg-red-600">Add New</Button>
      </div>

      <div className="flex items-center gap-4">
        <div>Filter</div>
        <div>Sort</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {Array(16).fill(0).map((i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default page;
