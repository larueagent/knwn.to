"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MicButton } from "@/components/mic-button";

const QUESTIONS = [
  {
    text: "{firstName}, what does it feel like when you're in flow?",
    subtext: "The moments when everything clicks. When the game slows down.",
    act: 1,
  },
  {
    text: "What do you think about when you're alone?",
    subtext: "The quiet thoughts. The ones you don't always say out loud.",
    act: 1,
  },
  {
    text: "What's something you believe that most people in your sport don't?",
    subtext: "An edge. A conviction. Something you know that others miss.",
    act: 1,
  },
  {
    text: "When have you felt most like yourself in competition?",
    subtext: "A moment when you weren't performing — you were just being.",
    act: 2,
  },
  {
    text: "What's a question you wish someone would ask you?",
    subtext: "The thing people don't see. The question that would unlock something.",
    act: 2,
  },
  {
    text: "What scares you about your sport?",
    subtext: "Not the physical risk. The other kind.",
    act: 2,
  },
  {
    text: "What do you want to be known for?",
    subtext: "Not the stats. Not the highlights. The legacy.",
    act: 2,
  },
  {
    text: "What's a memory from your sport that nobody else would remember?",
    subtext: "A small moment. One that stayed with you.",
    act: 3,
  },
  {
    text: "What would you tell your younger self about this journey?",
    subtext: "The advice. The warning. The encouragement.",
    act: 3,
  },
  {
    text: "What do you know now that you couldn't have known before?",
    subtext: "The hard-won insight. The thing only experience teaches.",
    act: 3,
  },
];

const TRANSITION_BEATS: Record<number, string> = {
  1: "LaRue leans forward.",
  2: "He nods.",
  3: "Something shifts.",
  4: "He's tracking something.",
  5: "He makes a note.",
  6: "He looks up.",
  7: "He pauses.",
};

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
];

const LEVEL_OPTIONS = [
  "Youth / Club (under 14)",
  "Youth / Club (14\u201318)",
  "Middle School",
  "High School JV",
  "High School Varsity",
  "Prep / Post-Grad",
  "College / NCAA D1",
  "College / NCAA D2",
  "College / NCAA D3",
  "College / NAIA / JUCO",
  "Semi-Pro",
  "Professional",
  "Olympic / National Team",
  "Other",
];

const SPORT_OPTIONS = [
  "Baseball",
  "Basketball",
  "Cross Country",
  "Football",
  "Golf",
  "Gymnastics",
  "Hockey (Field)",
  "Hockey (Ice)",
  "Lacrosse",
  "Rowing",
  "Rugby",
  "Soccer",
  "Softball",
  "Swimming & Diving",
  "Tennis",
  "Track & Field",
  "Volleyball",
  "Water Polo",
  "Wrestling",
  "Other",
];

const POSITION_OPTIONS: Record<string, string[]> = {
  Baseball: ["Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Left Field", "Center Field", "Right Field", "Designated Hitter"],
  Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  "Cross Country": ["Runner"],
  Football: ["Quarterback", "Running Back", "Fullback", "Wide Receiver", "Tight End", "Offensive Line", "Defensive End", "Defensive Tackle", "Linebacker", "Cornerback", "Safety", "Kicker", "Punter", "Long Snapper"],
  Golf: ["Golfer"],
  Gymnastics: ["All-Around", "Floor", "Beam", "Vault", "Bars (Uneven / Parallel)", "Rings", "Pommel Horse"],
  "Hockey (Field)": ["Forward", "Midfielder", "Defender", "Goalkeeper"],
  "Hockey (Ice)": ["Center", "Left Wing", "Right Wing", "Defenseman", "Goaltender"],
  Lacrosse: ["Attack", "Midfield", "Defense", "Goalie", "Face-Off Specialist", "Long Stick Midfield"],
  Rowing: ["Sweep Rower", "Sculler", "Coxswain"],
  Rugby: ["Prop", "Hooker", "Lock", "Flanker", "Number 8", "Scrum-Half", "Fly-Half", "Center", "Wing", "Fullback"],
  Soccer: ["Goalkeeper", "Center Back", "Full Back", "Wing Back", "Defensive Mid", "Central Mid", "Attacking Mid", "Winger", "Striker", "Second Striker"],
  Softball: ["Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Left Field", "Center Field", "Right Field"],
  "Swimming & Diving": ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "Individual Medley", "Distance Freestyle", "Sprint Freestyle", "Diving"],
  Tennis: ["Singles", "Doubles", "Mixed Doubles"],
  "Track & Field": ["100m", "200m", "400m", "800m", "1500m / Mile", "3000m Steeplechase", "5000m", "10000m", "110/100m Hurdles", "400m Hurdles", "4x100m Relay", "4x400m Relay", "High Jump", "Pole Vault", "Long Jump", "Triple Jump", "Shot Put", "Discus", "Hammer", "Javelin", "Heptathlon / Decathlon"],
  Volleyball: ["Outside Hitter", "Opposite Hitter", "Middle Blocker", "Setter", "Libero", "Defensive Specialist"],
  "Water Polo": ["Center", "Wing", "Driver", "Point", "Goalkeeper"],
  Wrestling: ["Freestyle", "Greco-Roman", "Folkstyle"],
  Other: ["Other"],
};

