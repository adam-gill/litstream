"use client";

import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

interface Props {
  title: string,
  subtitle: string,
  dataUrl: string,
}

const Recommended: React.FC<Props> = ({ title, subtitle, dataUrl }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRecommended = async () => {
      try {
        const res = await axios.get(dataUrl);
        setBooks(res.data);
        setLoading(false);
      } catch (error) {
        throw new Error("error fetching recommended books");
      }
      return books;
    };
    getRecommended();
  }, [books, loading]);

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <h1 className="font-bold text-2xl mb-4">{title}</h1>
          <p className="mb-4">{subtitle}</p>
          <div className="w-full flex flex-row flex-wrap justify-around">
          {books.slice(0, 5).map((book) => <BookCard key={book.id} book={book} />)}

          </div>
        </>
      )}
    </>
  );
};

export default Recommended
