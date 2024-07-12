import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  id: number,
  icon: ReactNode,
  title: string,
  selected: number
  onClick: (id: number) => void;
};

const SideBarItem = (props: Props) => {



  return (
    <>
      <button onClick={() => props.onClick(props.id)} className={cn("hover:bg-[#0000000f] flex flex-row w-full items-center pl-4 h-14 text-xl border-l-[6px]", props.selected === props.id ? " border-green" : "border-[#00000000]")}>
        {props.icon}
        <h1 className="pl-2 text-lg">{props.title}</h1>
      </button>
    </>
  );
};

export default SideBarItem;
