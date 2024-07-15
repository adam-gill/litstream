import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import StoreProvider from "./StoreProvider";
import { cn } from "@/lib/utils";
import AuthModal from "@/components/AuthModal";
import { RootState } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LitStream",
  description: "Read and Listen to Your Favorite Texts",
  icons: "/favicon.ico",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider count={0} showModal={false}>
      <html lang="en">
        <body className={cn(inter.className)}>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}

// test
