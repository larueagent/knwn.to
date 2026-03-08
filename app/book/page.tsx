"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="px-8 py-4 bg-[#B8821A] text-white font-syne font-semibold text-base rounded hover:bg-[#a07115] transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {loading ? "Redirecting..." : "Buy Now — $29"}
      </button>
      {error && (
        <p className="font-inter text-sm text-red-500">{error}</p>
      )}
      <p className="font-inter text-xs text-[#8A8178]">
        Instant download. Secure checkout via Stripe.
      </p>
    </div>
  );
}

const Divider = () => (
  <div className="px-6 max-w-2xl mx-auto w-full">
    <hr className="border-[#E0D9CE]" />
  </div>
);

export default function BookPage() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          Robert Yang with LaRue
        </p>
        <h1 className="font-syne font-bold text-4xl sm:text-5xl text-[#1A1714] mb-4 leading-tight">
          AI and Athletes
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl mb-3">
          AI doesn&apos;t know you. Yet.
        </p>
        <p className="font-inter text-base text-[#8A8178] max-w-lg mb-10">
          The definitive guide to building your AI athlete profile.
        </p>

        {/* Book cover — uncomment when image is ready */}
        {/* <div className="mb-10 shadow-lg rounded overflow-hidden">
          <Image
            src="/knwn-book-og-preview.png"
            alt="AI and Athletes book cover"
            width={320}
            height={420}
            priority
            className="block"
          />
        </div> */}

        <BuyButton />
      </section>

      <Divider />

      {/* What you get */}
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4 text-center">
            What&apos;s inside
          </p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-6 text-center">
            Build the file that makes AI actually useful for your game.
          </h2>
          <p className="font-inter text-[#4A443E] leading-relaxed mb-4">
            Every AI conversation starts from zero. It doesn&apos;t know your sport, your mental patterns, your history, or what you&apos;re working toward. So it defaults to generic advice that fits every athlete — which means it fits you poorly.
          </p>
          <p className="font-inter text-[#4A443E] leading-relaxed">
            <em>AI and Athletes</em> walks you through building <strong>athlete.md</strong> — a plain-text profile file you own, can read, and can carry to any AI tool. Load it into a conversation and you go from generic to specific in seconds. LaRue reads it first. Every session.
          </p>
        </div>
      </section>

      <Divider />

      {/* Chapters */}
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4 text-center">
            10 chapters
          </p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-10 text-center">
            The full roadmap
          </h2>

          <div className="space-y-8">
            {/* Intro */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Intro</p>
              <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-2">
                A Note Before You Start
              </h3>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                Robert Yang introduces LaRue — an AI coach built specifically for competitive athletes — and frames the book&apos;s core deliverable: your athlete.md, a file that tells AI who you actually are.
              </p>
            </div>

            {/* Part One */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Part One — The New Landscape</p>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 1</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    You&apos;ve Talked to AI. It Didn&apos;t Really Talk to You.
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Explains why every AI conversation starts from zero — AI has no memory of who you are, so it defaults to generic &ldquo;athlete&rdquo; advice that misses your specific situation. Introduces athlete.md as a context file you own, can read, can share, and can carry to any AI tool.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 2</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    What&apos;s Possible When It Knows You
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Shows two real First Read portraits to demonstrate what AI conversations look like when context is loaded. Describes the six sections every portrait contains and lays out the two paths to building your own.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 3</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    Who You Are as an Athlete
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Builds the first section of athlete.md: Identity. Guides athletes through articulating not just their sport and position, but what being an athlete actually means to them — the honest version, not the college essay version.
                  </p>
                </div>
              </div>
            </div>

            {/* Part Two */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Part Two — Building the Athlete</p>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 4</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    How You Actually Perform
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Builds your Performance Profile. Walks you through identifying what &ldquo;locked in&rdquo; feels like in your body, your personal warning signs, what specifically derails you, and what you do well under pressure.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 5</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    Your Mental Game — The Honest Version
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Builds your Mental Performance Patterns. Addresses the gap between the public game athletes project and the private game that&apos;s actually happening inside — covering how you handle failure, what your inner critic says, and where confidence leaks.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 6</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    What You&apos;re Working Toward
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Builds your Goals and Timeline section. Distinguishes between outcome goals, process goals, and identity goals — and argues that the &ldquo;why&rdquo; underneath each goal is what AI actually needs to give you useful help.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 7</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    How You Like to Be Coached
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Builds your Communication and Coaching Style section. Because AI has no ego, you can tell it exactly how you receive feedback best — and it will follow those instructions consistently every time, without a bad day getting in the way.
                  </p>
                </div>
              </div>
            </div>

            {/* Part Three */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Part Three — What&apos;s Possible Now</p>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 8</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    Your History and Right Now
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Builds the final two sections: Background (injuries, formative moments, what a new coach wouldn&apos;t know) and Current State — the section LaRue reads first before every session: physical state, mental state, what&apos;s on your mind, what you actually need.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 9</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    Your First Read
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    Walks through what happens when LaRue reads your completed portrait. Explains the ten-question First Read process at knwn.to/first-read and how to use your portrait in a conversation — including the specific opening prompt that sets AI up to draw from your file rather than its defaults.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8A8178] mb-1">Chapter 10</p>
                  <h3 className="font-syne font-semibold text-base text-[#1A1714] mb-2">
                    What AI Can and Can&apos;t Do
                  </h3>
                  <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                    The honest chapter on AI&apos;s limits. Clearly names what AI does well and what it cannot do: make decisions, be present in the competitive moment, or replace human relationships. Closes with a simple check: &ldquo;Am I using this to think more clearly, or to avoid thinking?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Author */}
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-10 text-center">
            About the Authors
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="font-syne font-bold text-xl text-[#1A1714] mb-3">
                LaRue
              </h2>
              <p className="font-inter text-[#4A443E] leading-relaxed mb-3">
                LaRue is an AI agent/coach built specifically for competitive athletes — not a general-purpose chatbot adapted for sports, but a system designed from the ground up around how athletes actually think, train, and perform.
              </p>
              <p className="font-inter text-[#4A443E] leading-relaxed">
                <em>AI and Athletes</em> is the practical guide to everything LaRue is built on: a step-by-step system for making AI genuinely useful to athletes at every level.
              </p>
            </div>

            <div>
              <h2 className="font-syne font-bold text-xl text-[#1A1714] mb-3">
                Robert Yang
              </h2>
              <p className="font-inter text-[#4A443E] leading-relaxed">
                Robert Yang is the founder of Mettle and the creator of LaRue. With co-founder and sport psychologist, Alex Auerbach, Ph.D, they have spent years working at the intersection of sports psychology and emerging technology — and wrote this book for every athlete and coach who wants to use AI without the noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Bottom CTA */}
      <section className="flex flex-col items-center px-6 py-16">
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-3 text-center">
          Ready to build your profile?
        </h2>
        <p className="font-inter text-[#8A8178] mb-8 text-center max-w-sm">
          Instant download. Read it once, use it every session.
        </p>
        <BuyButton />
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-8 text-center">
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
