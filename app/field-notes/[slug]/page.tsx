import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFieldNoteBySlug, getAllFieldNotes } from '@/lib/field-notes';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const notes = getAllFieldNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getFieldNoteBySlug(params.slug);
  if (!note) return {};

  const title = `${note.title} — Field Notes — knwn.to`;
  const description = note.excerpt;
  const ogImage = `https://knwn.to/OG Image.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://knwn.to/field-notes/${params.slug}`,
      siteName: 'knwn.to',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
      publishedTime: note.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function FieldNotePage({ params }: Props) {
  const note = getFieldNoteBySlug(params.slug);
  if (!note) notFound();

  const processed = await remark().use(remarkHtml).process(note.content);
  // Strip the leading h1 from rendered markdown to avoid duplicating the title
  const contentHtml = processed.toString().replace(/^<h1[^>]*>.*?<\/h1>\s*/i, '');

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-[#E8E0D5]">
      {/* Back nav */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-4">
        <Link
          href="/field-notes"
          className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase"
        >
          ← Field Notes
        </Link>
      </div>

      <article className="max-w-2xl mx-auto px-6 pt-8 pb-24">
        {/* Date */}
        <p className="font-mono text-xs text-[#B8821A] tracking-widest uppercase mb-4">
          {new Date(note.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </p>

        {/* Title */}
        <h1 className="font-syne text-4xl font-bold text-[#E8E0D5] leading-tight mb-6">
          {note.title}
        </h1>

        {/* Author */}
        <p className="font-mono text-xs text-[#8A8178] tracking-widest uppercase mb-12">
          By {note.author}
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-[#B8821A] mb-12" />

        {/* Content */}
        <div
          className="prose-field-notes"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
