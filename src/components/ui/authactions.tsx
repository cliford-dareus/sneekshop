"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "./button";
import Link from "next/link";

type Props = {};

const Authactions = (props: Props) => {
  const session = useSession();

  return (
    <div className="flex items-center gap-4">
      <div>
        {session.status === "authenticated" ? (
          <Button className="bg-red-600" onclick={() => signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button className="bg-red-600">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
      </div>
      <div className="">
        {session.status === "authenticated" ? (
          <p className="w-[35px] h-[35px] rounded-full bg-slate-800 flex items-center justify-center">
            {session.data.user?.name
              ?.split(" ")
              .map((x) => x.slice(0, 1).toUpperCase())}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Authactions;
