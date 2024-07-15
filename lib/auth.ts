// services/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { signOut } from "../firebase"

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential)
    return userCredential.user
  } catch (error) {
    console.log(error);
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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider)
    console.log(userCredential)
  } catch (error) {
    return error
  }
}

export const userSignOut = async () => {
  try {
    const userCredential = await signOut(auth)
    return userCredential
  } catch (error) {
    return error
  }
}
