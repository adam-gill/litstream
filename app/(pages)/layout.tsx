"use client";

import AuthModal from "@/components/AuthModal";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modal = useSelector((state: RootState) => state.showModal.showModal);

  return (
    <>
      <AuthModal showModal={modal} />
      <div className="flex flex-col">
        <SideBar open={true} player={false} />
        <SearchBar />
      </div>
      <div className="ml-[225px] mt-[84px]">{children}</div>
    </>
  );
}
