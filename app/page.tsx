import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Users, Shield, TrendingUp, Star, ChevronRight } from 'lucide-react';
import ArticleCard from '@/components/blog/ArticleCard';
import CategoryCard from '@/components/blog/CategoryCard';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import { categories, siteConfig } from '@/lib/config';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();
  const latestPosts = allPosts.slice(0, 6);
  const heroPost = featuredPosts[0] || latestPosts[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-mesh overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-copper/10 rounded-full blur-3xl animate-float animation-delay-300" />
        </div>

        <div className="relative max-w-wide mx-auto px-4 lg:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/10 border border-accent-gold/20 rounded-full mb-6 animate-fade-in">
                <Star className="w-4 h-4 text-accent-gold" />
                <span className="text-body-sm font-medium text-accent-gold">
                  Tu fuente confiable de información
                </span>
              </div>

              <h1 className="font-display text-display-lg lg:text-display-xl text-ink-900 mb-6 animate-fade-in-up animation-delay-100">
                Información clara sobre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-copper">
                  inmigración
                </span>{' '}
                y tus derechos legales
              </h1>

              <p className="text-body-lg text-ink-600 mb-8 max-w-xl animate-fade-in-up animation-delay-200">
                Guías actualizadas, noticias importantes y recursos gratuitos para la comunidad
                inmigrante en Estados Unidos. Escrito en español, con información que puedes
                entender y usar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                <Link href="/categoria/inmigracion" className="btn-gold">
                  Explorar Guías
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/nosotros" className="btn-outline">
                  Conoce más sobre nosotros
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-ink-100 animate-fade-in-up animation-delay-400">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="font-display font-bold text-display-sm text-ink-900">500+</p>
                    <p className="text-body-sm text-ink-500">Artículos publicados</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-display-sm text-ink-900">50K+</p>
                    <p className="text-body-sm text-ink-500">Lectores mensuales</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-display-sm text-ink-900">100%</p>
                    <p className="text-body-sm text-ink-500">Contenido gratuito</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Article Card */}
            <div className="order-1 lg:order-2 animate-fade-in animation-delay-200">
              {heroPost ? (
                <Link href={`/blog/${heroPost.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-editorial-xl">
                    <Image
                      src={heroPost.coverImage}
                      alt={heroPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />

                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                      <span className="inline-block px-3 py-1 bg-accent-gold text-cream-50 rounded-full text-body-sm font-medium w-fit mb-4">
                        Destacado
                      </span>
                      <h2 className="font-serif font-semibold text-heading-xl lg:text-display-sm text-cream-50 group-hover:text-accent-gold transition-colors">
                        {heroPost.title}
                      </h2>
                      <p className="text-cream-200 text-body-md mt-2 line-clamp-2">
                        {heroPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <BookOpen className="w-16 h-16 text-accent-gold mx-auto mb-4" />
                    <p className="text-ink-600 font-serif text-xl">
                      Pronto: Artículos destacados
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-ink-100 rounded-full text-body-sm font-medium text-ink-600 mb-4">
              Explora por tema
            </span>
            <h2 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-4">
              Encuentra la información que necesitas
            </h2>
            <p className="text-body-lg text-ink-600 max-w-2xl mx-auto">
              Organizamos nuestro contenido por categorías para que encuentres fácilmente lo que
              buscas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} articleCount={12} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-cream-100/50 to-cream-50">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <div className="gold-line mb-4" />
              <h2 className="font-display text-display-sm lg:text-display-md text-ink-900">
                Últimas publicaciones
              </h2>
              <p className="text-body-lg text-ink-600 mt-2">
                Mantente al día con las noticias y guías más recientes
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-copper font-medium transition-colors"
            >
              Ver todos los artículos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-cream-100/50 rounded-3xl">
              <BookOpen className="w-16 h-16 text-ink-300 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-ink-600 mb-2">
                Próximamente: Artículos informativos
              </h3>
              <p className="text-ink-500">
                Estamos preparando contenido de calidad para ti.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent-emerald/10 text-accent-emerald rounded-full text-body-sm font-medium mb-4">
                ¿Por qué elegirnos?
              </span>
              <h2 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-6">
                Información confiable que puedes entender
              </h2>
              <p className="text-body-lg text-ink-600 mb-8">
                A diferencia de otros sitios legales llenos de jerga complicada, nosotros
                explicamos todo en español claro. Nuestro objetivo es que salgas con más
                información de la que llegaste.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-ink-900 text-lg mb-1">
                      Verificado por expertos
                    </h3>
                    <p className="text-ink-600">
                      Todo nuestro contenido es revisado por abogados especializados.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-accent-emerald" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-ink-900 text-lg mb-1">
                      Siempre actualizado
                    </h3>
                    <p className="text-ink-600">
                      Actualizamos nuestras guías cada vez que hay cambios en las leyes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-sapphire/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent-sapphire" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-ink-900 text-lg mb-1">
                      Para la comunidad
                    </h3>
                    <p className="text-ink-600">
                      Escuchamos tus preguntas y creamos contenido basado en tus necesidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 rounded-3xl transform rotate-3" />
              <div className="relative bg-cream-50 rounded-3xl p-8 shadow-editorial-xl">
                <blockquote className="mb-6">
                  <p className="font-serif text-xl lg:text-2xl text-ink-800 italic leading-relaxed">
                    "Gracias a este portal entendí exactamente qué documentos necesitaba para mi
                    caso. La información es clara y me ahorró tiempo y dinero."
                  </p>
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-gold to-accent-copper flex items-center justify-center">
                    <span className="text-cream-50 font-serif font-bold text-xl">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-ink-900">María González</p>
                    <p className="text-body-sm text-ink-500">Houston, Texas</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-gold fill-accent-gold" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-copper rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-content mx-auto px-4 lg:px-6 text-center">
          <h2 className="font-display text-display-sm lg:text-display-md text-cream-50 mb-6">
            ¿Tienes preguntas sobre tu situación?
          </h2>
          <p className="text-body-lg text-cream-300 mb-10 max-w-2xl mx-auto">
            Si después de leer nuestras guías todavía tienes dudas, puedes consultar con un
            abogado especializado sin costo. Revisan tu caso y te explican tus opciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-gold text-lg px-8 py-4">
              Consulta Gratis con un Abogado
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cream-300/30 text-cream-100 font-medium rounded-xl hover:bg-cream-50/10 transition-all"
            >
              Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
