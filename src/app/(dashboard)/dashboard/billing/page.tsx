import {
  getSubscriptionInvoices,
  getUserSubscriptionPlan,
} from "@/app/_actions/stripe";
import {
  NextAuthSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";
import SubscribeBtn from "@/components/billing/subscribe-btn";
import Button from "@/components/ui/button";
import { subscriptionPlans } from "@/config/subscription-plans";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {};

const BillingPage = async (props: Props) => {
  const session: NextAuthSession | null = await getServerSession(authOptions);
  const subscriptionPlan = await getUserSubscriptionPlan(session);

  const invoices = await getSubscriptionInvoices(session?.user.id as string);

  return (
    <div className="">
      {subscriptionPlan.isSubscribed && (
        <>
          <div className="mt-4 mb-8">
            <h3 className="font-koulen text-2xl">Your subcription Plan</h3>
            <p>Lorem ipsum dolor sit amet consectetur.</p>

            <div className="flex h-[170px] mt-4 rounded-md gap-4">
              <div className="flex-1 p-4 bg-red-600 rounded-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-4 rounded-xl bg-black">
                      {subscriptionPlan.name}
                    </span>
                    <span>Plan</span>
                  </div>

                  <div className="flex">
                    <span className="text-4xl font-bold">
                      ${subscriptionPlan.price}
                    </span>
                    <span className="mt-1">/monthly</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>
                    Days left{" "}
                    {new Date(
                      Date.now() -
                        Number(
                          subscriptionPlan.stripeCurrentPeriodEnd?.getMilliseconds()
                        )
                    ).getMonth()}
                  </span>
                  <Button className="bg-black rounded-md">
                    {" "}
                    <Link href="billing/plans">Upgrade Plan</Link>
                  </Button>
                </div>
              </div>

              <div className="w-[30%] bg-slate-800 rounded-md"></div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-koulen">
              Invoices ({invoices?.length})
            </h3>

            <div className="mt-4">
              {invoices?.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center gap-4 border border-slate-600 rounded-md p-2"
                >
                  <div className="h-8 w-8 bg-white"></div>
                  <Link href={invoice.invoice_pdf ?? ""}>
                    Invoice_pdf_
                    {new Date(
                      Number(invoice.effective_at) * 1000
                    ).getFullYear()}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!subscriptionPlan.isSubscribed && (
        <>
          <h1 className="font-koulen text-2xl mt-4">SUBSCRIPTION PLANS</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {session &&
              subscriptionPlans.map((plan) => (
                <div key={plan.id} className="">
                  <div className="h-[200px] bg-slate-800 rounded-md"></div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <p>{plan.price}</p>
                  <SubscribeBtn
                    userId={session.user?.id}
                    email={session.user.email || ""}
                    stripePriceId={plan.stripePriceId}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    isSubscribed={!!subscriptionPlan.isSubscribed}
                    isCurrentPlan={subscriptionPlan?.name === plan.name}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BillingPage;
