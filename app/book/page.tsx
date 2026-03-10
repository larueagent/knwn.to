"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleBuy = async () => {
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) { setError(data.error || "Something went wrong. Please try again."); setLoading(false); return; }
      window.location.href = data.url;
    } catch { setError("Something went wrong. Please try again."); setLoading(false); }
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={handleBuy} disabled={loading} className="px-8 py-4 bg-[#B8821A] text-white font-syne font-semibold text-base rounded hover:bg-[#a07115] transition-colors disabled:opacity-60 whitespace-nowrap">
        {loading ? "Redirecting..." : "Buy Now — $29"}
      </button>
      {error && <p className="font-inter text-sm text-red-500">{error}</p>}
      <p className="font-inter text-xs text-[#8A8178]">Instant download. Secure checkout via Stripe.</p>
    </div>
  );
}

const Divider = () => (<div className="px-6 max-w-2xl mx-auto w-full"><hr className="border-[#E0D9CE]" /></div>);

const chapters = [
  { part: "Intro", title: "A Note Before You Start", body: "Robert Yang introduces LaRue — an AI coach built specifically for competitive athletes — and frames the book's core deliverable: your athlete.md, a file that tells AI who you actually are." },
  { part: "Part One — The New Landscape", title: "Chapter 1: You've Talked to AI. It Didn't Really Talk to You.", body: "Explains why every AI conversation starts from zero — AI has no memory of who you are, so it defaults to generic advice that misses your specific situation. Introduces athlete.md as a context file you own, can read, can share, and carry to any AI tool." },
  { part: null, title: "Chapter 2: What's Possible When It Knows You", body: "Shows two real First Read portraits to demonstrate what AI conversations look like when context is loaded. Describes the six sections every portrait contains and lays out the two paths to building your own." },
  { part: null, title: "Chapter 3: Who You Are as an Athlete", body: "Builds the first section of athlete.md: Identity. Guides athletes through articulating not just their sport and position, but what being an athlete actually means to them — the honest version, not the college essay version." },
  { part: "Part Two — Building the Athlete", title: "Chapter 4: How You Actually Perform", body: "Builds your Performance Profile. Walks you through identifying what 'locked in' feels like in your body, your personal warning signs, what specifically derails you, and what you do well under pressure." },
  { part: null, title: "Chapter 5: Your Mental Game — The Honest Version", body: "Builds your Mental Performance Patterns. Addresses the gap between the public game athletes project and the private game that's actually happening — covering how you handle failure, what your inner critic says, and where confidence leaks." },
  { part: null, title: "Chapter 6: What You're Working Toward", body: "Builds your Goals and Timeline section. Distinguishes between outcome goals, process goals, and identity goals — and argues that the 'why' underneath each goal is what AI actually needs to give you useful help." },
  { part: null, title: "Chapter 7: How You Like to Be Coached", body: "Builds your Communication and Coaching Style section. Because AI has no ego, you can tell it exactly how you receive feedback best — and it will follow those instructions consistently, without a bad day getting in the way." },
  { part: "Part Three — What's Possible Now", title: "Chapter 8: Your History and Right Now", body: "Builds the final two sections: Background (injuries, formative moments, what a new coach wouldn't know) and Current State — the section LaRue reads first before every session." },
  { part: null, title: "Chapter 9: Your First Read", body: "Walks through what happens when LaRue reads your completed portrait. Explains the First Read process and how to use your portrait in a conversation — including the specific opening prompt that sets AI up to draw from your file rather than its defaults." },
  { part: null, title: "Chapter 10: What AI Can and Can't Do", body: "The honest chapter on AI's limits. Clearly names what AI does well and what it cannot do: make decisions, be present in the competitive moment, or replace human relationships. Closes with a simple check: 'Am I using this to think more clearly, or to avoid thinking?'" },
];

