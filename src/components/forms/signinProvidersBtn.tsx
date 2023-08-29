"use client";

import { signIn } from "next-auth/react";
import classNames from "classnames";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
  className: string;
  provider: string;
};

const SigninProvidersBtn = ({ children, className, provider }: Props) => {
  return (
    <div
      className={classNames("flex py-[5px] px-4 cursor-pointer", className)}
      onClick={() => signIn(provider)}
    >
      {children}
    </div>
  );
};

export default SigninProvidersBtn;
