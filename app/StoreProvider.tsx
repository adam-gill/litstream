"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import sidebarSlice, { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { usePathname } from "next/navigation";

export default function StoreProvider({
  count,
  showModal,
  children,
}: {
  count: number;
  showModal: boolean;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setModal(false))
    storeRef.current.dispatch(
      setSidebar({
        open: false,
        size: "lg",
        player: false,
        tabSelected: 0,
        fontSize: "base",
      })
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
