import Skeleton from "./Skeleton";

const SkeletonBook = () => {
  return (
    <>
      <div className="flex flex-col mb-8">
        <Skeleton className="w-[172px] h-[172px] rounded-lg my-2" />
        <Skeleton className="w-[172px] h-[30px] rounded-lg my-2" />
        <Skeleton className="w-[80px] h-[30px] rounded-lg my-2" />
      </div>
    </>
  );
};

export default SkeletonBook;
