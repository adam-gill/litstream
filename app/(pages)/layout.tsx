import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar open={true} />
      <div className="ml-[225px]">{children}</div>
    </>
  );
}
