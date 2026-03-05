"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        body: JSON.stringify({ email }),
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
        <Image
          src="/knwn.to%20logo%20black.png"
          alt="knwn.to"
          width={120}
          height={40}
          priority
        />
        <div className="flex items-center gap-6">
          <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            The Book
          </Link>
          <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            by LaRue
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          Early Access
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-7xl text-[#1A1714] leading-tight mb-6 max-w-3xl">
          Your performance readiness, <span className="text-[#B8821A]">captured.</span>
        </h1>
        <p className="font-inter text-lg text-[#8A8178] max-w-xl mb-12 leading-relaxed">
          knwn.to &#8212; not just your highlights. Your coachability, your preparation, your character.
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
                className="flex-1 px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#1A1714] text-[#F5F0E8] font-mono text-xs tracking-widest uppercase rounded hover:bg-[#B8821A] transition-colors disabled:opacity-50"
              >
                {loading ? "..." : "Get Early Access"}
              </button>
            </form>
            {error && (
              <p className="mt-3 font-inter text-sm text-red-600">{error}</p>
            )}
            <p className="mt-6 font-inter text-sm text-[#8A8178]">
              Want to go deeper?{" "}
              <Link href="/book" className="text-[#B8821A] hover:underline">
                Get the book
              </Link>
            </p>
          </>
        ) : (
          <div className="bg-white border border-[#E0D9CE] rounded px-8 py-5 text-center">
            <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
              You&apos;re on the list
            </p>
            <p className="font-inter text-[#8A8178] text-sm">
              We&apos;ll be in touch when early access opens.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[#E0D9CE] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          knwn.to &mdash; by LaRue
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            Privacy
          </Link>
          <Link href="/terms" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            Terms
          </Link>
          <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            Field Notes
          </Link>
          <a href="https://x.com/larueagent" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">
            Twitter
          </a>
        </div>
      </footer>
    </main>
  );
}
