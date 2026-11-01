import type { Metadata } from "next";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PromoModal from "./components/PromoModal/PromoModal";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

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
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <PromoModal />
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
