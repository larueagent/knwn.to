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
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">
            Your mental performance identity. In plain language.
          </h2>
          <div className="flex flex-col gap-6">
            {[
              {
                label: "What it captures",
                body: "How you handle pressure. What derails you. How you prepare. What you need before a big game. Not a test result. Not a score. A real picture of how you compete — written in language you and any coach can actually use.",
              },
              {
                label: "Why it matters for AI",
                body: "An AI is only as useful as what it knows about you. Without a profile, every session starts from zero. With an athlete.md, LaRue knows your patterns before you say a word.",
              },
              {
                label: "You own it",
                body: "Your athlete.md is a plain text file. Take it anywhere. Share it with a coach. Use it with any AI tool. It is not locked inside an app.",
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-2">
                  {label}
                </p>
                <p className="font-inter text-[#4A443E] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample */}
      <section className="bg-[#EAE5DC] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            What it looks like
          </p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-2">
            This is what an athlete.md looks like.
          </h2>
          <p className="font-inter text-sm text-[#8A8178] mb-6">
            Jaime is a composite athlete. Ten minutes in, this is what LaRue produced.
          </p>
          <div className="bg-[#1A1714] text-[#EAE5DC] p-6 font-mono text-sm leading-relaxed">
            <p className="text-[#8A8178] mb-3"># athlete.md — Jaime R.</p>
            <p className="mb-1">
              <span className="text-[#B8821A]">athlete_type:</span> The Grinder
            </p>
            <p className="mb-1">
              <span className="text-[#B8821A]">pressure_response:</span> Internalizes. Goes quiet before big moments.
            </p>
            <p className="mb-1">
              <span className="text-[#B8821A]">derailer:</span> Comparison to teammates. Rumination after errors.
            </p>
            <p className="mb-1">
              <span className="text-[#B8821A]">pre_competition:</span> Needs 20 min alone. Music off. No strategy talk.
            </p>
            <p className="mb-1">
              <span className="text-[#B8821A]">strength:</span> Consistency under fatigue. Coachable. Process-oriented.
            </p>
            <p className="mt-4 text-[#8A8178]">[full profile — 380 words]</p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/jaime"
              className="font-inter text-sm text-[#8A8178] underline underline-offset-4 hover:text-[#1A1714] transition-colors"
            >
              View full sample →
            </Link>
            <Link
              href="/start"
              className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
            >
              Build yours free
            </Link>
          </div>
        </div>
      </section>

      {/* Meet LaRue */}
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">
            Meet LaRue
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">
            LaRue builds your athlete.md. Then puts it to work.
          </h2>
          <p className="font-inter text-[#4A443E] leading-relaxed mb-4">
            LaRue is an AI agent trained on mental performance in sport. Answer 10 questions. He
            generates your profile, reads it before every session, reaches out before big moments,
            and gets smarter the longer you work together.
          </p>
          <p className="font-inter text-[#8A8178] leading-relaxed mb-8">
            The athletes who will outperform in the next decade aren&apos;t just mentally tough —
            they&apos;re self-aware enough to use every tool available, including AI, to know
            themselves better. LaRue is built to develop that skill. When you need a real coach, he
            connects you to one.
          </p>
          <Link
            href="/start"
            className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Start your athlete.md — free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E0D9CE] px-6 py-10 mt-auto">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-sm text-[#8A8178]">
          <div>
            <p className="font-syne font-bold text-[#1A1714] mb-1">knwn.to</p>
            <p>Powered by Mettle</p>
          </div>
          <div className="flex gap-6 flex-wrap">
            <Link href="/first-read" className="hover:text-[#1A1714] transition-colors">Start Here</Link>
            <Link href="/field-notes" className="hover:text-[#1A1714] transition-colors">Field Notes</Link>
            <Link href="/book" className="hover:text-[#1A1714] transition-colors">The Book</Link>
            <Link href="/for-coaches" className="hover:text-[#1A1714] transition-colors">For Coaches</Link>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-6 pt-6 border-t border-[#E0D9CE] text-xs text-[#8A8178]">
          <p>LaRue is an AI agent. Not a licensed therapist or clinical psychologist.</p>
          <p>&copy; 2026 Mettle Performance.</p>
        </div>
      </footer>
    </main>
  );
}