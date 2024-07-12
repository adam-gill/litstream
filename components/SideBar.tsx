"use client";

import React, { useState } from "react";
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

import SideBarItem from "./SidBarItem";
import Link from "next/link";

type Props = {
  open: boolean;
};

const fjalla_one = Fjalla_One({ subsets: ["latin"], weight: ["400"] });

const SideBar = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const toggleColor = (id: number) => {
    setSelectedItem(id);
  };

  return (
    <>
      <div className="flex absolute flex-col w-[225px] bg-[#87CEEB10] h-full">
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
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <Link href="/for-you">
              <SideBarItem
                onClick={toggleColor}
                id={0}
                icon={<LiaHomeSolid size={28} />}
                title={"For You"}
                selected={selectedItem}
              />
            </Link>
            <Link href="/my-library">
              <SideBarItem
                onClick={toggleColor}
                id={1}
                icon={<LiaBookmarkSolid size={28} />}
                title={"My Library"}
                selected={selectedItem}
              />
            </Link>
            <Link href="/highlights">
              <SideBarItem
                onClick={toggleColor}
                id={2}
                icon={<LiaPenSolid size={28} />}
                title={"Highlights"}
                selected={selectedItem}
              />
            </Link>
            <Link href="/search">
              <SideBarItem
                onClick={toggleColor}
                id={3}
                icon={<LiaSearchSolid size={28} />}
                title={"Search"}
                selected={selectedItem}
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <Link href="/settings">
              <SideBarItem
                onClick={toggleColor}
                id={4}
                icon={<LiaCogSolid size={28} />}
                title={"Settings"}
                selected={selectedItem}
              />
            </Link>
            <Link href="/help">
              <SideBarItem
                onClick={toggleColor}
                id={5}
                icon={<LiaInfoCircleSolid size={28} />}
                title={"Help & Support"}
                selected={selectedItem}
              />
            </Link>
              <SideBarItem
                onClick={toggleColor}
                id={6}
                icon={<MdLogout size={28} stroke="1px" />}
                title={"Logout"}
                selected={selectedItem}
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
