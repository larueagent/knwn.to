"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function EmailForm({
  submitted,
  setSubmitted,
}: {
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
}) {
  const [email, setEmail] = useState("");
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
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#E0D9CE] rounded px-8 py-5 text-center">
        <p className="font-syne font-semibold text-[#1A1714] mb-1">
          You&apos;re on the list.
        </p>
        <p className="font-inter text-sm text-[#8A8178]">
          We&apos;ll reach out as soon as the book is ready.
        </p>
      </div>
    );
  }

  return (
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
  );
}

const Divider = () => (
  <div className="px-6 max-w-2xl mx-auto w-full">
    <hr className="border-[#E0D9CE]" />
  </div>
);

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);

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
          Coming 2026 &mdash; $29 at launch
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-7xl text-[#1A1714] leading-tight mb-4 max-w-3xl">
          Your Story, All of It
        </h1>
        <p className="font-inter text-xl text-[#8A8178] max-w-xl mb-4 leading-relaxed">
          The Athlete&apos;s Guide to Personalizing AI for Your Game
        </p>
        <p className="font-inter text-base text-[#8A8178] max-w-xl mb-4 leading-relaxed">
          AI doesn&apos;t know you. knwn.to fixes that. Build your athlete
          profile, personalize your AI, and carry your full story wherever your
          game takes you.
        </p>
        <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase mb-4">
          written by Rob Yang with LaRue Agent
        </p>
        <p className="font-inter text-sm text-[#8A8178] mb-10">
          We&apos;re writing this book in public. Follow along as we build it.
        </p>

        <EmailForm submitted={submitted} setSubmitted={setSubmitted} />
        {!submitted && (
          <p className="font-inter text-xs text-[#8A8178] mt-3">
            Get notified when it&apos;s ready.
          </p>
        )}
      </section>

      <Divider />

      {/* What the book builds */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          What this book builds
        </p>
        <div className="font-inter text-[17px] text-[#1A1714] leading-relaxed space-y-4">
          <p>
            By the last page, you&apos;ll have an{" "}
            <span className="font-semibold">athlete.md</span> &mdash; a file
            that tells AI who you are, how you think, what you&apos;re working
            toward, and what you need. Every chapter adds one section to it.
          </p>
          <p>
            The file lives on your knwn.to profile. It works with ChatGPT,
            Claude, LaRue, or any AI. It&apos;s yours.
          </p>
        </div>
      </section>

      <Divider />

      {/* Part One */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
          Part One
        </p>
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-8">
          Who You Are
        </h2>
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 1</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">The Blank Profile</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Why AI doesn&apos;t know you yet — and why that&apos;s the whole problem. You&apos;ll write your first athlete.md entry: your name, sport, and one sentence about what you&apos;re chasing this season.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 2</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Your Athlete Stack</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">The tools, apps, and platforms already in your life. You&apos;ll map what you use and where the gaps are — then add a [tools] section to your file.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 3</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">How You Learn</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Visual, auditory, kinesthetic — or none of the above. You&apos;ll define your actual learning style and encode it so AI stops teaching you the wrong way.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 4</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Your Communication Style</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Blunt or detailed? Motivated by data or story? You&apos;ll define how you want AI to talk to you — and it will.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Part Two */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
          Part Two
        </p>
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-8">
          How You Perform
        </h2>
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 5</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Your Physical Baseline</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Sleep, nutrition, recovery, load. You&apos;ll document your physical context so AI can give advice that actually fits your body and schedule.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 6</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Mental Performance Patterns</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">How you handle pressure, setbacks, and big moments. You&apos;ll encode your mental performance profile — not a personality test, a real map.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 7</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Your Competitive Context</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Level, division, team dynamics, season phase. AI needs to know where you&apos;re competing to give useful advice. You&apos;ll add a [context] block that travels with you.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 8</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Strengths and Blind Spots</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">What you&apos;re elite at. What you avoid. What your coaches have told you for years. You&apos;ll write it plainly, and AI will finally stop suggesting things you already do well.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Part Three */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
          Part Three
        </p>
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-8">
          Where You&apos;re Going
        </h2>
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 9</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Goals That Mean Something</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Not SMART goals. Real ones. You&apos;ll write the goals you actually care about — short, season, and career — and format them so AI can help you chase them, not generic proxies.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 10</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Your Support System</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Coaches, trainers, family, teammates. Who&apos;s in your corner, what they see, and how AI should factor them in — without overriding them.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 11</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Life Beyond the Sport</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">School, work, family, time constraints. The full picture AI never gets. You&apos;ll add a [life context] section so recommendations stop assuming you train full-time.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 12</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Your Athletic Identity</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">What the sport means to you. What kind of competitor you are. What legacy you want to leave. The layer most athletes never articulate — and AI never asks for.</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-1">Chapter 13</p>
            <p className="font-syne font-semibold text-lg text-[#1A1714] mb-1">Publishing Your Profile</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">How to upload athlete.md to knwn.to, share it with AI tools, and keep it updated as you grow. Your profile is never finished — it evolves with you.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Appendices */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          Appendices
        </p>
        <div className="space-y-6">
          <div>
            <p className="font-syne font-semibold text-base text-[#1A1714] mb-1">Appendix A — Prompt Library</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">50+ prompts built specifically for athletes. Each one references your athlete.md so AI answers as if it knows you — because it does.</p>
          </div>
          <div>
            <p className="font-syne font-semibold text-base text-[#1A1714] mb-1">Appendix B — Sport-Specific Profiles</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">Starter athlete.md templates for basketball, soccer, swimming, track, tennis, and combat sports. Adapt what fits, delete what doesn&apos;t.</p>
          </div>
          <div>
            <p className="font-syne font-semibold text-base text-[#1A1714] mb-1">Appendix C — Working with Coaches</p>
            <p className="font-inter text-sm text-[#8A8178] leading-relaxed">How to share your profile with your coaching staff and use AI as a bridge, not a replacement. Includes a one-page coach summary format.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* athlete.md template */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
          What you&apos;ll build
        </p>
        <p className="font-syne font-bold text-xl text-[#1A1714] mb-6">Your athlete.md</p>
        <pre className="bg-white border border-[#E0D9CE] rounded p-6 font-mono text-xs text-[#1A1714] leading-relaxed overflow-x-auto whitespace-pre-wrap">{`# athlete.md

[identity]
name: 
sport: 
position/event: 
level: 
season: 

[goals]
this week: 
this season: 
career: 

[physical]
sleep: 
nutrition approach: 
recovery: 
current load: 

[mental]
under pressure I: 
after a loss I: 
I perform best when: 

[context]
team: 
schedule: 
constraints: 

[learning]
style: 
I prefer feedback that: 
don't: 

[support]
coaches: 
trainers: 
family: 

[identity]
this sport means: 
I want to be known for: 
what drives me: `}</pre>
      </section>

      <Divider />

      {/* Bottom CTA */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          Coming 2026
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-[#1A1714] mb-4 max-w-xl">
          Be first to get it.
        </h2>
        <p className="font-inter text-base text-[#8A8178] max-w-md mb-10 leading-relaxed">
          Join the waitlist. $29 at launch. We&apos;ll send you chapters as we
          write them.
        </p>
        <EmailForm submitted={submitted} setSubmitted={setSubmitted} />
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-[#E0D9CE] flex items-center justify-between">
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          &copy; 2026 knwn.to
        </span>
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          by LaRue
        </span>
      </footer>
    </main>
  );
}
