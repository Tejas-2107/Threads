import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { fetchUserId } from "@/helper/fetchUserId";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = fetchUserId();
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <main className="flex flex-row justify-between">
          <LeftSidebar userId={id} />
          <section className="bg-black text-white-1 w-2/5 mx-auto min-h-screen ">
            {children}
          </section>
          <RightSidebar />
        </main>
      </body>
    </html>
  );
}
