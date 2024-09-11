'use client'
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-dark-1 ${inter.className}`}>
        {<QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>}
      </body>
    </html>
  );
}
