"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

export default function HomeMockupV2() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">

      <Nav variant="light" />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="font-syne font-bold text-5xl md:text-6xl text-[#1A1714] leading-tight mb-6 max-w-4xl">
          Every young athlete needs to know how to work with AI.{" "}
          <span className="text-[#8A8178]">Most don&apos;t know where to start.</span>
        </h1>
        <p className="font-inter text-lg text-[#8A8178] max-w-2xl mb-2 leading-relaxed">
          The athletes who get the most out of AI won&apos;t be the ones with the best tools.
        </p>
        <p className="font-inter text-lg text-[#8A8178] max-w-2xl mb-2 leading-relaxed">
          They&apos;ll be the ones an AI actually knows.
        </p>
        <p className="font-inter text-lg text-[#8A8178] max-w-2xl mb-10 leading-relaxed">
          That starts with one document:{" "}
          <span className="font-mono font-semibold text-[#1A1714]">your athlete.md.</span>
        </p>
        <Link
          href="/first-read"
          className="px-8 py-4 bg-[#1A1714] text-[#F5F0E8] font-syne font-semibold text-sm hover:bg-[#2A2520] transition-colors mb-4"
        >
          Build your athlete.md &mdash; free, takes 10 minutes
        </Link>
        <Link
          href="#"
          className="font-inter text-sm text-[#8A8178] underline underline-offset-4 hover:text-[#1A1714] transition-colors"
        >
          Already have yours? Sign in.
        </Link>
      </section>

      {/* SECTION 1 — No header, two lines */}
      <section className="bg-[#1A1714] text-[#F5F0E8] px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-inter text-xl text-[#C8BFB5] leading-relaxed mb-4">
            AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.
          </p>
          <p className="font-inter text-xl text-[#8A8178] leading-relaxed">
            The athletes who thrive won&apos;t just be faster &mdash; they&apos;ll be the ones who know how to be known.
          </p>
        </div>
      </section>

      {/* SECTION 2 — What Is an athlete.md? */}
      <section className="px-6 py-24 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-center mb-3 max-w-3xl mx-auto">
            An athlete.md is your mental performance identity.
          </h2>
          <p className="font-inter text-lg text-[#8A8178] text-center mb-16">
            In plain language. Yours to own.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="border-t border-[#E0D9CE] pt-6">
              <p className="font-mono text-xs tracking-widest uppercase text-accent mb-4">What it captures</p>
              <p className="font-inter text-[#8A8178] leading-relaxed">
                How you handle pressure. What derails you. How you prepare. What you need before a big game. Not a test result. Not a score. A real picture of how you compete &mdash; written in language you and any coach can actually use.
              </p>
            </div>
            <div className="border-t border-[#E0D9CE] pt-6">
              <p className="font-mono text-xs tracking-widest uppercase text-accent mb-4">Why it matters for AI</p>
              <p className="font-inter text-[#8A8178] leading-relaxed">
                An AI is only as useful as what it knows about you. Without a profile, every session starts from zero. With an athlete.md, LaRue knows your patterns before you say a word. That is what it means to get the most out of AI.
              </p>
            </div>
            <div className="border-t border-[#E0D9CE] pt-6">
              <p className="font-mono text-xs tracking-widest uppercase text-accent mb-4">You own it</p>
              <p className="font-inter text-[#8A8178] leading-relaxed">
                Your athlete.md is a plain text file. Take it anywhere. Share it with a coach. Use it with any AI tool. It is not locked inside an app. It belongs to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Meet LaRue */}
      <section className="bg-[#1A1714] text-[#F5F0E8] px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-4">Meet LaRue</p>
          <h2 className="font-syne font-bold text-3xl md:text-4xl mb-6 leading-snug">
            LaRue builds your athlete.md. Then puts it to work.
          </h2>
          <p className="font-inter text-lg text-[#C8BFB5] leading-relaxed mb-10">
            LaRue is an AI agent trained on mental performance in sport. Answer 10 questions. He generates your profile, reads it before every session, and adapts as you grow. When you need a real coach, he connects you to one.
          </p>
          <Link
            href="/first-read"
            className="inline-block px-8 py-4 border border-[#F5F0E8] font-syne font-semibold text-sm hover:bg-[#F5F0E8] hover:text-[#1A1714] transition-colors"
          >
            Start your athlete.md &mdash; free
          </Link>
        </div>
      </section>

      {/* SECTION 4 — Sample Profile */}
      <section className="bg-parchment px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-4">Sample Profile</p>
          <h2 className="font-syne font-bold text-3xl mb-3">This is what an athlete.md looks like.</h2>
          <p className="font-inter text-[#8A8178] mb-10">
            Jaime is a composite athlete. Ten minutes in, this is what LaRue produced.
          </p>
          <div className="border border-[#E0D9CE] bg-[#EAE5DE] p-8 font-mono text-sm leading-relaxed mb-8">
            <p className="text-accent text-xs tracking-widest uppercase mb-4"># athlete.md &mdash; Jaime R.</p>
            <p className="text-[#1A1714] mb-2">
              <span className="text-[#8A8178]">athlete_type: </span>The Grinder
            </p>
            <p className="text-[#1A1714] mb-2">
              <span className="text-[#8A8178]">pressure_response: </span>Internalizes. Goes quiet before big moments.
            </p>
            <p className="text-[#1A1714] mb-2">
              <span className="text-[#8A8178]">derailer: </span>Comparison to teammates. Rumination after errors.
            </p>
            <p className="text-[#1A1714] mb-2">
              <span className="text-[#8A8178]">pre_competition: </span>Needs 20 min alone. Music off. No strategy talk.
            </p>
            <p className="text-[#1A1714] mb-2">
              <span className="text-[#8A8178]">strength: </span>Consistency under fatigue. Coachable. Process-oriented.
            </p>
            <p className="text-[#8A8178] mt-6 text-xs">
              [full profile &mdash; 380 words]
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="font-mono text-xs tracking-widest uppercase text-accent underline underline-offset-4 hover:text-[#D4A43A] transition-colors"
            >
              View full sample
            </Link>
            <Link
              href="/first-read"
              className="inline-block px-6 py-3 bg-[#1A1714] text-[#F5F0E8] font-syne font-semibold text-sm hover:bg-[#2A2520] transition-colors"
            >
              Build yours free
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Live Activity */}
      <section className="bg-[#1A1714] text-[#F5F0E8] px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-4">Live Activity</p>
          <h2 className="font-syne font-bold text-3xl mb-14">LaRue is working.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <p className="font-syne font-bold text-5xl text-[#F5F0E8] mb-3">&mdash;</p>
              <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">Athlete profiles generated</p>
            </div>
            <div>
              <p className="font-syne font-bold text-5xl text-[#F5F0E8] mb-3">&mdash;</p>
              <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">Field notes published</p>
            </div>
            <div>
              <p className="font-syne font-bold text-5xl text-[#F5F0E8] mb-3">&mdash;</p>
              <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">Coaches on the VAC waitlist</p>
            </div>
          </div>
          <p className="font-inter text-sm text-[#8A8178]">
            Every profile is private. Every athlete owns their data. LaRue never sells it.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E0D9CE] px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <p className="font-syne font-bold text-lg">knwn.to</p>
            <div className="flex flex-wrap gap-6">
              <Link href="/first-read" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">Start Here</Link>
              <Link href="/field-notes" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">Field Notes</Link>
              <Link href="/book" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">The Book</Link>
              <Link href="/for-coaches" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">For Coaches</Link>
              <a href="https://momentumlabs.coach" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors">momentumlabs.coach</a>
            </div>
          </div>
          <div className="border-t border-[#E0D9CE] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-inter text-xs text-[#8A8178]">
              LaRue is an AI agent. He is not a licensed therapist or clinical psychologist.
            </p>
            <p className="font-mono text-xs text-[#8A8178] whitespace-nowrap">
              &copy; 2026 Momentum Labs
            </p>
          </div>
          <p className="font-inter text-xs text-[#8A8178] mt-3">
            Athlete data is never sold or shared without explicit consent.
          </p>
        </div>
      </footer>

    </main>
  );
}
