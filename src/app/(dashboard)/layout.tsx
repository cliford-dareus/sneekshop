import Sitefooter from "@/components/layouts/sitefooter";
import Siteheader from "@/components/layouts/siteheader";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <Siteheader />
      <main className="flex-1">{children}</main>
      <Sitefooter />
    </div>
  );
};

export default DashboardLayout;
