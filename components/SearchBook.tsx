"use client"

import { Book } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CiClock2 } from "react-icons/ci";

interface Props {
  book: Book;
  notLast: boolean;
}


const SearchBook: React.FC<Props> = ({ book, notLast }) => {
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement>(null);

  const durationFormat = (duration: number | any) => {
    if (typeof duration !== "number") {
      return "00:00";
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

  const onMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

  return (
    <>
      <audio
        className="hidden"
        src={book.audioLink}
        ref={audioRef}
        onLoadedMetadata={onMetadata}
      />
      <Link href={"/book/" + book.id}>
      <div className="w-full flex items-center justify-start my-1 p-4">
        <Image src={book.imageLink} width={80} height={80} className="max-w-[80px] max-h-[80px] mr-2" alt="book image" />
        <div className="flex flex-col justify-start">
          <h1 className="font-bold">{book.title}</h1>
          <p className="text-sm">{book.author}</p>
          <div className="flex flex-row">
                <CiClock2 size={18} strokeWidth={0.5} />
                <p className="ml-1 text-sm">{durationFormat(duration)}</p>
              </div>
        </div>
      </div>
      {notLast && <div className="h-px w-[90%] mx-auto my-2 bg-gray-300"></div>}
      </Link>
    </>
  );
};

export default SearchBook;
