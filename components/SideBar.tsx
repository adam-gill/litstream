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

const fjalla_one = Fjalla_One({ subsets: ["latin"], weight: ["400"] });

const SideBar: React.FC<Props> = ({ open, player }) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  const dispatch = useDispatch();
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
    dispatch(setSidebar({ ...sidebar, tabSelected: paths[pathname] }));
  }, [pathname]);

  return (
    <>
      <div
        className={cn(
          "flex fixed flex-col w-[225px] bg-[#87CEEB10] overflow-y-auto",
          player ? "h-offset" : "h-full"
        )}
      >
        <Link href={"/"}>
          <h1
            className={fjalla_one.className}
            style={{
              fontSize: "32px",
              color: "#032b41",
              marginLeft: "16px",
              marginTop: "8px",
              paddingTop: "16x",
              paddingBottom: "16px",
            }}
          >
            LitStream
          </h1>
        </Link>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <Link
              href="/for-you"
              onClick={() =>
                dispatch(setSidebar({ ...sidebar, tabSelected: 0 }))
              }
            >
              <SideBarItem
                id={0}
                icon={<LiaHomeSolid size={28} />}
                title={"For You"}
                selected={selectedItem}
              />
            </Link>
            <Link
              href="/my-library"
              onClick={() =>
                dispatch(setSidebar({ ...sidebar, tabSelected: 1 }))
              }
            >
              <SideBarItem
                id={1}
                icon={<LiaBookmarkSolid size={28} />}
                title={"My Library"}
                selected={selectedItem}
              />
            </Link>
            <Link
              href="/highlights"
              onClick={() =>
                dispatch(setSidebar({ ...sidebar, tabSelected: 2 }))
              }
            >
              <SideBarItem
                id={2}
                icon={<LiaPenSolid size={28} />}
                title={"Highlights"}
                selected={selectedItem}
              />
            </Link>
            <Link
              href="/search"
              onClick={() =>
                dispatch(setSidebar({ ...sidebar, tabSelected: 3 }))
              }
            >
              <SideBarItem
                id={3}
                icon={<LiaSearchSolid size={28} />}
                title={"Search"}
                selected={selectedItem}
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
            <Link
              href="/settings"
              onClick={() =>
                dispatch(setSidebar({ ...sidebar, tabSelected: 4 }))
              }
            >
              <SideBarItem
                id={4}
                icon={<LiaCogSolid size={28} />}
                title={"Settings"}
                selected={selectedItem}
              />
            </Link>
            <Link
              href="/help"
              onClick={() =>
                dispatch(setSidebar({ ...sidebar, tabSelected: 5 }))
              }
            >
              <SideBarItem
                id={5}
                icon={<LiaInfoCircleSolid size={28} />}
                title={"Help & Support"}
                selected={selectedItem}
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
                />
              ) : (
                <SideBarItem
                  id={6}
                  icon={<MdLogout size={28} stroke="1px" />}
                  title={user ? "Logout" : "Login"}
                  selected={selectedItem}
                />
              )}
            </div>
          </div>
        </div>
        {/* {player && (
          <div className="flex fixed w-full bg-[#042330] h-[80px] bottom-0 py-10">
            <div></div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default SideBar;
