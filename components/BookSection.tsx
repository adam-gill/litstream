"use client";

import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Skeleton from "./Skeleton";
import BookSkeleton from "./BookSkeleton";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle: string;
  dataUrl?: string;
  bookList?: Book[];
}

const Recommended: React.FC<Props> = ({
  title,
  subtitle,
  dataUrl,
  bookList,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  

  useEffect(() => {
    const getRecommended = async () => {
      if (!dataUrl) {
        if (bookList) setBooks(bookList);
        setLoading(false);
      } else {
        try {
          const res = await axios.get(dataUrl);
          setBooks(res.data);
          setLoading(false);
        } catch (error) {
          throw new Error("error fetching recommended books");
        }
      }

      return books;
    };
    getRecommended();
  }, [bookList, books, dataUrl]);

  return (
    <>
      {loading && dataUrl ? (
        <>
          <Skeleton className="w-[70%] h-[50px] rounded-lg mb-2" />
          <Skeleton className="w-[40%] h-[30px] rounded-lg" />
          <div className="w-full flex flex-row flex-wrap justify-around">
            {new Array(5).fill(0).map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          </div>
        </>
      ) : (
        <>
            <h1 className="font-bold text-2xl mb-4">{title}</h1>
            <p className="mb-4">{subtitle}</p>
            <div className="w-full flex flex-row flex-wrap gap-2">
              {dataUrl
                ? books
                    .slice(0, 5)
                    .map((book) => <BookCard key={book.id} book={book} />)
                : books.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
        </>
      )}
    </>
  );
};

export default Recommended;
