import React from "react";

type Props = {
  label: string[];
};

const Badge = ({ label }: Props) => {
  const lb = label.find(
    (_, i) => i === Math.ceil(Math.random() * label.length - 1)
  );
  return (
    <div className="absolute py-1 px-2 bg-red-600 rounded-br-md text-sm z-10">{lb}</div>
  );
};

export default Badge;
