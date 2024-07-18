"use client";

import BookSection from "@/components/BookSection";
import BookSkeleton from "@/components/BookSkeleton";
import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import { auth, db } from "@/firebase";
import { setLoading, setUser } from "@/lib/features/auth/authSlice";
import { toggleModal } from "@/lib/features/modal/modalSlice";
import { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { RootState } from "@/lib/store";
import useAuth from "@/lib/useAuth";
import { Book } from "@/types/types";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { update } from "firebase/database";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const MyLibrary = () => {
  const { user, loadingAuth } = useAuth();
  // const [email, setEmail] = useState<string>()
  // const [bookId, setBookId] = useState<string>()
  const email = "adamgill20529@gmail.com";
  const bookIdHC = "293823982392399";
  const dispatch = useDispatch();
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const [books, setBooks] = useState<Book[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  useEffect(() => {
    dispatch(setSidebar({ ...sidebar, tabSelected: 1 }));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      dispatch(setUser(user));
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "saved", user.email!));
          const data: Book[] = docSnap.data()?.savedBooks;
          setBookmarks(data);
          setLoading(false);
        } catch (error) {
          console.log("bookmark fetch error", error);
          setLoading(false);
        }
      } else {
        setLoading(false)
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <PageContainer>
        {loading ? (
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
            {user ? (
              <>
                <BookSection
                  title="Saved Books"
                  subtitle={bookmarks ? bookmarks.length + " items" : "0 items"}
                  bookList={bookmarks}
                />
                <BookSection title="Finished Books" subtitle="0 items" />
              </>
            ) : (
              <>
                <div className="flex items-center justify-center flex-col">
                  <Image
                    src="/assets/undraw_login.svg"
                    className="w-[300px] h-[290px]"
                    width={1000} 
                    height={1000}
                    alt="sign in image"
                    priority
                  />
                  <h1 className="text-2xl font-bold mt-4">
                    Sign in to to view your library
                  </h1>
                  <button
                    onClick={() => dispatch(toggleModal())}
                    className="bg-green rounded-lg flex text-xl items-center px-10 py-4 justify-center text-black h-[40px] cursor-pointer my-4 btn-hover"
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </PageContainer>
    </>
  );
};

export default MyLibrary;
