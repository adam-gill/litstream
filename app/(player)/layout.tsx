import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col">
        <SideBar open={true} player={true} />
        <SearchBar />
      </div>

      <div>{children}</div>
    </>
  );
}
