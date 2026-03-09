import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "For Coaches — knwn.to",
  description:
    "The VAC waitlist is open. LaRue connects athletes to coaches — and coaches to athletes who are ready to work.",
};

export default function ForCoachesPage() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-8">
          knwn.to / for coaches
        </p>
        <h1 className="font-syne font-bold text-4xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">
          Your athletes are already using AI.
          <br />
          <span className="text-[#8A8178]">Most of them are doing it wrong.</span>
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-12">
          LaRue helps athletes build a mental performance identity before they ever walk into
          your office — so you spend less time starting from scratch and more time doing the
          real work.
        </p>
        <Link
          href="#waitlist"
          className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
        >
          Join the VAC waitlist
        </Link>
      </section>

      {/* Context band */}
      <section className="bg-[#EAE5DC] px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="font-inter text-lg text-[#1A1714] leading-relaxed mb-3">
            AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.
          </p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed">
            The athletes who come to you prepared — with a real self-understanding, not just
            stats — are the ones who grow fastest. LaRue builds that foundation.
          </p>
        </div>
      </section>

      {/* What LaRue does for coaches */}
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            How it works
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10 leading-tight">
            LaRue does the intake. You do the coaching.
          </h2>
          <div className="flex flex-col gap-8">
            {[
              {
                n: "01",
                title: "Athletes build their athlete.md",
                body: "LaRue walks every athlete through 10 questions about how they compete — pressure, preparation, what derails them, what they need. The output is a plain text profile they own.",
              },
              {
                n: "02",
                title: "You get athletes who know themselves",
                body: "Instead of spending the first three sessions doing intake, you start with a client who has already done the work of articulating their mental game. That profile is shareable — with your consent and theirs.",
              },
              {
                n: "03",
                title: "LaRue refers when it is time",
                body: "When an athlete's needs go beyond what AI can address, LaRue connects them to a real coach. That is where you come in — as a VAC partner.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-8">
                <span className="font-mono text-xs text-[#B8821A] tracking-widest pt-1 shrink-0">{n}</span>
                <div>
                  <p className="font-syne font-semibold text-[#1A1714] mb-2">{title}</p>
                  <p className="font-inter text-base text-[#8A8178] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VAC section */}
      <section id="waitlist" className="bg-[#E0D9CE] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Virtual Athlete Coaching
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">
            The VAC pilot is open.
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">
            VAC — Virtual Athlete Coaching — is a referral bridge between LaRue and certified
            mental performance coaches. When an athlete is ready for real coaching, LaRue
            introduces them to a VAC partner.
          </p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-8">
            We are onboarding a small cohort of coaches for the pilot. If you work with
            competitive athletes and want to be part of the first class, join the waitlist.
          </p>
          <Link
            href="https://momentumlabs.coach"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Apply at momentumlabs.coach →
          </Link>
        </div>
      </section>

      {/* About Momentum Labs */}
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            About
          </p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4">
            Built by Momentum Labs
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">
            Momentum Labs builds infrastructure for athlete mental performance — tools,
            research, and coaching systems designed to close the gap between the athletes
            who get elite mental coaching and the ones who get nothing.
          </p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-6">
            knwn.to and LaRue are the consumer layer. VAC is the professional layer.
            Together, they connect the athletes who are ready to work with the coaches
            who can take them further.
          </p>
          <Link
            href="https://momentumlabs.coach"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#B8821A] tracking-widest uppercase hover:underline"
          >
            momentumlabs.coach →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-8 border-t border-[#E0D9CE]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 flex-wrap">
            <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
            <Link href="/first-read" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Start Here</Link>
            <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
            <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">The Book</Link>
            <Link href="https://momentumlabs.coach" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase" target="_blank" rel="noopener noreferrer">momentumlabs.coach</Link>
          </div>
          <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            Built by Momentum Labs
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <p className="font-mono text-xs text-[#C8BFB5]">
            LaRue is an AI agent. He is not a licensed therapist or clinical psychologist.
            &copy; 2026 Momentum Labs. Athlete data is never sold or shared without explicit consent.
          </p>
        </div>
      </footer>
    </main>
  );
}
