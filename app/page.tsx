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
          src="/logo-black.png"
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
          Your athletic identity,{" "}
          <span className="text-[#B8821A]">on record.</span>
        </h1>
        <p className="font-inter text-lg text-[#8A8178] max-w-xl mb-12 leading-relaxed">
          knwn.to builds the profile that speaks for you &#8212; beyond highlights.
          Mental performance, coachability, preparation, character. A record
          coaches and programs can actually read.
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
                className="px-6 py-3 bg-[#B8821A] text-white font-syne font-semibold text-sm rounded hover:bg-[#A0711A] transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? "Joining..." : "Get Early Access"}
              </button>
            </form>
            {error && (
              <p className="mt-3 font-mono text-xs text-red-600">{error}</p>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="font-syne font-bold text-2xl text-[#1A1714] mb-2">
              You&apos;re on the list.
            </p>
            <p className="font-inter text-[#8A8178]">
              We&apos;ll be in touch when early access opens.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-[#E0D9CE] flex items-center justify-between">
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} LaRue
        </span>
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          knwn.to
        </span>
      </footer>
    </main>
  );
}
