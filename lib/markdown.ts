import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs(type: 'posts' | 'pages') {
  return fs.readdirSync(path.join(contentDirectory, type)).filter(file => file.endsWith('.md') && file !== '.md');
}

export function getPostBySlug(slug: string, type: 'posts' | 'pages') {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, type, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(html).process(markdown);
  return result.toString();
}

export function getAllPosts(type: 'posts' | 'pages') {
  const slugs = getPostSlugs(type);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, type))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
