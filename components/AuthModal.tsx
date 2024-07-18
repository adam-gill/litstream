"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { setModal, toggleModal } from "@/lib/features/modal/modalSlice";
import { BsX } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { setUser } from "@/lib/features/auth/authSlice";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/firebase";

interface Props {
  showModal: boolean;
}

const AuthModal: React.FC<Props> = ({ showModal }) => {
  const modal = useSelector((state: RootState) => state.showModal.showModal);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleGuestLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "guest123@gmail.com",
        "guest123"
      );

      dispatch(toggleModal());
      if (pathname === "/") {
        router.push("/for-you");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailPasswordLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(toggleModal());
      if (pathname === "/") {
        router.push("/for-you");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      dispatch(toggleModal());
      if (pathname === "/") {
        router.push("/for-you");
      }
    } catch (error) {
      return error;
    }
  };

  const handleEmailPasswordSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/for-you");
    } catch (error) {
      console.log("sign up error", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div
      className={
        showModal ? "fixed w-full h-full bg-[#000000b0] z-[999]" : "hidden"
      }
    >
      <div className="relative w-full max-w-[400px] h-fit max-h-[500px] rounded-lg bg-white bg-back top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="px-[48px] gap-y-2">
          <h1 className="flex items-center justify-center text-2xl font-bold py-4">
            {isLogin ? "Login to LitStream" : "Sign Up for LitStream"}
          </h1>
          <div
            className={
              isLogin
                ? "w-full relative rounded-lg flex items-center justify-center bg-blue-600 text-white h-[40px] cursor-pointer hover:bg-blue-800"
                : "hidden"
            }
          >
            <MdAccountCircle className="flex absolute left-1" size={32} />
            <button onClick={() => handleGuestLogin()} className="text-xl">
              Continue as a Guest
            </button>
          </div>
          <div
            className={
              isLogin
                ? "flex w-full items-center justify-center py-2"
                : "hidden"
            }
          >
            <div className=" w-full bg-gray-300 h-[2px]"></div>
            <div className="text-center px-6">or</div>
            <div className="w-full bg-gray-300 h-[2px]"></div>
          </div>
          <div className="w-full relative rounded-lg flex items-center justify-center bg-blue-500 text-white h-[40px] cursor-pointer hover:bg-blue-800">
            <div className="flex absolute items-center justify-center bg-white rounded-full w-[32px] h-[32px] left-1 p-1">
              <Image
                width={28}
                height={28}
                src={"/assets/google.png"}
                alt="google"
              />
            </div>
            <h1 className="text-xl" onClick={() => handleGoogleSignIn()}>
              {isLogin ? "Login with Google" : "Sign Up with Google"}
            </h1>
          </div>
          <div className="flex w-full items-center justify-center py-2">
            <div className=" w-full bg-gray-300 h-[2px]"></div>
            <div className="text-center px-6">or</div>
            <div className="w-full bg-gray-300 h-[2px]"></div>
          </div>
          <form>
            <div className="flex flex-col gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full border-2 border-gray-400 rounded-lg h-[40px] px-2 focus:outline-[#2bd97c] mb-2"
                placeholder="Username"
              ></input>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full border-2 border-gray-400 rounded-lg h-[40px] px-2 focus:outline-[#2bd97c] relative"
                  placeholder="Password"
                ></input>
                {showPassword ? (
                  <IoMdEye
                    className="text-gray-700 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 hover:text-green"
                    onClick={() => setShowPassword(!showPassword)}
                    size={18}
                  />
                ) : (
                  <IoMdEyeOff
                    className="text-gray-700 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 hover:text-green"
                    onClick={() => setShowPassword(!showPassword)}
                    size={18}
                  />
                )}
              </div>
            </div>
            <button
              onClick={
                isLogin
                  ? () => handleEmailPasswordLogin()
                  : () => handleEmailPasswordSignUp()
              }
              className="w-full relative rounded-lg flex text-xl items-center justify-center bg-[#2bd97c] text-black h-[40px] cursor-pointer hover:brightness-90 my-4"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="w-full flex items-center justify-center py-2 cursor-pointer hover:text-blue-500">
          Forgot Password?
        </div>
        <div
          onClick={() => setIsLogin(!isLogin)}
          className="w-full flex items-center justify-center pt-2 pb-4 cursor-pointer hover:text-blue-500"
        >
          {isLogin ? "Don't have an account?" : "Already Registered?"}
        </div>

        <BsX
          className="absolute right-1 top-1 hover:text-[#2db97c]"
          size={36}
          onClick={() => {
            dispatch(toggleModal());
          }}
        />
      </div>
    </div>
  );
};

export default AuthModal;
