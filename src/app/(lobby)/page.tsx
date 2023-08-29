import Button from "@/components/ui/button";
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

      <section className=" bg-[#232323]">
        <div className="container py-8 h-full flex flex-col">
          <h2 className="font-koulen text-3xl">NEW ARRIVALS</h2>
          <Carousel />
        </div>
      </section>
    </section>
  );
};

export default LandingPage;
