import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

type Props = {
  id: number,
  icon: ReactNode,
  title: string,
  selected: number
};

const SideBarItem = (props: Props) => {

  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);

  return (
    <>
      <button className={cn("hover:bg-[#0000000f] flex flex-row w-full items-center pl-4 h-14 text-xl border-l-[6px]", sidebar.tabSelected === props.id ? " border-green" : "border-[#00000000]")}>
        {props.icon}
        <h1 className="pl-2 text-lg">{props.title}</h1>
      </button>
    </>
  );
};

export default SideBarItem;
