"use client";

import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const BookPage = ({ params }: { params: { bookid: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book>();

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
      <SearchBar />
      <PageContainer>
        {loading ? (
          <Skeleton className="w-[200px] h-[20px] rounded-lg" />
        ) : (
          <div className="flex">
            <div className="flex flex-col">
              <h1 className="text-[32px] font-bold">{book?.title}</h1>
              <p>{book?.author}</p>
              <p>{book?.subTitle}</p>
              <div className="w-full bg-gray-300 h-px rounded-full my-4"></div>
              <div>
                
              </div>
            </div>
            <div className="flex">
              <img src={book?.imageLink} className="max-w-[300px]"/>
            </div>
          </div>
        )}
      </PageContainer>
    </>
  );
};

export default BookPage;
