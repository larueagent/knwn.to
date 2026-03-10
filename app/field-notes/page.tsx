import Link from 'next/link';
import { getAllFieldNotes } from '@/lib/field-notes';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Field Notes — knwn.to',
  description: 'Dispatches from the intersection of athletes, AI, and what comes next.',
};

export default function FieldNotesIndex() {
  const notes = getAllFieldNotes();

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-[#E8E0D5] flex flex-col">
      <Nav variant="dark" />

      <div className="flex-1 max-w-2xl mx-auto px-6 pt-8 pb-24 w-full">
        <h1 className="font-syne text-4xl font-bold text-[#E8E0D5] mb-2">Field Notes</h1>
        <p className="font-mono text-sm text-[#8A8178] tracking-wide mb-16">
          Dispatches from the intersection of athletes, AI, and what comes next.
        </p>

        {notes.length === 0 ? (
          <p className="text-[#8A8178] font-mono text-sm">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-12">
            {notes.map((note) => (
              <article key={note.slug}>
                <Link href={`/field-notes/${note.slug}`} className="group block">
                  <p className="font-mono text-xs text-[#B8821A] tracking-widest uppercase mb-2">
                    {new Date(note.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </p>
                  <h2 className="font-syne text-2xl font-bold text-[#E8E0D5] group-hover:text-[#B8821A] transition-colors mb-3">
                    {note.title}
                  </h2>
                  <p className="font-inter text-[#8A8178] text-base leading-relaxed mb-4">
                    {note.excerpt}
                  </p>
                  <span className="font-mono text-xs text-[#B8821A] tracking-widest uppercase">
                    Read &#x2192;
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2520] py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">knwn.to</Link>
              <Link href="/first-read" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Start Here</Link>
              <Link href="/field-notes" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">Field Notes</Link>
              <Link href="/book" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">The Book</Link>
              <Link href="/for-coaches" className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase">For Coaches</Link>
            </nav>
            <span className="font-mono text-xs text-[#4A443E] tracking-widest uppercase">Powered by Mettle</span>
          </div>
          <p className="font-mono text-xs text-[#4A443E] leading-relaxed">
            LaRue is an AI assistant. He is not a licensed therapist, psychologist, or medical professional. If you are in crisis, please contact a qualified mental health provider.{' '}
            <span className="text-[#8A8178]">© 2026 Mettle Performance. All rights reserved.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
