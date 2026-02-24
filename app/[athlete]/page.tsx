import AthleteHero from "@/components/knwn/AthleteHero";
import StatBar from "@/components/ui/StatBar";
import MetricCard from "@/components/ui/MetricCard";
import { notFound } from "next/navigation";

// Static athlete data — replace with DB later
const athletes: Record<string, AthleteData> = {
  jaime: {
    handle: "jaime",
    name: "Jaime",
    sport: "Competitive Sport",
    school: "University",
    year: "Class of 2026",
    position: "Position",
    hometown: "Hometown, State",
    bio: [
      "Jaime is a competitive athlete known for exceptional coachability and process-anchored confidence. A consistent performer who approaches correction as information, not criticism — one of the highest-leverage traits in any program.",
      "Currently developing resilience under sustained pressure and building a consistent pre-competition mental preparation protocol. Not a character issue — an exposure and structure issue. LaRue is tracking the arc.",
      "Stress management is the priority area. When it's addressed, every other dimension in the profile will compound. Jaime knows this and is working on it deliberately.",
    ],
    metrics: [
      {
        value: "10/12",
        label: "Coachability",
        context: "Highest-leverage trait. Strength tier.",
      },
      {
        value: "9/12",
        label: "Confidence",
        context: "Stable, process-anchored. Not externally dependent.",
      },
      {
        value: "4/12",
        label: "Stress Mgmt",
        context: "Priority area. Actively developing recovery practices.",
      },
      {
        value: "6",
        label: "Readiness",
        context: "Current state. Carrying elevated load this week.",
      },
    ],
    acsi: [
      { label: "Coachability", value: 10, status: "strength" },
      { label: "Confidence", value: 9, status: "strength" },
      { label: "Resilience", value: 7, status: "developing" },
      { label: "Focus", value: 7, status: "developing" },
      { label: "Mental Preparation", value: 6, status: "developing" },
      { label: "Performing Under Pressure", value: 5, status: "developing" },
      { label: "Stress Management", value: 4, status: "priority" },
    ],
    assessmentDate: "January 2024",
    generatedBy: "LaRue",
  },
};

interface AthleteData {
  handle: string;
  name: string;
  sport: string;
  school?: string;
  year?: string;
  position: string;
  hometown: string;
  bio: string[];
  metrics: { value: string; label: string; context?: string }[];
  acsi: { label: string; value: number; status: "strength" | "developing" | "priority" }[];
  assessmentDate: string;
  generatedBy: string;
}

export function generateMetadata({ params }: { params: { athlete: string } }) {
  const data = athletes[params.athlete.toLowerCase()];
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.name} — knwn.to`,
    description: `${data.name}'s athlete identity profile. ${data.sport}. Powered by LaRue.`,
  };
}

export default function AthletePage({
  params,
}: {
  params: { athlete: string };
}) {
  const data = athletes[params.athlete.toLowerCase()];
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-parchment">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-[#E0D9CE]">
        <a
          href="/"
          className="font-syne font-bold text-lg tracking-tight text-[#1A1714] hover:text-[#B8821A] transition-colors"
        >
          KNWN.TO
        </a>
        <span className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          by LaRue
        </span>
      </nav>

      <div className="max-w-3xl mx-auto px-6">
        {/* Hero */}
        <AthleteHero
          name={data.name}
          sport={data.sport}
          school={data.school}
          year={data.year}
          handle={data.handle}
        />

        {/* Identity bar */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 py-5 border-y border-[#E0D9CE] mb-12">
          {[data.position, data.hometown, data.sport].map((item) => (
            <span
              key={item}
              className="font-mono text-xs tracking-widest uppercase text-[#8A8178]"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Bio */}
        <section className="mb-16">
          {data.bio.map((para, i) => (
            <p
              key={i}
              className="font-inter text-base text-[#1A1714] leading-relaxed mb-4 last:mb-0"
            >
              {para}
            </p>
          ))}
        </section>

        {/* Metrics grid */}
        <section className="mb-16">
          <h2 className="font-mono text-xs tracking-widest uppercase text-[#8A8178] mb-6">
            Key Indicators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.metrics.map((m) => (
              <MetricCard
                key={m.label}
                value={m.value}
                label={m.label}
                context={m.context}
              />
            ))}
          </div>
        </section>

        {/* ACSI snapshot */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-xs tracking-widest uppercase text-[#8A8178]">
              Mental Performance Profile
            </h2>
            <span className="font-mono text-xs text-[#8A8178]">
              ACSI · {data.assessmentDate}
            </span>
          </div>
          <div className="bg-white border border-[#E0D9CE] rounded-lg px-6 py-2">
            {data.acsi.map((dim) => (
              <StatBar
                key={dim.label}
                label={dim.label}
                value={dim.value}
                max={12}
                status={dim.status}
              />
            ))}
          </div>
        </section>

        {/* Attribution */}
        <div className="pb-16 border-t border-[#E0D9CE] pt-8 flex items-center justify-between">
          <span className="font-mono text-xs text-[#8A8178]">
            Generated by {data.generatedBy} · ACSI framework
          </span>
          <a
            href="/"
            className="font-mono text-xs text-[#B8821A] hover:underline tracking-widest uppercase"
          >
            knwn.to
          </a>
        </div>
      </div>
    </main>
  );
}
