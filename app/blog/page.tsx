import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, ArrowRight } from 'lucide-react';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';
import { generateArticleSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/config';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ShareButtons from '@/components/ui/ShareButtons';
import CTABox from '@/components/ui/CTABox';
import ArticleCard from '@/components/blog/ArticleCard';
import AuthorCard from '@/components/blog/AuthorCard';
import JsonLd from '@/components/seo/JsonLd';
import CommentsSection from '@/components/blog/CommentsSection';
import NewsletterForm from '@/components/ui/NewsletterForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  const ogImage = post.seo.ogImage || post.coverImage;

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category.name,
      tags: post.tags,
      locale: 'es_MX',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
    },
    alternates: {
      canonical: post.seo.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`,
    },
    robots: post.seo.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category.slug, 3);

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.category.name, href: `/categoria/${post.category.slug}` },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const categoryColorClasses = {
    gold: 'category-badge',
    emerald: 'category-badge category-badge-emerald',
    ruby: 'category-badge category-badge-ruby',
    sapphire: 'category-badge category-badge-sapphire',
  };

  return (
    <>
      <JsonLd data={generateArticleSchema(post)} />

      <article className="min-h-screen">
        {/* Hero Section */}
        <header className="relative bg-mesh pt-8 pb-16 lg:pb-24">
          <div className="max-w-content mx-auto px-4 lg:px-6">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="max-w-article mx-auto text-center">
              {/* Category */}
              <Link
                href={`/categoria/${post.category.slug}`}
                className={categoryColorClasses[post.category.color]}
              >
                {post.category.name}
              </Link>

              {/* Title */}
              <h1 className="font-display text-display-sm lg:text-display-md text-ink-900 mt-6 mb-6 text-balance">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-body-lg lg:text-xl text-ink-600 mb-8 text-pretty">
                {post.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <AuthorCard
                  author={post.author}
                  publishedAt={post.publishedAt}
                  readingTime={post.readingTime}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="max-w-wide mx-auto px-4 lg:px-6 -mt-8">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-editorial-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-content mx-auto px-4 lg:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="max-w-article">
              {/* Article Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Box */}
              <CTABox variant="consultation" />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-ink-100">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag className="w-5 h-5 text-ink-400" />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/buscar?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-ink-100/50 text-ink-600 rounded-lg text-body-sm hover:bg-ink-200/50 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-ink-100 mb-12">
                <ShareButtons
                  url={`${siteConfig.url}/blog/${post.slug}`}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>

              {/* NUEVA SECCIÓN DE COMENTARIOS */}
              <CommentsSection slug={post.slug} title={post.title} />

            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start space-y-8">
              {/* Newsletter CTA ACTUALIZADO */}
              <div className="bg-gradient-to-br from-ink-900 to-ink-800 rounded-2xl p-6 text-cream-50">
                <h3 className="font-serif font-semibold text-lg mb-2">
                  Recibe más artículos así
                </h3>
                <p className="text-cream-300 text-body-sm mb-4">
                  Suscríbete y recibe noticias de inmigración cada semana.
                </p>
                <NewsletterForm variant="sidebar" />
              </div>

              {/* Categories */}
              <div className="bg-cream-100/50 rounded-2xl p-6">
                <h3 className="font-serif font-semibold text-ink-900 text-lg mb-4">
                  Categorías
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/categoria/inmigracion"
                    className="block py-2 px-3 rounded-lg text-ink-600 hover:bg-cream-200/50 hover:text-ink-900 transition-colors text-body-sm"
                  >
                    Inmigración
                  </Link>
                  <Link
                    href="/categoria/visas-humanitarias"
                    className="block py-2 px-3 rounded-lg text-ink-600 hover:bg-cream-200/50 hover:text-ink-900 transition-colors text-body-sm"
                  >
                    Visas Humanitarias
                  </Link>
                  <Link
                    href="/categoria/accidentes"
                    className="block py-2 px-3 rounded-lg text-ink-600 hover:bg-cream-200/50 hover:text-ink-900 transition-colors text-body-sm"
                  >
                    Accidentes
                  </Link>
                  <Link
                    href="/categoria/derechos-legales"
                    className="block py-2 px-3 rounded-lg text-ink-600 hover:bg-cream-200/50 hover:text-ink-900 transition-colors text-body-sm"
                  >
                    Derechos Legales
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 lg:py-24 bg-cream-100/50">
            <div className="max-w-wide mx-auto px-4 lg:px-6">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <div className="gold-line mb-4" />
                  <h2 className="font-display text-display-sm text-ink-900">
                    Artículos relacionados
                  </h2>
                </div>
                <Link
                  href={`/categoria/${post.category.slug}`}
                  className="hidden sm:inline-flex items-center gap-2 text-accent-gold hover:text-accent-copper font-medium transition-colors"
                >
                  Ver más en {post.category.name}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <ArticleCard key={relatedPost.slug} post={relatedPost} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}