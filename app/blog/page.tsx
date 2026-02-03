import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Filter } from 'lucide-react';
import ArticleCard from '@/components/blog/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import { categories, siteConfig, seoKeywords } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Blog | Artículos sobre Inmigración, Visas y Derechos Legales',
  description:
    'Lee nuestros artículos sobre inmigración, visas humanitarias, accidentes y derechos legales en USA. Información actualizada en español.',
  keywords: [...seoKeywords.global, 'blog inmigración', 'noticias inmigración', 'artículos legales'],
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      'Lee nuestros artículos sobre inmigración, visas humanitarias, accidentes y derechos legales en USA.',
    url: `${siteConfig.url}/blog`,
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();
  const featuredPost = featuredPosts[0] || allPosts[0];
  const remainingPosts = allPosts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen bg-mesh">
      {/* Header */}
      <section className="pt-8 pb-16 lg:pb-24">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />

          <div className="text-center max-w-3xl mx-auto">
            <div className="gold-line mx-auto mb-6" />
            <h1 className="font-display text-display-md lg:text-display-lg text-ink-900 mb-6">
              Nuestro Blog
            </h1>
            <p className="text-body-lg text-ink-600">
              Artículos, guías y noticias actualizadas sobre inmigración, visas humanitarias,
              accidentes y derechos legales en Estados Unidos. Todo en español claro.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 bg-ink-900 text-cream-50 rounded-full text-body-sm font-medium"
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="px-4 py-2 bg-ink-100/50 text-ink-700 rounded-full text-body-sm font-medium hover:bg-ink-200/50 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="pb-16 lg:pb-24">
          <div className="max-w-wide mx-auto px-4 lg:px-6">
            <ArticleCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          {remainingPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-cream-100/50 rounded-3xl">
              <BookOpen className="w-20 h-20 text-ink-300 mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-ink-700 mb-3">
                Próximamente más artículos
              </h2>
              <p className="text-ink-500 max-w-md mx-auto">
                Estamos trabajando en contenido de calidad. Suscríbete a nuestro newsletter para
                recibir notificaciones.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
