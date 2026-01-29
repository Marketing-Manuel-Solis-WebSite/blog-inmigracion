import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';
import { BlogPost, Category } from '@/types';
import { categories, defaultAuthor } from './config';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    const stats = readingTime(content);

    const category = categories.find((cat) => cat.slug === data.category) || categories[0];

    return {
      slug: realSlug,
      title: data.title,
      excerpt: data.excerpt,
      content: contentHtml,
      coverImage: data.coverImage || '/images/blog/placeholder.svg',
      category,
      author: data.author || defaultAuthor,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      readingTime: `${Math.ceil(stats.minutes)} min de lectura`,
      tags: data.tags || [],
      featured: data.featured || false,
      seo: {
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt,
        keywords: data.keywords || [],
        ogImage: data.ogImage || data.coverImage,
      },
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => getPostBySlug(slug.replace(/\.md$/, '')))
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category.slug === categorySlug);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.featured);
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category.slug === category)
    .slice(0, limit);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Re-export from utils for convenience
export { formatDate } from './utils';
