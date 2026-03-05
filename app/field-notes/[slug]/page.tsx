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
  const note = await getFieldNoteBySlug(params.slug);
  if (!note) return { title: 'Not Found' };

  const ogTitle = note.ogTitle || note.title;
  const ogDescription = note.ogDescription || note.excerpt;
  const ogImage = note.ogImage || '/og-default.png';
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `https://knwn.to${ogImage}`;

  return {
    title: `${note.title} — Field Notes — knwn.to`,
    description: note.excerpt,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `https://knwn.to/field-notes/${params.slug}`,
      type: 'article',
      publishedTime: note.date,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function FieldNotePage({ params }: Props) {
  const note = getFieldNoteBySlug(params.slug);
  if (!note) notFound();

  const processed = await remark().use(remarkHtml).process(note.content);
  const contentHtml = processed.toString().replace(/^<h1[^>]*>.*?<\/h1>\s*/i, '');

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-[#E8E0D5]">
      {/* Back nav */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-4">
        <Link
          href="/field-notes"
          className="font-mono text-xs text-[#8A8178] hover:text-[#B8821A] transition-colors tracking-widest uppercase"
        >
          &#8592; Field Notes
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
        <div className="border-t border-[#2A2520] mb-12" />

        {/* Content */}
        <div
          className="prose prose-invert prose-sm max-w-none
            prose-headings:font-syne prose-headings:text-[#E8E0D5]
            prose-p:text-[#C8BFB5] prose-p:leading-relaxed
            prose-a:text-[#B8821A] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#E8E0D5]
            prose-blockquote:border-[#B8821A] prose-blockquote:text-[#8A8178]
            prose-code:text-[#B8821A] prose-code:bg-[#1A1814]
            prose-pre:bg-[#1A1814] prose-pre:border prose-pre:border-[#2A2520]"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}
