import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFieldNoteBySlug, getAllFieldNotes } from '@/lib/field-notes';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };
}

// Rehype plugin that injects inline styles onto each element
function rehypeInlineStyles() {
  const styles: Record<string, string> = {
    h1: 'display:none',
    h2: 'font-family:var(--font-syne),sans-serif;font-size:1.5rem;font-weight:700;color:#E8E0D5;margin-top:2.5rem;margin-bottom:1rem;line-height:1.3',
    h3: 'font-family:var(--font-syne),sans-serif;font-size:1.2rem;font-weight:600;color:#E8E0D5;margin-top:2rem;margin-bottom:0.75rem;line-height:1.4',
    p: 'font-family:var(--font-inter),system-ui,sans-serif;color:#C8BFB5;font-size:1.0625rem;line-height:1.8;margin-bottom:1.5rem',
    em: 'color:#E8E0D5;font-style:italic',
    strong: 'color:#E8E0D5;font-weight:600',
    a: 'color:#B8821A;text-decoration:underline;text-underline-offset:3px',
    hr: 'border:none;border-top:1px solid #2A2520;margin:2.5rem 0',
    blockquote: 'border-left:2px solid #B8821A;padding-left:1.25rem;color:#8A8178;font-style:italic;margin-bottom:1.5rem',
    ul: 'list-style:disc;padding-left:1.5rem;margin-bottom:1.5rem;color:#C8BFB5',
    ol: 'list-style:decimal;padding-left:1.5rem;margin-bottom:1.5rem;color:#C8BFB5',
    li: 'margin-bottom:0.5rem;color:#C8BFB5;font-size:1.0625rem;line-height:1.8',
  };

  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      const style = styles[node.tagName];
      if (style) {
        node.properties = node.properties || {};
        node.properties.style = style;
      }
    });
  };
}

export default async function FieldNotePage({ params }: Props) {
  const note = getFieldNoteBySlug(params.slug);
  if (!note) notFound();

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeInlineStyles)
    .use(rehypeStringify)
    .process(note.content);

  const contentHtml = processed.toString();

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
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.75rem',color:'#B8821A',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'1rem'}}>
          {new Date(note.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </p>

        {/* Title */}
        <h1 style={{fontFamily:'var(--font-syne),sans-serif',fontSize:'2.2rem',fontWeight:700,color:'#E8E0D5',lineHeight:1.2,marginBottom:'1.5rem'}}>
          {note.title}
        </h1>

        {/* Author */}
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.75rem',color:'#8A8178',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'3rem'}}>
          By {note.author}
        </p>

        {/* Divider */}
        <div style={{borderTop:'1px solid #2A2520',marginBottom:'3rem'}} />

        {/* Content */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}
