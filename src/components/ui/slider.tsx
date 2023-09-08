import React, { ChangeEventHandler, useState } from "react";

type Props = {
  min: number;
  max: number;
  step: number;
  onChange: (values: {min: number; max: number}) => void;
};

const DoubleThumbSlider = ({ min, max, step, onChange }: Props) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
    onChange({ min: Number(minVal), max: value });
  };

  return (
    <div className="flex items-center justify-center w-full h-[5px] bg-red-600 my-4">
      <input
        type="range"
        min={0}
        max={500}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        className="w-1/2 h-1 rounded-full focus:outline-none thumb bg-transparent"
      />
      <input
        type="range"
        min={0}
        max={500}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        className="w-1/2 h-1 rounded-full focus:outline-none thumb"
      />
    </div>
  );
};

export default DoubleThumbSlider;
