"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

export default function HomeMockupV2() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col font-inter">

      <Nav variant="light" />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-6">
          AI literacy for athletes
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-6xl leading-tight tracking-tight mb-8 max-w-3xl">
          Every young athlete needs to know how to work with AI.
          <br />
          <span className="text-[#8A8178]">Most don't know where to start.</span>
        </h1>
        <p className="text-lg text-[#8A8178] mb-2 max-w-xl mx-auto leading-relaxed">
          The athletes who get the most out of AI won't be the ones with the best tools.
        </p>
        <p className="text-lg text-[#8A8178] mb-2 max-w-xl mx-auto leading-relaxed">
          They'll be the ones an AI actually knows.
        </p>
        <p className="text-lg text-[#8A8178] mb-10 max-w-xl mx-auto leading-relaxed">
          That starts with one document:{" "}
          <span className="font-mono font-semibold text-[#1A1714]">your athlete.md.</span>
        </p>
        <Link
          href="/first-read"
          className="inline-block bg-accent text-[#F5F0E8] px-8 py-4 font-syne font-semibold text-base hover:opacity-90 transition-opacity mb-4"
        >
          Build your athlete.md — free, takes 10 minutes
        </Link>
        <Link href="/sign-in" className="text-sm text-[#8A8178] underline underline-offset-4">
          Already have yours? Sign in.
        </Link>
      </section>

      {/* PULLQUOTE BAND — warm tint */}
      <section className="bg-[#EAE5DC] px-6 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-syne text-xl leading-relaxed mb-4 text-[#1A1714]">
            AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.
          </p>
          <p className="text-lg leading-relaxed text-[#8A8178]">
            The athletes who thrive won't just be faster — they'll be the ones who know how to be known.
          </p>
        </div>
      </section>

      {/* WHAT IS athlete.md — parchment */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] text-center mb-4">
          The core idea
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-center mb-3">
          An athlete.md is your mental performance identity.
        </h2>
        <p className="text-center text-[#8A8178] mb-16 text-lg">In plain language. Yours to own.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
              What it captures
            </p>
            <p className="text-[#1A1714]/80 text-base leading-relaxed">
              How you handle pressure. What derails you. How you prepare. What you need before a big game. Not a test result. Not a score. A real picture of how you compete — written in language you and any coach can actually use.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
              Why it matters for AI
            </p>
            <p className="text-[#1A1714]/80 text-base leading-relaxed">
              An AI is only as useful as what it knows about you. Without a profile, every session starts from zero. With an athlete.md, LaRue knows your patterns before you say a word. That is what it means to get the most out of AI.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
              You own it
            </p>
            <p className="text-[#1A1714]/80 text-base leading-relaxed">
              Your athlete.md is a plain text file. Take it anywhere. Share it with a coach. Use it with any AI tool. It is not locked inside an app. It belongs to you.
            </p>
          </div>
        </div>
      </section>

      {/* MEET LARUE — slightly deeper tint */}
      <section className="bg-[#E0D9CE] px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-4">
            Meet LaRue
          </p>
          <h2 className="font-syne font-bold text-3xl md:text-4xl mb-6 text-[#1A1714]">
            LaRue builds your athlete.md. Then puts it to work.
          </h2>
          <p className="text-lg text-[#8A8178] leading-relaxed mb-10 max-w-xl mx-auto">
            LaRue is an AI agent trained on mental performance in sport. Answer 10 questions. He generates your profile, reads it before every session, and adapts as you grow. When you need a real coach, he connects you to one.
          </p>
          <Link
            href="/first-read"
            className="inline-block bg-accent text-[#F5F0E8] px-8 py-4 font-syne font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Start your athlete.md — free
          </Link>
        </div>
      </section>

      {/* SAMPLE PROFILE — parchment */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] text-center mb-4">
          Sample profile
        </p>
        <h2 className="font-syne font-bold text-3xl text-center mb-3">
          This is what an athlete.md looks like.
        </h2>
        <p className="text-center text-[#8A8178] mb-10">
          Jaime is a composite athlete. Ten minutes in, this is what LaRue produced.
        </p>
        <div className="border border-[#E0D9CE] bg-[#EAE5DC] p-8 font-mono text-sm leading-relaxed text-[#1A1714]/80">
          <p className="text-[#8A8178] mb-4"># athlete.md — Jaime R.</p>
          <p className="mb-1">
            <span className="text-[#8A8178]">athlete_type: </span>The Grinder
          </p>
          <p className="mb-1">
            <span className="text-[#8A8178]">pressure_response: </span>Internalizes. Goes quiet before big moments.
          </p>
          <p className="mb-1">
            <span className="text-[#8A8178]">derailer: </span>Comparison to teammates. Rumination after errors.
          </p>
          <p className="mb-1">
            <span className="text-[#8A8178]">pre_competition: </span>Needs 20 min alone. Music off. No strategy talk.
          </p>
          <p className="mb-1">
            <span className="text-[#8A8178]">strength: </span>Consistency under fatigue. Coachable. Process-oriented.
          </p>
          <p className="mt-4 text-[#8A8178]">[full profile — 380 words]</p>
        </div>
        <div className="text-center mt-10 flex items-center justify-center gap-8">
          <Link href="#" className="text-sm text-[#8A8178] underline underline-offset-4">
            View full sample
          </Link>
          <Link
            href="/first-read"
            className="inline-block bg-accent text-[#F5F0E8] px-8 py-4 font-syne font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Build yours free
          </Link>
        </div>
      </section>

      {/* LIVE ACTIVITY — warm tint */}
      <section className="bg-[#EAE5DC] px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-4">
            Live activity
          </p>
          <h2 className="font-syne font-bold text-3xl mb-12 text-[#1A1714]">LaRue is working.</h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-syne font-bold text-5xl mb-2 text-accent">—</div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">
                athlete profiles generated
              </div>
            </div>
            <div>
              <div className="font-syne font-bold text-5xl mb-2 text-accent">—</div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">
                field notes published
              </div>
            </div>
            <div>
              <div className="font-syne font-bold text-5xl mb-2 text-accent">—</div>
              <div className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">
                coaches on the VAC waitlist
              </div>
            </div>
          </div>
          <p className="font-mono text-xs text-[#8A8178]">
            Every profile is private. Every athlete owns their data. LaRue never sells it.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E0D9CE] px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="font-syne font-bold text-[#1A1714] mb-1">knwn.to</p>
            <p className="font-mono text-xs text-[#8A8178]">Built by Momentum Labs</p>
          </div>
          <div className="flex gap-6 flex-wrap items-start">
            <Link href="/first-read" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">
              Start Here
            </Link>
            <Link href="/field-notes" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">
              Field Notes
            </Link>
            <Link href="/book" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">
              The Book
            </Link>
            <Link href="/for-coaches" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">
              For Coaches
            </Link>
            <Link href="https://momentumlabs.coach" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">
              momentumlabs.coach
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-[#E0D9CE]">
          <p className="font-mono text-xs text-[#8A8178] mb-1">
            LaRue is an AI agent. He is not a licensed therapist or clinical psychologist.
          </p>
          <p className="font-mono text-xs text-[#8A8178]">
            2026 Momentum Labs. Athlete data is never sold or shared without explicit consent.
          </p>
        </div>
      </footer>

    </main>
  );
}
