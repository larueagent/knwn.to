import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#1a1a1a] font-sans">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1a1a1a]/10">
        <span className="font-bold tracking-tight text-lg">knwn.to</span>
        <div className="flex gap-6 text-sm items-center">
          <Link href="/first-read" className="font-bold bg-[#1a1a1a] text-[#f0ede8] px-4 py-2 hover:bg-[#2a2520] transition-colors">Start Here</Link>
          <Link href="/field-notes" className="hover:underline">Field Notes</Link>
          <Link href="/book" className="hover:underline">The Book</Link>
          <Link href="/for-coaches" className="hover:underline">For Coaches</Link>
        </div>
      </nav>
      <section className="max-w-4xl mx-auto px-8 py-28 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">
          Every young athlete needs to know how to work with AI.
          <br />
          <span className="text-[#1a1a1a]/50">Most don&apos;t know where to start.</span>
        </h1>
        <p className="text-xl text-[#1a1a1a]/70 mb-3 max-w-2xl mx-auto leading-relaxed">The athletes who get the most out of AI won&apos;t be the ones with the best tools.</p>
        <p className="text-xl text-[#1a1a1a]/70 mb-3 max-w-2xl mx-auto leading-relaxed">They&apos;ll be the ones with an AI that actually knows them.</p>
        <p className="text-xl text-[#1a1a1a]/70 mb-10 max-w-2xl mx-auto leading-relaxed">That starts with one document: <span className="font-mono font-semibold text-[#1a1a1a]">your athlete.md.</span></p>
        <Link href="/first-read" className="inline-block bg-[#1a1a1a] text-[#f0ede8] px-8 py-4 text-base font-semibold mb-4 hover:bg-[#2a2520] transition-colors">Build your athlete.md — free, takes 10 minutes</Link>
        <br />
        <Link href="/sign-in" className="text-sm text-[#1a1a1a]/50 underline underline-offset-4 hover:text-[#1a1a1a] transition-colors">Already have yours? Sign in.</Link>
      </section>
      <section className="bg-[#1a1a1a] text-[#f0ede8] px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl leading-relaxed mb-4 text-[#f0ede8]/90">AI is already in your sport. Scouts use it. Coaches use it. Recruiters use it.</p>
          <p className="text-xl leading-relaxed text-[#f0ede8]/70">The athletes who thrive won&apos;t just be faster — they&apos;ll be the ones who know how to be known, and who use AI to keep developing.</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-bold mb-3 text-center">An athlete.md is your mental performance identity.</h2>
        <p className="text-center text-[#1a1a1a]/50 mb-16 text-lg">In plain language. Yours to own.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[{label:"What it captures",body:"How you handle pressure. What derails you. How you prepare. What you need before a big game. Not a test result. Not a score. A real picture of how you compete — written in language you and any coach can actually use."},{label:"Why it matters for AI",body:"An AI is only as useful as what it knows about you. Without a profile, every session starts from zero. With an athlete.md, LaRue knows your patterns before you say a word. That is what it means to get the most out of AI."},{label:"You own it",body:"Your athlete.md is a plain text file. Take it anywhere. Share it with a coach. Use it with any AI tool. It is not locked inside an app. It belongs to you."}].map(({label,body})=>(
            <div key={label}><h3 className="font-bold uppercase tracking-wider text-[#1a1a1a]/40 text-xs mb-3">{label}</h3><p className="text-[#1a1a1a]/70 text-base leading-relaxed">{body}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-[#1a1a1a] text-[#f0ede8] px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#B8821A] mb-6">Meet LaRue</p>
          <h2 className="text-3xl font-bold mb-6">LaRue builds your athlete.md. Then puts it to work.</h2>
          <p className="text-lg text-[#f0ede8]/70 leading-relaxed mb-4">LaRue is an AI agent trained on mental performance in sport. Answer 10 questions. He generates your profile, reads it before every session, reaches out before big moments, and gets smarter the longer you work together.</p>
          <p className="text-lg text-[#f0ede8]/70 leading-relaxed mb-10">The athletes who will outperform in the next decade aren&apos;t just mentally tough — they&apos;re self-aware enough to use every tool available, including AI, to know themselves better. LaRue is built to develop that skill. When you need a real coach, he connects you to one.</p>
          <Link href="/first-read" className="inline-block border border-[#f0ede8] text-[#f0ede8] px-8 py-4 text-base font-semibold hover:bg-[#f0ede8] hover:text-[#1a1a1a] transition-colors">Start your athlete.md — free</Link>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-bold mb-3 text-center">This is what an athlete.md looks like.</h2>
        <p className="text-center text-[#1a1a1a]/50 mb-10">Jaime is a composite athlete. Ten minutes in, this is what LaRue produced.</p>
        <div className="border border-[#1a1a1a]/15 bg-[#e8e4de] p-8 font-mono text-sm leading-relaxed text-[#1a1a1a]/80">
          <p className="text-[#1a1a1a]/40 mb-4"># athlete.md — Jaime R.</p>
          <p className="mb-1"><span className="text-[#1a1a1a]/40">athlete_type:</span> The Grinder</p>
          <p className="mb-1"><span className="text-[#1a1a1a]/40">pressure_response:</span> Internalizes. Goes quiet before big moments.</p>
          <p className="mb-1"><span className="text-[#1a1a1a]/40">derailer:</span> Comparison to teammates. Rumination after errors.</p>
          <p className="mb-1"><span className="text-[#1a1a1a]/40">pre_competition:</span> Needs 20 min alone. Music off. No strategy talk.</p>
          <p className="mb-1"><span className="text-[#1a1a1a]/40">strength:</span> Consistency under fatigue. Coachable. Process-oriented.</p>
          <p className="mt-4 text-[#1a1a1a]/40">[full profile — 380 words]</p>
        </div>
        <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/jaime" className="text-sm text-[#1a1a1a]/50 underline underline-offset-4 hover:text-[#1a1a1a] transition-colors">View full sample →</Link>
          <Link href="/first-read" className="inline-block bg-[#1a1a1a] text-[#f0ede8] px-8 py-4 text-sm font-semibold hover:bg-[#2a2520] transition-colors">Build yours free</Link>
        </div>
      </section>
      <footer className="border-t border-[#1a1a1a]/10 px-8 py-10 text-sm text-[#1a1a1a]/40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div><p className="font-bold text-[#1a1a1a] mb-1">knwn.to</p><p>Powered by Mettle</p></div>
          <div className="flex gap-6 flex-wrap items-start">
            <Link href="/first-read" className="hover:text-[#1a1a1a] transition-colors">Start Here</Link>
            <Link href="/field-notes" className="hover:text-[#1a1a1a] transition-colors">Field Notes</Link>
            <Link href="/book" className="hover:text-[#1a1a1a] transition-colors">The Book</Link>
            <Link href="/for-coaches" className="hover:text-[#1a1a1a] transition-colors">For Coaches</Link>
            <Link href="https://momentumlabs.coach" className="hover:text-[#1a1a1a] transition-colors" target="_blank" rel="noopener noreferrer">momentumlabs.coach</Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-[#1a1a1a]/10">
          <p className="mb-1">LaRue is an AI agent. He is not a licensed therapist or clinical psychologist. AI-powered. Real coaches available when you need them.</p>
          <p>&copy; 2026 Mettle Performance. Athlete data is never sold or shared without explicit consent.</p>
        </div>
      </footer>
    </main>
  );
}