import type { Metadata } from "next";
import SupportPage from "../components/SupportPage/SupportPage";

export const metadata: Metadata = { title: "FAQ | Sleep & Dream" };

export default function FaqPage() {
  return <SupportPage faq />;
}
