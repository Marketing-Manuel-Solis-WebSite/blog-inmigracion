import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import ArticleCard from '@/components/blog/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getPostsByCategory, getCategoryBySlug } from '@/lib/blog';
import { siteConfig, seoKeywords, categories } from '@/lib/config';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  const categoryKeywords = seoKeywords[categorySlug as keyof typeof seoKeywords] || [];

  return {
    title: `${category.name} | Artículos y Guías`,
    description: category.description,
    keywords: [...seoKeywords.global, ...categoryKeywords],
    openGraph: {
      title: `${category.name} | ${siteConfig.name}`,
      description: category.description,
      url: `${siteConfig.url}/categoria/${category.slug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/categoria/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(categorySlug);

  const categoryColorClasses = {
    gold: 'from-accent-gold/20 to-accent-gold/5 border-accent-gold/30',
    emerald: 'from-accent-emerald/20 to-accent-emerald/5 border-accent-emerald/30',
    ruby: 'from-accent-ruby/20 to-accent-ruby/5 border-accent-ruby/30',
    sapphire: 'from-accent-sapphire/20 to-accent-sapphire/5 border-accent-sapphire/30',
  };

  const categoryTextClasses = {
    gold: 'text-accent-gold',
    emerald: 'text-accent-emerald',
    ruby: 'text-accent-ruby',
    sapphire: 'text-accent-sapphire',
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section
        className={`pt-8 pb-16 lg:pb-24 bg-gradient-to-b ${categoryColorClasses[category.color]}`}
      >
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: category.name, href: `/categoria/${category.slug}` },
            ]}
          />

          <div className="max-w-3xl">
            <span
              className={`inline-block text-body-sm font-medium uppercase tracking-wider mb-4 ${categoryTextClasses[category.color]}`}
            >
              Categoría
            </span>
            <h1 className="font-display text-display-md lg:text-display-lg text-ink-900 mb-6">
              {category.name}
            </h1>
            <p className="text-body-lg text-ink-600">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 lg:py-24 bg-mesh">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          {posts.length > 0 ? (
            <>
              {/* Featured Article */}
              {posts[0] && (
                <div className="mb-12">
                  <ArticleCard post={posts[0]} variant="featured" />
                </div>
              )}

              {/* Remaining Articles */}
              {posts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post, index) => (
                    <ArticleCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-cream-100/50 rounded-3xl">
              <BookOpen className="w-20 h-20 text-ink-300 mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-ink-700 mb-3">
                Próximamente artículos de {category.name}
              </h2>
              <p className="text-ink-500 max-w-md mx-auto">
                Estamos trabajando en contenido de calidad para esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
