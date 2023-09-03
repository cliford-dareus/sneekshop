import { getUserSubscriptionPlan } from "@/app/_actions/stripe";
import {
  NextAuthSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";
import SubscribeBtn from "@/components/billing/subscribe-btn";
import { subscriptionPlans } from "@/config/subscription-plans";
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
      }
    </>
  );
};

export default Plan;
