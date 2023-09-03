import { getCartLineItems } from "@/app/_actions/cart";
import prisma from '@/libs/prismaDB'

type Props = {
  params: {
    sellerId: string;
  };
};

const Page = async ({ params }: Props) => {
  const sellerId = params.sellerId;


  const seller = await prisma.user_payment.findFirst({
    where: {
      userId: sellerId
    }
  })

  const cartLineItems = await getCartLineItems(sellerId);
  return <div className="h-[100vh]">Page</div>;
};

export default Page;
