import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eiscafé Dolce Vita – Handgemachtes Eis seit 1987",
  description:
    "Frische Zutaten, klassische Rezepte, täglich neu. Besuche uns in Friesenheim und entdecke unsere handgemachten Eissorten.",
  keywords: ["Eiscafé", "Eis", "Gelato", "Friesenheim", "Dolce Vita", "handgemacht"],
  openGraph: {
    title: "Eiscafé Dolce Vita – Handgemachtes Eis seit 1987",
    description: "Frische Zutaten. Klassische Rezepte. Jeden Tag neu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${dmSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-dm-sans)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
