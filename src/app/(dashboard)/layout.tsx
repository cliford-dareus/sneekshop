import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return <div className="">{children}</div>;
};

export default DashboardLayout;
