import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LobbyLayout = ({ children }: Props) => {
  return (
    <div className="bg-black flex flex-col min-h-screen ">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LobbyLayout;
