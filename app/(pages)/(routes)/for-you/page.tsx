import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Selected from "@/components/Selected";
import Recommended from "@/components/Recommended"

const ForYou = async () => {

  return (
    <>
      <SearchBar />
      <PageContainer>
        <Selected />
        <Recommended />
      </PageContainer>
    </>
  );
};

export default ForYou;
