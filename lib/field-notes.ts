import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/field-notes');

export interface FieldNote {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  content: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function getAllFieldNotes(): Omit<FieldNote, 'content'>[] {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allNotes = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        ogTitle: data.ogTitle || undefined,
        ogDescription: data.ogDescription || undefined,
        ogImage: data.ogImage || undefined,
      };
    });

  return allNotes.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFieldNoteBySlug(slug: string): FieldNote | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      author: data.author || '',
      content,
      ogTitle: data.ogTitle || undefined,
      ogDescription: data.ogDescription || undefined,
      ogImage: data.ogImage || undefined,
    };
  } catch {
    return null;
  }
}
