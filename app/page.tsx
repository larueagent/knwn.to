import Link from "next/link";

export const metadata = {
  title: "knwn.to — Know yourself. Compete differently.",
  description: "The First Read is a 10-question intake that generates your athlete portrait — who you are as a competitor, in your own words.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#1A1A1A]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8B7355] mb-8 font-mono">
          knwn.to
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-8 max-w-3xl">
          Most athletes know their stats.<br />
          <span className="text-[#8B7355]">Almost none know themselves.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#5C5C5C] max-w-xl leading-relaxed mb-12">
          The First Read is ten questions and one honest portrait —
          who you are as a competitor, written from your own words.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/preview"
            className="px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-mono text-sm tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-colors duration-200"
          >
            See what you get
          </Link>
          <Link
            href="/start"
            className="px-8 py-4 bg-[#8B7355] text-[#F5F0E8] font-mono text-sm tracking-widest uppercase hover:bg-[#6B5A42] transition-colors duration-200"
          >
            Begin your First Read
          </Link>
        </div>

        <p className="mt-8 text-xs text-[#8B8B8B] font-mono">
          Free. Takes about 15 minutes. No account required.
        </p>
      </section>

      {/* ── What it is ───────────────────────────────────────────────────── */}
      <section className="px-6 py-32 max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8B7355] mb-8 font-mono">
          What this is
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-8">
          Not a personality test.<br />Not a scouting report.
        </h2>
        <p className="text-lg text-[#5C5C5C] leading-relaxed mb-6">
          The First Read is a structured intake — ten questions about how you compete,
          where you came from, and what's actually in the way. You answer honestly.
          We hand back a portrait.
        </p>
        <p className="text-lg text-[#5C5C5C] leading-relaxed mb-6">
          It's called <span className="text-[#1A1A1A] font-medium">athlete.md</span> —
          a living document that starts as a snapshot of who you are right now.
          No scores. No types. No labels. Just you, described in your own words,
          organized so you can actually use it.
        </p>
        <p className="text-lg text-[#5C5C5C] leading-relaxed">
          Athletes who know themselves perform differently. Not always louder.
          Usually cleaner.
        </p>
      </section>

      {/* ── The three things ─────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-2xl mx-auto border-t border-[#D4C5A9]">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8B7355] mb-12 font-mono">
          What you walk away with
        </p>
        <div className="space-y-12">
          <div>
            <p className="font-mono text-sm text-[#8B7355] mb-2">01</p>
            <h3 className="font-display text-xl font-bold mb-3">Your competitive identity</h3>
            <p className="text-[#5C5C5C] leading-relaxed">
              How you actually compete — not your position, your role.
              The conditions you need, the instincts you rely on, the origin
              story that still shows up in how you play.
            </p>
          </div>
          <div>
            <p className="font-mono text-sm text-[#8B7355] mb-2">02</p>
            <h3 className="font-display text-xl font-bold mb-3">Your pressure profile</h3>
            <p className="text-[#5C5C5C] leading-relaxed">
              What pressure feels like for you specifically — not generic
              sports psychology, but the texture of your experience.
              What you carry. What you're afraid people see.
            </p>
          </div>
          <div>
            <p className="font-mono text-sm text-[#8B7355] mb-2">03</p>
            <h3 className="font-display text-xl font-bold mb-3">The direction</h3>
            <p className="text-[#5C5C5C] leading-relaxed">
              What you said you want, and what consistent play actually
              looks like for you. The gap between those two things —
              that's the work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Preview CTA ──────────────────────────────────────────────────── */}
      <section className="px-6 py-32 max-w-2xl mx-auto text-center border-t border-[#D4C5A9]">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8B7355] mb-6 font-mono">
          See it before you start
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">
          Read a real First Read.
        </h2>
        <p className="text-lg text-[#5C5C5C] leading-relaxed mb-10">
          Two sample athletes. Two complete portraits.
          This is exactly what yours will look like.
        </p>
        <Link
          href="/preview"
          className="inline-block px-10 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-mono text-sm tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-colors duration-200"
        >
          Read the sample reports
        </Link>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-32 bg-[#1A1A1A] text-[#F5F0E8] text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8B7355] mb-8 font-mono">
          When you're ready
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8 max-w-xl mx-auto">
          You've been competing.<br />Now get to know yourself.
        </h2>
        <Link
          href="/start"
          className="inline-block px-10 py-4 bg-[#8B7355] text-[#F5F0E8] font-mono text-sm tracking-widest uppercase hover:bg-[#6B5A42] transition-colors duration-200"
        >
          Begin your First Read
        </Link>
        <p className="mt-8 text-xs text-[#8B8B8B] font-mono">
          Free. 15 minutes. Yours to keep.
        </p>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="px-6 py-8 bg-[#1A1A1A] border-t border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#5C5C5C] font-mono">
            © 2026 Mettle Performance, Inc.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#5C5C5C] font-mono hover:text-[#8B7355] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-[#5C5C5C] font-mono hover:text-[#8B7355] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
