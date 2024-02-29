import Navbars from "@/components/Navbars";

import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Statify",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" data-theme="statifydark">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="">
            <Navbars />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
