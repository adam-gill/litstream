"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { usePathname } from "next/navigation";
import { setModal } from "@/lib/features/modal/modalSlice";


const tabs: any = {
  "/for-you": 0,
  "/my-library": 1,
  "/highlights": 2,
  "/search": 3,
  "/settings": 4,
  "/help": 5,
}

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
  const page = usePathname()

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setModal(false))
    storeRef.current.dispatch(
      setSidebar({
        open: true,
        player: false,
        tabSelected: tabs[page] ? tabs[page] : -1,
        fontSize: "base",
      })
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
