import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Build Your Competitive Mind — First Read | knwn.to",
  description:
    "One assessment. Two outputs. A plain-language competitive profile for you, and an athlete.md for your AI. Free, no account required. Takes 10 minutes.",
  openGraph: {
    title: "Build your competitive mind, not just your body",
    description:
      "One assessment. Two outputs. A plain-language competitive profile for you, and an athlete.md for your AI.",
    url: "https://www.knwn.to/competitive-mind",
    siteName: "knwn.to",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build your competitive mind, not just your body",
  },
};

export default function CompetitiveMindPage() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-8">
          knwn.to / first read
        </p>
        <h1 className="font-syne font-bold text-4xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">
          Build your competitive mind,
          <span className="text-[#8A8178] block mt-2">not just your body.</span>
        </h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-4">
          Every AI conversation you&apos;ve had starts the same way: explaining
          yourself again. Your triggers, your routines, your patterns — over and
          over. Generic AI treats every athlete the same.
        </p>
        <p className="font-syne font-semibold text-xl text-[#1A1714] mb-10">
          LaRue doesn&apos;t.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/first-read/start"
            className="px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors"
          >
            Start your First Read
          </Link>
          <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
            Free &middot; No account required &middot; 10 minutes
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-[#EAE5DC] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-6">
            For athletes who dominate in practice
          </p>
          <p className="font-syne font-bold text-2xl sm:text-3xl text-[#1A1714] leading-snug mb-8">
            You know your forty time. Your shooting percentage. Your combine
            numbers.
          </p>
          <p className="font-inter text-lg text-[#4A443E] leading-relaxed mb-6">
            None of that tells you why you go quiet in the fourth quarter. Why
            you play your best when no one&apos;s watching and lock up the moment
            the scout arrives. Why feedback from a certain coach lands like a gut
            punch and stays there.
          </p>
          <p className="font-inter text-lg text-[#4A443E] leading-relaxed">
            That knowledge is already in you. You&apos;ve just never had a
            document for it.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-6">
            How it works
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-12">
            One assessment. Two outputs.
          </h2>

          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex gap-6">
              <span className="font-mono text-[#B8821A] text-sm pt-1 shrink-0">01</span>
              <div>
                <p className="font-syne font-semibold text-lg text-[#1A1714] mb-2">
                  Answer 10 questions about how you actually compete
                </p>
                <p className="font-inter text-base text-[#4A443E] leading-relaxed">
                  Not what coaches think. Not what your highlights show. How you
                  handle mistakes. What unlocks you. What derails you under
                  pressure.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <span className="font-mono text-[#B8821A] text-sm pt-1 shrink-0">02</span>
              <div>
                <p className="font-syne font-semibold text-lg text-[#1A1714] mb-2">
                  Read your competitive profile
                </p>
                <p className="font-inter text-base text-[#4A443E] leading-relaxed">
                  A plain-language document written in your voice. Not a
                  diagnosis. Not a rating. A precise account of how you actually
                  compete. Most athletes read it and think:{" "}
                  <em className="text-[#1A1714]">that&apos;s me.</em>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <span className="font-mono text-[#B8821A] text-sm pt-1 shrink-0">03</span>
              <div>
                <p className="font-syne font-semibold text-lg text-[#1A1714] mb-2">
                  Load{" "}
                  <span className="font-mono text-[#B8821A]">athlete.md</span>{" "}
                  into any AI
                </p>
                <p className="font-inter text-base text-[#4A443E] leading-relaxed">
                  The same profile, formatted for AI. Upload it to ChatGPT,
                  Claude, or LaRue and every conversation starts with full
                  context about your competitive psychology. No cold starts. No
                  explaining yourself again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Documents */}
      <section className="bg-[#EAE5DC] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-6">
            What you walk away with
          </p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10">
            You own both files. Take them anywhere.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* For You */}
            <div className="bg-parchment border border-[#E0D9CE] p-6">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-4">
                For you
              </p>
              <p className="font-syne font-semibold text-lg text-[#1A1714] mb-3">
                Your Competitive Profile
              </p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                Written in plain language, in your voice. Share it with a new
                coach so they don&apos;t spend three months misreading you.
              </p>
            </div>
            {/* For AI */}
            <div className="bg-parchment border border-[#E0D9CE] p-6">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-4">
                For AI
              </p>
              <p className="font-syne font-semibold text-lg text-[#1A1714] mb-3">
                Your{" "}
                <span className="font-mono">athlete.md</span>
              </p>
              <p className="font-inter text-sm text-[#4A443E] leading-relaxed">
                Formatted for AI to read. Every session starts with your full
                profile already loaded — no cold starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-10 text-center">
            What athletes say
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "I read it and thought — that\'s exactly what happens to me and I\'ve never been able to say it.",
                name: "— D1 Athlete",
              },
              {
                quote:
                  "My coach read my profile and said it explained more about me than two years of practice film.",
                name: "— High School QB",
              },
              {
                quote:
                  "First time an AI conversation didn\'t make me explain my whole situation from scratch.",
                name: "— Club Soccer Player",
              },
            ].map((t, i) => (
              <div key={i} className="border border-[#E0D9CE] p-6">
                <p className="font-inter text-sm text-[#4A443E] leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-mono text-xs text-[#8A8178] tracking-wide">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#EAE5DC] px-6 py-20 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-6">
          Get started
        </p>
        <h2 className="font-syne font-bold text-3xl sm:text-4xl text-[#1A1714] mb-6 max-w-xl mx-auto">
          AI that actually remembers how you compete.
        </h2>
        <p className="font-inter text-base text-[#4A443E] max-w-md mx-auto leading-relaxed mb-10">
          Answer 10 questions. Walk away with two documents that work for you
          for years.
        </p>
        <Link
          href="/first-read/start"
          className="inline-block px-8 py-4 bg-[#B8821A] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#a07115] transition-colors mb-6"
        >
          Start your First Read
        </Link>
        <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">
          Powered by Mettle &middot; Scored by the Performance Readiness Index
        </p>
        <p className="font-inter text-xs text-[#8A8178] mt-2">
          Developed with sport psychologist Dr. Alex Auerbach
        </p>
      </section>
    </main>
  );
}
