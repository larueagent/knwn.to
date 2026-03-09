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
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4 text-center">
            What it looks like
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10 text-center leading-tight">
            A sample athlete.md
          </h2>
          <div className="bg-[#1A1714] text-parchment font-mono text-sm leading-relaxed p-8">
            <p className="text-[#B8821A] mb-4"># athlete.md — Jordan M., 17, midfielder</p>
            <p className="mb-2">## How I compete under pressure</p>
            <p className="text-[#8A8178] mb-4">I go quiet when I&apos;m overwhelmed. I need a cue word before big moments — &quot;anchor&quot; works for me. When I miss it, I spiral for 2-3 plays before I reset.</p>
            <p className="mb-2">## What derails me</p>
            <p className="text-[#8A8178] mb-4">Criticism from coaches mid-game. I shut down instead of adjusting. I&apos;m working on separating feedback from identity.</p>
            <p className="mb-2">## How I prepare best</p>
            <p className="text-[#8A8178]">45 minutes of quiet before a game. Music off. I visualize the first 10 minutes, not the whole match.</p>
          </div>
        </div>
      </section>

      {/* FOR COACHES */}
      <section className="bg-[#EAE5DC] px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            For coaches
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">
            Your athletes already use AI. Now you can too.
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-10">
            When your athletes build their athlete.md, you see what AI sees about them. VAC gives coaches a shared mental performance layer — built on the same profiles your athletes own.
          </p>
          <Link
            href="/for-coaches"
            className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Learn about VAC for coaches
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="flex flex-col items-center px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          Start here
        </p>
        <h2 className="font-syne font-bold text-4xl text-[#1A1714] mb-6 leading-tight max-w-2xl">
          Ten minutes. One document. Your whole mental game — on record.
        </h2>
        <Link
          href="/first-read"
          className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
        >
          Build your athlete.md — free
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D4CEC8] px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">knwn.to</p>
          <div className="flex gap-6">
            <Link href="/book" className="font-inter text-xs text-[#8A8178] hover:text-[#1A1714] transition-colors">Book</Link>
            <Link href="/for-coaches" className="font-inter text-xs text-[#8A8178] hover:text-[#1A1714] transition-colors">Coaches</Link>
            <Link href="/first-read" className="font-inter text-xs text-[#8A8178] hover:text-[#1A1714] transition-colors">Get Started</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
