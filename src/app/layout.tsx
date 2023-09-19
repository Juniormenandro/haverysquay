
import "./globals.css";
import 'react-modern-drawer/dist/index.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrystalValet.ie",
  description: "Generated by create CrystalValet.ie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
    className=" bg-cyan-100" 
     lang="en">
      <body className={inter.className}>
      
        {children}
      </body>
    </html>
  );
}

