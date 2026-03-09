"use client";

import Link from "next/link";
import Nav from "@/components/Nav";

export default function HomeMockupV2() {
  return (
    <main className="min-h-screen bg-parchment text-[#1A1714] flex flex-col font-inter">

      <Nav variant="light" />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 bg-parchment">
        <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">Performance Intelligence</p>
        <h1 className="font-syne text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">
          Know the athlete.<br />Coach the person.
        </h1>
        <p className="font-inter text-lg text-[#4A4540] max-w-xl mb-10 leading-relaxed">
          LaRue builds a living profile of every athlete — mental patterns, stress responses, performance tendencies — so coaches can intervene earlier and more precisely.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/book" className="bg-[#B8821A] text-parchment px-8 py-3 font-syne font-semibold tracking-wide hover:bg-[#a07115] transition-colors">
            Get the Book
          </Link>
          <Link href="/first-read" className="border border-[#1A1714] text-[#1A1714] px-8 py-3 font-syne font-semibold tracking-wide hover:bg-[#1A1714] hover:text-parchment transition-colors">
            Start Free
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-[#EAE5DC] px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">The Problem</p>
          <h2 className="font-syne text-4xl font-bold mb-6">Coaches see the output.<br />LaRue sees the signal.</h2>
          <p className="font-inter text-lg text-[#4A4540] max-w-2xl leading-relaxed">
            Most performance breakdowns are visible in the data before they show up on the field. But coaches don't have time to connect the dots across every athlete. LaRue does it automatically — surfacing patterns, flagging risk, and giving coaches a clear picture before the moment of crisis.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-parchment px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-12 text-center">What LaRue Does</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">Profile</p>
              <h3 className="font-syne text-xl font-bold mb-3">A living athlete record</h3>
              <p className="font-inter text-[#4A4540] leading-relaxed text-sm">
                LaRue builds athlete.md — a structured, evolving file that captures mental patterns, stress responses, and performance tendencies updated after every session.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">Signal</p>
              <h3 className="font-syne text-xl font-bold mb-3">Early warning, not post-mortem</h3>
              <p className="font-inter text-[#4A4540] leading-relaxed text-sm">
                Pattern recognition across sessions flags emerging risk before it becomes a performance or wellbeing crisis. Coaches get signal, not noise.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-3">Action</p>
              <h3 className="font-syne text-xl font-bold mb-3">Precision coaching interventions</h3>
              <p className="font-inter text-[#4A4540] leading-relaxed text-sm">
                LaRue tells coaches what to say, when to say it, and why — grounded in each athlete's actual history, not a generic playbook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-[#E0D9CE] px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">The Book</p>
          <h2 className="font-syne text-4xl font-bold mb-6">AI and Athletes</h2>
          <p className="font-inter text-lg text-[#4A4540] mb-10 leading-relaxed">
            The foundational text behind LaRue. Covers how AI is reshaping performance science, athlete development, and the future of coaching — written for coaches, parents, and athletes who want to get ahead of the curve.
          </p>
          <Link href="/book" className="bg-[#B8821A] text-parchment px-10 py-3 font-syne font-semibold tracking-wide hover:bg-[#a07115] transition-colors">
            Get the Book — $27
          </Link>
        </div>
      </section>

      {/* For Coaches */}
      <section className="bg-parchment px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-4">For Coaches</p>
          <h2 className="font-syne text-4xl font-bold mb-6">Built for the people<br />doing the work.</h2>
          <p className="font-inter text-lg text-[#4A4540] max-w-2xl mb-10 leading-relaxed">
            LaRue is designed for coaches who are already stretched thin. It doesn't add to your workload — it reduces the cognitive overhead of tracking every athlete so you can focus on what you do best.
          </p>
          <Link href="/for-coaches" className="border border-[#1A1714] text-[#1A1714] px-8 py-3 font-syne font-semibold tracking-wide hover:bg-[#1A1714] hover:text-parchment transition-colors">
            See the Coach Experience
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1714] text-parchment px-6 py-12 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-syne font-bold text-lg mb-2">LaRue</p>
            <p className="font-inter text-sm text-[#A09890]">Performance intelligence for coaches.</p>
          </div>
          <div className="flex flex-col gap-2 font-inter text-sm text-[#A09890]">
            <Link href="/book" className="hover:text-parchment transition-colors">Book</Link>
            <Link href="/first-read" className="hover:text-parchment transition-colors">First Read</Link>
            <Link href="/for-coaches" className="hover:text-parchment transition-colors">For Coaches</Link>
          </div>
          <p className="font-inter text-xs text-[#6B6560]">© 2025 Momentum Labs</p>
        </div>
      </footer>

    </main>
  );
}
