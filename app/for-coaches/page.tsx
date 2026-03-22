import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "AI Assistant Coach for Sports Teams | VAC by knwn.to",
  description:
    "VAC gives coaches a full picture of every athlete's readiness before practice, before the game, and between sessions. Built on sport psychology. No technical setup required.",
  openGraph: {
    title: "For Coaches — knwn.to",
    description:
      "VAC is your AI assistant coach. He knows every athlete on your roster — their readiness, their patterns, what they need — so you can spend your time coaching, not catching up.",
    url: "https://www.knwn.to/for-coaches",
    siteName: "knwn.to",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "For Coaches — knwn.to",
    description:
      "VAC is your AI assistant coach. He knows every athlete on your roster — their readiness, their patterns, what they need — so you can spend your time coaching, not catching up.",
  },
};

export default function ForCoachesPage() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">
      <Nav />
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-8">knwn.to / for coaches</p>
        <h1 className="font-syne font-bold text-4xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">Your athletes are already using AI.<br /><span className="text-[#8A8178]">Most of them are doing it wrong.</span></h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-12">LaRue helps athletes build a mental performance identity before they ever walk into your office — so you spend less time starting from scratch and more time doing the real work.</p>
        <Link href="#waitlist" className="px-8 py-4 bg-[#B8821A] text-white font-syne font-semibold text-base rounded hover:bg-[#a07115] transition-colors">Join the VAC waitlist</Link>
      </section>
      <div className="px-6 max-w-2xl mx-auto w-full"><hr className="border-[#E0D9CE]" /></div>
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">The landscape</p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4">AI is already in your sport.</h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-3">Scouts use it. Coaches use it. Recruiters use it.</p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed">Most coaches don&apos;t have the time or bandwidth to build that foundation for every athlete on their roster. LaRue does. He tracks athlete state over time, surfaces who needs attention before it becomes a problem, and connects them to you when they need a real conversation.</p>
        </div>
      </section>
      <div className="px-6 max-w-2xl mx-auto w-full"><hr className="border-[#E0D9CE]" /></div>
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">How it works</p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10 leading-tight">LaRue handles the intake. You do the coaching.</h2>
          <div className="flex flex-col gap-8">
            {[
              { n: "01", title: "Athletes build their athlete.md", body: "LaRue walks every athlete through 10 questions about how they compete — pressure, preparation, what derails them, what they need. The output is a plain text profile they own." },
              { n: "02", title: "You see your roster clearly", body: "Instead of spending the first three sessions doing intake, you start with a full picture of every athlete — who internalizes under pressure, who needs silence before competition, who&apos;s been struggling for three weeks. That context is shareable, searchable, and always current." },
              { n: "03", title: "LaRue flags what needs your attention", body: "Your assistant coach monitors athlete state between sessions. When something needs a real conversation, he surfaces it — so you spend your time on the athletes who need you most, not on status checks." },
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
      <div className="px-6 max-w-2xl mx-auto w-full"><hr className="border-[#E0D9CE]" /></div>
      <section id="waitlist" className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Virtual Assistant Coach</p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-6 leading-tight">The VAC pilot is open.</h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">VAC — Virtual Assistant Coach — is LaRue deployed as your assistant coach. He knows every athlete on your roster from day one, tracks their readiness state across the season, and handles the intake and monitoring work that currently lives in your head or doesn&apos;t get done at all.</p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed mb-8">We are onboarding a small cohort of coaches for the pilot. If you work with competitive athletes and want to be part of the first class, apply below.</p>
          <Link href="mailto:robert@knwn.to" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-[#B8821A] text-white font-syne font-semibold text-base rounded hover:bg-[#a07115] transition-colors">Request a spot in the pilot &#8594;</Link>
        </div>
      </section>
      <div className="px-6 max-w-2xl mx-auto w-full"><hr className="border-[#E0D9CE]" /></div>
      <section className="flex flex-col items-center px-6 py-14">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">About</p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4">Built to close the gap.</h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">Most young athletes either get nothing — or get generic. The ones who reach elite programs get performance science staff, sport psychologists, and individualized mental coaching. Everyone else gets a motivational poster.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">KNWN.TO and LaRue are the athlete-facing layer: an AI-powered system that builds genuine self-knowledge in athletes and surfaces it in a format coaches can actually use. VAC is the coach-facing layer — LaRue deployed as your assistant coach, giving you the roster intelligence and readiness monitoring that used to require a full performance science staff.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-6">Powered by Mettle — built with sport psychologist Alex Auerbach, Ph.D., drawing on 15+ years of work with competitive athletes at every level.</p>
          <p className="font-inter text-sm text-[#8A8178] leading-relaxed mb-6">AI-powered. Real coaches available when you need them.</p>
        </div>
      </section>
      <div className="px-6 max-w-2xl mx-auto w-full"><hr className="border-[#E0D9CE]" /></div>
      <footer className="mt-auto px-6 py-8 border-t border-[#E0D9CE]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
            <Link href="/first-read" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widests uppercase">Start Here</Link>
            <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
            <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">The Book</Link>
          </div>
          <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase">Powered by Mettle</p>
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <p className="font-mono text-xs text-[#C8BFB5]">LaRue is an AI agent. He is not a licensed therapist or clinical psychologist. AI-powered. Real coaches available when you need them.{" "}&copy; 2026 Mettle Performance. Athlete data is never sold or shared without explicit consent.</p>
        </div>
      </footer>
    </main>
  );
}
