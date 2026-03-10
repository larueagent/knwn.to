import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "knwn.to — Know your athlete",
  description:
    "Every young athlete needs to know how to work with AI. It starts with one document: your athlete.md.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-8">
          knwn.to
        </p>
        <h1 className="font-syne font-bold text-4xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">
          Every young athlete needs to know how to work with AI.
          <br />
          <span className="text-[#8A8178]">Most don&apos;t know where to start.</span>
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-4">
          The athletes who get the most out of AI won&apos;t be the ones with the best tools.
          They&apos;ll be the ones with an AI that actually knows them.
        </p>
        <p className="font-inter text-base text-[#8A8178] max-w-lg leading-relaxed mb-12">
          That starts with one document:{" "}
          <span className="font-mono text-[#B8821A]">your athlete.md</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/first-read"
            className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Start here — it&apos;s free
          </Link>
          <Link
            href="/book"
            className="font-inter text-sm text-[#8A8178] hover:text-[#1A1714] transition-colors underline underline-offset-4"
          >
            Read the book
          </Link>
        </div>
      </section>

      {/* Context band */}
      <section className="bg-[#EAE5DC] text-[#1A1714] px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-syne font-semibold text-lg mb-3">
            AI doesn&apos;t know your athlete.
          </p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed">
            Every AI tool — ChatGPT, Claude, Gemini — starts from zero every session.
            It doesn&apos;t know your sport, your role, your pressure patterns, or what you need from a coach.
            Without context, it gives generic answers. With context, it becomes a training partner that actually knows you.
          </p>
        </div>
      </section>

      {/* LaRue intro band */}
      <section className="bg-[#E0D9CE] text-[#1A1714] px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-6">
            Meet LaRue
          </p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-[#1A1714] leading-tight mb-6">
            An AI coach built for athletes who want to be known.
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">
            LaRue is a sport psychology AI trained on pressure performance research.
            It reads your athlete.md at the start of every session — so it always knows who you are,
            what you&apos;re working on, and how you respond under pressure.
          </p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-10">
            Not a chatbot. Not a generic wellness app. A coach that builds a model of you over time.
          </p>
          <Link
            href="/first-read"
            className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Build your athlete.md — free, takes 10 minutes
          </Link>
        </div>
      </section>

      {/* Three paths */}
      <section className="bg-parchment px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-10 text-center">
            Where to go from here
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-syne font-bold text-base text-[#1A1714]">For Athletes</p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                Build your athlete.md and start working with LaRue.
                Free, private, takes 10 minutes.
              </p>
              <Link
                href="/first-read"
                className="font-inter text-sm text-[#B8821A] hover:text-[#a07115] underline underline-offset-4 transition-colors mt-auto"
              >
                Start here &rarr;
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-syne font-bold text-base text-[#1A1714]">For Coaches</p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                The VAC is coming. A team-level tool that gives every athlete on your roster
                a consistent AI presence.
              </p>
              <Link
                href="/for-coaches"
                className="font-inter text-sm text-[#B8821A] hover:text-[#a07115] underline underline-offset-4 transition-colors mt-auto"
              >
                Join the waitlist &rarr;
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-syne font-bold text-base text-[#1A1714]">The Book</p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                <em>Pressure, Identity, Performance</em> — the research behind athlete.md
                and why self-knowledge is the missing variable in athletic development.
              </p>
              <Link
                href="/book"
                className="font-inter text-sm text-[#B8821A] hover:text-[#a07115] underline underline-offset-4 transition-colors mt-auto"
              >
                Read it &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#EAE5DC] px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] leading-tight mb-4">
            The athletes who understand themselves win more.
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-10">
            Not because they&apos;re more talented. Because they know how to use what they have.
            Your athlete.md is where that starts.
          </p>
          <Link
            href="/first-read"
            className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Build your athlete.md — free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1714]/10 px-8 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-syne font-bold text-sm text-[#1A1714] tracking-tight">
            knwn.to
          </span>
          <div className="flex gap-6 text-xs text-[#8A8178]">
            <Link href="/first-read" className="hover:text-[#1A1714] transition-colors">Start Here</Link>
            <Link href="/for-coaches" className="hover:text-[#1A1714] transition-colors">For Coaches</Link>
            <Link href="/book" className="hover:text-[#1A1714] transition-colors">The Book</Link>
            <Link href="/field-notes" className="hover:text-[#1A1714] transition-colors">Field Notes</Link>
          </div>
          <p className="font-inter text-xs text-[#8A8178]">
            &copy; {new Date().getFullYear()} Momentum Labs
          </p>
        </div>
      </footer>
    </main>
  );
}
