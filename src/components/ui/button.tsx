import classNames from "classnames";
import { SignInResponse } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
  onclick?:any;
};

const Button = ({ children, className, onclick }: Props) => {
  return (
    <button
      className={classNames("flex py-[5px] px-4 cursor-pointer", className)}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default Button;
