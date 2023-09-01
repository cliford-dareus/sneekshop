import { stripe } from "@/libs/stripe"
import prisma from "@/libs/prismaDB"

// CREATE PAYMENT INTENT
export const createPaymentIntent = async (item: any) => {
    // const amount = 

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true
        }
    })
}