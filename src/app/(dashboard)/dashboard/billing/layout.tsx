import Button from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SubscriptionLayout = ({ children }: Props) => {
  return (
    <div className="mt-5">
      <header className="">
        <div className="flex gap-4 items-center border-b border-slate-600">
          <Link href="/dashboard/billing">Overview</Link>
          <Link href="billing/plans">Plans</Link>
          <Link href="billing/invoice">Invoices</Link>
        </div>
      </header>
      <main className="">{children}</main>
    </div>
  );
};

export default SubscriptionLayout;
