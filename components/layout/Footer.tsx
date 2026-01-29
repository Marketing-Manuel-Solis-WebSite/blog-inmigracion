import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { siteConfig, categories } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-900 text-cream-100 overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-accent-gold to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent-copper to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-ink-700/50">
        <div className="max-w-wide mx-auto px-4 lg:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-accent-gold/20 text-accent-gold rounded-full text-body-sm font-medium mb-4">
              Newsletter Semanal
            </span>
            <h3 className="font-display text-display-sm text-cream-50 mb-4">
              Mantente informado sobre tus derechos
            </h3>
            <p className="text-cream-300 text-body-lg mb-8">
              Recibe las últimas noticias sobre inmigración, cambios en leyes y guías útiles
              directamente en tu correo. Sin spam, solo información valiosa.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-5 py-4 bg-ink-800 border border-ink-700 rounded-xl text-cream-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                Suscribirme
              </button>
            </form>
            <p className="text-body-sm text-ink-400 mt-4">
              Al suscribirte, aceptas recibir correos de El Portal del Inmigrante
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-wide mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper flex items-center justify-center shadow-glow-gold group-hover:scale-105 transition-transform">
                <span className="text-cream-50 font-display font-bold text-2xl">P</span>
              </div>
              <div>
                <h4 className="font-display font-semibold text-cream-50 text-lg leading-tight">
                  El Portal del
                </h4>
                <p className="text-accent-gold font-serif text-sm -mt-1">Inmigrante</p>
              </div>
            </Link>
            <p className="text-cream-300 text-body-md mb-6 max-w-xs">
              Tu fuente confiable de información sobre inmigración, visas y derechos legales en
              Estados Unidos.
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center hover:bg-accent-gold transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-cream-300 group-hover:text-cream-50" />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center hover:bg-accent-gold transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-cream-300 group-hover:text-cream-50" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center hover:bg-accent-gold transition-colors group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-cream-300 group-hover:text-cream-50" />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h5 className="font-serif font-semibold text-cream-50 text-heading-md mb-6">
              Categorías
            </h5>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h5 className="font-serif font-semibold text-cream-50 text-heading-md mb-6">
              Recursos
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guias"
                  className="text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  Guías Completas
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/glosario"
                  className="text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  Glosario Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/herramientas"
                  className="text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  Herramientas Útiles
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  Quiénes Somos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h5 className="font-serif font-semibold text-cream-50 text-heading-md mb-6">
              Contacto
            </h5>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+18000000000"
                  className="flex items-center gap-3 text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  <Phone className="w-5 h-5 text-accent-gold" />
                  1-800-000-0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@elportaldelinmigrante.com"
                  className="flex items-center gap-3 text-cream-300 hover:text-accent-gold transition-colors text-body-md"
                >
                  <Mail className="w-5 h-5 text-accent-gold" />
                  info@elportaldelinmigrante.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-cream-300 text-body-md">
                  <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span>
                    Houston, TX
                    <br />
                    Estados Unidos
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Powered By Section */}
      <div className="relative border-t border-ink-700/50 bg-ink-800/50">
        <div className="max-w-wide mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-sm text-ink-400 text-center md:text-left">
              © {currentYear} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-body-sm text-ink-400">
              <span>Una iniciativa de</span>
              <a
                href="https://manuelsolis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:text-accent-copper transition-colors font-medium"
              >
                Manuel Solis Law Firm
              </a>
            </div>
            <div className="flex items-center gap-6 text-body-sm">
              <Link
                href="/privacidad"
                className="text-ink-400 hover:text-cream-100 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-ink-400 hover:text-cream-100 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/sitemap"
                className="text-ink-400 hover:text-cream-100 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
