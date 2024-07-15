"use client";

import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CiStar, CiClock2, CiMicrophoneOn, CiBookmark } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiBookOpenText } from "react-icons/pi";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const BookPage = ({ params }: { params: { bookid: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const router = useRouter()

  const durationFormat = (duration: number | any) => {
    if (typeof duration !== "number") {
      return "";
    } else {
      let min: string = "" + Math.floor(duration / 60);
      let sec: string = "" + Math.floor(duration % 60);

      if (min.length < 2) {
        min = "0" + min;
      }
      if (sec.length < 2) {
        sec = "0" + sec;
      }

      return min + ":" + sec;
    }
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

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
  }, []);

  return (
    <>
      <audio
        className="hidden"
        src={book?.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
      <SearchBar />
      <PageContainer>
        {loading ? (
          <Skeleton className="w-[200px] h-[20px] rounded-lg" />
        ) : (
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col max-w-[65%]">
              <h1 className="text-[32px] font-bold">{book?.title}</h1>
              <p className="text-[16px] font-bold">{book?.author}</p>
              <p className="text-[20px]">{book?.subTitle}</p>
              <div className="w-full bg-gray-300 h-px rounded-full my-4"></div>
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center font-bold gap-2">
                    <CiStar size={24} strokeWidth={0.75} />
                    <p>{`${book?.averageRating} (${book?.totalRating} ratings)`}</p>
                  </div>
                  <div className="flex flex-row items-center font-bold gap-2">
                    <CiMicrophoneOn size={24} strokeWidth={0.4} />
                    <p>Audio & Text</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center font-bold gap-2">
                    <CiClock2 size={24} strokeWidth={0.75} />
                    {duration && <p>{durationFormat(duration)}</p>}
                  </div>
                  <div className="flex flex-row items-center font-bold gap-2">
                    <HiOutlineLightBulb size={24} strokeWidth={2} />
                    <p>{`${book?.keyIdeas} key ideas`}</p>
                  </div>
                </div>
              </div>
              {/* Last horizontal line - start buttons */}
              <div className="w-full bg-gray-300 h-px rounded-full my-4"></div>

              <div className="flex gap-4 mb-6">
                <button onClick={() => router.push("/player/" + book?.id)} className="rounded-lg bg-green py-4 px-10 text-black font-bold text-[16px] flex flex-row items-center justify-center gap-2 hover:brightness-90">
                  <PiBookOpenText color="black" size={24} />
                  Read
                </button>
                <button onClick={() => router.push("/player/" + book?.id)} className="rounded-lg bg-green py-4 px-10 text-black font-bold text-[16px] flex flex-row items-center justify-center gap-2 hover:brightness-90">
                  <CiMicrophoneOn strokeWidth={0.5} color="black" size={24} />
                  Listen
                </button>
              </div>
              <h1
                onClick={() => setBookmarked(!bookmarked)}
                className="text-[18px] flex flex-row items-center gap-2 cursor-pointer mb-[40px] hover:font-bold transition-all duration-500"
              >
                {bookmarked ? (
                  <>
                    <IoBookmark fill="black" color="black" size={24} />
                    Saved in My Library
                  </>
                ) : (
                  <>
                    <IoBookmarkOutline fill="black" color="black" size={24} />
                    Add Title to My Library
                  </>
                )}
              </h1>

              <h1 className="text-[18px] font-bold mb-[16px]">
                {"What's it about?"}
              </h1>

              <div className="flex flex-row gap-4 mb-4">
                {book?.tags.map((tag: string, index) => (
                  <div key={index} className="flex items-center justify-center text-[16px] font-semibold rounded-lg p-4 bg-[#87CEEB1f]">{tag}</div>
                ))}
              </div>
              <div className="leading-relaxed mb-4">
                {book?.bookDescription}
              </div>
              <h1 className="text-[18px] font-bold mb-[16px]">
                {"About the author"}
              </h1>
              <div className="leading-relaxed mb-4">
                {book?.authorDescription}
              </div>
            </div>
            <div className="flex w-[300px] h-[300px] aspect-square">
              <img src={book?.imageLink} className="object-cover" />
            </div>
          </div>
        )}
      </PageContainer>
    </>
  );
};

export default BookPage;
