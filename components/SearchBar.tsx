import { IoIosSearch } from "react-icons/io";


type Props = {};

const SearchBar = (props: Props) => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-[84px] border-b-[1px] border-gray-200">
        <div className="w-full max-w-5xl mx-auto px-8">
          <div className="flex justify-end items-center relative">
            <input type="text" placeholder="Search for books" className="w-[340px] text-sm bg-gray-100 border-2 border-gray-300 rounded-md p-2 focus:outline-none" />
            <button className="relative h-full">
              <IoIosSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
