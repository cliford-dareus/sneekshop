import Skeleton from "@/components/ui/skeleton";

type Props = {};

const Loading = (props: Props) => {
  return (
    <section className="container py-4">
      <div className="h-[60px] flex flex-col gap-2 rounded-md">
        <Skeleton classname="h-[30px] bg-slate-500 w-[200px]"></Skeleton>
        <Skeleton classname="h-[20px] bg-slate-500 w-[500px]"></Skeleton>
      </div>
      <Skeleton classname="mt-2 h-[34px] w-[250px] animate-pulse bg-slate-500 rounded-md"></Skeleton>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <Skeleton classname="shadow-sm shadow-slate-800 rounded-md h-[300px] w-[322px] bg-slate-500 animate-pulse"></Skeleton>
        <Skeleton classname="shadow-sm shadow-slate-800 rounded-md h-[300px] w-[322px] bg-slate-500 animate-pulse"></Skeleton>
        <Skeleton classname="shadow-sm shadow-slate-800 rounded-md h-[300px] w-[322px] bg-slate-500 animate-pulse"></Skeleton>
        <Skeleton classname="shadow-sm shadow-slate-800 rounded-md h-[300px] w-[322px] bg-slate-500 animate-pulse"></Skeleton>
        <Skeleton classname="shadow-sm shadow-slate-800 rounded-md h-[300px] w-[322px] bg-slate-500 animate-pulse"></Skeleton>
      </div>
    </section>
  );
};

export default Loading;
