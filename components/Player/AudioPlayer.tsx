import { useRef, useState } from "react";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { Book } from "@/types/types";
import Image from "next/image";
import useAuth from "@/lib/useAuth";
import { db } from "@/firebase";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";

interface Props {
  book: Book;
}

const AudioPlayer: React.FC<Props> = ({ book }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  


  return (
    <div className="flex fixed w-full bg-[#042330] h-[80px] md:h-[180px] md:flex-col md:justify-around md:py-2 bottom-0 text-white items-center justify-center px-6">
      {book && (
        <div className="flex flex-row items-center justify-start gap-2 w-1/3 md:w-full md:justify-center pl-8">
          <Image src={book.imageLink} width={48} height={48} alt="book image" />
          <div>
            <h1 className="text-sm font-semibold">{book.title}</h1>
            <p className="text-sm font-light">{book.author}</p>
          </div>
        </div>
      )}
      <DisplayTrack
        currentTrack={book.audioLink}
        audioRef={audioRef}
        progressBarRef={progressBarRef}
        setDuration={setDuration}
        book={book}
      />
      <Controls
        audioRef={audioRef}
        progressBarRef={progressBarRef}
        duration={duration}
        setTimeProgress={setTimeProgress}
      />
      <ProgressBar
        audioRef={audioRef}
        progressBarRef={progressBarRef}
        timeProgress={timeProgress}
        duration={duration}
      />
    </div>
  );
};

export default AudioPlayer;
