"use client";

import BookSection from "@/components/BookSection";
import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
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
  const dispatch = useDispatch()
  const [books, setBooks] = useState<Book[]>()
  const [loading, setLoading] = useState<boolean>()

  const getBook = async (bookId: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
      );
      return res.data
    } catch (error) {
      console.log(`error occurred fetching book ${bookId} data`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUser(user))
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "saved", user.email!))
          const data: string[]  = docSnap.data()?.bookIds
          const bookPromises = data.map((bookId) => getBook(bookId))
          const bookData = await Promise.all(bookPromises)
          setBooks(bookData)
        } catch (error) {
          console.log("bookmark fetch error", error)
        }
      }

    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <SearchBar />
      <PageContainer>
        <h1>User: {user?.email}</h1>
        <button
          className="bg-green rounded-full p-2 mr-4"
        >
          Add book: 034234
        </button>
        <button className="bg-green rounded-full p-2">
          Remove book: 034234
        </button>

        <BookSection title="Saved Books" subtitle={books?.length === 1 ? "1 item" : `${books?.length} items`} />
        <BookSection title="Finished Books" subtitle="0 items" />
      </PageContainer>
    </>
  );
};

export default MyLibrary;
