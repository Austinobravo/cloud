import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";

const poppins = Poppins({subsets: ['latin'],weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"]  });

export const metadata: Metadata = {
  title: "Cloud - A Cloudinary uploader",
  description: "Generated to assist in cloudiinary uploads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}><main className=" bg-slate-200">{children}</main></body>
    </html>
  );
}
