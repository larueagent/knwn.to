import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "knwn.to - Your story, all of it",
  description: "The athlete identity platform. Not just your highlights — your readiness, your composure, your growth.",
  keywords: ["athlete", "sports", "performance", "identity", "data", "analytics"],
  authors: [{ name: "knwn.to" }],
  openGraph: {
    title: "knwn.to - Your story, all of it",
    description: "The athlete identity platform. Not just your highlights — your readiness, your composure, your growth.",
    url: "https://knwn.to",
    siteName: "knwn.to",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "knwn.to - Your story, all of it",
    description: "The athlete identity platform. Not just your highlights — your readiness, your composure, your growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
