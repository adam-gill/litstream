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
      <SideBar open={true} player={false} />
      <div className="ml-[225px] md:ml-0">
        <SearchBar />
        {children}
      </div>
    </>
  );
}
