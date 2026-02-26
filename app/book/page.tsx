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
        <p className="font-inter text-base text-[#8A8178] max-w-lg mb-4 leading-relaxed">
          AI doesn&apos;t know you. knwn.to fixes that. Build your athlete
          profile, personalize your AI, and carry your full story wherever your
          game takes you.
        </p>
        <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase mb-4">
          written by Rob Yang with LaRue
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
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-2">
          Part One
        </p>
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-2">
          Why AI Doesn&apos;t Know You Yet
        </h2>
        <p className="font-inter text-sm text-[#8A8178] italic mb-10">
          What AI actually is &mdash; and why it keeps giving you advice that
          doesn&apos;t quite fit.
        </p>
        <div className="space-y-8">
          {[
            {
              num: "Chapter 1",
              title:
                "You've Talked to AI. It Didn't Really Talk to You.",
              body: "84% of people have never typed a prompt. You're in the 16% who already crossed that line — and still felt underwhelmed. That's not a failure. That's a context problem. This chapter names the gap you already feel.",
            },
            {
              num: "Chapter 2",
              title: "What AI Actually Is",
              body: "Not a technical explanation — a useful one. AI is a brilliant thinking partner with no memory of yesterday and no idea who you are. Every conversation starts from zero. Your job is to solve that problem. This chapter explains how.",
            },
            {
              num: "Chapter 3",
              title:
                "The Athlete Who Gave It Nothing vs. The Athlete Who Gave It Everything",
              body: "Two athletes. Same sport. Same question. Completely different answers — because one gave context and one didn't. This chapter shows the gap side by side, in real conversations. This is what you're building toward.",
            },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              className="border-l-2 border-[#E0D9CE] pl-6"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
                {num}
              </p>
              <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-2 leading-snug">
                {title}
              </h3>
              <p className="font-inter text-[15px] text-[#8A8178] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Part Two */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-2">
          Part Two
        </p>
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-2">
          Building Your athlete.md
        </h2>
        <p className="font-inter text-sm text-[#8A8178] italic mb-10">
          Eight sections. Eight chapters. One file that tells AI who you
          actually are. Each chapter builds one section. Each chapter ends with
          a <span className="font-semibold not-italic text-[#1A1714]">Build It Now</span> prompt — a short exercise that adds that section to
          your file. When Part Two is done, your athlete.md is done.
        </p>
        <div className="space-y-8">
          {[
            {
              num: "Chapter 4",
              title: "Who You Are as an Athlete",
              body: "Sport, position, level, what the sport means to you beyond the scoreboard. Without this, AI advises a generic competitor. With it, AI knows your role, your stakes, and what actually matters to you. This is the foundation everything else builds on.",
            },
            {
              num: "Chapter 5",
              title: "How You Actually Perform",
              body: "Start in the body. What does locked in feel like? What does tight feel like — the specific physical signal before your game slips? Results are what happened. Readiness is what you brought. AI can help you track one of those. This chapter is about the signals your stats never capture.",
            },
            {
              num: "Chapter 6",
              title: "Your Mental Game — The Honest Version",
              body: "You've been trained to project confidence your whole career. This chapter asks for the actual inner experience — how you handle failure, where confidence comes from, where it leaks. The hardest chapter to write. The most useful one in the file.",
            },
            {
              num: "Chapter 7",
              title: "What You're Working Toward",
              body: "Short-term goals, long-term goals — and why they matter to you personally. AI can make a plan for any goal. But without knowing the why, the plan feels hollow. This chapter captures the why underneath everything else.",
            },
            {
              num: "Chapter 8",
              title: "How You Like to Be Coached",
              body: "Most athletes have never been explicitly asked this. They've adapted to however their coaches communicate. AI has no ego and no preferred style — it will be exactly what you tell it to be. This chapter is the first time you get to design the communication style that actually works for you.",
            },
            {
              num: "Chapter 9",
              title: "Your History",
              body: "Injuries, transitions, setbacks, formative moments. Without history, AI treats you as a current-state athlete with no past. But a lot of what drives performance lives in history. This chapter asks you to name what's relevant — not to process it, just to name it.",
            },
            {
              num: "Chapter 10",
              title: "Right Now",
              body: "Every other section is relatively stable. This one changes. This is the section you update before competitions, after hard losses, when something shifts in your season. Five minutes the night before. What you write in those five minutes shapes every exchange that follows.",
            },
            {
              num: "Chapter 11",
              title:
                "What You Want AI to Know That Doesn't Fit Anywhere Else",
              body: "Superstitions. Rituals. The thing that always helps and you don't know why. Anything true about you that doesn't have a label. No rules. Just true things. This chapter gives you permission to be specific in a way no category captures.",
            },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              className="border-l-2 border-[#E0D9CE] pl-6"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
                {num}
              </p>
              <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-2 leading-snug">
                {title}
              </h3>
              <p className="font-inter text-[15px] text-[#8A8178] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Part Three */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-2">
          Part Three
        </p>
        <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-2">
          What the File Becomes
        </h2>
        <p className="font-inter text-sm text-[#8A8178] italic mb-10">
          The file is built. Here&apos;s what happens when you use it.
        </p>
        <div className="space-y-8">
          {[
            {
              num: "Chapter 12",
              title: "Your First Real Conversation",
              body: "You've built the file. Now you bring it to LaRue. She reads it, reflects back what she sees, and asks what's missing. This chapter walks you through that first session — and explains why it will feel different from every AI conversation you've had before.",
            },
            {
              num: "Chapter 13",
              title: "What AI Cannot Do",
              body: "The honesty chapter. Your values, your identity work, your relationships, the moment itself — those belong to you, not AI. Understanding exactly what LaRue can't do makes everything she can do more useful. This chapter draws the line clearly so you never have to wonder where it is.",
            },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              className="border-l-2 border-[#E0D9CE] pl-6"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
                {num}
              </p>
              <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-2 leading-snug">
                {title}
              </h3>
              <p className="font-inter text-[15px] text-[#8A8178] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* What you close the book with */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
          What you close the book with
        </p>
        <div className="space-y-4">
          {[
            "A completed athlete.md",
            "A first AI conversation that felt different from any you've had before",
            "A file that travels with you when you change coaches, change programs, or change sports",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="font-mono text-xs text-[#B8821A] tracking-widest pt-1 flex-shrink-0">
                0{i + 1}
              </span>
              <p className="font-inter text-[16px] text-[#1A1714] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* athlete.md template */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
          The Complete athlete.md Template
        </p>
        <p className="font-inter text-sm text-[#8A8178] italic mb-6">
          Copy this. Fill it in. Make it yours.
        </p>
        <pre className="bg-white border border-[#E0D9CE] rounded-lg p-6 font-mono text-xs text-[#1A1714] leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`# athlete.md
Last updated: [date]

## Identity
[Sport, position, level, years competing, what the sport means to you]

## Performance Profile
[What locked in feels like in your body. What tight feels like.
Your warning signs before performance dips. What tends to derail you.
What you do well under pressure.]

## Mental Performance Patterns
[How you handle failure, your inner critic, where confidence comes from and leaks]

## Goals and Timeline
[Short-term, long-term, why they matter — include a process goal and an identity goal]

## Communication and Coaching Style
[How you receive feedback, what shuts you down, push vs. pull, preferred AI tone]

## Background and Context
[Key history, injuries, transitions, formative moments — what a new coach wouldn't know]

## Current State
Updated: [date]
[How you're feeling physically and mentally, what's on your mind, what you need right now]

## Other Things to Know
[Anything true about you that doesn't fit above]`}
        </pre>
      </section>

      <Divider />

      {/* Appendices */}
      <section className="px-6 py-16 max-w-2xl mx-auto w-full space-y-12">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
            Appendix A
          </p>
          <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-3">
            How to Load athlete.md Into Any AI
          </h3>
          <p className="font-inter text-[15px] text-[#8A8178] leading-relaxed">
            ChatGPT and Claude: paste your file at the start of any conversation
            and say &ldquo;this is my context file, use it throughout our
            conversation.&rdquo; LaRue reads athlete.md natively — your file
            connects across sessions and the relationship builds over time. Any
            AI that accepts text input can use your file. It&apos;s yours,
            it&apos;s portable, and it works everywhere.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
            Appendix B
          </p>
          <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-3">
            Keeping It Current
          </h3>
          <p className="font-inter text-[15px] text-[#8A8178] leading-relaxed">
            The stable sections — Identity, Performance Profile, Mental
            Patterns, Communication Style, Background — change slowly. Revisit
            each season or after something significant shifts. Current State
            updates before every important AI conversation. If your responses
            start feeling generic again, your Current State is out of date.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
            Appendix C
          </p>
          <h3 className="font-syne font-semibold text-lg text-[#1A1714] mb-3">
            What Comes Next
          </h3>
          <p className="font-inter text-[15px] text-[#8A8178] leading-relaxed">
            A static athlete.md is the foundation. It works with any AI, travels
            with you, and gives LaRue what she needs for a first session. For
            athletes who want their file to update continuously — through
            check-ins, connected devices like Oura or Whoop, and session history
            — that path starts here.
          </p>
        </div>
      </section>

      {/* Chapter 1 preview teaser */}
      <div className="px-6 max-w-2xl mx-auto w-full pb-8">
        <Link
          href="/read"
          className="group block bg-white border border-[#E0D9CE] rounded-lg p-8 hover:border-[#B8821A] transition-colors"
        >
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-3">
            Read a preview
          </p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4 leading-snug">
            Chapter 1 &mdash; You&apos;ve Talked to AI.
            <br />
            It Didn&apos;t Really Talk to You.
          </h2>
          <p className="font-inter text-sm text-[#8A8178] leading-relaxed mb-6">
            Every conversation with an AI starts from zero. It doesn&apos;t
            remember what you told it last week. It doesn&apos;t know your
            sport, your position, your team, your history&hellip;
          </p>
          <span className="font-mono text-xs text-[#B8821A] tracking-widest uppercase group-hover:underline">
            Read Chapter 1 &rarr;
          </span>
        </Link>
      </div>

      {/* Bottom CTA */}
      <section className="px-6 py-16 flex flex-col items-center text-center bg-white border-t border-[#E0D9CE]">
        <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-4">
          This is a work in progress. So is your athlete.md.
        </p>
        <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-4 max-w-xl leading-snug">
          We&apos;re building this book the same way you&apos;ll use it.
        </h2>
        <p className="font-inter text-sm text-[#8A8178] max-w-md mb-3">
          By being honest about where we are and what we don&apos;t know yet.
        </p>
        <p className="font-inter text-sm text-[#8A8178] max-w-sm mb-10">
          $29 at launch. Get notified the moment it&apos;s available.
        </p>
        <EmailForm submitted={submitted} setSubmitted={setSubmitted} />
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-[#E0D9CE] flex items-center justify-between">
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          &copy; 2026 knwn.to
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://dexscreener.com/base/0x6cda1d74c964f2660336b74a7f93436656324da7473c5008a7a2696c8ac3a85b"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase"
          >
            $STATE
          </a>
          <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            knwn.to
          </span>
        </div>
      </footer>
    </main>
  );
}
