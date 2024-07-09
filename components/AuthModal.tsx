"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { toggleModal } from "@/lib/features/modal/modalSlice";
import { BsX } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

const AuthModal = () => {
  const modal = useSelector((state: RootState) => state.showModal.showModal);
  const dispatch = useDispatch();

  console.log(modal);
  return (
    <div
      className={
        modal ? "fixed flex w-full h-full bg-[#0000004c] z-[100]" : "hidden"
      }
    >
      <div className="relative w-full max-w-[400px] h-fit max-h-[500px] rounded-lg bg-white bg-back top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="px-[48px] gap-y-2 ">
          <h1 className="flex items-center justify-center text-2xl font-bold my-4">
            Login to LitStream
          </h1>
          <div className="w-full relative rounded-lg flex items-center justify-center bg-blue-600 text-white h-[40px] cursor-pointer hover:bg-blue-800">
            <MdAccountCircle className="flex absolute left-1" size={32} />
            <h1 className="text-xl">Continue as a Guest</h1>
          </div>
          <div className="flex w-full items-center justify-center py-2">
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
            <h1 className="text-xl">Login with Google</h1>
          </div>
          <div className="flex w-full items-center justify-center py-2">
            <div className=" w-full bg-gray-300 h-[2px]"></div>
            <div className="text-center px-6">or</div>
            <div className="w-full bg-gray-300 h-[2px]"></div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="w-full border-2 border-gray-400 rounded-lg h-[40px] px-2 focus:outline-[#2bd97c]"
              placeholder="Username"
            ></input>
            <input
              type="password"
              className="w-full border-2 border-gray-400 rounded-lg h-[40px] px-2 focus:outline-[#2bd97c]"
              placeholder="Password"
            ></input>
          </div>
          <div className="w-full relative rounded-lg flex items-center justify-center bg-[#2bd97c] text-black h-[40px] cursor-pointer hover:brightness-90 my-4">
            <h1 className="text-xl">Login</h1>
          </div>
        </div>
        <div className="w-full flex items-center justify-center py-2 cursor-pointer hover:text-blue-500">
          Forgot Password?
        </div>
        <div className="w-full flex items-center justify-center pt-2 pb-4 cursor-pointer hover:text-blue-500">
          Don&#39;t have an account?
        </div>

        <BsX
          className="absolute right-1 top-1 hover:text-[#2db97c]"
          size={36}
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            dispatch(toggleModal());
          }}
        />
      </div>
    </div>
  );
};

export default AuthModal;
