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
    <div className="min-h-screen bg-[#0D0C0B] text-[#E8E0D5]">
      <Nav />

      <div className="max-w-2xl mx-auto px-6 pt-8 pb-24">
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
                    Read →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
