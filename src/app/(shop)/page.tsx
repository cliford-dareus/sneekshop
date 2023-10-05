import Button from "@/components/ui/button";
import Cards from "@/components/ui/cards";
import Carousel from "@/components/ui/carousel";
import Link from "next/link";
import prisma from "@/libs/prismaDB";
import Image from "next/image";
import ProductBanner from "@/components/banners/product-banner";

type Props = {};

const LandingPage = async (props: Props) => {
  const product = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      images: true,
      category: true,
      tags: true,
      price: true,
    },
  });

  const featuredProduct = product.filter((product) =>
    product.tags.includes("FEATURED")
  );
  // Initiate hero Image, make sure the image i use an array later
  const url ="https://utfs.io/f/ffcca2f3-d293-4543-824a-aa752d3fd536_th.jpg";

  return (
    <section>
      <section className="max-w-[64rem] mx-auto h-[70vh] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="text-6xl text-center font-koulen flex items-center gap-2">
            <h1>UPGRAGE YOUR STYLE GAME </h1>
            <div className="w-[200px] h-[80px] bg-pink-300 rounded-full relative overflow-hidden">
              <Image
                src={url}
                alt=""
                width={200}
                height={80}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-6xl text-center font-koulen flex items-center gap-2">
            <h1>WITH OUR TRENDY</h1>{" "}
            <div className="w-[200px] h-[80px] bg-pink-300 rounded-full relative overflow-hidden">
              <Image
                src={url}
                alt=""
                width={200}
                height={80}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>{" "}
            <span>AND AFFORDADLE</span>
          </div>
          <h1 className="text-6xl text-center font-koulen">CLOTHING!</h1>
        </div>

        <div className="flex gap-8 mt-8">
          <Button className="border">
            <Link href="/dashboard/billing">SELL NOW</Link>
          </Button>
          <Button className="bg-red-600">SHOP NOW</Button>
        </div>
      </section>

      <section className="h-[600px] bg-[#232323] mt-[2em]">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-koulen text-3xl">NEW ARRIVALS</h2>
              <p>Lorem ipsum dolor sit.</p>
            </div>

            <div className="flex gap-4">
              <p className="font-koulen">View all</p>
              <svg
                width="49"
                height="16"
                viewBox="0 0 49 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 13C3.70732 13 28.2114 13 40 13L27.3171 3"
                  stroke="white"
                  stroke-width="6"
                />
              </svg>
            </div>
          </div>

          <div>
            <Carousel items={product} />
          </div>
        </div>
      </section>

      <section className=" mt-[4em] container">
        <h2 className="text-3xl font-koulen">YOUR RECENTLY VIEWED ITEMS</h2>
        <p className="">Lorem ipsum dolor sit amet consectetur.</p>

        <div className="flex mt-8 justify-end cursor-pointer">
          <div className="flex gap-4">
            <p className="font-koulen">View all</p>
            <svg
              width="49"
              height="16"
              viewBox="0 0 49 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 13C3.70732 13 28.2114 13 40 13L27.3171 3"
                stroke="white"
                stroke-width="6"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="h-[300px] mt-[4em] container">
        <div className="bg-slate-500 w-full h-full rounded-md overflow-hidden">
          <ProductBanner />
        </div>
      </section>

      <section className="container py-4 mt-[4em]">
        <h2 className="text-3xl font-koulen">FEATURED PRODUCTS</h2>
        <p className="">Lorem ipsum dolor sit amet consectetur.</p>

        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            {featuredProduct.map((product) => (
              <Cards className="" key={product.id} item={product} />
            ))}
          </div>
          <div className="flex mt-8 justify-end cursor-pointer">
            <div className="flex gap-4">
              <p className="font-koulen">View all</p>
              <svg
                width="49"
                height="16"
                viewBox="0 0 49 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 13C3.70732 13 28.2114 13 40 13L27.3171 3"
                  stroke="white"
                  strokeWidth="6"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4 my-[4em] ">
        <h2 className="text-3xl font-koulen">FEATURED SELLERS</h2>
        <p className="">Lorem ipsum dolor sit amet consectetur.</p>
        
        <div className="grid grid-cols-4 gap-4 w-full h-[100px] mt-4">
          {[1, 2, 3, 4].map((seller) => (
            <div className=" h-[100px] bg-slate-700 rounded-md" key={seller}></div>
          ))}
        </div>

        <div className="flex mt-8 justify-end cursor-pointer">
          <div className="flex gap-4">
            <p className="font-koulen">View all</p>
            <svg
              width="49"
              height="16"
              viewBox="0 0 49 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 13C3.70732 13 28.2114 13 40 13L27.3171 3"
                stroke="white"
                strokeWidth="6"
              />
            </svg>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LandingPage;
