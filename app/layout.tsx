import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shaz Mohamed — Official Media Kit & Creator Terminal | CallMeShazzam",
  description:
    "Official media kit for Shaz Mohamed (@callmeshazzam). TEDx Speaker. 4.6M+ combined audience across India & UAE. Tech reviews, comedy, CHAi with Tech. Open for brand collaborations.",
  keywords: [
    "CallMeShazzam",
    "Shaz Mohamed",
    "tech creator",
    "media kit",
    "brand collaboration",
    "Malayalam tech",
    "Dubai creator",
    "TEDx speaker",
    "YouTube tech",
    "Instagram reels",
  ],
  openGraph: {
    title: "Shaz Mohamed — Official Media Kit",
    description:
      "4.6M+ audience. Bilingual tech creator bridging India & UAE. Open for brand partnerships.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <head>
        {/* Material Symbols for icons */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
