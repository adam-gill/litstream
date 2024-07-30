import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  id: number,
  icon: ReactNode,
  title: string,
  selected: number
};

const SideBarItem: React.FC<Props> = ({ id, icon, title, selected}) => {


  return (
    <>
      <button className={cn("hover:bg-[#0000000f] flex flex-row w-full items-center pl-4 h-14 text-xl border-l-[6px]", selected === id ? " border-green" : "border-[#00000000]")}>
        {icon}
        <h1 className="pl-2 text-lg">{title}</h1>
      </button>
    </>
  );
};

export default SideBarItem;
