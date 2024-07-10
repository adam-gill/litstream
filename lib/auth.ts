// services/auth.ts
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("auth/email-already-in-use")) {
        throw new Error("Email already in use.");
      } else if (error.message.includes("auth/invalid-email")) {
        throw new Error("Invalid email.");
      } else if (error.message.includes("auth/weak-password")) {
        throw new Error("Password is too weak");
      } else {
        throw error;
      }
    }
  }
};
