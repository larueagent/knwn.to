"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-parchment flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-[#E0D9CE]">
        <span className="font-syne font-bold text-lg tracking-tight text-[#1A1714]">
          KNWN.TO
        </span>
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          by LaRue
        </span>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          Early Access
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-7xl text-[#1A1714] leading-tight mb-6 max-w-3xl">
          Your athletic identity,{" "}
          <span className="text-[#B8821A]">on record.</span>
        </h1>
        <p className="font-inter text-lg text-[#8A8178] max-w-xl mb-12 leading-relaxed">
          knwn.to builds the profile that speaks for you — beyond highlights.
          Mental performance, coachability, preparation, character. A record
          coaches and programs can actually read.
        </p>

        {!submitted ? (
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
              className="flex-1 px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#B8821A] text-white font-syne font-semibold text-sm rounded hover:bg-[#a07115] transition-colors whitespace-nowrap"
            >
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="bg-white border border-[#E0D9CE] rounded px-8 py-5 text-center">
            <p className="font-syne font-semibold text-[#1A1714] mb-1">
              You&apos;re on the list.
            </p>
            <p className="font-inter text-sm text-[#8A8178]">
              We&apos;ll be in touch when your profile is ready.
            </p>
          </div>
        )}
      </section>

      {/* Sample profile teaser */}
      <section className="px-6 pb-16 flex justify-center">
        <a
          href="/jaime"
          className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] tracking-widest uppercase transition-colors"
        >
          See a sample profile &rarr;
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-[#E0D9CE] flex items-center justify-between">
        <span className="font-mono text-xs text-[#8A8178]">
          knwn.to &mdash; built by LaRue
        </span>
        <span className="font-mono text-xs text-[#8A8178]">
          &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
