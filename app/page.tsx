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
      {/* Hero Section con Video de Fondo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video de Fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/inmigracion.mp4" type="video/mp4" />
        </video>

        {/* Overlay Oscuro */}
        <div className="absolute inset-0 bg-slate-900/70" />

        {/* Contenido Centrado */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-sm font-medium text-white">
              Tu fuente confiable de información
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Información clara sobre{' '}
            <span className="text-yellow-500">inmigración</span>{' '}
            y tus derechos legales
          </h1>

          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Guías actualizadas, noticias importantes y recursos gratuitos para la comunidad
            inmigrante en Estados Unidos. Escrito en español, con información que puedes
            entender y usar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categoria/inmigracion" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 text-slate-900 text-lg font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Explorar Guías
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/nosotros" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Conoce más sobre nosotros
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-white">500+</p>
                <p className="text-sm text-white/80 mt-2">Artículos publicados</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">50K+</p>
                <p className="text-sm text-white/80 mt-2">Lectores mensuales</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">100%</p>
                <p className="text-sm text-white/80 mt-2">Contenido gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-full text-sm font-medium text-yellow-700 mb-4">
              Artículo Destacado
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Lo más importante de la semana
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              No te pierdas nuestro contenido más relevante y actualizado
            </p>
          </div>

          {heroPost ? (
            <div className="max-w-5xl mx-auto">
              <Link href={`/blog/${heroPost.slug}`} className="group block">
                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
                  <Image
                    src={heroPost.coverImage}
                    alt={heroPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                  <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                    <span className="inline-block px-4 py-1.5 bg-yellow-500 text-white rounded-full text-sm font-semibold w-fit mb-4">
                      Destacado
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-yellow-500 transition-colors leading-tight mb-3">
                      {heroPost.title}
                    </h3>
                    <p className="text-lg text-white/90 max-w-3xl line-clamp-2">
                      {heroPost.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
                <div className="text-center p-12">
                  <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                  <p className="text-slate-600 text-2xl font-medium">
                    Pronto: Artículos destacados
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-slate-600 mb-4">
              Explora por tema
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Encuentra la información que necesitas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Organizamos nuestro contenido por categorías para que encuentres fácilmente lo que buscas
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
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <div className="w-12 h-1 bg-yellow-500 rounded-full mb-4" />
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Últimas publicaciones
              </h2>
              <p className="text-lg text-slate-600 mt-2">
                Mantente al día con las noticias y guías más recientes
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
            >
              Ver todos los artículos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                Próximamente: Artículos informativos
              </h3>
              <p className="text-slate-500">
                Estamos preparando contenido de calidad para ti
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div>
              <span className="inline-block px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm font-medium mb-4">
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Información confiable que puedes entender
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                A diferencia de otros sitios legales llenos de jerga complicada, nosotros
                explicamos todo en español claro. Nuestro objetivo es que salgas con más
                información de la que llegaste.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Verificado por expertos
                    </h3>
                    <p className="text-slate-600">
                      Todo nuestro contenido es revisado por abogados especializados
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Siempre actualizado
                    </h3>
                    <p className="text-slate-600">
                      Actualizamos nuestras guías cada vez que hay cambios en las leyes
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Para la comunidad
                    </h3>
                    <p className="text-slate-600">
                      Escuchamos tus preguntas y creamos contenido basado en tus necesidades
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <blockquote className="mb-6">
                  <p className="text-xl lg:text-2xl text-slate-800 leading-relaxed">
                    "Gracias a este portal entendí exactamente qué documentos necesitaba para mi
                    caso. La información es clara y me ahorró tiempo y dinero."
                  </p>
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center">
                    <span className="text-yellow-500 font-bold text-xl">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">María González</p>
                    <p className="text-sm text-slate-500">Houston, Texas</p>
                  </div>
                </div>

                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-20 lg:py-28 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            ¿Tienes preguntas sobre tu situación?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Si después de leer nuestras guías todavía tienes dudas, puedes consultar con un
            abogado especializado sin costo. Revisan tu caso y te explican tus opciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-950 text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Consulta Gratis con un Abogado
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-slate-900 text-lg font-semibold rounded-lg hover:border-yellow-500 hover:text-yellow-600 transition-colors"
            >
              Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}