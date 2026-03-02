import Link from "next/link";

export const metadata = {
  title: "The First Read — knwn.to",
  description:
    "Ten questions. One honest portrait. The First Read generates your athlete.md — who you are as a competitor, in your own words.",
};

export default function FirstReadPage() {
  return (
    <main className="min-h-screen bg-parchment text-text-primary">

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-border">
        <Link href="/" className="font-mono text-xs text-text-secondary hover:text-accent transition-colors tracking-widest uppercase">
          ← knwn.to
        </Link>
        <span className="font-mono text-xs text-text-secondary tracking-widest uppercase">
          The First Read
        </span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-8">
          knwn.to / first-read
        </p>
        <h1 className="font-syne font-bold text-5xl md:text-7xl text-text-primary leading-[1.05] mb-8 max-w-3xl">
          Most athletes know their stats.<br />
          <span className="text-accent">Almost none know themselves.</span>
        </h1>
        <p className="font-inter text-lg text-text-secondary max-w-xl leading-relaxed mb-12">
          The First Read is ten questions and one honest portrait —
          who you are as a competitor, written from your own words.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/first-read/preview"
            className="px-8 py-4 border-2 border-text-primary text-text-primary font-mono text-sm tracking-widest uppercase hover:bg-text-primary hover:text-parchment transition-colors duration-200"
          >
            See what you get
          </Link>
          <Link
            href="/start"
            className="px-8 py-4 bg-accent text-parchment font-mono text-sm tracking-widest uppercase hover:opacity-90 transition-opacity duration-200"
          >
            Begin your First Read
          </Link>
        </div>
        <p className="mt-8 font-mono text-xs text-text-secondary">
          Free. Takes about 15 minutes. No account required.
        </p>
      </section>

      {/* What it is */}
      <section className="px-6 py-24 max-w-2xl mx-auto border-t border-border">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-8">
          What this is
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary leading-tight mb-8">
          Not a personality test.<br />Not a scouting report.
        </h2>
        <p className="font-inter text-lg text-text-secondary leading-relaxed mb-6">
          The First Read is a structured intake — ten questions about how you compete,
          where you came from, and what's actually in the way. You answer honestly.
          We hand back a portrait.
        </p>
        <p className="font-inter text-lg text-text-secondary leading-relaxed mb-6">
          It's called <span className="text-text-primary font-medium">athlete.md</span> —
          a living document that starts as a snapshot of who you are right now.
          No scores. No types. No labels. Just you, described in your own words,
          organized so you can actually use it.
        </p>
        <p className="font-inter text-lg text-text-secondary leading-relaxed">
          Athletes who know themselves perform differently. Not always louder.
          Usually cleaner.
        </p>
      </section>

      {/* Three things */}
      <section className="px-6 py-16 max-w-2xl mx-auto border-t border-border">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-12">
          What you walk away with
        </p>
        <div className="space-y-12">
          <div>
            <p className="font-mono text-sm text-accent mb-2">01</p>
            <h3 className="font-syne font-bold text-xl text-text-primary mb-3">Your competitive identity</h3>
            <p className="font-inter text-text-secondary leading-relaxed">
              How you actually compete — not your position, your role.
              The conditions you need, the instincts you rely on, the origin
              story that still shows up in how you play.
            </p>
          </div>
          <div>
            <p className="font-mono text-sm text-accent mb-2">02</p>
            <h3 className="font-syne font-bold text-xl text-text-primary mb-3">Your pressure profile</h3>
            <p className="font-inter text-text-secondary leading-relaxed">
              What pressure feels like for you specifically — not generic
              sports psychology, but the texture of your experience.
              What you carry. What you're afraid people see.
            </p>
          </div>
          <div>
            <p className="font-mono text-sm text-accent mb-2">03</p>
            <h3 className="font-syne font-bold text-xl text-text-primary mb-3">The direction</h3>
            <p className="font-inter text-text-secondary leading-relaxed">
              What you said you want, and what consistent play actually
              looks like for you. The gap between those two things —
              that's the work.
            </p>
          </div>
        </div>
      </section>

      {/* Preview CTA */}
      <section className="px-6 py-24 max-w-2xl mx-auto border-t border-border text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-6">
          See it before you start
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary leading-tight mb-6">
          Read a real First Read.
        </h2>
        <p className="font-inter text-lg text-text-secondary leading-relaxed mb-10">
          Two sample athletes. Two complete portraits.
          This is exactly what yours will look like.
        </p>
        <Link
          href="/first-read/preview"
          className="inline-block px-10 py-4 border-2 border-text-primary text-text-primary font-mono text-sm tracking-widest uppercase hover:bg-text-primary hover:text-parchment transition-colors duration-200"
        >
          Read the sample reports
        </Link>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32 bg-text-primary text-parchment text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-8">
          When you're ready
        </p>
        <h2 className="font-syne font-bold text-4xl md:text-5xl text-parchment leading-tight mb-8 max-w-xl mx-auto">
          You've been competing.<br />Now get to know yourself.
        </h2>
        <Link
          href="/start"
          className="inline-block px-10 py-4 bg-accent text-parchment font-mono text-sm tracking-widest uppercase hover:opacity-90 transition-opacity duration-200"
        >
          Begin your First Read
        </Link>
        <p className="mt-8 font-mono text-xs text-text-secondary">
          Free. 15 minutes. Yours to keep.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-text-primary border-t border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-text-secondary">
            © 2026 Mettle Performance, Inc.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-mono text-xs text-text-secondary hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-xs text-text-secondary hover:text-accent transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
