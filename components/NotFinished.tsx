import Image from "next/image";

const NotFinished = () => {
  return (
    <>
      <div className="w-full h-full relative items-center justify-center mt-6">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="pb-8 text-2xl text-center mx-6">
            {"Sorry. This page hasn't been implemented yet."}
          </h1>
          <Image
            src={"/assets/undraw_working.svg"}
            alt="not finished"
            className="w-4/5 h-auto"
            width={200}
            height={200}
            priority
          />
        </div>
      </div>
    </>
  );
};

export default NotFinished;