const STORAGE_KEY = "larue_first_read_draft";

type Screen =
  | "door"
  | "entry"
  | "context"
  | { type: "question"; index: number }
  | { type: "beat"; index: number }
  | "act3-interstitial"
  | "submitting"
  | "success";

function ActDots({ currentIndex }: { currentIndex: number }) {
  const currentAct = QUESTIONS[currentIndex].act;
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((act) => (
        <div
          key={act}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            act === currentAct
              ? "w-8 bg-[#B8821A]"
              : act < currentAct
              ? "w-1.5 bg-[#B8821A]/40"
              : "w-1.5 bg-[#E0D9CE]"
          }`}
        />
      ))}
    </div>
  );
}

export default function StartPage() {
  const [screen, setScreen] = useState<Screen>("door");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Load saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.firstName) setFirstName(draft.firstName);
        if (draft.email) setEmail(draft.email);
        if (draft.birthMonth) setBirthMonth(draft.birthMonth);
        if (draft.birthDay) setBirthDay(draft.birthDay);
        if (draft.birthYear) setBirthYear(draft.birthYear);
        if (draft.gender) setGender(draft.gender);
        if (draft.sport) setSport(draft.sport);
        if (draft.position) setPosition(draft.position);
        if (draft.level) setLevel(draft.level);
        if (draft.answers) setAnswers(draft.answers);
      }
    } catch (_) {}
  }, []);

  // Save draft on every change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ firstName, email, birthMonth, birthDay, birthYear, gender, sport, position, level, answers })
      );
    } catch (_) {}
  }, [firstName, email, birthMonth, birthDay, birthYear, gender, sport, position, level, answers]);

  const clearDraft = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  };

  const goToQuestion = (index: number) => {
    setScreen({ type: "question", index });
    setCurrentAnswer(answers[index] ?? "");
    setSubmitError("");
  };

  const handleEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setScreen("context");
  };

  const handleContextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToQuestion(0);
  };

  const handleBack = () => {
    if (typeof screen === "object" && screen.type === "question") {
      const idx = screen.index;
      if (idx === 0) {
        setScreen("context");
      } else {
        goToQuestion(idx - 1);
      }
    }
  };

  const handleAnswerContinue = () => {
    if (!currentAnswer.trim()) {
      setSubmitError("Please share your answer before continuing.");
      return;
    }

    const currentIndex = typeof screen === "object" && screen.type === "question" ? screen.index : 0;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = currentAnswer;
    setAnswers(newAnswers);
    const nextIndex = currentIndex + 1;

    if (nextIndex < QUESTIONS.length) {
      if (nextIndex === 7) {
        setScreen("act3-interstitial");
      } else if (TRANSITION_BEATS[nextIndex]) {
        setScreen({ type: "beat", index: nextIndex });
      } else {
        goToQuestion(nextIndex);
      }
    } else {
      handleSubmit(newAnswers);
    }
  };

  useEffect(() => {
    if (typeof screen === "object" && screen.type === "beat") {
      const timer = setTimeout(() => {
        goToQuestion(screen.index);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === "act3-interstitial") {
      const timer = setTimeout(() => {
        goToQuestion(7);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleSubmit = async (finalAnswers: string[]) => {
    setScreen("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/first-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          birthdate:
            birthMonth && birthDay && birthYear
              ? `${birthYear}-${birthMonth}-${birthDay}`
              : undefined,
          gender: gender || undefined,
          sport: sport || undefined,
          position: position || undefined,
          level: level || undefined,
          answers: finalAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      clearDraft();
      setScreen("success");
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
      setScreen({ type: "question", index: QUESTIONS.length - 1 });
    }
  };

  const getBestLine = () => {
    const lines = [
      "The way you answered question three.",
      "Your clarity on what scares you.",
      "How you described being in flow.",
      "That memory nobody else would remember.",
      "What you said about being known.",
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  };

  // DOOR SCREEN
  if (screen === "door") {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-12 flex justify-center">
            <Image
              src="/knwn.to-logo-black.png"
              alt="knwn.to"
              width={120}
              height={40}
              className="opacity-90"
            />
          </div>

          <div className="mb-3 text-sm font-mono text-[#8A8178] tracking-wide uppercase">
            The First Read
          </div>

          <p className="text-lg font-inter text-[#8A8178] mb-6 leading-relaxed">
            LaRue has read thousands of athletes. He hasn't read you yet.
          </p>

          <h1 className="text-5xl md:text-6xl font-syne font-bold text-[#1A1714] mb-8 leading-tight">
            Ten questions. About twenty minutes.
          </h1>

          <p className="text-xl font-inter text-[#1A1714]/80 mb-12 leading-relaxed max-w-xl mx-auto">
            This isn't a survey. It's a conversation. LaRue will ask. You'll
            answer. By the end, he'll know something about you that nobody else
            does.
          </p>

          <button
            onClick={() => setScreen("entry")}
            className="px-8 py-4 bg-[#1A1714] text-white font-inter font-medium rounded-sm hover:bg-[#1A1714]/90 transition-colors text-lg"
          >
            Begin
          </button>

          <p className="mt-8 text-sm font-mono text-[#8A8178] tracking-wide">
            Founding Athlete Session \u2014 March 2026
          </p>
        </div>
      </div>
    );
  }

  // ENTRY SCREEN
  if (screen === "entry") {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-12 flex justify-center">
            <Image
              src="/knwn.to-logo-black.png"
              alt="knwn.to"
              width={100}
              height={33}
              className="opacity-90"
            />
          </div>

          <h2 className="text-3xl font-syne font-bold text-[#1A1714] mb-3 text-center">
            First, the basics
          </h2>
          <p className="text-center text-[#8A8178] font-inter mb-8">
            How should LaRue address you?
          </p>

          <form onSubmit={handleEntrySubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
                placeholder="Your first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#1A1714] text-white font-inter font-medium rounded-sm hover:bg-[#1A1714]/90 transition-colors"
            >
              Next \u2192
            </button>
          </form>
        </div>
      </div>
    );
  }

  // CONTEXT SCREEN
  if (screen === "context") {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-12 flex justify-center">
            <Image
              src="/knwn.to-logo-black.png"
              alt="knwn.to"
              width={100}
              height={33}
              className="opacity-90"
            />
          </div>

          <h2 className="text-3xl font-syne font-bold text-[#1A1714] mb-3 text-center">
            A little more context
          </h2>
          <p className="text-center text-[#8A8178] font-inter mb-8">
            Your answers help LaRue start in the right place.
          </p>

          <form onSubmit={handleContextSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                Date of Birth
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="px-3 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
                >
                  <option value="">Month</option>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m, i) => (
                    <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                  ))}
                </select>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="px-3 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={String(d).padStart(2, "0")}>{d}</option>
                  ))}
                </select>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="px-3 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 8 - i).map((y) => (
                    <option key={y} value={String(y)}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
              >
                <option value="">Select (optional)</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                Sport
              </label>
              <select
                value={sport}
                onChange={(e) => { setSport(e.target.value); setPosition(""); }}
                className="w-full px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
              >
                <option value="">Select sport (optional)</option>
                {SPORT_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {sport && POSITION_OPTIONS[sport] && (
              <div>
                <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                  Position / Event
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
                >
                  <option value="">Select position (optional)</option>
                  {POSITION_OPTIONS[sport].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-inter font-medium text-[#1A1714] mb-2">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
              >
                <option value="">Select (optional)</option>
                {LEVEL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#1A1714] text-white font-inter font-medium rounded-sm hover:bg-[#1A1714]/90 transition-colors"
            >
              Let's go
            </button>

            <button
              type="button"
              onClick={() => goToQuestion(0)}
              className="w-full text-center text-[#8A8178] font-inter text-sm hover:text-[#1A1714] transition-colors"
            >
              Skip
            </button>
          </form>
        </div>
      </div>
    );
  }

  // BEAT SCREEN
  if (typeof screen === "object" && screen.type === "beat") {
    const beatMessage = TRANSITION_BEATS[screen.index];
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-2xl font-inter italic text-[#8A8178]">
            {beatMessage}
          </p>
        </div>
      </div>
    );
  }

  // QUESTION SCREEN
  if (typeof screen === "object" && screen.type === "question") {
    const questionIndex = screen.index;
    const question = QUESTIONS[questionIndex];
    const isLastQuestion = questionIndex === QUESTIONS.length - 1;
    const personalizedText = question.text.replace("{firstName}", firstName);

    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors mb-10"
          >
            <span>\u2190</span> Back
          </button>

          <ActDots currentIndex={questionIndex} />

          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-[#1A1714] mb-4 leading-tight">
              {personalizedText}
            </h2>
            {question.subtext && (
              <p className="text-lg font-inter text-[#8A8178] leading-relaxed">
                {question.subtext}
              </p>
            )}
          </div>

          <div className="mb-6">
            <textarea
              value={currentAnswer}
              onChange={(e) => {
                setCurrentAnswer(e.target.value);
                setSubmitError("");
              }}
              className="w-full h-48 px-4 py-3 border border-[#E0D9CE] rounded-sm bg-white font-inter text-[#1A1714] resize-none focus:outline-none focus:ring-2 focus:ring-[#B8821A]/20 focus:border-[#B8821A]"
              placeholder="Take your time..."
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <MicButton
              onTranscript={(transcript) => {
                setCurrentAnswer(transcript);
                setSubmitError("");
              }}
            />

            <button
              onClick={handleAnswerContinue}
              className="flex-1 px-6 py-3 bg-[#1A1714] text-white font-inter font-medium rounded-sm hover:bg-[#1A1714]/90 transition-colors"
            >
              {isLastQuestion ? "Finish" : "Continue"}
            </button>
          </div>

          {submitError && (
            <p className="mt-4 text-sm text-red-600 font-inter text-center">
              {submitError}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ACT 3 INTERSTITIAL
  if (screen === "act3-interstitial") {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2">
              {[1, 2].map((act) => (
                <div
                  key={act}
                  className="h-1.5 w-1.5 rounded-full bg-[#B8821A]/40"
                />
              ))}
              <div className="h-1.5 w-8 rounded-full bg-[#B8821A] animate-pulse" />
            </div>
          </div>
          <p className="text-2xl font-syne font-medium text-[#1A1714]">
            Act Three
          </p>
          <p className="text-lg font-inter italic text-[#8A8178] mt-2">
            The final questions.
          </p>
        </div>
      </div>
    );
  }

  // SUBMITTING SCREEN
  if (screen === "submitting") {
    return (
      <main className="min-h-screen bg-[#1A1714] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">LaRue \u00b7 First Read</p>
        <p className="font-serif text-xl text-[#FAF7F2] italic opacity-80">
          Reading your file...
        </p>
      </main>
    );
  }

  // SUCCESS SCREEN
  if (screen === "success") {
    return (
      <main className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">LaRue \u00b7 First Read</p>
          <h2 className="font-serif text-3xl text-[#1A1714] leading-tight mb-6">
            Your file is ready.
          </h2>
          <p className="text-[#6B6560] text-sm leading-relaxed mb-3">
            Check your email \u2014 your LaRue file is on its way to <span className="text-[#1A1714] font-medium">{email}</span>.
          </p>
          <p className="text-[#8A8178] text-xs leading-relaxed mb-10">
            It may take a few minutes to arrive. Check your spam folder if you don't see it.
          </p>
          <a
            href="https://knwn.to"
            className="inline-block font-mono text-xs tracking-widest uppercase text-[#8A8178] hover:text-[#1A1714] transition-colors border-b border-[#E0D9CE] pb-0.5"
          >
            Return to knwn.to
          </a>
        </div>
      </main>
    );
  }

  return null;
}
