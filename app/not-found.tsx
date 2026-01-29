import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        {/* Decorative 404 */}
        <div className="relative mb-8">
          <span className="font-display text-[10rem] lg:text-[14rem] leading-none text-cream-200 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-accent-gold to-accent-copper rounded-full flex items-center justify-center shadow-editorial animate-float">
              <Search className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-body-lg text-ink-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Pero no te preocupes, tenemos mucho contenido útil para ti.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-copper text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-ink-200 text-ink-700 font-medium rounded-full hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Ver Artículos
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="mt-16 pt-8 border-t border-cream-200">
          <p className="text-body-sm text-ink-500 mb-4">
            Explora nuestras categorías populares:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Inmigración', href: '/categoria/inmigracion', color: 'bg-accent-gold/10 text-accent-gold' },
              { name: 'Visas Humanitarias', href: '/categoria/visas-humanitarias', color: 'bg-accent-emerald/10 text-accent-emerald' },
              { name: 'Accidentes', href: '/categoria/accidentes', color: 'bg-accent-ruby/10 text-accent-ruby' },
              { name: 'Derechos Legales', href: '/categoria/derechos-legales', color: 'bg-accent-sapphire/10 text-accent-sapphire' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`px-4 py-2 rounded-full text-body-sm font-medium ${cat.color} hover:scale-105 transition-transform`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
