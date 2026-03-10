"use client";

import { useState } from "react";
import Image from "next/image";
import { MicButton } from "@/components/mic-button";

// ─── Questions ────────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    act: 1,
    question: "What sport do you compete in, and what position or event?",
    subtext: "Include your level — high school, club, college, pro, whatever fits.",
  },
  {
    act: 1,
    question: "How long have you been competing seriously?",
    subtext: "Not just playing — competing. When did it start feeling like it mattered?",
  },
  {
    act: 1,
    question: "Describe your best performance. Not the result — the feeling.",
    subtext: "Give us the real version, not the highlight reel one.",
  },
  {
    act: 2,
    question: "What does pressure feel like in your body right before competition?",
    subtext: "Where do you feel it? What does it do to you?",
  },
  {
    act: 2,
    question: "What's the thing you do well that coaches rarely notice or mention?",
    subtext: null,
  },
  {
    act: 2,
    question: "What's the gap — the thing you know is holding you back right now?",
    subtext: "Be honest. This is the most useful answer in the whole read.",
  },
  {
    act: 2,
    question: "How do you respond when things go wrong mid-competition?",
    subtext: "Walk us through what actually happens, not what you wish happened.",
  },
  {
    act: 3,
    question: "What does a coach need to understand about you to actually coach you well?",
    subtext: "Think about a coach who got it right. What did they know?",
  },
  {
    act: 3,
    question: "What do you want from your athletic career that you haven't said out loud yet?",
    subtext: null,
  },
  {
    act: 3,
    question: "If your performance this season had a title — like a chapter in a book — what would it be?",
    subtext: "Don't overthink it. First answer is usually the right one.",
  },
];

// Acknowledgment beat shown briefly after each answer before moving on
const TRANSITION_BEATS: Record<number, string> = {
  1: "Good. Keep going.",
  2: "That's the one worth remembering.",
  3: "Most athletes don't name that until much later.",
  4: "Noted.",
  5: "That's the most useful answer in the whole read.",
  6: "That's the pattern. We'll come back to it.",
  7: "Most coaches never hear that.",
};

// ─── Types ──────────────────────────────────────────────────────────────────────────────────

type Screen =
  | "door"
  | "entry"
  | { type: "question"; index: number }
  | { type: "beat"; index: number } // transition acknowledgment
  | "act3-interstitial"
  | "pause"
  | "reveal";

// ─── Helpers ─────────────────────────────────────────────────────────────────────────────

