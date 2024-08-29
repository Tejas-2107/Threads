import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="flex justify-between">
        <LeftSidebar />
        {children}
        <RightSidebar />
      </main>
    </div>
  );
}
