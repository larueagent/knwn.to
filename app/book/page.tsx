import type { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "AI and Athletes: The Mental Performance Guide to athlete.md | knwn.to",
  description:
    "Learn how to build an athlete.md that makes AI genuinely useful — for training, competition prep, and mental performance. A practical guide for competitive athletes at every level. $29.",
  openGraph: {
    title: "AI and Athletes — knwn.to",
    description:
      "The practical guide to building your athlete.md and getting the most out of AI. Every athlete will use AI. The ones who win will be the ones it actually knows. $29, instant download.",
    url: "https://www.knwn.to/book",
    siteName: "knwn.to",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI and Athletes — knwn.to",
    description:
      "The practical guide to building your athlete.md and getting the most out of AI. Every athlete will use AI. The ones who win will be the ones it actually knows. $29, instant download.",
  },
};

export default function BookPage() {
  return <BookClient />;
}