function ActDots({ act }: { act: number }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            n === act ? "bg-[#B8821A]" : "bg-[#D0C9BF]"
          }`}
        />
      ))}
    </div>
  );
}

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const LEVEL_OPTIONS = [
  "Youth / recreational",
  "Middle school",
  "High school JV",
  "High school varsity",
  "Club / AAU",
  "College D1",
  "College D2 / D3",
  "College NAIA / JUCO",
  "Semi-pro",
  "Professional",
  "Other",
];

// ─── Component ───────────────────────────────────────────────────────────────────────────────

export default function StartPage() {
  const [screen, setScreen] = useState<Screen>("door");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(""));
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [submitError, setSubmitError] = useState("");

  // ── Navigation helpers ────────────────────────────────────────────────────────────────────

  function goToQuestion(index: number) {
    setCurrentAnswer(answers[index] || "");
    setScreen({ type: "question", index });
  }

  function handleEntrySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    goToQuestion(0);
  }

  function handleAnswerContinue(index: number) {
    const updated = [...answers];
    updated[index] = currentAnswer;
    setAnswers(updated);

    const next = index + 1;

    if (next === 10) {
      handleSubmit(updated);
      return;
    }

    // Show beat screen for questions 1–7 (indices 1–7), skip for Q0 and Q8+
    if (TRANSITION_BEATS[index + 1] && index < 7) {
      setScreen({ type: "beat", index });
      setTimeout(() => {
        if (next === 7) {
          setScreen("act3-interstitial");
        } else {
          goToQuestion(next);
        }
      }, 1800);
      return;
    }

    if (next === 7) {
      setScreen("act3-interstitial");
      return;
    }

    goToQuestion(next);
  }

  // ── Submission ──────────────────────────────────────────────────────────────────────

  async function handleSubmit(finalAnswers: string[]) {
    setScreen("pause");
    setSubmitError("");

    try {
      const res = await fetch("/api/first-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          age: age ? parseInt(age, 10) : undefined,
          gender: gender || undefined,
          sport: sport || undefined,
          position: position || undefined,
          level: level || undefined,
          answers: finalAnswers.map((a, i) => ({
            question: QUESTIONS[i].question,
            answer: a,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error || "Something went wrong.");
        setScreen({ type: "question", index: 9 });
        return;
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setScreen({ type: "question", index: 9 });
      return;
    }

    await new Promise((r) => setTimeout(r, 3000));
    setScreen("reveal");
  }

  // ── Verbatim pull for reveal card ─────────────────────────────────────────────────────────────

  function getBestLine(): string {
    for (const i of [2, 4, 5]) {
      const a = answers[i]?.trim();
      if (a && a.length > 20) {
        const firstSentence = a.split(/[.!?]/)[0]?.trim();
        if (firstSentence && firstSentence.length > 15) {
          return firstSentence.length > 120
            ? firstSentence.slice(0, 117) + "..."
            : firstSentence;
        }
      }
    }
    return "";
  }

  // ─── Screens ─────────────────────────────────────────────────────────────────────────────────

  // DOOR
  if (screen === "door") {
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-16 text-center">
        <Image
          src="/knwn.to%20logo%20black.png"
          alt="knwn.to"
          width={100}
          height={33}
          priority
          className="mb-16"
        />
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
          The First Read
        </p>
        <p className="font-inter text-base text-[#8A8178] max-w-xs mb-10 leading-relaxed">
          LaRue has read thousands of athletes.<br />He hasn&apos;t read you yet.
        </p>
        <h1 className="font-syne font-bold text-4xl md:text-5xl text-[#1A1714] leading-tight max-w-lg mb-8">
          Ten questions.<br />About twenty minutes.
        </h1>
        <p className="font-inter text-base text-[#8A8178] max-w-sm mb-12 leading-relaxed">
          At the end, a portrait of who you are as a competitor —
          written in your own words.
        </p>
        <button
          onClick={() => setScreen("entry")}
          className="px-8 py-4 bg-[#1A1714] text-white font-mono text-xs tracking-widest uppercase rounded hover:bg-[#B8821A] transition-colors mb-8"
        >
          Begin
        </button>
        <p className="font-mono text-xs text-[#D0C9BF] tracking-widest uppercase">
          Founding athlete session &mdash; {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </main>
    );
  }

  // ENTRY
  if (screen === "entry") {
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-10">
            Before we begin —
          </p>
          <form onSubmit={handleEntrySubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#1A1714] text-base">
                What&apos;s your name?
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#1A1714] text-base">
                Where do we send your First Read?
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-24">
                <label className="font-inter text-[#1A1714] text-base">Age</label>
                <input
                  type="number"
                  min={10}
                  max={99}
                  placeholder="—"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-inter text-[#1A1714] text-base">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
                >
                  <option value="">—</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#1A1714] text-base">Sport</label>
              <input
                type="text"
                placeholder="e.g. Soccer, Basketball, Swimming"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#1A1714] text-base">Position / event</label>
              <input
                type="text"
                placeholder="e.g. Point guard, Midfielder, 200m freestyle"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-inter text-[#1A1714] text-base">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors"
              >
                <option value="">—</option>
                {LEVEL_OPTIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 px-6 py-3 bg-[#1A1714] text-white font-mono text-xs tracking-widest uppercase rounded hover:bg-[#B8821A] transition-colors"
            >
              Let&apos;s go
            </button>
          </form>
        </div>
      </main>
    );
  }

  // BEAT (transition acknowledgment between questions)
  if (typeof screen === "object" && screen.type === "beat") {
    const beatText = TRANSITION_BEATS[screen.index + 1] || "Good.";
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-inter text-lg text-[#8A8178] max-w-xs leading-relaxed">
          {beatText}
        </p>
      </main>
    );
  }

  // QUESTION
  if (typeof screen === "object" && screen.type === "question") {
    const { index } = screen;
    const q = QUESTIONS[index];
    const isLast = index === 9;

    return (
      <main className="min-h-screen bg-parchment flex flex-col px-6 py-12">
        <div className="flex justify-center mb-12">
          <ActDots act={q.act} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full">
          <h2 className="font-syne font-bold text-2xl md:text-3xl text-[#1A1714] leading-snug mb-3 text-center">
            {firstName ? firstName + ", " : ""}{q.question}
          </h2>
          {q.subtext && (
            <p className="font-inter text-sm text-[#8A8178] mb-8 text-center leading-relaxed">
              {q.subtext}
            </p>
          )}

          <textarea
            autoFocus
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Write here, or tap the mic to speak..."
            rows={6}
            className="w-full mt-4 px-4 py-3 bg-white border border-[#E0D9CE] rounded text-[#1A1714] placeholder-[#8A8178] font-inter text-sm focus:outline-none focus:border-[#B8821A] transition-colors resize-none leading-relaxed"
          />

          <div className="w-full mt-3">
            <MicButton
              onTranscript={(text) =>
                setCurrentAnswer((prev) =>
                  prev.trim() ? prev.trimEnd() + " " + text : text
                )
              }
            />
          </div>

          {submitError && (
            <p className="mt-3 font-inter text-sm text-red-600">{submitError}</p>
          )}

          <div className="flex justify-end w-full mt-4">
            <button
              onClick={() => handleAnswerContinue(index)}
              disabled={!currentAnswer.trim()}
              className="px-6 py-3 bg-[#1A1714] text-white font-mono text-xs tracking-widest uppercase rounded hover:bg-[#B8821A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLast ? "Finish" : "Continue \u2192"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ACT 3 INTERSTITIAL
  if (screen === "act3-interstitial") {
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-inter text-lg text-[#8A8178] max-w-sm leading-relaxed mb-12">
          Almost there.
          <br /><br />
          These last three are the ones that matter most.
          <br />
          Take your time.
        </p>
        <button
          onClick={() => goToQuestion(7)}
          className="px-6 py-3 bg-[#1A1714] text-white font-mono text-xs tracking-widest uppercase rounded hover:bg-[#B8821A] transition-colors"
        >
          Continue &rarr;
        </button>
      </main>
    );
  }

  // PAUSE
  if (screen === "pause") {
    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#B8821A] opacity-20 animate-ping" />
            <span className="relative inline-flex w-4 h-4 rounded-full bg-[#B8821A] opacity-60" />
          </div>
          <p className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">
            Reading your First Read
          </p>
        </div>
      </main>
    );
  }

  // REVEAL
  if (screen === "reveal") {
    const bestLine = getBestLine();
    const sportDisplay = sport || answers[0]?.split(/[,.
]/)[0]?.trim() || "";

    return (
      <main className="min-h-screen bg-parchment flex flex-col">

        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center border-b border-[#E0D9CE]">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-10">
            Your First Read
          </p>
          <p className="font-syne font-bold text-3xl md:text-4xl text-[#1A1714] leading-snug max-w-lg">
            {firstName},
          </p>
          <p className="font-inter text-lg text-[#8A8178] max-w-md mt-6 leading-relaxed">
            You already know what you&apos;re capable of.
            <br /><br />
            The gap between that and what&apos;s actually happening —
            that&apos;s exactly what we&apos;re here for.
          </p>
        </section>

        <section className="flex flex-col items-center justify-center px-6 py-24 border-b border-[#E0D9CE]">
          <div className="w-full max-w-sm border border-[#E0D9CE] bg-white rounded-sm p-8 shadow-sm">
            <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">
              First Read Card
            </p>
            <p className="font-syne font-bold text-xl text-[#1A1714] mb-1">{firstName}</p>
            {sportDisplay && (
              <p className="font-inter text-sm text-[#8A8178] mb-1">{sportDisplay}{position ? ` · ${position}` : ""}</p>
            )}
            {level && (
              <p className="font-inter text-sm text-[#8A8178] mb-1">{level}</p>
            )}
            <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase mb-6">
              Founding Athlete &middot; {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            {bestLine && (
              <p className="font-inter text-sm text-[#1A1714] leading-relaxed border-t border-[#E0D9CE] pt-6 italic">
                &ldquo;{bestLine}&rdquo;
              </p>
            )}
            <p className="font-mono text-xs text-[#D0C9BF] tracking-widest uppercase mt-8">
              knwn.to
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
            What happens next
          </p>
          <p className="font-inter text-base text-[#8A8178] max-w-sm leading-relaxed">
            Within 24 hours, your First Read arrives in your inbox.
            <br /><br />
            It&apos;s a portrait of how you think, compete, and experience
            pressure — written the way you&apos;d write it if you had the
            right words.
            <br /><br />
            We read everything you wrote.
            <br />
            We&apos;ll talk to you like it.
          </p>
          <p className="font-mono text-xs text-[#D0C9BF] tracking-widest uppercase mt-16">
            knwn.to &mdash; by LaRue
          </p>
        </section>

      </main>
    );
  }

  return null;
}
