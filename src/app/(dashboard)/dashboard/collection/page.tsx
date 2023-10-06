import {
  NextAuthSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Button from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { getUserSubscriptionPlan } from "@/app/_actions/stripe";
import { Collection } from "@prisma/client";
import CollectionItems from "@/components/collectionItems";
import { getSellerStoreCollections } from "@/app/_actions/collection";
import { CollectionProp } from "@/libs/type";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const page = async ({ searchParams }: Props) => {
  const { page, per_page, sort } = searchParams ?? {};

  const session: NextAuthSession | null = await getServerSession(authOptions);
  const subscriptionPlan = await getUserSubscriptionPlan(session);
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const [len, collections] = await getSellerStoreCollections({
    sellerId: session?.user.id as string,
    limit,
    offset,
  });

  const pageCount = Math.ceil((len as number) / limit);

  // Check if user is subscribed and subscribe is not expired
  const readyToSell =
    !subscriptionPlan.store_active &&
    // TODO: Calculate subscription plan expiration date
    subscriptionPlan.stripeCurrentPeriodEnd! > new Date();

  return (
    <div className="text-white py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-koulen">Collections</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {!readyToSell && (
          <Button className="bg-red-600">
            <Link href="/dashboard/store/new">Add New Collection</Link>
          </Button>
        )}
      </div>

      {!readyToSell ? (
        len ? (
          <>
            <CollectionItems
              collections={collections as unknown as CollectionProp[]}
              pageCount={pageCount}
            />
          </>
        ) : (
          <div className="">
            <h1>No Collection</h1>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center flex-col h-[200px]">
          <h1 className="font-koulen text-xl">
            Activate your storefront by subcripbing to one of our plans
          </h1>
          <Button className="bg-red-600">
            <Link href="">View Plans</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
