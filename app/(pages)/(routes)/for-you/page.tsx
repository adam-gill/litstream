// "use client"


import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Selected from "@/components/Selected";
import BookSection from "@/components/BookSection"
import { useEffect } from "react";
import { setSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

const ForYou = () => {
  // const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(setSidebar({ ...sidebar, tabSelected: 0 }));
  // }, [dispatch])


  return (
    <>
      <SearchBar />
      <PageContainer>
        <Selected />
        <BookSection title="Recommended For You" subtitle="We think you'll like these" dataUrl="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"/>
        <BookSection title="Suggested Books" subtitle="Browse related books" dataUrl="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"/>
      </PageContainer>
    </>
  );
};

export default ForYou;
