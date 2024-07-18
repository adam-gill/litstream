"use server";

import { Book } from "@/types/types";
import axios from "axios";
import Link from "next/link";

interface BookList {
  books?: Book[];
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getSelectedBook = async () => {
  let book: Book[] | undefined = undefined;
  let error: Error | any | undefined = undefined;

  try {
    const response = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    book = response.data;
  } catch (err) {
    console.log(err);
    error = err;
  }

  return {
    props: {
      book,
      loading: false,
      error,
    },
  };
};

const Selected = async () => {
  const { props } = await getSelectedBook();

  if (props.loading) {
    return <h1>loading...</h1>;
  }
  if (props.error) {
    return <h1>Error fetching data. Please refresh</h1>;
  }
  if (props.book) {
    const book = props.book[0];

    return (
      <>
        <h1 className="font-bold text-2xl mb-4">Selected just for You</h1>
        <div className="mmd:w-full w-[calc(100% / 3)* 2] max-w-[700px] bg-[#fbefd6] rounded-md p-6 mb-6 flex items-start justify-between flex-row">
          <h1 className="hidden mmd:block w-2/5">{book.subTitle}</h1>
          <div className="hidden mmd:flex h-[128px] w-[1px] bg-gray-300 rounded-full mx-6"></div>
          <div className="w-full mmd:flex mmd:w-3/5">
            <div className="flex flex-row">
              <Link href={"/book/" + book.id}>
                <img src={book.imageLink} style={{ maxWidth: "140px" }} />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-bold">{book.title}</h1>
                <p>{book.author}</p>
                <div className="flex flex-row items-center pt-4">
                  <Link href={"/book/" + book.id}>
                    <button className="w-[40px] h-[40px] bg-black rounded-full relative flex flex-row">
                      <svg
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        stroke="currentColor"
                        fill="#ffffff"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                      </svg>
                    </button>
                  </Link>
                  <p className="pl-4">3 min 23 sec</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Selected;
