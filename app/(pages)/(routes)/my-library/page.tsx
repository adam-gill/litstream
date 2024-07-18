"use client";

import BookSection from "@/components/BookSection";
import BookSkeleton from "@/components/BookSkeleton";
import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import { auth, db } from "@/firebase";
import { setLoading, setUser } from "@/lib/features/auth/authSlice";
import useAuth from "@/lib/useAuth";
import { Book } from "@/types/types";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { update } from "firebase/database";
import {
  addDoc,
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
import { useDispatch } from "react-redux";

const MyLibrary = () => {
  const { user, loadingAuth } = useAuth();
  // const [email, setEmail] = useState<string>()
  // const [bookId, setBookId] = useState<string>()
  const email = "adamgill20529@gmail.com";
  const bookIdHC = "293823982392399";
  const dispatch = useDispatch();
  const [books, setBooks] = useState<Book[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      dispatch(setUser(user));
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "saved", user.email!));
          const data: Book[] = docSnap.data()?.savedBooks;
          console.log(data);
          setBookmarks(data);
          setLoading(false);
        } catch (error) {
          console.log("bookmark fetch error", error);
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
            <BookSection
              title="Saved Books"
              subtitle={bookmarks.length + " items"}
              bookList={bookmarks}
            />
            <BookSection title="Finished Books" subtitle="0 items" />
          </>
        )}
      </PageContainer>
    </>
  );
};

export default MyLibrary;
