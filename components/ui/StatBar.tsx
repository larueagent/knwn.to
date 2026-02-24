interface StatBarProps {
  label: string;
  value: number; // 0-12
  max?: number;
  status?: "strength" | "developing" | "priority";
}

const statusColor: Record<string, string> = {
  strength: "#B8821A",
  developing: "#B8821A",
  priority: "#8A8178",
};

const statusLabel: Record<string, string> = {
  strength: "Strength",
  developing: "Developing",
  priority: "Priority",
};

export default function StatBar({
  label,
  value,
  max = 12,
  status = "developing",
}: StatBarProps) {
  const pct = Math.round((value / max) * 100);

  return (
    <div className="py-4 border-b border-[#E0D9CE] last:border-0">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-inter text-sm font-medium text-[#1A1714]">
          {label}
        </span>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#8A8178]">
            {statusLabel[status]}
          </span>
          <span className="font-mono text-sm font-medium text-[#1A1714]">
            {value}
            <span className="text-[#8A8178] text-xs">/{max}</span>
          </span>
        </div>
      </div>
      <div className="h-1 bg-[#E0D9CE] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: statusColor[status],
          }}
        />
      </div>
    </div>
  );
}
