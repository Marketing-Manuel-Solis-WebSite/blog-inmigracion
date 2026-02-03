import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { siteConfig, categories } from '@/lib/config';
import NewsletterForm from '@/components/ui/NewsletterForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      {/* Newsletter Section - Más Grande */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-6">
              <Mail className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Newsletter Semanal</span>
            </div>
            
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Mantente informado sobre tus derechos
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Recibe las últimas noticias sobre inmigración, cambios en leyes y guías útiles directamente en tu correo. Sin spam, solo información valiosa.
            </p>
            
            <div className="max-w-lg mx-auto">
              <NewsletterForm variant="footer" />
            </div>

            <p className="text-sm text-slate-500 mt-5">
              Al suscribirte, aceptas recibir correos de El Portal del Inmigrante
            </p>
          </div>
        </div>
      </div>¿

      {/* Main Footer - Espacioso */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center group-hover:bg-slate-900 transition-colors shadow-lg">
                <span className="text-yellow-500 font-bold text-2xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 text-xl font-bold tracking-tight leading-none">
                  El Portal
                </span>
                <span className="text-yellow-600 text-xs font-semibold uppercase tracking-wider leading-none mt-0.5">
                  del Inmigrante
                </span>
              </div>
            </Link>
            
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Tu fuente confiable de información sobre inmigración, visas y derechos legales en Estados Unidos.
            </p>
            
            <div className="flex gap-3">
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-white hover:bg-blue-500 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-slate-600 hover:border-pink-500 hover:text-white hover:bg-pink-500 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-slate-600 hover:border-red-500 hover:text-white hover:bg-red-500 transition-all shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h5 className="text-lg font-bold text-slate-900 mb-6">
              Categorías
            </h5>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="text-base text-slate-600 hover:text-yellow-600 transition-colors inline-flex items-center group"
                  >
                    <span>{category.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h5 className="text-lg font-bold text-slate-900 mb-6">
              Recursos
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guias"
                  className="text-base text-slate-600 hover:text-yellow-600 transition-colors inline-flex items-center group"
                >
                  <span>Guías Completas</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="text-base text-slate-600 hover:text-yellow-600 transition-colors inline-flex items-center group"
                >
                  <span>Preguntas Frecuentes</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/glosario"
                  className="text-base text-slate-600 hover:text-yellow-600 transition-colors inline-flex items-center group"
                >
                  <span>Glosario Legal</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/herramientas"
                  className="text-base text-slate-600 hover:text-yellow-600 transition-colors inline-flex items-center group"
                >
                  <span>Herramientas Útiles</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-base text-slate-600 hover:text-yellow-600 transition-colors inline-flex items-center group"
                >
                  <span>Quiénes Somos</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h5 className="text-lg font-bold text-slate-900 mb-6">
              Contacto
            </h5>
            <ul className="space-y-5">
              <li>
                <a
                  href="tel:+18000000000"
                  className="flex items-center gap-3 text-base text-slate-600 hover:text-yellow-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                    <Phone className="w-5 h-5 text-yellow-600 group-hover:text-white" />
                  </div>
                  <span className="font-medium">1-800-000-0000</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@elportaldelinmigrante.com"
                  className="flex items-center gap-3 text-base text-slate-600 hover:text-yellow-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                    <Mail className="w-5 h-5 text-yellow-600 group-hover:text-white" />
                  </div>
                  <span className="font-medium">info@elportaldelinmigrante.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-base text-slate-600">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="pt-1">
                    <span className="font-medium block">Houston, TX</span>
                    <span>Estados Unidos</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Espacioso */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-slate-600">
              © {currentYear} {siteConfig.name}. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-2 text-slate-600">
              <span>Una iniciativa de</span>
              <a
                href="https://manuelsolis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-700 transition-colors font-semibold"
              >
                Manuel Solis Law Firm
              </a>
            </div>
            
            <div className="flex items-center gap-8">
              <Link
                href="/privacidad"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Términos
              </Link>
              <Link
                href="/sitemap"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
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