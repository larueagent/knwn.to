"use client";

import { useState } from "react";
import Link from "next/link";

const ATHLETES = {
  marcus: {
    name: "Marcus Webb",
    meta: "Wide Receiver · Football · Division I · Sophomore",
    id: "kto-0042-mw",
    date: "March 2, 2026",
    portrait: `You've been playing football since you were eight, but you didn't fall in love with the receiver position until your junior year of high school — the year a coach finally stopped treating you like a body and started treating you like a mind. The way you describe that shift says something important: you needed to be seen as a thinker before you could play like one. That's still true. When you're operating at your best, it's because someone in your corner — a coordinator, a quarterback, a position coach — has made it clear they trust your read of the field. When that trust is absent, you press. You try to make plays that prove something instead of plays that win something.

You came to this level fast. Faster than you expected. The gap between who you are and who you're supposed to be at this stage — that gap is real to you, even when it isn't visible to anyone else. The version of yourself you're building toward isn't louder or more explosive. It's cleaner. A guy who plays without the internal noise. That's closer than you think.`,
    identity: [
      "You compete best when the person throwing you the ball trusts you before the snap — not after you've proven it, before.",
      "Your instinct under pressure is to tighten your route running and get quieter, which looks like control from the outside but often feels like suppression from the inside.",
      "You came to this sport through a coach who changed the way you saw yourself — that origin still shows up in how much you need to feel seen by the people coaching you now.",
      "The version of you that almost transferred after freshman year — that moment shaped your relationship with patience in ways you're still figuring out.",
    ],
    pressureNarrative: `When the game is loud and the coverage is tight, you go internal fast. You don't panic outwardly — if anything you get more precise, more deliberate. But internally there's a running commentary: Am I good enough to be here? Is this the rep that exposes me? That question doesn't slow your feet. It slows your willingness to take risks. You'll run a safe route instead of the right one because safe routes don't get you benched.`,
    pressurePatterns: [
      "You replay the missed assignment, the dropped ball, the wrong read — on the sideline, in the huddle, sometimes through the next two series.",
      "You feel it in your chest first, then your hands — a slight tension that affects your catch radius before you're consciously aware you're carrying anything.",
    ],
    pressureFear: "That I'm not actually as good as my recruitment suggested. That I'm playing catch-up and everyone already knows it.",
    relationshipGets: "Your quarterback. He plays with the same internal pressure and you've never had to explain it — you just both know. Your older sister, who played college volleyball and was the first person to tell you that the mental side was real work, not weakness.",
    relationshipDoesnt: "Your position coach. He's technically excellent and you've learned a lot from him, but he coaches the physical and leaves the rest alone. You don't blame him. You just know there's a conversation that hasn't happened yet.",
    coachQuote: "I need you to tell me you trust me before the game. Not during. Before. I play a completely different game when I know that going in.",
    directionWant: "To stop proving myself and start just playing. To get to the point where I walk into a game already knowing I belong.",
    directionConsistent: "A version of yourself who runs every route with the same intention — not the ones where you're trying to make a statement, and not the ones where you're trying to stay safe. The same route. Every time. Because the game is what it is and you know what you're doing.",
    themes: ["external validation", "trust as precondition for performance", "identity gap between recruitment and reality"],
  },
  dani: {
    name: "Dani Cruz",
    meta: "400m Hurdles · Track & Field · Division II · Junior",
    id: "kto-0043-dc",
    date: "March 2, 2026",
    portrait: `You started in sprints. Pure speed, no complexity — you ran and you won and that was enough for a while. The hurdles found you at fifteen when a coach watched you run a 200 and said you were wasting footwork on flat ground. You didn't know what that meant until the first time you hit a race clean — every hurdle timed, every stride locked in — and felt something you hadn't felt in a flat sprint: that the event was actually hard enough to deserve you. You've been chasing that feeling since.

What you're building toward isn't a PR, exactly. It's a race where you don't negotiate with yourself mid-back-straight. Where the decision to push through the seventh hurdle happens before the gun, not during. You've had glimpses of that athlete — the one who doesn't ask permission from herself. She shows up about once a season, usually when no one is watching, and you run a time that surprises everyone but you. Making her the standard instead of the exception — that's what this is about.`,
    identity: [
      "You compete best when the race is tactical — when there's a problem to solve, not just ground to cover fast.",
      "Your instinct under pressure is to trust your first three hurdles and let the rhythm build; when that breaks down, you try to force the back half and that's when the wheels come off.",
      "You came to this event because someone saw something in your movement that you hadn't seen yet — you're still learning to see it yourself.",
      "The season you ran injured and didn't tell anyone, finished second in conference, and then sat in your car and cried for twenty minutes — that shaped how you carry pain now, and not all of it well.",
    ],
    pressureNarrative: `Pressure for you lives in the space between hurdles four and seven — literally and figuratively. The first half of a race you're executing. The second half you're deciding. That decision-making zone is where your mental game either holds or fractures, and you know it. You've spent enough time in that fracture to have a map of it.`,
    pressurePatterns: [
      "You start calculating instead of competing — time checks, place checks, gap to the leader — and the math pulls you out of your body.",
      "The physical signal is your shoulders: they rise, your arm carry shortens, and your hurdle clearance gets cautious.",
    ],
    pressureFear: "That I'm not mentally tough enough for this event. That the times I've fallen apart at conference were character, not circumstance.",
    relationshipGets: "Your training partner Maya, who runs the 800 and has the exact same internal experience — high technical ability, high self-doubt, deeply competitive. You don't talk about it directly but you train better when she's on the track. Your dad, who never played sports but shows up to every meet and has never once said anything about your times — only whether you looked like yourself out there.",
    relationshipDoesnt: "Most people who've coached you at this level. Not because they're bad coaches — because the event demands a psychological precision that almost no one coaches deliberately. You've been coached to run hurdles. You haven't been coached to race them.",
    coachQuote: "I need a plan for the back half that isn't just 'stay relaxed.' I know what fall-apart feels like. I need something to do when I feel it starting.",
    directionWant: "To run a race I'm proud of before I graduate. Not a PR necessarily — a race where I was all the way in it from gun to tape and I didn't negotiate.",
    directionConsistent: "Hurdle four through seven run the same way your first three are — with commitment, not calculation. A race where the decision to compete hard through the back straight is already made, and your body just executes it.",
    themes: ["technical mastery vs. psychological consistency", "self-trust as the limiting factor", "pain tolerance and concealment"],
  },
};

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="py-10 border-t border-[#D4C5A9]">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-xs text-[#8B7355]">{number}</span>
        <h2 className="font-syne text-xl font-bold text-[#1A1714]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function PreviewPage() {
  const [active, setActive] = useState<"marcus" | "dani">("marcus");
  const athlete = ATHLETES[active];

  return (
    <main className="min-h-screen bg-parchment text-text-primary">

      {/* Header */}
      <div className="px-6 py-12 max-w-2xl mx-auto">
        <Link href="/first-read" className="font-mono text-xs text-[#8B7355] tracking-widest uppercase hover:text-accent transition-colors">
          ← The First Read
        </Link>

        <div className="mt-10 mb-4">
          <p className="font-mono text-xs text-[#8B7355] tracking-[0.2em] uppercase mb-3">
            Sample First Read
          </p>
          <h1 className="font-syne text-4xl md:text-5xl font-bold leading-tight">
            This is what yours<br />will look like.
          </h1>
        </div>
        <p className="font-inter text-text-secondary leading-relaxed mt-4 max-w-lg">
          Two real portraits, built from fictional athletes using the same questions you'll answer.
          The structure is exact. The language is the same. The only difference is the athlete.
        </p>

        {/* Toggle */}
        <div className="flex gap-3 mt-10">
          {(["marcus", "dani"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2 font-mono text-xs tracking-widest uppercase border transition-colors duration-150 ${
                active === key
                  ? "bg-text-primary text-parchment border-text-primary"
                  : "border-[#D4C5A9] text-text-secondary hover:border-text-primary hover:text-text-primary"
              }`}
            >
              {ATHLETES[key].name}
            </button>
          ))}
        </div>

        {/* Document header */}
        <div className="border border-[#D4C5A9] bg-[#EDE8DE] p-6 mt-8 mb-2">
          <h2 className="font-syne text-3xl font-bold mb-1">{athlete.name}</h2>
          <p className="font-mono text-xs text-[#8B7355] mb-3">{athlete.meta}</p>
          <div className="flex gap-6 font-mono text-xs text-[#8B8B8B]">
            <span>First Read: {athlete.date}</span>
            <span>ID: {athlete.id}</span>
          </div>
        </div>

        {/* Authorship note */}
        <div className="border-l-2 border-[#8B7355] pl-5 py-1 my-8">
          <p className="font-inter text-sm text-text-secondary italic leading-relaxed">
            This document was written from your answers to The First Read. The words are mostly yours —
            we've organized them, but we haven't changed what you meant. Read it. If something's wrong,
            you'll know immediately. If something's right, you'll probably feel it.
          </p>
          <p className="font-inter text-sm text-text-secondary italic mt-3">
            This is your baseline. The athlete you are right now, on {athlete.date}. Keep it.
          </p>
        </div>

        {/* Portrait */}
        <Section number="01" title="The Portrait">
          {athlete.portrait.split("\n\n").map((para, i) => (
            <p key={i} className="font-inter text-text-primary leading-relaxed mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </Section>

        {/* Competitive Identity */}
        <Section number="02" title="Competitive Identity">
          <ul className="space-y-4">
            {athlete.identity.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-accent mt-1 shrink-0">—</span>
                <p className="font-inter text-text-primary leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Pressure Profile */}
        <Section number="03" title="Pressure Profile">
          <p className="font-inter text-text-primary leading-relaxed mb-6">{athlete.pressureNarrative}</p>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">When things go wrong:</p>
          <ul className="space-y-3 mb-6">
            {athlete.pressurePatterns.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-accent mt-1 shrink-0">—</span>
                <p className="font-inter text-text-primary leading-relaxed">{p}</p>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">What you're afraid people see:</p>
          <p className="font-inter text-text-primary leading-relaxed italic">"{athlete.pressureFear}"</p>
        </Section>

        {/* Relationships */}
        <Section number="04" title="Relationships & Environment">
          <div className="space-y-5 mb-6">
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Who gets it:</p>
              <p className="font-inter text-text-primary leading-relaxed">{athlete.relationshipGets}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Who doesn't:</p>
              <p className="font-inter text-text-primary leading-relaxed">{athlete.relationshipDoesnt}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            What you haven't figured out how to say to your coach yet:
          </p>
          <div className="border-l-2 border-accent pl-5">
            <p className="font-inter text-text-primary leading-relaxed italic">"{athlete.coachQuote}"</p>
          </div>
        </Section>

        {/* The Direction */}
        <Section number="05" title="The Direction">
          <div className="space-y-5 mb-6">
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">What you said you want:</p>
              <p className="font-inter text-text-primary leading-relaxed italic">"{athlete.directionWant}"</p>
            </div>
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">What consistent play looks like for you:</p>
              <p className="font-inter text-text-primary leading-relaxed">{athlete.directionConsistent}</p>
            </div>
          </div>
          <div className="border-t border-[#D4C5A9] pt-5 mt-5">
            <p className="font-inter text-text-primary font-medium">
              The gap between those two things — that's the work.
            </p>
          </div>
        </Section>

        {/* Metadata — blurred paid tier teaser */}
        <div className="py-10 border-t border-[#D4C5A9]">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-xs text-accent">06</span>
            <h2 className="font-syne text-xl font-bold text-text-primary">First Read Metadata</h2>
          </div>
          <div className="relative">
            <div className="space-y-2 select-none blur-[3px] pointer-events-none">
              <p className="font-mono text-xs text-text-secondary">Intake date: {athlete.date}</p>
              <p className="font-mono text-xs text-text-secondary">Questions answered: 10/10</p>
              <p className="font-mono text-xs text-text-secondary">Notable themes: {athlete.themes.join(", ")}</p>
              <p className="font-mono text-xs text-text-secondary">ACSI indicators: loading...</p>
              <p className="font-mono text-xs text-text-secondary">Wearable data: not connected</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-mono text-xs text-accent uppercase tracking-widest bg-parchment px-4 py-2 border border-border">
                Available in paid tier
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-[#D4C5A9] text-center">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
            Ready for yours?
          </p>
          <h2 className="font-syne text-3xl font-bold mb-6">
            This is what ten honest answers get you.
          </h2>
          <Link
            href="/start"
            className="inline-block px-10 py-4 bg-accent text-parchment font-mono text-sm tracking-widest uppercase hover:opacity-90 transition-opacity duration-200"
          >
            Begin your First Read
          </Link>
          <p className="mt-4 font-mono text-xs text-text-secondary">Free. 15 minutes. Yours to keep.</p>
        </div>

      </div>
    </main>
  );
}
