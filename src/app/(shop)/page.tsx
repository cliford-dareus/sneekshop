import Button from "@/components/ui/button";
import Cards from "@/components/ui/cards";
import Carousel from "@/components/ui/carousel";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <section>
      <section className="max-w-[64rem] mx-auto h-[70vh] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="text-6xl text-center font-koulen flex items-center gap-2">
            <h1>UPGRAGE YOUR STYLE GAME </h1>
            <div className="w-[200px] h-[80px] bg-pink-300 rounded-full"></div>
          </div>
          <div className="text-6xl text-center font-koulen flex items-center gap-2">
            <h1>WITH OUR TRENDY</h1>{" "}
            <div className="w-[200px] h-[80px] bg-pink-300 rounded-full"></div>{" "}
            <span>AND AFFORDADLE</span>
          </div>
          <h1 className="text-6xl text-center font-koulen">CLOTHING!</h1>
        </div>

        <div className="flex gap-8 mt-8">
          <Button className="border">BROWSE</Button>
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
            <Carousel />
          </div>
        </div>
      </section>

      <section className="h-[300px] mt-[4em] container">
        <div className="bg-slate-500 w-full h-full"></div>
      </section>

      <section className="container py-4 mt-[4em]">
        <h2 className="text-3xl font-koulen">FEATURED PRODUCTS</h2>
        <p className="">Lorem ipsum dolor sit amet consectetur.</p>
        <div className="h-[50px] mt-4">
          <span className="px-4 py-1 bg-red-600">TOP</span>
          <span className="px-4 py-1">BOTTOM</span>
          <span className="px-4 py-1 ">JACKET</span>
          <span className="px-4 py-1 ">SUIT</span>
        </div>

        <div className="">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Cards key={i}/>
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
                  stroke-width="6"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4 mt-[4em]">
        <h2 className="text-3xl font-koulen">FEATURED STORE</h2>
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
    </section>
  );
};

export default LandingPage;
