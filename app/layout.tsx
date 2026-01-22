import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OSProvider } from "@/context/OSContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jatin's Portfolio",
  description: "MacOS Inspired Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OSProvider>
          {children}
        </OSProvider>
      </body>
    </html>
  );
}