function ChapterList() {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-2xl w-full">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-left group">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A]">10 Chapters — Full Roadmap</p>
        <span className="font-mono text-xs text-[#8A8178] group-hover:text-[#B8821A] transition-colors">{open ? "collapse ↑" : "expand ↓"}</span>
      </button>
      {open && (
        <div className="mt-8 flex flex-col gap-6">
          {chapters.map(({ part, title, body }) => (
            <div key={title}>
              {part && <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3 mt-2">{part}</p>}
              <p className="font-syne font-semibold text-[#1A1714] mb-1">{title}</p>
              <p className="font-inter text-sm text-[#8A8178] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col">
      <Nav />
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">For athletes serious about what comes next</p>
        <h1 className="font-syne font-bold text-4xl sm:text-5xl text-[#1A1714] mb-4 leading-tight">AI and Athletes</h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl mb-3">AI doesn&apos;t know you. Yet.</p>
        <p className="font-inter text-base text-[#8A8178] max-w-lg mb-10">Every young athlete will use AI. The ones who get the most out of it won&apos;t have the best tools — they&apos;ll be the ones with an AI that actually knows them. This book shows you how to get there. It starts with one document: your athlete.md.</p>
        <BuyButton />
      </section>
      <Divider />
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4 text-center">What you get</p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10 text-center">The practical guide to being known by AI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Why AI fails most athletes", body: "Generic AI gives generic answers. It doesn't know you. Learn why — and what to do about it." },
              { title: "Build your athlete.md", body: "A plain text identity document that makes every AI session start from who you actually are." },
              { title: "Prompts that actually work", body: "Tested prompts for training, recovery, mindset, and competition prep — built around your profile." },
              { title: "Own it, take it anywhere", body: "Your athlete.md isn't locked in an app. Use it with ChatGPT, Claude, LaRue — any AI, any time." },
            ].map(({ title, body }) => (
              <div key={title} className="p-6 border border-[#E0D9CE] rounded">
                <p className="font-syne font-semibold text-[#1A1714] mb-2">{title}</p>
                <p className="font-inter text-sm text-[#8A8178] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col items-center px-6 py-14"><ChapterList /></section>
      <Divider />
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">The core idea</p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4">AI is already in your sport.</h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">Scouts use it. Coaches use it. Recruiters use it. The athletes who thrive won&apos;t just be faster — they&apos;ll be the ones who know how to be known.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">The athletes who will outperform in the next decade aren&apos;t just mentally tough — they&apos;re self-aware enough to use every tool available, including AI, to know themselves better. That self-knowledge is a skill. This book teaches it.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed">This book is the guide. LaRue is the shortcut to building your profile. The athlete.md is yours to keep.</p>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">About</p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4">Written by Robert Yang with LaRue</h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">Robert Yang is the founder of Mettle Performance and the creator of LaRue — an AI agent trained on mental performance in sport. Mettle&apos;s methodology was built with sport psychologist Alex Auerbach, Ph.D., drawing on 15+ years of work with competitive athletes at every level. This book is the synthesis of that work, distilled into something any athlete can act on today.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed">LaRue contributed the research, the structure, and the prompts. Robert contributed the reps.</p>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Questions</p>
          <div className="flex flex-col gap-8">
            {[
              { q: "Isn't LaRue just organizing my answers?", a: "No — and this is the part worth understanding. You answer 10 questions in your own words. What LaRue produces isn't a summary of your answers. It's an interpretation of what your answers reveal about how you compete. He's trained on 15 years of sport psychology work — the patterns that show up in athletes who rise under pressure vs. athletes who don't, what specific language signals about readiness, how different pressure responses require different preparation. Your words go in. That framework comes out. The portrait you get isn't your answers organized. It's a picture of you that most athletes have never seen — because nobody's ever held their patterns up against that body of knowledge before." },
              { q: "Do I need the book to use LaRue?", a: "No. The First Read builds your athlete.md for free in 10 minutes. The book goes deeper on why it works and how to get more from every AI interaction. Most athletes do the First Read first." },
              { q: "What format is the book?", a: "PDF. Instant download after purchase." },
              { q: "Do I need to be a pro athlete?", a: "No. This is for any competitive athlete — high school, college, adult amateur, or professional." },
              { q: "What AI tools does this work with?", a: "ChatGPT, Claude, Gemini, LaRue, and any other large language model. The athlete.md approach is tool-agnostic." },
              { q: "What's the relationship between the book and LaRue?", a: "The book teaches the literacy. LaRue is the fastest way to build your athlete.md and put it to work. You can read the book without using LaRue — but LaRue makes it real." },
              { q: "Is there a refund policy?", a: "Yes. If you're not satisfied within 7 days, email us and we'll refund you in full." },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="font-syne font-semibold text-[#1A1714] mb-2">{q}</p>
                <p className="font-inter text-base text-[#8A8178] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col items-center text-center px-6 py-16">
        <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-4">AI doesn&apos;t know you yet.</h2>
        <p className="font-inter text-base text-[#8A8178] max-w-md mb-4">That changes when you give it something worth knowing.</p>
        <p className="font-inter text-sm text-[#8A8178] max-w-md mb-8">Start with your athlete.md — free, 10 minutes.{" "}<Link href="/first-read" className="text-[#B8821A] hover:underline">Build yours here.</Link></p>
        <BuyButton />
      </section>
      <footer className="mt-auto px-6 py-8 border-t border-[#E0D9CE]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
            <Link href="/first-read" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Start Here</Link>
            <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
            <Link href="/for-coaches" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">For Coaches</Link>
          </div>
          <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">Powered by Mettle</p>
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <p className="font-mono text-xs text-[#C8BFB5]">LaRue is an AI agent. He is not a licensed therapist or clinical psychologist. AI-powered. Real coaches available when you need them.{" "}&copy; 2026 Mettle Performance. Athlete data is never sold or shared without explicit consent.</p>
        </div>
      </footer>
    </main>
  );
}
