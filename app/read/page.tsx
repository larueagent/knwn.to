import Link from 'next/link'

export const metadata = {
  title: 'Chapter 1 — knwn.to',
  description: 'You\'ve Talked to AI. It Didn\'t Really Talk to You. — A preview chapter from the upcoming book by Robert Yang.',
}

export default function ReadPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#e8e8e8' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Link href="/" style={{
          color: 'rgba(255,255,255,0.5)',
          textDecoration: 'none',
          fontSize: '14px',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'color 0.2s',
        }}>
          ← knwn.to
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Chapter Preview
        </span>
      </nav>

      {/* Content */}
      <main style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '120px 32px 140px',
      }}>
        {/* Chapter label */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '24px',
        }}>
          Chapter 1 — AI &amp; Athletes
        </p>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: '600',
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          color: '#ffffff',
          marginBottom: '48px',
        }}>
          You&apos;ve Talked to AI.<br />It Didn&apos;t Really Talk to You.
        </h1>

        {/* Body */}
        <div style={{ fontSize: '18px', lineHeight: '1.75', color: 'rgba(255,255,255,0.78)', display: 'flex', flexDirection: 'column', gap: '28px' }} className="chapter-body">

          <p>You&apos;ve already used ChatGPT.</p>

          <p>Maybe you asked it how to deal with pre-game nerves. It gave you five bullet points. Deep breaths. Positive self-talk. Visualization. Focus on process, not outcome. Trust your training.</p>

          <p>Not wrong. Also not about you.</p>

          <p>It didn&apos;t know you&apos;re a sophomore setter who has been watching the senior start every match for three weeks. It didn&apos;t know you finally got the call on Thursday — you&apos;re starting Saturday — and that the thing keeping you up isn&apos;t nerves exactly, it&apos;s the fear that you&apos;ll prove everyone right who thought you weren&apos;t ready. It didn&apos;t know that &quot;trust your training&quot; lands hollow because you missed six weeks in October with a stress fracture and you&apos;re not sure you trust your body yet, let alone your training.</p>

          <p>It gave you athlete-with-pre-game-nerves advice. Generic. Technically accurate. Almost completely useless.</p>

          <p>That&apos;s not a you problem. That&apos;s not even an AI problem. That&apos;s a context problem.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.01em' }}>The Blank Slate</h2>

          <p>Every conversation with an AI starts from zero.</p>

          <p>It doesn&apos;t remember what you told it last week. It doesn&apos;t know your sport, your position, your team, your history, your coaching relationship, your injury record, your mental game, your goals, your fears, or the thing that happened in that semifinal two years ago that you still think about. It knows nothing about you — until you tell it.</p>

          <p>Most people never tell it.</p>

          <p>They type a question. They get an answer. The answer is fine. They move on. They come back tomorrow, type another question, and the AI has forgotten everything again. The same blank slate, every time.</p>

          <p>This is the core problem with how almost every athlete uses AI right now. They treat it like a search engine — ask a question, get a result. And a search engine that talks back is genuinely useful. But it is a fraction of what&apos;s possible when AI actually knows you.</p>

          <p>Here&apos;s the difference.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.01em' }}>Two Athletes, Same Question</h2>

          <p>Athlete A types: <em>&quot;How do I stay focused in tight moments?&quot;</em></p>

          <p style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid rgba(255,255,255,0.15)', padding: '20px 24px', borderRadius: '0 4px 4px 0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
            &quot;Staying focused under pressure requires managing your attention deliberately. Try focusing on one cue at a time — a single technical element rather than the outcome. Use controlled breathing to reset between points. Develop a pre-performance routine that anchors you to the present. Trust your preparation.&quot;
          </p>

          <p>Fine. Nothing wrong with it. Nothing personal about it either.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <p>Athlete B opens AI with a file she built — her athlete.md. It tells the AI everything: she&apos;s a D1 midfielder, junior year, playing through a coaching change that&apos;s disrupted the offensive system she was recruited for. Her best games happen when she feels physically loose and socially connected to her teammates. Her worst games happen when she&apos;s in her head about whether she&apos;s doing enough to deserve her starting spot. She has a habit of over-controlling the ball in tight moments, trying to manufacture something instead of reading and reacting. Her performance coach has been working with her on letting the game come to her.</p>

          <p>She types the same question: <em>&quot;How do I stay focused in tight moments?&quot;</em></p>

          <p style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid rgba(255,255,255,0.15)', padding: '20px 24px', borderRadius: '0 4px 4px 0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
            &quot;Given what I know about your game — you tend to tighten up around the question of whether you&apos;re doing enough. In tight moments, that usually shows up as you trying to create instead of read, over-touching the ball when the simpler play is right there. The focus question isn&apos;t really about staying present — it&apos;s about trusting your read. One thing worth trying: before you receive the ball, make your decision early. What does the space tell you before the ball arrives? That pre-decision habit takes the &apos;am I doing enough&apos; question off the table. You&apos;ve already answered it.&quot;
          </p>

          <p>Same AI. Same underlying technology. Completely different conversation — because one athlete gave it context and one didn&apos;t.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.01em' }}>Why This Matters More for Athletes Than Almost Anyone</h2>

          <p>Athletes live in a world of feedback that is simultaneously constant and incomplete.</p>

          <p>Your coach watches film. Your trainer tracks your load. Your parents watch from the stands. Your teammates have opinions. Everyone sees a piece of you — and almost nobody sees the full picture. The performance data lives in one app. The mental data lives nowhere except your own head. The injury history lives in a training room somewhere. None of it connects.</p>

          <p>What you actually need — what would actually help — is something that holds all of it together. Something that knows your physical history and your mental patterns and your coaching relationship and your goals and can see them as one picture, not a dozen separate data points.</p>

          <p>That&apos;s what athlete.md does. It&apos;s a file that holds the full picture of you as an athlete. Built once, updated over time, readable by any AI you use. The blank slate problem, solved.</p>

          <p>By the time you finish this book, you&apos;ll have built yours.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.01em' }}>The 16 Percent</h2>

          <p>Here&apos;s a number that surprised me when I first saw it.</p>

          <p>Eighty-four percent of people on this planet have never typed a prompt to an AI. Not once. They&apos;ve never used ChatGPT, never asked Claude a question, never talked to any of it.</p>

          <p>You have. That puts you in the 16 percent — the fraction of the global population that has crossed the first threshold. Which means you&apos;re not starting from zero. You&apos;ve already seen what AI can do when you give it a basic question.</p>

          <p>What you haven&apos;t seen yet is what it can do when you give it <em>you</em>.</p>

          <p>That&apos;s what this book is about. Not convincing you AI is useful — you already know that. Teaching you the one thing that makes it actually useful <em>for you specifically</em>: giving it enough context to stop being generic.</p>

          <p>The athletes who figure this out first will have an edge that is very difficult to describe to someone who hasn&apos;t experienced it. Not because the AI is magic. Because knowing yourself well enough to explain yourself to something that asks good questions turns out to be one of the most valuable skills you can develop — and it makes every other tool you use sharper in the process.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.01em' }}>What We&apos;re Building</h2>

          <p>This book has one deliverable: your athlete.md.</p>

          <p>Each chapter adds one section to it. By Chapter 11, the file is complete. Chapter 12 shows you what a real AI conversation looks like when the file is loaded — not a demo, an actual conversation you&apos;ll have. Chapter 14 is where you publish your knwn.to profile: a permanent home for your athlete.md that travels with you when you change coaches, change teams, change sports.</p>

          <p>The file is yours. The profile is yours. They don&apos;t belong to any team, any program, any school. If you get cut tomorrow, you keep them. If you transfer, you take them. If you graduate and move into the next chapter of your athletic life — recreational, professional, coaching, whatever — they come with you.</p>

          <p>We&apos;ll get to all of that. But first, let&apos;s make sure you actually understand what AI is — and more importantly, what it isn&apos;t — so the thing you build is built for the right reasons.</p>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '48px 0' }} />

          <p style={{ fontSize: '20px', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: '1.6' }}>
            &quot;The AI you&apos;ve been using isn&apos;t broken. It just doesn&apos;t know you. That&apos;s what we&apos;re about to fix.&quot;
          </p>

        </div>
      </main>

      {/* Sticky bottom CTA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
          AI &amp; Athletes — Robert Yang
        </p>
        <Link href="/" style={{
          background: '#ffffff',
          color: '#0a0a0a',
          padding: '10px 20px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          Get early access →
        </Link>
      </div>
    </div>
  )
}
