import { cn } from "@/lib/utils";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface accordion {
  title: string;
  description: string;
}

const Accordion: React.FC<accordion> = ({ title, description }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className="flex px-8 w-full flex-col">
        <div className="flex flex-col justify-center items-start w-full cursor-pointer">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="py-6 text-2xl font-semibold text-blue">{title}</h1>
            <BiChevronDown
              size={36}
              color="#032b41"
              className={cn(
                "accordion-arrow",
                open ? "accordion-arrow-flip" : ""
              )}
            />
          </div>
          <div
            className={`overflow-hidden transition duration-300 ease-in-out ${
              open ? "h-auto pb-4" : "h-0 pb-0"
            }`}
          >
            <p className={`transition duration-300 ease-in-out`}>{description}</p>
          </div>
        </div>
        <div className="bg-gray-300 h-px w-full"></div>
      </div>
    </>
  );
};

export default Accordion;