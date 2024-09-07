"use client";

import { CiStar, CiClock2 } from "react-icons/ci";
import { Book } from "@/types/types";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import useAuth from "@/lib/useAuth";
import { getPremiumStatus } from "@/app/(premium)/(routes)/upgrade/getSubscriptionStatus";
import { app } from "@/firebase";

interface Props {
  book: Book;
  key: string;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const [duration, setDuration] = useState<number | null>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const dispatch = useDispatch();
  const { user, loadingAuth } = useAuth();
  const [isPremium, setIsPremium] = useState<boolean>(true);

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

  useEffect(() => {
    const getStatus = async () => {
      if (!!user) {
        try {
          const status = await getPremiumStatus(app, user?.uid);
          setIsPremium(status);
          // console.log(status);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getStatus();
  }, [user]);

  return (
    <>
      <Link
        href={"/book/" + book.id}
        className="flex hover:bg-[#87CEEB1f] relative"
        onClick={() => dispatch(setSidebar({ ...sidebar, tabSelected: -1 }))}
      >
        <div
          key={book.id}
          className="w-full max-w-[200px] sm:max-w-[250px] pt-8 px-3 pb-3"
        >
          {book.subscriptionRequired && !isPremium && (
            <div className="absolute bg-blue-600 rounded-xl top-0 right-0 text-xs px-[6px] py-[2px] text-white">
              Premium
            </div>
          )}
          <audio
            className="hidden"
            src={book.audioLink}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          ></audio>
          <div className="sm:flex sm:items-center sm:justify-center">
            <Image
              width={200}
              height={200}
              src={book.imageLink}
              alt="book image"
              priority
            />
          </div>
          <h1 className="font-bold text-md sm:text-lg my-2">{book.title}</h1>
          <div className="text-sm sm:text-base flex flex-col w-full">
            <p className="mb-2">{book.author}</p>
            <p className="mb-2">{book.subTitle}</p>
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <CiClock2 size={18} strokeWidth={0.5} />
                <p className="ml-1">{durationFormat(duration)}</p>
              </div>
              <div className="flex flex-row ml-1 items-center">
                <CiStar size={18} strokeWidth={0.5} />
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
