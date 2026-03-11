"use client";

import { useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { usePostHog } from "posthog-js/react";

export default function BookSuccessPage() {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture("purchase_completed", {
      product: "book-ai-and-athletes",
      product_name: "AI and Athletes",
      price: 29,
      currency: "usd",
    });
  }, [posthog]);

  return (
    <main className="min-h-screen bg-parchment flex flex-col">
      <Nav />

      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 flex-1">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          Purchase confirmed
        </p>
        <h1 className="font-syne font-bold text-4xl sm:text-5xl text-[#1A1714] mb-4 leading-tight">
          You&apos;re ready.
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-md mb-10">
          <em>AI and Athletes</em> is yours. Download it below — and check your inbox for a copy too.
        </p>

        {/* Download button */}
        <a
          href="/downloads/ai-and-athletes.pdf"
          download="AI-and-Athletes.pdf"
          className="px-8 py-4 bg-[#B8821A] text-white font-syne font-semibold text-base rounded hover:bg-[#a07115] transition-colors mb-4"
        >
          Download the Book
        </a>

        <p className="font-inter text-xs text-[#8A8178] mb-16">
          A copy has also been sent to your email.
        </p>

        {/* What next */}
        <div className="max-w-md w-full bg-white border border-[#E0D9CE] rounded px-8 py-8 text-left">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Your next step
          </p>
          <h2 className="font-syne font-semibold text-xl text-[#1A1714] mb-3">
            Build your First Read
          </h2>
          <p className="font-inter text-sm text-[#4A443E] leading-relaxed mb-6">
            Ten questions. LaRue generates your athlete portrait — the context file that makes every AI conversation specific to you. Takes about 15 minutes.
          </p>
          <Link
            href="/first-read"
            className="inline-block px-6 py-3 border border-[#B8821A] text-[#B8821A] font-syne font-semibold text-sm rounded hover:bg-[#B8821A] hover:text-white transition-colors"
          >
            Start First Read &rarr;
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <p className="font-inter text-xs text-[#8A8178]">
          &copy; {new Date().getFullYear()} Mettle Performance.{" "}
          <Link href="/privacy" className="underline hover:text-[#4A443E] transition-colors">
            Privacy
          </Link>{" "}
          &middot;{" "}
          <Link href="/terms" className="underline hover:text-[#4A443E] transition-colors">
            Terms
          </Link>
        </p>
      </footer>
    </main>
  );
}
