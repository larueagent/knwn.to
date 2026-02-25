import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "knwn.to — Your athletic identity, on record.",
  description:
    "knwn.to is an AI-powered athlete identity platform. Go beyond highlight reels — build a verifiable record of your performance, character, and growth that speaks for you.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "knwn.to — Your athletic identity, on record.",
    description:
      "Go beyond highlight reels. knwn.to builds a verifiable record of your performance, character, and growth — powered by AI, owned by you.",
    url: "https://knwn.to",
    siteName: "knwn.to",
    images: [
      {
        url: "/OG Image.png",
        width: 1200,
        height: 630,
        alt: "knwn.to — Your athletic identity, on record.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "knwn.to — Your athletic identity, on record.",
    description:
      "Go beyond highlight reels. knwn.to builds a verifiable record of your performance, character, and growth — powered by AI, owned by you.",
    images: ["/OG Image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
