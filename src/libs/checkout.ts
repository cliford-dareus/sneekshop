import { ProductWithQuantityAndSeller } from "@/app/_actions/cart";

// Taken from: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
export function calculateOrderAmount(items: ProductWithQuantityAndSeller) {
  const total = items.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);
  const fee = Math.round(total * 0.1);

  const totalInCents = Math.round(total * 100);
  const feeInCents = Math.round(fee * 100);

  return {
    total: totalInCents, // Converts to cents which stripe charges in
    fee: feeInCents,
  };
}
