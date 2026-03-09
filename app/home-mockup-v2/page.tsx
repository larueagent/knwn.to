"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

export default function HomeMockupV2() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col font-inter">

      <Nav variant="light" />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          knwn.to
        </p>
        <h1 className="font-syne font-bold text-5xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">
          Every young athlete needs to know how to work with AI.
          <br />
          <span className="text-[#8A8178]">Most don&apos;t know where to start.</span>
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-3">
          The athletes who get the most out of AI won&apos;t be the ones with the best tools.
        </p>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-3">
          They&apos;ll be the ones an AI actually knows.
        </p>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-10">
          That starts with one document:{" "}
          <span className="font-mono text-[#B8821A]">your athlete.md</span>.
        </p>
        <Link
          href="/first-read"
          className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors mb-4"
        >
          Build your athlete.md — free, takes 10 minutes
        </Link>
        <Link
          href="/sign-in"
          className="font-inter text-sm text-[#8A8178] hover:text-[#1A1714] transition-colors underline underline-offset-4"
        >
          Already have yours? Sign in.
        </Link>
      </section>

      {/* CONTEXT BAND */}
      <section className="bg-[#EAE5DC] px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-inter text-lg text-[#1A1714] leading-relaxed mb-3">
            AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.
          </p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed">
            The athletes who thrive won&apos;t just be faster — they&apos;ll be the ones who know how to be known.
          </p>
        </div>
      </section>

      {/* WHAT IS athlete.md */}
      <section className="flex flex-col items-center px-6 py-20">
        <div className="max-w-4xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4 text-center">
            The core idea
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-3 text-center leading-tight">
            An athlete.md is your mental performance identity.
          </h2>
          <p className="font-inter text-base text-[#8A8178] text-center mb-14">
            In plain language. Yours to own.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">
                What it captures
              </p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                How you handle pressure. What derails you. How you prepare. What you need before a big game. Not a test result — a real picture of how you compete.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">
                Why it matters for AI
              </p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                An AI is only as useful as what it knows about you. Without a profile, every session starts from zero. With an athlete.md, LaRue knows your patterns before you say a word.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">
                You own it
              </p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                A plain text file. Take it anywhere. Share it with a coach. Use it with any AI tool. It is not locked inside an app. It belongs to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET LARUE */}
      <section className="bg-[#E0D9CE] px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Meet LaRue
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">
            LaRue builds your athlete.md. Then puts it to work.
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-10">
            LaRue is an AI agent trained on mental performance in sport. Answer 10 questions. He generates your profile, reads it before every session, and adapts as you grow. When you need a real coach, he connects you to one.
          </p>
          <Link
            href="/first-read"
            className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Start your athlete.md — free
          </Link>
        </div>
      </section>

      {/* SAMPLE PROFILE */}
      <section className="flex flex-col items-center px-6 py-20">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Sample profile
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-3 leading-tight">
            This is what an athlete.md looks like.
          </h2>
          <p className="font-inter text-sm text-[#8A8178] mb-8">
            Jaime is a composite athlete. Ten minutes in, this is what LaRue produced.
          </p>
          <div className="bg-[#EAE5DC] p-8 font-mono text-sm leading-relaxed text-[#1A1714] border border-[#D5CDBE]">
            <p className="text-[#B8821A] mb-2"># athlete.md — Jaime R.</p>
            <p className="text-[#8A8178] mb-4">Generated by LaRue | Draft 1</p>
            <p className="mb-1"><span className="text-[#B8821A]">athlete_type:</span> The Grinder</p>
            <p className="mb-1"><span className="text-[#B8821A]">pressure_response:</span> Internalizes. Goes quiet before big moments.</p>
            <p className="mb-1"><span className="text-[#B8821A]">derailer:</span> Comparison to teammates. Rumination after errors.</p>
            <p className="mb-1"><span className="text-[#B8821A]">pre_competition:</span> Needs 20 min alone. Music off. No strategy talk.</p>
            <p className="mb-1"><span className="text-[#B8821A]">strength:</span> Consistency under fatigue. Coachable. Process-oriented.</p>
            <p className="mt-4 text-[#8A8178]">[full profile — 380 words]</p>
          </div>
          <div className="flex gap-8 items-center mt-8">
            <Link href="/jaime" className="font-mono text-xs text-[#B8821A] tracking-widest uppercase hover:underline">
              View full sample →
            </Link>
            <Link
              href="/first-read"
              className="inline-block px-6 py-3 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
            >
              Build yours free
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE ACTIVITY */}
      <section className="bg-[#EAE5DC] px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Live activity
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-14">
            LaRue is working.
          </h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-syne font-bold text-5xl text-[#1A1714] mb-2">—</div>
              <div className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">athlete profiles</div>
            </div>
            <div>
              <div className="font-syne font-bold text-5xl text-[#1A1714] mb-2">—</div>
              <div className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">field notes</div>
            </div>
            <div>
              <div className="font-syne font-bold text-5xl text-[#1A1714] mb-2">—</div>
              <div className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">coaches on VAC waitlist</div>
            </div>
          </div>
          <p className="font-mono text-xs text-[#8A8178]">Every profile is private. Every athlete owns their data. LaRue never sells it.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto px-6 py-8 border-t border-[#E0D9CE]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 flex-wrap">
            <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
            <Link href="/first-read" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Start Here</Link>
            <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
            <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">The Book</Link>
            <Link href="/for-coaches" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">For Coaches</Link>
            <Link href="https://momentumlabs.coach" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase" target="_blank" rel="noopener noreferrer">momentumlabs.coach</Link>
          </div>
          <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">Built by Momentum Labs</p>
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          <p className="font-mono text-xs text-[#C8BFB5]">
            LaRue is an AI agent. He is not a licensed therapist or clinical psychologist.
            &copy; 2026 Momentum Labs. Athlete data is never sold or shared without explicit consent.
          </p>
        </div>
      </footer>

    </main>
  );
}
