import Image from "next/image";
import { Metadata } from "next";
import StatBar from "@/components/ui/StatBar";
import StateHistoryChart from "@/components/knwn/StateHistoryChart";

export const metadata: Metadata = {
  title: "Jaime — knwn.to",
  robots: { index: false, follow: false },
};

// ─── DATA LAYER (hardcoded for v2 — extract to DB/CMS in v3) ─────────────────

const athlete = {
  name: "Jaime",
  age: 16,
  sport: "Soccer",
  level: "Club/Travel",
  classYear: "Class of 2026",
  lastUpdated: "January 10, 2024",
  sessionNumber: 4,
};

const voiceCard = {
  quote:
    "Be direct. I respond well to clear feedback and concrete next steps. Don't hedge. Give me something specific to do.",
  author: "Jaime",
  date: "January 2024",
};

const intention = {
  statement:
    "I want to show my coach I can perform in big moments. I'm working toward a starting position this season.",
  author: "Jaime",
};

const profileType = {
  label: "Foundation Builder",
  description:
    "Strong performance skills in development. Building the base before pressure-testing it.",
  explanation:
    "You have real coachability and confidence — those are your edge. Right now the work is building consistent access to those skills under pressure. That's what the stress management focus is for.",
  bars: [
    { label: "Foundation", value: 4, max: 6 },
    { label: "Access", value: 3, max: 6 },
  ],
};

const readiness = {
  score: 6,
  max: 10,
  stateSentence:
    "Carrying elevated load this week. Physically present, a bit scattered.",
  session: 4,
  date: "January 10, 2024",
};

const keyIndicators = [
  {
    label: "Coachability",
    value: 10,
    max: 12,
    tier: "Strength tier. Highest-leverage asset.",
    status: "strength" as const,
  },
  {
    label: "Confidence",
    value: 9,
    max: 12,
    tier: "Strength tier. Process-anchored.",
    status: "strength" as const,
  },
  {
    label: "Stress Management",
    value: 4,
    max: 12,
    tier: "Priority area. Active focus. When this moves, everything compounds.",
    status: "priority" as const,
  },
];

const buildingFocus = {
  title: "Pre-competition preparation protocol",
  target: "Consistent access to my skills under pressure",
  progress: "Early stage — building routine consistency before competition exposure.",
  note: "LaRue is tracking the arc.",
};

const acsiProfile = [
  { label: "Coachability", value: 10, max: 12, status: "strength" as const },
  { label: "Confidence", value: 9, max: 12, status: "strength" as const },
  { label: "Resilience", value: 7, max: 12, status: "developing" as const },
  { label: "Focus", value: 7, max: 12, status: "developing" as const },
  { label: "Preparation", value: 6, max: 12, status: "developing" as const },
  { label: "Performing Under Pressure", value: 5, max: 12, status: "developing" as const },
  { label: "Stress Management", value: 4, max: 12, status: "priority" as const },
];

// SessionEntry type — ready to accept real data in v3
export type SessionEntry = {
  session: number;
  date: string;
  readiness: number;
  label?: string;
};

