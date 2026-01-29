export interface Author {
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  seo: SEOData;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  color: 'gold' | 'emerald' | 'ruby' | 'sapphire';
  icon?: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
