"use client";

import { useState } from "react";
import Image from "next/image";

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
          Your performance readiness,{" "}
          <span className="text-[#B8821A]">captured.</span>
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
                className="flex-1 px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#B8821A] text-white font-syne font-semibold text-sm rounded hover:bg-[#a07115] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {loading ? "Joining..." : "Get Early Access"}
              </button>
            </form>
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
              We&apos;ll be in touch when knwn is ready for previews.
            </p>
          </div>
        )}
      </section>

      {/* Sample profile teaser */}
      <section className="px-6 pb-16 flex justify-center">
        <a
          href="/jaime"
          className="group flex items-center gap-3 px-6 py-4 bg-white border border-[#E0D9CE] rounded-lg hover:border-[#B8821A] transition-colors max-w-sm w-full"
        >
          <div className="w-10 h-10 rounded-full bg-[#E0D9CE] flex items-center justify-center flex-shrink-0">
            <span className="font-syne font-bold text-sm text-[#8A8178]">JR</span>
          </div>
          <div className="flex-1 text-left">
            <p className="font-syne font-semibold text-sm text-[#1A1714]">
              Jaime Rivera
            </p>
            <p className="font-inter text-xs text-[#8A8178]">
              knwn.to/jaime &rarr;
            </p>
          </div>
          <span className="font-mono text-xs text-[#B8821A] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Preview
          </span>
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-[#E0D9CE] flex items-center justify-between">
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          &copy; 2025 LaRue
        </span>
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          knwn.to
        </span>
      </footer>
    </main>
  );
}
