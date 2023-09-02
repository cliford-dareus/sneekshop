import Stripe from "stripe";
const secret = process.env.STRIPE_SECRET_KEY

export const stripe = new Stripe(secret ?? '', {
  apiVersion: "2023-08-16",
  typescript: true,
});