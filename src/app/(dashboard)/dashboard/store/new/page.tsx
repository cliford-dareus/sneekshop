import {
  NextAuthSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";
import CreateProductForm from "@/components/forms/createProductForm";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session: NextAuthSession | null = await getServerSession(authOptions);
  return (
    <div className="mt-4">
      <h1 className="font-koulen text-xl">create a new Product</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      <div className="mt-4">
        <CreateProductForm sellerId={session?.user.id as string} />
      </div>
    </div>
  );
};

export default page;
