import Image from "next/image";

const NotFinished = () => {
  return (
    <>
      <div className="w-full h-screen relative items-center justify-center">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="pb-8 text-2xl">
            {"Sorry. This page hasn't been implemented yet."}
          </h1>
          <Image
            src={"/assets/undraw_working.svg"}
            alt="not finished"
            width={700}
            height={400}
            priority
          />
        </div>
      </div>
    </>
  );
};

export default NotFinished;
