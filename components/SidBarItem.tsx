import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  setSelectedItem: (value: number) => void;
  id: number;
  icon: ReactNode;
  title: string;
  selected: number;
  path: string;
};

const SideBarItem: React.FC<Props> = ({
  id,
  icon,
  title,
  selected,
  setSelectedItem,
  path,
}) => {
  const router = useRouter();


  const handleClick = () => {
    if (path !== "none") {
      router.push(path);
    }
    if (id !== 6) {
      setSelectedItem(id);
    }
  };

  return (
    <>
      <div className={`${id === selected ? "border-[#2bd97c]" : "border-transparent"} border-l-[6px]`}>
        <button
          onClick={() => handleClick()}
          className={`flex flex-row w-full items-center pl-4 h-14 text-xl hover:bg-[#0000000f]`}
        >
          {icon}
          <h1 className="pl-2 text-lg">{title}</h1>
        </button>
      </div>
    </>
  );
};

export default SideBarItem;
