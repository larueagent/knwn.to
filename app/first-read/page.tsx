import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Start Here — knwn.to",
  description:
    "Every young athlete needs to know how to work with AI. It starts with one document: your athlete.md. Build yours free in 10 minutes.",
};

export default function FirstReadPage() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-8">
          knwn.to / start here
        </p>
        <h1 className="font-syne font-bold text-4xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">
          Every young athlete needs to know how to work with AI.
          <br />
          <span className="text-[#8A8178]">Most don&apos;t know where to start.</span>
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-4">
          The athletes who get the most out of AI won&apos;t be the ones with the best tools.
          They&apos;ll be the ones an AI actually knows.
        </p>
        <p className="font-inter text-base text-[#8A8178] max-w-lg leading-relaxed mb-12">
          That starts with one document:{" "}
          <span className="font-mono text-[#B8821A]">your athlete.md</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/start"
            className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Build your athlete.md — free, takes 10 minutes
          </Link>
          <Link
            href="/start"
            className="font-inter text-sm text-[#8A8178] hover:text-[#1A1714] transition-colors underline underline-offset-4"
          >
            Already have yours? Sign in.
          </Link>
        </div>
      </section>

      {/* Context band */}
      <section className="bg-[#EAE5DC] px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="font-inter text-lg text-[#1A1714] leading-relaxed mb-3">
            AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.
          </p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed">
            The athletes who thrive won&apos;t just be faster — they&apos;ll be the ones who know how to be known.
          </p>
        </div>
      </section>

      {/* What is athlete.md */}
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            What is an athlete.md?
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10 leading-tight">
            Your mental performance identity. In plain language. Yours to own.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                label: "What it captures",
                body: "How you handle pressure. What derails you. How you prepare. What you need before a big game. Not a test result — a real picture of how you compete.",
              },
              {
                label: "Why it matters for AI",
                body: "An AI is only as useful as what it knows about you. Without a profile, every session starts from zero. With an athlete.md, LaRue knows your patterns before you say a word.",
              },
              {
                label: "You own it",
                body: "A plain text file. Take it anywhere. Share it with a coach. Use it with any AI tool. It is not locked inside an app. It belongs to you.",
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">{label}</p>
                <p className="font-inter text-sm text-[#4A443E] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LaRue intro */}
      <section className="bg-[#E0D9CE] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Meet LaRue
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">
            LaRue builds your athlete.md. Then puts it to work.
          </h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-8">
            LaRue is an AI agent trained on mental performance in sport. Answer 10 questions.
            He generates your profile, reads it before every session, and adapts as you grow.
            When you need a real coach, he connects you to one.
          </p>
          <Link
            href="/start"
            className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Start your athlete.md — free
          </Link>
        </div>
      </section>

      {/* Sample profile */}
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Sample profile
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-3 leading-tight">
            This is what an athlete.md looks like.
          </h2>
          <p className="font-inter text-sm text-[#8A8178] mb-8">
            Jaime is a composite athlete. Ten minutes in, this is what LaRue produced.
          </p>
          <div className="bg-[#EAE5DC] text-[#1A1714] p-6 font-mono text-sm leading-relaxed mb-6">
            <p className="text-[#B8821A] mb-2"># athlete.md — Jaime R.</p>
            <p className="text-[#8A8178] mb-4">Generated by LaRue | Draft 1</p>
            <p className="mb-1"><span className="text-[#B8821A]">sport:</span> Soccer (midfielder)</p>
            <p className="mb-1"><span className="text-[#B8821A]">level:</span> High school varsity / club</p>
            <p className="mb-4"><span className="text-[#B8821A]">profile type:</span> Internal processor, high standards</p>
            <p className="text-[#4A443E] mb-1">## Under pressure</p>
            <p className="text-[#8A8178] mb-4">Jaime goes quiet — not checked out, but processing. Needs a moment before responding to criticism. Performs best when she has already visualized the scenario.</p>
            <p className="text-[#4A443E] mb-1">## What derails her</p>
            <p className="text-[#8A8178] mb-4">Comparison to teammates. Perceived unfairness from coaches. Overloading pre-game routine.</p>
            <p className="text-[#4A443E] mb-1">## Pre-competition</p>
            <p className="text-[#8A8178]">Needs 20 min of quiet. Music in, no conversations. Arrives early to walk the field alone.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/jaime"
              className="font-mono text-xs text-[#B8821A] tracking-widest uppercase hover:underline"
            >
              View full sample profile →
            </Link>
            <Link
              href="/start"
              className="font-mono text-xs text-[#1A1714] tracking-widest uppercase hover:text-[#B8821A] transition-colors"
            >
              Build yours free →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F5F0EA] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-8">
            How it works
          </p>
          <ol className="flex flex-col gap-10">
            {[
              {
                n: "01",
                title: "Answer 10 questions",
                body: "About how you compete. What drives you. Where you struggle. In your own words — no scoring, no right answers.",
              },
              {
                n: "02",
                title: "LaRue reads you",
                body: "Your answers become a structured profile — your athlete.md. A document that captures who you are as a competitor.",
              },
              {
                n: "03",
                title: "You get the file",
                body: "Plain text. Yours to keep. Use it with LaRue, share it with a coach, or use it with any AI tool you already have.",
              },
            ].map(({ n, title, body }) => (
              <li key={n} className="flex gap-8">
                <span className="font-mono text-xs text-[#B8821A] tracking-widest pt-1">{n}</span>
                <div>
                  <p className="font-syne font-semibold text-[#1A1714] mb-2">{title}</p>
                  <p className="font-inter text-base text-[#8A8178] leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center text-center px-6 py-20">
        <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-4">
          Ready to be known?
        </h2>
        <p className="font-inter text-base text-[#8A8178] max-w-md mb-10">
          Free. Takes about 10 minutes. No account required to start.
        </p>
        <Link
          href="/start"
          className="inline-block px-10 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
        >
          Build your athlete.md — free
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-8 border-t border-[#E0D9CE]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
            <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
            <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">The Book</Link>
            <Link href="/for-coaches" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">For Coaches</Link>
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
