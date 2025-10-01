import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Refined LLC - Exceeding Expectations",
  description: "Firma líder en diseño arquitectónico y construcción, comprometida con la excelencia en cada proyecto.",
  keywords: "arquitectura, construcción, diseño, remodelación, Los Angeles, California",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
