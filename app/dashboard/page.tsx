import Link from 'next/link';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Building in Public — knwn.to',
  description: 'An honest look at what we are shipping, what is working, and where knwn.to is headed.',
};

const shipped = [
  {
    name: 'athlete.md profile builder',
    description: 'Answer 12 questions. Get a structured AI-ready profile.',
    status: 'LIVE',
  },
  {
    name: 'LaRue — AI mental performance coach',
    description: 'Personalized coaching powered by your athlete.md.',
    status: 'LIVE',
  },
  {
    name: 'Field Notes',
    description: 'Writing on athletes, AI, and competitive identity.',
    status: 'LIVE',
  },
  {
    name: 'The Book',
    description: 'Your Story, All of It — the philosophy behind knwn.to.',
    status: 'LIVE',
  },
];

const next = [
  {
    name: 'Coach dashboard',
    description: 'Let coaches see and work with their athletes\u2019 profiles.',
  },
  {
    name: 'Profile sharing',
    description: 'A public URL for your athlete.md \u2014 shareable with any coach or AI.',
  },
  {
    name: 'LaRue iOS app',
    description: 'Your mental performance coach in your pocket.',
  },
];

const stats = [
  { label: 'Athlete Profiles Created', value: '47' },
  { label: 'Field Notes Published', value: '12' },
  { label: 'Days Building', value: String(Math.floor((Date.now() - new Date('2024-09-01').getTime()) / 86400000)) },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#1A1714] flex flex-col">
      <Nav variant="light" />

      {/* Header */}
      <section className="px-6 pt-16 pb-12 max-w-3xl mx-auto w-full">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8821A] mb-4">
          Building in Public
        </p>
        <h1 className="font-syne font-bold text-4xl text-[#1A1714] leading-tight mb-4">
          An honest look at what we&apos;re shipping.
        </h1>
        <p className="font-inter text-base text-[#4A443E] leading-relaxed max-w-xl">
          No vanity metrics. Just what exists, what&apos;s working, and what&apos;s next. Updated as we go.
        </p>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-[#E0D9CE] py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-syne font-bold text-5xl text-[#1A1714] mb-2">{stat.value}</p>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A8178]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shipped */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A8178] mb-8">
            What We&apos;ve Shipped
          </p>
          <div className="flex flex-col gap-0">
            {shipped.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-start justify-between py-5 gap-6 ${i < shipped.length - 1 ? 'border-b border-[#E0D9CE]' : ''}`}
              >
                <div className="flex-1">
                  <p className="font-syne font-semibold text-sm text-[#1A1714] mb-1">{item.name}</p>
                  <p className="font-inter text-sm text-[#8A8178] leading-relaxed">{item.description}</p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#B8821A] border border-[#B8821A] px-2 py-1 whitespace-nowrap mt-0.5">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-[#E0D9CE] py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A8178] mb-8">
            What&apos;s Next
          </p>
          <div className="flex flex-col gap-0">
            {next.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-start justify-between py-5 gap-6 ${i < next.length - 1 ? 'border-b border-[#E0D9CE]' : ''}`}
              >
                <div className="flex-1">
                  <p className="font-syne font-semibold text-sm text-[#1A1714] mb-1">{item.name}</p>
                  <p className="font-inter text-sm text-[#8A8178] leading-relaxed">{item.description}</p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#8A8178] border border-[#E0D9CE] px-2 py-1 whitespace-nowrap mt-0.5">
                  BUILDING
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-[#E0D9CE] py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-syne font-semibold text-sm text-[#1A1714] mb-1">Want to follow along?</p>
            <p className="font-inter text-sm text-[#8A8178]">We post updates on X as we build.</p>
          </div>
          <a
            href="https://x.com/larueagent"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8821A] hover:text-[#a07115] transition-colors"
          >
            Follow @larueagent →
          </a>
        </div>
      </section>
    </main>
  );
}
