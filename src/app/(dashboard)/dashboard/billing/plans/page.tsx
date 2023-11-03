import { getUserSubscriptionPlan } from "@/app/_actions/stripe";
import {
  NextAuthSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";
import SubscribeBtn from "@/components/billing/subscribe-btn";
import { subscriptionPlans } from "@/config/subscription-plans";
import { Check } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const Plan = async (props: Props) => {
  const session: NextAuthSession | null = await getServerSession(authOptions);
  const subscriptionPlan = await getUserSubscriptionPlan(session);

  return (
    <>
      {
        <>
          <h1 className="font-koulen text-2xl mt-4">SUBSCRIPTION PLANS</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {session &&
              subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-md shadow-sm shadow-slate-500 flex flex-col h-[500px]"
                >
                  <h2 className="font-[600] text-[1.2rem] mb-[.75em]">
                    {plan.name}
                  </h2>
                  <p className="font-[700] text-[2.25rem] mb-[.75em]">
                    {plan.price}
                  </p>

                  <div className="mb-auto">
                    <Check size={30}/>
                    <p className="mt-[.75em]">{plan.description}</p>
                  </div>

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
      }
    </>
  );
};

export default Plan;
