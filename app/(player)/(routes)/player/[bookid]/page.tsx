"use client";

import PageContainer from "@/components/PageContainer";
import AudioPlayer from "@/components/Player/AudioPlayer";
import SearchBar from "@/components/SearchBar";
import { setLoading } from "@/lib/features/auth/authSlice";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

const PlayerPage = ({ params }: { params: { bookid: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book>();
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${params.bookid}`
        );
        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.log(`error occurred fetching book ${params.bookid} data`);
      }
    };
    getBook();
  }, [params.bookid]);

  return (
    <>
      <div className="ml-[225px] md:ml-0">
        <PageContainer>
          {loading ? (
            <>
              <Skeleton className="w-[300px] h-[40px] rounded-lg mb-8" />
              <div className="flex flex-col gap-8">
                <Skeleton className="w-full h-[80px] rounded-lg" />
                <Skeleton className="w-full h-[80px] rounded-lg" />
                <Skeleton className="w-full h-[80px] rounded-lg" />
                <Skeleton className="w-full h-[80px] rounded-lg" />
                <Skeleton className="w-full h-[80px] rounded-lg" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{book?.title}</h1>
              <div className="w-full bg-gray-300 h-px rounded-full my-4 text-"></div>
              <p
                className={cn(
                  "whitespace-pre-line  mb-[80px] md:mb-[180px]",
                  `text-${sidebar.fontSize}`
                )}
              >
                {book?.summary}
              </p>
            </>
          )}
        </PageContainer>
      </div>
      {loading ? (
        <div className="flex fixed flex-row md:flex-col md:gap-4 w-full bg-[#042330] h-[80px] md:h-[180px] bottom-0 py-10 text-white items-center justify-center">
          <div className="flex items-center justify-start pl-8 md:pl-0 w-1/3 md:w-full md:justify-center">
            <Skeleton className="w-[40px] h-[48px] rounded-md" />
            <div className="flex flex-col justify-center gap-2 pl-2 md:w-[70%]">
              <Skeleton className="w-[80px] md:w-full h-[15px] rounded-full" />
              <Skeleton className="w-[30px] md:w-[50%] h-[15px] rounded-full" />
            </div>
          </div>

          <div className="fcc flex-row gap-4 mx-4 w-1/3 md:w-full">
            <Image
              className="btn-hover"
              src="/assets/forward.svg"
              width={28}
              height={28}
              alt="forward 10 seconds"
            />

            <FaCirclePlay className="btn-hover" size={40} />

            <Image
              className="btn-hover"
              src="/assets/backward.svg"
              width={28}
              height={28}
              alt="back 10 seconds"
            />
          </div>
          <div className="flex w-1/3 md:w-full md:pr-0 items-center justify-end md:justify-center pr-8">
            <Skeleton className="w-full max-w-[300px] h-[15px] rounded-full" />
          </div>
        </div>
      ) : (
        <>{book && <AudioPlayer book={book} />}</>
      )}
    </>
  );
};

export default PlayerPage;
