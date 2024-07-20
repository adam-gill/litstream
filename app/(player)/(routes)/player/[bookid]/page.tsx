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
      <div className="ml-[225px]">
        <SearchBar />
        <PageContainer>
          {loading ? (
            <h1>loading...</h1>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{book?.title}</h1>
              <div className="w-full bg-gray-300 h-px rounded-full my-4 text-"></div>
              <p
                className={cn(
                  "whitespace-pre-line  mb-[80px]",
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
        <div className="flex fixed w-full bg-[#042330] h-[80px] bottom-0 py-10 text-white items-center justify-center">
          Loading...
        </div>
      ) : (
        <>{book && <AudioPlayer book={book} />}</>
      )}
    </>
  );
};

export default PlayerPage;

// edit
