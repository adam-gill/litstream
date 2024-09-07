"use client";

import React, { useEffect, useState } from "react";
import { Fjalla_One } from "next/font/google";
import {
  LiaBookmarkSolid,
  LiaCogSolid,
  LiaHomeSolid,
  LiaInfoCircleSolid,
  LiaPenSolid,
  LiaSearchSolid,
} from "react-icons/lia";
import { MdLogout } from "react-icons/md";
import { IoTextOutline } from "react-icons/io5";

import SideBarItem from "./SidBarItem";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebase";
import { toggleModal } from "@/lib/features/modal/modalSlice";
import useAuth from "@/lib/useAuth";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  player: boolean;
};

type Screens = {
  sm: 420;
  md: 767;
};

const fjalla_one = Fjalla_One({ subsets: ["latin"], weight: ["400"] });

const SideBar: React.FC<Props> = ({ open, player }) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState<number>();
  const { user, loadingAuth } = useAuth();
  const pathname: string = usePathname();

  const paths: any = {
    "/for-you": 0,
    "/my-library": 1,
    "/highlights": 2,
    "/search": 3,
    "/settings": 4,
    "/help": 5,
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user signed out");
    } catch (error) {
      console.log("sign out error: ", error);
    }
  };

  useEffect(() => {
    if (!!window) {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!!screenWidth) {
      if (screenWidth >= 767) {
        dispatch(setSidebar({ ...sidebar, size: "lg" }));
      } else if (screenWidth < 767 && screenWidth >= 420) {
        dispatch(setSidebar({ ...sidebar, size: "md" }));
      } else if (screenWidth < 420) {
        dispatch(setSidebar({ ...sidebar, size: "sm" }));
      }
    }

    if (!!screenWidth && screenWidth < 767) {
      dispatch(
        setSidebar({
          ...sidebar,
          open: false,
        })
      );
    } else {
      dispatch(
        setSidebar({
          ...sidebar,
          open: true,
        })
      );
    }
  }, [screenWidth]);

  useEffect(() => {
    setSelectedItem(paths[pathname]);
  }, []);

  return (
    <>
      <div
        className={`${
          sidebar.open
            ? "block transition-all duration-300 ease-in-out max-w-[225px] md:max-w-[70%]"
            : "hidden max-w-0"
        } flex fixed  flex-row z-10 overflow-y-auto max-w-[225px] w-full md:max-w-[100%] ${
          player ? "h-offset" : "h-full"
        }`}
      >
        <div className="w-full h-full bg-white md:max-w-[70%]">
          <div
            onClick={() => dispatch(setSidebar({ ...sidebar, open: false }))}
            className="flex flex-col justify-between h-full bg-[#87CEEB10]"
          >
            <div className="flex flex-col w-full">
              <Link href={"/for-you"} className="md:max-w-[70%] z-50 bg-white">
                <h1
                  className={cn(fjalla_one.className)}
                  style={{
                    fontSize: "32px",
                    color: "#032b41",
                    paddingLeft: "16px",
                    marginTop: "8px",
                    paddingTop: "16x",
                    paddingBottom: "16px",
                    backgroundColor: "#87CEEB10",
                    zIndex: "50",
                  }}
                >
                  LitStream
                </h1>
              </Link>
              <SideBarItem
                id={0}
                icon={<LiaHomeSolid size={28} />}
                title={"For You"}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                path={"/for-you"}
              />
              <SideBarItem
                id={1}
                icon={<LiaBookmarkSolid size={28} />}
                title={"My Library"}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                path={"/my-library"}
              />
              <Link href="/highlights" onClick={() => setSelectedItem(2)}>
                <SideBarItem
                  id={2}
                  icon={<LiaPenSolid size={28} />}
                  title={"Highlights"}
                  selected={selectedItem}
                  setSelectedItem={setSelectedItem}
                  path={"/highlights"}
                />
              </Link>
              <Link href="/search" onClick={() => setSelectedItem(3)}>
                <SideBarItem
                  id={3}
                  icon={<LiaSearchSolid size={28} />}
                  title={"Search"}
                  selected={selectedItem}
                  setSelectedItem={setSelectedItem}
                  path={"/search"}
                />
              </Link>

              {player && (
                <>
                  <div className="flex flex-row pl-4 items-end justify-around max-w-[200px]">
                    <div
                      onClick={() =>
                        dispatch(
                          setSidebar({
                            ...sidebar,
                            fontSize: "base",
                          })
                        )
                      }
                      className={cn(
                        "border-b-2 cursor-pointer",
                        sidebar.fontSize === "base"
                          ? "border-green"
                          : "border-transparent"
                      )}
                    >
                      <IoTextOutline size={20} />
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          setSidebar({
                            ...sidebar,
                            fontSize: "lg",
                          })
                        )
                      }
                      className={cn(
                        "border-b-2 cursor-pointer",
                        sidebar.fontSize === "lg"
                          ? "border-green"
                          : "border-transparent"
                      )}
                    >
                      <IoTextOutline size={24} />
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          setSidebar({
                            ...sidebar,
                            fontSize: "xl",
                          })
                        )
                      }
                      className={cn(
                        "border-b-2 cursor-pointer",
                        sidebar.fontSize === "xl"
                          ? "border-green"
                          : "border-transparent"
                      )}
                    >
                      <IoTextOutline size={28} />
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          setSidebar({
                            ...sidebar,
                            fontSize: "2xl",
                          })
                        )
                      }
                      className={cn(
                        "border-b-2 cursor-pointer",
                        sidebar.fontSize === "2xl"
                          ? "border-green"
                          : "border-transparent"
                      )}
                    >
                      <IoTextOutline size={32} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col">
              <Link href="/settings" onClick={() => setSelectedItem(4)}>
                <SideBarItem
                  id={4}
                  icon={<LiaCogSolid size={28} />}
                  title={"Settings"}
                  selected={selectedItem}
                  setSelectedItem={setSelectedItem}
                  path={"/settings"}
                />
              </Link>
              <Link href="/help" onClick={() => setSelectedItem(5)}>
                <SideBarItem
                  id={5}
                  icon={<LiaInfoCircleSolid size={28} />}
                  title={"Help & Support"}
                  selected={selectedItem}
                  setSelectedItem={setSelectedItem}
                  path={"/help"}
                />
              </Link>
              <div
                className="cursor-pointer"
                onClick={() => {
                  user ? logout() : dispatch(toggleModal());
                }}
              >
                {loadingAuth ? (
                  <SideBarItem
                    id={6}
                    icon={<MdLogout size={28} stroke="1px" />}
                    title={"Loading ..."}
                    selected={selectedItem}
                    setSelectedItem={setSelectedItem}
                    path={"none"}
                  />
                ) : (
                  <SideBarItem
                    id={6}
                    icon={<MdLogout size={28} stroke="1px" />}
                    title={user ? "Logout" : "Login"}
                    selected={selectedItem}
                    setSelectedItem={setSelectedItem}
                    path={"none"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => dispatch(setSidebar({ ...sidebar, open: false }))}
          className="hidden md:block w-full h-full max-w-[30%] bg-transparent"
        ></div>
      </div>
    </>
  );
};

export default SideBar;
