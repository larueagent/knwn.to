"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BookPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: "book-waitlist" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-parchment flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-[#E0D9CE]">
        <Link href="/">
          <Image
            src="/knwn.to%20logo%20black.png"
            alt="knwn.to"
            width={120}
            height={40}
            priority
          />
        </Link>
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          by LaRue
        </span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          Coming Soon
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-7xl text-[#1A1714] leading-tight mb-6 max-w-3xl">
          AI &amp; Athletes
        </h1>
        <p className="font-inter text-xl text-[#8A8178] max-w-xl mb-4 leading-relaxed">
          The guide to giving AI enough context to actually help you.
        </p>
        <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase mb-12">
          by Robert Yang
        </p>

        {/* Email capture */}
        {!submitted ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#B8821A] text-white font-syne font-semibold text-sm rounded hover:bg-[#a07115] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {loading ? "Joining..." : "Notify Me"}
              </button>
            </form>
            <p className="font-inter text-xs text-[#8A8178] mt-3">
              Be the first to know when the book is ready.
            </p>
            {error && (
              <p className="font-inter text-sm text-red-500 mt-3">{error}</p>
            )}
          </>
        ) : (
          <div className="bg-white border border-[#E0D9CE] rounded px-8 py-5 text-center">
            <p className="font-syne font-semibold text-[#1A1714] mb-1">
              You&apos;re on the list.
            </p>
            <p className="font-inter text-sm text-[#8A8178]">
              We&apos;ll reach out as soon as the book is ready.
            </p>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="px-6 max-w-2xl mx-auto w-full">
        <hr className="border-[#E0D9CE]" />
      </div>

      {/* What the book is about */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          About the book
        </p>
        <div className="space-y-5 font-inter text-[17px] text-[#1A1714] leading-relaxed">
          <p>
            Eighty-four percent of people on this planet have never typed a
            prompt to an AI. You have. That puts you in the 16 percent who have
            crossed the first threshold.
          </p>
          <p>
            But here&apos;s what most athletes miss: the AI you&apos;ve been
            using isn&apos;t broken. It just doesn&apos;t know you. And generic
            AI gives generic answers.
          </p>
          <p>
            This book has one deliverable:{" "}
            <span className="font-semibold text-[#1A1714]">
              your athlete.md
            </span>{" "}
            &mdash; a file that holds the full picture of you as an athlete.
            Built once, updated over time, readable by any AI you use. Each
            chapter adds one section. By Chapter 11, the file is complete.
          </p>
          <p className="text-[#8A8178]">
            The file is yours. The profile is yours. They don&apos;t belong to
            any team, any program, any school.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 max-w-2xl mx-auto w-full">
        <hr className="border-[#E0D9CE]" />
      </div>

      {/* Chapter preview teaser */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-8">
          Read a preview
        </p>
        <Link
          href="/read"
          className="group block bg-white border border-[#E0D9CE] rounded-lg p-8 hover:border-[#B8821A] transition-colors"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
            Chapter 1 &mdash; AI &amp; Athletes
          </p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4 leading-snug">
            You&apos;ve Talked to AI.<br />It Didn&apos;t Really Talk to You.
          </h2>
          <p className="font-inter text-sm text-[#8A8178] leading-relaxed mb-6">
            Every conversation with an AI starts from zero. It doesn&apos;t
            remember what you told it last week. It doesn&apos;t know your
            sport, your position, your team, your history&hellip;
          </p>
          <span className="font-mono text-xs text-[#B8821A] tracking-widest uppercase group-hover:underline">
            Read Chapter 1 &rarr;
          </span>
        </Link>
      </section>

      {/* Divider */}
      <div className="px-6 max-w-2xl mx-auto w-full">
        <hr className="border-[#E0D9CE]" />
      </div>

      {/* What you'll build */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          What&apos;s inside
        </p>
        <div className="space-y-4">
          {[
            ["01", "Why context is everything — and why most athletes skip it"],
            ["02", "What AI actually is (and what it will never be)"],
            ["03", "Building your athlete.md from scratch"],
            ["04–10", "Seven sessions, seven sections of your file"],
            ["11", "The complete file — ready to use"],
            ["12", "A real AI conversation with your loaded context"],
            ["13", "Advanced moves: prompting, updating, and sharing"],
            ["14", "Publishing your knwn.to profile"],
          ].map(([num, label]) => (
            <div
              key={num}
              className="flex items-start gap-5 py-4 border-b border-[#E0D9CE] last:border-0"
            >
              <span className="font-mono text-xs text-[#B8821A] tracking-widest w-12 flex-shrink-0 pt-0.5">
                {num}
              </span>
              <p className="font-inter text-[15px] text-[#1A1714]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 flex flex-col items-center text-center bg-white border-t border-[#E0D9CE]">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
          Get notified
        </p>
        <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-4">
          Be first when it drops.
        </h2>
        <p className="font-inter text-sm text-[#8A8178] max-w-sm mb-8">
          No spam. One email when the book is ready.
        </p>

        {!submitted ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#B8821A] text-white font-syne font-semibold text-sm rounded hover:bg-[#a07115] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {loading ? "Joining..." : "Notify Me"}
              </button>
            </form>
            {error && (
              <p className="font-inter text-sm text-red-500 mt-3">{error}</p>
            )}
          </>
        ) : (
          <div className="bg-[#F8F5F0] border border-[#E0D9CE] rounded px-8 py-5 text-center">
            <p className="font-syne font-semibold text-[#1A1714] mb-1">
              You&apos;re on the list.
            </p>
            <p className="font-inter text-sm text-[#8A8178]">
              We&apos;ll reach out as soon as the book is ready.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-[#E0D9CE] flex items-center justify-between">
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          &copy; 2025 LaRue
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://dexscreener.com/base/0x6cda1d74c964f2660336b74a7f93436656324da7473c5008a7a2696c8ac3a85b"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase"
          >
            $STATE
          </a>
          <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            knwn.to
          </span>
        </div>
      </footer>
    </main>
  );
}
