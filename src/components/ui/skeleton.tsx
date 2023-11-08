import cn from "classnames";
import { ReactNode } from "react";

type Props = {
  classname: string;
};

const Skeleton = ({ classname }: Props) => {
  return (
    <div className={cn("bg-muted animate-pulse rounded-md", classname)} />
  );
};

export default Skeleton;
