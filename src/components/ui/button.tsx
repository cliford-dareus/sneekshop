import classNames from "classnames";
import { SignInResponse } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
  onclick?: any;
  disabled?: boolean;
};

const Button = ({ children, className, onclick, disabled }: Props) => {
  return (
    <button
      className={classNames("flex py-[5px] px-4 cursor-pointer", className)}
      onClick={onclick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
