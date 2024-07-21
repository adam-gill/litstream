// "use client"

import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Selected from "@/components/Selected";
import BookSection from "@/components/BookSection";

const ForYou = () => {
  return (
    <>
      <PageContainer>
        <div className="w-full flex flex-col">
          <Selected />
          <BookSection
            title="Recommended For You"
            subtitle="We think you'll like these"
            dataUrl="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
          />
          <BookSection
            title="Suggested Books"
            subtitle="Browse related books"
            dataUrl="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
          />
        </div>
      </PageContainer>
    </>
  );
};

export default ForYou;
