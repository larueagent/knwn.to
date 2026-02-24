interface AthleteHeroProps {
  name: string;
  sport: string;
  school?: string;
  year?: string;
  handle: string;
}

export default function AthleteHero({
  name,
  sport,
  school,
  year,
  handle,
}: AthleteHeroProps) {
  return (
    <div className="pt-16 pb-10">
      <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
        knwn.to/{handle}
      </p>
      <h1 className="font-syne font-bold text-6xl md:text-8xl text-[#1A1714] leading-none mb-4">
        {name}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-8">
        <span className="font-inter text-lg text-[#8A8178]">{sport}</span>
        {school && (
          <>
            <span className="text-[#E0D9CE]">/</span>
            <span className="font-inter text-lg text-[#8A8178]">{school}</span>
          </>
        )}
        {year && (
          <>
            <span className="text-[#E0D9CE]">/</span>
            <span className="font-inter text-lg text-[#8A8178]">{year}</span>
          </>
        )}
      </div>
      {/* Amber accent rule */}
      <div className="h-px w-16 bg-[#B8821A]" />
    </div>
  );
}
