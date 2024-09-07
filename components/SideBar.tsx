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
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const { user, loadingAuth } = useAuth();
  const pathname: string = usePathname();
  const [classes, setClasses] = useState<string>("");

  const paths: any = {
    "/for-you": 0,
    "/my-library": 1,
    "/highlights": 2,
    "/search": 3,
    "/settings": 4,
    "/help": 5,
  };

  const lgClasses = "max-w-[225px] ";
  const mdClasses = "max-w-0 ";
  const mdOpenClasses = "max-w-[100%] ";

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user signed out");
    } catch (error) {
      console.log("sign out error: ", error);
    }
  };

  useEffect(() => {
    const resize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (!!window) {
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, []);

  useEffect(() => {
    if (!!screenWidth) {
      if (screenWidth >= 767) {
        dispatch(setSidebar({ ...sidebar, size: "lg" }));
      } else if (screenWidth < 767 && screenWidth >= 440) {
        dispatch(setSidebar({ ...sidebar, size: "md" }));
      } else if (screenWidth < 440) {
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
    console.log(selectedItem)
  }, [pathname]);

  useEffect(() => {
    const computeClasses = () => {
      if (!!screenWidth && screenWidth > 767) {
        setClasses(lgClasses);
      } else if (
        !!screenWidth &&
        screenWidth <= 767 &&
        screenWidth > 440 &&
        !sidebar.open
      ) {
        setClasses(mdClasses);
      } else if (
        !!screenWidth &&
        screenWidth <= 767 &&
        screenWidth >= 440 &&
        sidebar.open
      ) {
        setClasses(mdOpenClasses);
      } else if (!!screenWidth && screenWidth < 440 && !sidebar.open) {
        setClasses(mdClasses);
      } else if (!!screenWidth && screenWidth < 440 && sidebar.open) {
        setClasses(mdOpenClasses);
      }
    };
    computeClasses();
  }, [screenWidth, sidebar]);

  return (
    <>
      <div
        className={`
        flex fixed flex-row z-10 overflow-y-auto w-full
        transition-[max-width] duration-300 ease-in-out
        ${classes ? classes : "md:max-w-0 max-w-[225px]"}
        ${player ? "h-offset md:h-full" : "h-full"}`}
      >
        <div className="w-full h-full bg-white md:max-w-[70%]">
          <div className="flex flex-col justify-between h-full bg-[#87CEEB10]">
            <div className="flex flex-col w-full">
              <Link
                href={"/for-you"}
                onClick={() =>
                  dispatch(setSidebar({ ...sidebar, open: false }))
                }
                className="md:max-w-[70%] z-50 bg-white"
              >
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

              <SideBarItem
                id={2}
                icon={<LiaPenSolid size={28} />}
                title={"Highlights"}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                path={"/highlights"}
              />

              <SideBarItem
                id={3}
                icon={<LiaSearchSolid size={28} />}
                title={"Search"}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                path={"/search"}
              />

              {player && (
                <>
                  <div className="flex flex-row pl-4 items-end justify-around max-w-[200px]">
                    <div
                      onClick={() =>
                        dispatch(
                          setSidebar({
                            ...sidebar,
                            fontSize: "base",
                            open: false,
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
                            open: false,
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
                            open: false,
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
                            open: false,
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
              <SideBarItem
                id={4}
                icon={<LiaCogSolid size={28} />}
                title={"Settings"}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                path={"/settings"}
              />

              <SideBarItem
                id={5}
                icon={<LiaInfoCircleSolid size={28} />}
                title={"Help & Support"}
                selected={selectedItem}
                setSelectedItem={setSelectedItem}
                path={"/help"}
              />

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
