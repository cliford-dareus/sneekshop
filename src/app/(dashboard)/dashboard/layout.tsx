import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Siteheader from "@/components/layouts/siteheader";
import Sitefooter from "@/components/layouts/sitefooter";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Siteheader />
      <main className="flex-1 container md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="w-full h-[calc(100vh-60px)] sticky top-[60px]">
          <div className="w-full py-4 h-[300px] bg-slate-700">
            {/* show these page content only if you have a store */}
            <p>Products</p>
            <p>Sales</p>

            {/*  The account link is for setting and profile*/}
            <p>Account</p>

            {/* show these page content only if you have a store */}
            <Link href="stores">Stores</Link>
          </div>
        </aside>

        {children}
      </main>
      <Sitefooter />
    </div>
  );
};

export default DashboardLayout;
