import { SessionEntry } from "@/app/jaime/page";

type Props = {
  sessions: SessionEntry[];
  max?: number;
};

export default function StateHistoryChart({ sessions, max = 10 }: Props) {
  // Determine trend from last two sessions
  const last = sessions[sessions.length - 1]?.readiness ?? 0;
  const prev = sessions[sessions.length - 2]?.readiness ?? last;
  const delta = last - prev;
  const trend =
    delta > 0 ? "Rising." : delta < 0 ? "One step back this week is normal." : "Holding steady.";
  const trendPrefix =
    delta > 0 ? "Building." : delta < 0 ? "Building." : "Stable.";

  return (
    <div className="space-y-3">
      {sessions.map((s) => {
        const pct = (s.readiness / max) * 100;
        const isCurrent = s.label === "current";
        return (
          <div key={s.session} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#8A8178] tracking-widest w-20 shrink-0">
              Session {s.session}
            </span>
            <div className="flex-1 h-1.5 bg-[#E0D9CE] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isCurrent ? "bg-[#1A1714]" : "bg-[#B8821A]"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className={`font-mono text-[10px] tracking-widest w-12 text-right ${
                isCurrent ? "text-[#1A1714] font-bold" : "text-[#8A8178]"
              }`}
            >
              {s.readiness}/{max}
              {isCurrent ? " <-" : ""}
            </span>
          </div>
        );
      })}
      <p className="font-inter text-xs text-[#8A8178] pt-2 leading-relaxed">
        Trend: {trendPrefix} {trend}
      </p>
    </div>
  );
}
