import classNames from "classnames";
import { SignInResponse } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
  onclick?: any;
  disabled?: boolean;
  id?: string;
};

const Button = ({ children, className, onclick, disabled, id }: Props) => {
  return (
    <button
      className={classNames("flex py-[5px] px-4 cursor-pointer rounded-md", className)}
      onClick={onclick}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  );
};

export default Button;
