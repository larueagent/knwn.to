interface MetricCardProps {
  value: string;
  label: string;
  context?: string;
}

export default function MetricCard({ value, label, context }: MetricCardProps) {
  return (
    <div className="bg-white border border-[#E0D9CE] rounded p-6">
      <div className="font-syne font-bold text-4xl text-[#1A1714] mb-1">
        {value}
      </div>
      <div className="font-inter text-sm text-[#B8821A] font-medium mb-1 uppercase tracking-wide">
        {label}
      </div>
      {context && (
        <div className="font-inter text-xs text-[#8A8178] leading-relaxed">
          {context}
        </div>
      )}
    </div>
  );
}
