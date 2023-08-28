import Sitefooter from "@/components/layouts/sitefooter";
import Siteheader from "@/components/layouts/siteheader";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LobbyLayout = ({ children }: Props) => {
  return (
    <div className="bg-black flex flex-col min-h-screen ">
      <Siteheader />
      <main className="flex-1">{children}</main>
      <Sitefooter />
    </div>
  );
};

export default LobbyLayout;
