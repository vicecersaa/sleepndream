import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Be_Vietnam_Pro,
  Lora,
} from "next/font/google";

import Navbar from "./components/Navbar/Navbar";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-be-vietnam",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Sleep N Dream | Better Sleep, Better Mornings",
  description:
    "Temukan pilihan kasur dan perlengkapan tidur untuk istirahat yang lebih nyaman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${beVietnam.variable} ${lora.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