const sessionHistory: SessionEntry[] = [
  { session: 1, date: "Nov 2023", readiness: 4 },
  { session: 2, date: "Dec 2023", readiness: 5 },
  { session: 3, date: "Jan 2024", readiness: 7 },
  { session: 4, date: "Jan 2024", readiness: 6, label: "current" },
];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "strength" | "developing" | "priority" }) {
  const map = {
    strength: { label: "Strength", color: "text-[#B8821A] bg-[#B8821A]/10" },
    developing: { label: "Developing", color: "text-[#8A8178] bg-[#8A8178]/10" },
    priority: { label: "Priority", color: "text-[#1A1714] bg-[#1A1714]/10" },
  };
  const { label, color } = map[status];
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${color}`}>
      {label}
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function JaimePage() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* NAV */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-[#E0D9CE] sticky top-0 bg-parchment z-10">
        <a href="/">
          <Image
            src="/knwn.to%20logo%20black.png"
            alt="knwn.to"
            width={100}
            height={32}
            priority
          />
        </a>
        <span className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
          Private · Last updated {athlete.lastUpdated} · Session {athlete.sessionNumber}
        </span>
      </nav>

      {/* INTRO BLOCK */}
      <div className="bg-[#1A1714] px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase mb-4">
            About This Report
          </p>
          <p className="font-inter text-[#E0D9CE] leading-relaxed mb-4">
            This is a performance profile — built session by session, in Jaime&apos;s own words.
            It is not a scouting report. It is not an evaluation. It is a record of where he is,
            what he&apos;s working on, and how he wants to be coached.
          </p>
          <p className="font-inter text-[#E0D9CE] leading-relaxed mb-4">
            Everything here comes directly from Jaime&apos;s conversations with LaRue, his AI
            performance coach. His voice, his intention, and his goals — contextualized through
            our proprietary performance framework to surface what matters most.
          </p>
          <p className="font-inter text-[#8A8178] leading-relaxed text-sm">
            This is a snapshot within a known arc. Not a verdict — a direction. Still being written.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">

        {/* ZONE 1 — ATHLETE IDENTITY */}
        <section>
          <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase mb-1">
            Powered by LaRue
          </p>
          <h1 className="font-syne font-bold text-4xl text-[#1A1714] mb-1">
            {athlete.name}
          </h1>
          <p className="font-inter text-sm text-[#8A8178]">
            {athlete.sport} · {athlete.level} · Age {athlete.age} · {athlete.classYear}
          </p>

          {/* Athlete Voice Card */}
          <div className="mt-6 bg-white border border-[#E0D9CE] rounded-lg p-6 border-l-4 border-l-[#B8821A]">
            <p className="font-mono text-[10px] text-[#B8821A] tracking-widest uppercase mb-3">
              Here&apos;s what I told LaRue about how to work with me
            </p>
            <p className="font-inter text-[#1A1714] leading-relaxed italic">
              &ldquo;{voiceCard.quote}&rdquo;
            </p>
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest mt-4">
              — {voiceCard.author}, {voiceCard.date}
            </p>
          </div>
        </section>

        {/* ZONE 2 — WHAT I'M PROVING */}
        <section>
          <div className="bg-white border border-[#E0D9CE] rounded-lg p-6">
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase mb-3">
              What I&apos;m Proving
            </p>
            <p className="font-inter text-[#1A1714] leading-relaxed">
              &ldquo;{intention.statement}&rdquo;
            </p>
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest mt-4">
              — {intention.author}
            </p>
          </div>
        </section>

        {/* ZONE 3 — PROFILE TYPE */}
        <section>
          <div className="bg-white border border-[#E0D9CE] rounded-lg p-6">
            <div className="flex items-start justify-between mb-1">
              <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                Your Athlete Type
              </p>
              <span className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                private
              </span>
            </div>
            <h2 className="font-syne font-bold text-2xl text-[#1A1714] mt-2 mb-1">
              {profileType.label}
            </h2>
            <p className="font-inter text-sm text-[#8A8178] mb-5">
              {profileType.description}
            </p>
            <div className="space-y-3 mb-5">
              {profileType.bars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#8A8178]">
                      {bar.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#8A8178]">
                      Building
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#E0D9CE] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B8821A] rounded-full"
                      style={{ width: `${(bar.value / bar.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-inter text-sm text-[#1A1714] leading-relaxed mb-4">
              {profileType.explanation}
            </p>
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest">
              This classification is for you and your coach only. It is not shared publicly.
            </p>
          </div>
        </section>

        {/* ZONE 4 — CURRENT READINESS */}
        <section>
          <div className="bg-white border border-[#E0D9CE] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                Current Readiness
              </p>
              <span className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                private
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-syne font-bold text-5xl text-[#1A1714]">
                {readiness.score}
              </span>
              <span className="font-syne font-bold text-2xl text-[#8A8178]">
                / {readiness.max}
              </span>
            </div>
            <p className="font-inter text-sm text-[#1A1714] leading-relaxed mb-4">
              {readiness.stateSentence}
            </p>
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest">
              Captured: {readiness.date} · Session {readiness.session}
            </p>
          </div>
        </section>

        {/* ZONE 5 — KEY INDICATORS */}
        <section>
          <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase mb-4">
            Key Indicators
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {keyIndicators.map((ind) => (
              <div
                key={ind.label}
                className="bg-white border border-[#E0D9CE] rounded-lg p-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-syne font-bold text-3xl text-[#1A1714]">
                    {ind.value}
                    <span className="text-base font-inter font-normal text-[#8A8178]">
                      /{ind.max}
                    </span>
                  </span>
                  <StatusBadge status={ind.status} />
                </div>
                <p className="font-inter text-sm font-medium text-[#1A1714]">{ind.label}</p>
                <p className="font-inter text-xs text-[#8A8178] leading-relaxed">{ind.tier}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ZONE 6 — WHAT I'M BUILDING */}
        <section>
          <div className="bg-white border border-[#E0D9CE] rounded-lg p-6">
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase mb-3">
              What I&apos;m Building
            </p>
            <p className="font-inter font-medium text-[#1A1714] mb-1">
              {buildingFocus.title}
            </p>
            <p className="font-inter text-sm text-[#8A8178] mb-4">
              Target: {buildingFocus.target}
            </p>
            <p className="font-inter text-sm text-[#1A1714] mb-4 leading-relaxed">
              Progress: {buildingFocus.progress}
            </p>
            <p className="font-mono text-[10px] text-[#B8821A] tracking-widest">
              {buildingFocus.note}
            </p>
          </div>
        </section>

        {/* ZONE 7 — FULL PERFORMANCE PROFILE */}
        <section>
          <div className="bg-white border border-[#E0D9CE] rounded-lg p-6">
            <div className="flex items-center justify-between mb-1">
              <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                Performance Profile
              </p>
              <span className="font-mono text-[10px] text-[#8A8178]">January 2024</span>
            </div>
            <p className="font-inter text-xs text-[#8A8178] mb-6">
              A snapshot within a known arc — not a verdict.
            </p>
            <div className="space-y-5">
              {acsiProfile.map((dim) => (
                <StatBar
                  key={dim.label}
                  label={dim.label}
                  value={dim.value}
                  max={dim.max}
                  status={dim.status}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] text-[#8A8178] tracking-widest mt-6">
              Generated by LaRue · Proprietary performance framework
            </p>
          </div>
        </section>

        {/* ZONE 8 — STATE HISTORY CHART */}
        <section>
          <div className="bg-white border border-[#E0D9CE] rounded-lg p-6">
            <div className="flex items-start justify-between mb-1">
              <p className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                Your Progress
              </p>
              <span className="font-mono text-[10px] text-[#8A8178] tracking-widest uppercase">
                private
              </span>
            </div>
            <p className="font-inter text-xs text-[#8A8178] mb-6">Readiness over time</p>
            <StateHistoryChart sessions={sessionHistory} max={10} />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-4 pb-8 border-t border-[#E0D9CE]">
          <p className="font-mono text-[10px] text-[#8A8178] tracking-widest">
            knwn.to · Powered by LaRue · Private profile
          </p>
        </footer>

      </div>
    </main>
  );
}
