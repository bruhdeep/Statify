import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";

import Navbar from "@/components/Navbar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Statify",
  description: "hehe",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" data-theme="statifylight">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <div className="px-[3%]">
            <Navbar />
            <Toaster position="bottom-center" />
            <div className="">{children}</div>
            <SpeedInsights />
            <Analytics />
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
