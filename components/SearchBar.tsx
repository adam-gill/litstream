"use client";

import { Book } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch, IoIosClose, IoIosMenu } from "react-icons/io";
import SearchBook from "./SearchBook";
import { cn } from "@/lib/utils";
import Skeleton from "./Skeleton";
import { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const dispatch = useDispatch();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const getSearchResults = async (search: string) => {
    if (search === "") {
      setResult([]);
      return;
    }
    setLoading(true);
    await delay(300);

    try {
      const res = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
      );
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      console.log("error fetching search result: ", error);
    }
  };

  useEffect(() => {
    if (query === "") setResult([]);
  }, [query]);

  return (
    <>
      <div className="flex justify-center items-center w-full h-[84px] border-b-[1px] border-gray-200 bg-white z-50">
        <div className="w-full max-w-5xl px-8 md:px-0 ">
          <div className="w-full flex justify-end items-center">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                getSearchResults(e.target.value);

                if (query.length === 0) setResult([]);
              }}
              type="text"
              placeholder="Search for books"
              className="flex w-[340px] text-base bg-gray-100 border-2 border-gray-300 rounded-md p-2 focus:outline-none md:ml-8"
            />
            <button
              className="relative h-full"
              onClick={() => {
                if (!!query) {
                  setResult([]);
                  setQuery("");
                }
              }}
            >
              {!!query ? (
                <IoIosClose
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
                  size={36}
                />
              ) : (
                <IoIosSearch
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
                  size={28}
                />
              )}
            </button>
            
            <button 
            onClick={() => {
              console.log("clicked");
              dispatch(setSidebar({
                ...sidebar,
                open: !sidebar.open
              }))
            }}
            className="hidden md:block md:px-4 z-[500]">
              <IoIosMenu size={28} />
            </button>

            <div
              className={`w-full max-w-[400px] md:w-[80vw] min-h-12 max-h-[500px] overflow-auto bg-white shadow-2xl shadow-gray-700 absolute top-[100px] md:left-1/2 md:-translate-x-1/2 rounded-lg py-4 px-2 z-50 ${
                query === "" ? "hidden" : ""
              }`}
            >
              <div className="flex w-full flex-col">
                {query.length !== 0 && !loading ? (
                  <>
                    {result.length !== 0 ? (
                      result.map((book, index) => (
                        <SearchBook
                          query={query}
                          setQuery={setQuery}
                          setResult={setResult}
                          key={book.id}
                          book={book}
                          notLast={index !== result.length - 1}
                        />
                      ))
                    ) : (
                      <div className="fcc font-bold">No books Found for &quot;{query}&quot;</div>
                    )}
                  </>
                ) : (
                  <>
                    <Skeleton className="w-full h-[90px] rounded-lg mb-2" />
                    <Skeleton className="w-full h-[90px] rounded-lg mb-2" />
                    <Skeleton className="w-full h-[90px] rounded-lg" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
