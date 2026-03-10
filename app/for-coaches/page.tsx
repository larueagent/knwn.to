import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "For Coaches — knwn.to",
  description: "The VAC waitlist is open. LaRue connects athletes to coaches — and coaches to athletes who are ready to work.",
};

export default function ForCoachesPage() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col">
      <Nav />
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8821A] mb-8">knwn.to / for coaches</p>
        <h1 className="font-syne font-bold text-4xl sm:text-6xl text-[#1A1714] leading-[1.05] mb-6 max-w-3xl">Your athletes are already using AI.<br /><span className="text-[#8A8178]">Most of them are doing it wrong.</span></h1>
        <p className="font-inter text-lg text-[#4A443E] max-w-xl leading-relaxed mb-12">LaRue helps athletes build a mental performance identity before they ever walk into your office — so you spend less time starting from scratch and more time doing the real work.</p>
        <Link href="#waitlist" className="px-8 py-4 bg-[#1A1714] text-parchment font-syne font-semibold text-sm tracking-wide hover:bg-[#2a2520] transition-colors">Join the VAC waitlist</Link>
      </section>
      <section className="bg-[#1A1714] text-[#E8E0D5] px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <p className="font-inter text-lg leading-relaxed mb-3">AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.</p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed">The athletes who come to you prepared — with a real self-understanding, not just stats — are the ones who grow fastest. LaRue builds that foundation. He reaches out before big moments, tracks their state over time, and refers them to you when they need more than AI can give.</p>
        </div>
      </section>
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">How it works</p>
          <h2 className="font-syne font-bold text-3xl text-[#1A1714] mb-10 leading-tight">LaRue does the intake. You do the coaching.</h2>
          <div className="flex flex-col gap-8">
            {[
              { n: "01", title: "Athletes build their athlete.md", body: "LaRue walks every athlete through 10 questions about how they compete — pressure, preparation, what derails them, what they need. The output is a plain text profile they own." },
              { n: "02", title: "You get athletes who know themselves", body: "Instead of spending the first three sessions doing intake, you start with a client who has already done the work of articulating their mental game. That profile is shareable — with your consent and theirs." },
              { n: "03", title: "LaRue refers when it is time", body: "When an athlete's needs go beyond what AI can address, LaRue connects them to a real coach. That is where you come in — as a VAC partner." },
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
      <section id="waitlist" className="bg-[#1A1714] text-[#E8E0D5] px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Virtual Athlete Coaching</p>
          <h2 className="font-syne font-bold text-3xl text-[#E8E0D5] mb-6 leading-tight">The VAC pilot is open.</h2>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed mb-4">VAC — Virtual Athlete Coaching — is the referral bridge between LaRue and certified mental performance coaches. When an athlete is ready for real coaching, LaRue introduces them to a VAC partner.</p>
          <p className="font-inter text-base text-[#8A8178] leading-relaxed mb-8">We are onboarding a small cohort of coaches for the pilot. If you work with competitive athletes and want to be part of the first class, apply below.</p>
          <Link href="https://momentumlabs.coach" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 border border-[#E8E0D5] text-[#E8E0D5] font-syne font-semibold text-sm tracking-wide hover:bg-[#E8E0D5] hover:text-[#1A1714] transition-colors">Apply at momentumlabs.coach →</Link>
        </div>
      </section>
      <section className="flex flex-col items-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">About</p>
          <h2 className="font-syne font-bold text-2xl text-[#1A1714] mb-4">Built to close the gap.</h2>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">Most young athletes either get nothing — or get generic. The ones who reach elite programs get performance science staff, sport psychologists, and individualized mental coaching. Everyone else gets a motivational poster.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-4">KNWN.TO and LaRue are the consumer layer: an AI-powered system that builds genuine self-knowledge in athletes and connects them to real coaches when they need one. VAC is the professional layer — the bridge between athletes who are ready to go deeper and the coaches who can take them there.</p>
          <p className="font-inter text-base text-[#4A443E] leading-relaxed mb-6">Powered by Mettle — built with sport psychologist Alex Auerbach, Ph.D., drawing on 15+ years of work with competitive athletes at every level.</p>
          <p className="font-inter text-sm text-[#8A8178] leading-relaxed mb-6">AI-powered. Real coaches available when you need them.</p>
          <Link href="https://momentumlabs.coach" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#B8821A] tracking-widest uppercase hover:underline">momentumlabs.coach →</Link>
        </div>
      </section>
      <footer className="mt-auto px-6 py-8 border-t border-[#E0D9CE]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 flex-wrap">
            <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
            <Link href="/first-read" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Start Here</Link>
            <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
            <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">The Book</Link>
            <Link href="https://momentumlabs.coach" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase" target="_blank" rel="noopener noreferrer">momentumlabs.coach</Link>
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
