import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar open={true} player={true} />
      <div className="ml-[225px]">
        <SearchBar />
      </div>
      {children}
    </>
  );
}
