"use client";

import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

const Recommended = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRecommended = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
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
          <h1 className="font-bold text-2xl mb-4">Recommended for You</h1>
          <p className="mb-4">We think you'll like these</p>
          <BookCard book={books[0]} />
        </>
      )}
    </>
  );
};

export default Recommended
