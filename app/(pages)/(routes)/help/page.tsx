import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Help = () => {
  return (
    <>
      <PageContainer>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Help & Support</h1>
          </div>
          <div className="w-full bg-gray-300 h-px rounded-full my-4"></div>

          <div className="mt-8">
            <h1 className="text-xl font-bold">Contact Adam:</h1>
            <div className="flex mt-2 gap-2">
              <Link href={"https://www.linkedin.com/in/ogag/"}>
                <FaLinkedin size={24} />
              </Link>
              <Link href={"https://github.com/adam-gill"}>
                <FaGithub size={24} />
              </Link>
              <Link href={"mailto:adam.douglas.gill@gmail.com"}>
                <IoMdMail size={24} />
              </Link>
            </div>
          </div>
      </PageContainer>
    </>
  );
};

export default Help;
