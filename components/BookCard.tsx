"use client";

import { CiStar, CiClock2 } from "react-icons/ci";
import { Book } from "@/types/types";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Props {
  book: Book;
  key: string;
}

const BookCard: React.FC<Props> = ({ book, key }) => {
  const [duration, setDuration] = useState<number | null>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const onLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

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

  return (
    <>
      <Link href={"/book/" + book.id} className="hover:bg-[#87CEEB1f] relative">
        <div key={key} className="w-full max-w-[180px] pt-8 px-3 pb-3">
          {book.subscriptionRequired && <div className="absolute bg-blue-600 rounded-xl top-0 right-0 text-xs px-[6px] py-[2px] text-white">Premium</div>}
          <audio
            className="hidden"
            src={book.audioLink}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          ></audio>
          <img src={book.imageLink} />
          <h1 className="font-bold text-md my-2">{book.title}</h1>
          <div className="text-sm flex flex-col w-full">
            <p className="mb-2">{book.author}</p>
            <p className="mb-2">{book.subTitle}</p>
            <div className="flex flex-row items-center">
              <div className="flex flex-row">
                <CiClock2 size={18} />
                <p className="ml-1">{durationFormat(duration)}</p>
              </div>
              <div className="flex flex-row ml-1">
                <CiStar size={18} />
                <p className="ml-1">{book.averageRating}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
