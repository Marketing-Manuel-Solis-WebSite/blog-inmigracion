import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Heart, BookOpen, Users, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Quiénes Somos | Nuestra Misión',
  description:
    'Conoce al equipo detrás de El Portal del Inmigrante. Nuestra misión es proporcionar información clara y confiable sobre inmigración y derechos legales.',
  openGraph: {
    title: `Quiénes Somos | ${siteConfig.name}`,
    description:
      'Conoce al equipo detrás de El Portal del Inmigrante. Nuestra misión es proporcionar información clara y confiable.',
    url: `${siteConfig.url}/nosotros`,
  },
  alternates: {
    canonical: `${siteConfig.url}/nosotros`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-8 pb-16 lg:pb-24 bg-mesh">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <Breadcrumbs items={[{ label: 'Nosotros', href: '/nosotros' }]} />

          <div className="max-w-3xl mx-auto text-center">
            <div className="gold-line mx-auto mb-6" />
            <h1 className="font-display text-display-md lg:text-display-lg text-ink-900 mb-6">
              Información que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-copper">
                empodera
              </span>
            </h1>
            <p className="text-body-lg lg:text-xl text-ink-600">
              Creemos que todos merecen acceso a información clara sobre sus derechos. Por eso
              creamos este portal: para ayudar a la comunidad inmigrante a entender sus opciones.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent-gold/10 text-accent-gold rounded-full text-body-sm font-medium mb-4">
                Nuestra Misión
              </span>
              <h2 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-6">
                Democratizar el acceso a información legal
              </h2>
              <p className="text-body-lg text-ink-600 mb-6">
                Muchas personas en nuestra comunidad no obtienen la ayuda que necesitan porque no
                saben que tienen derechos, o porque la información disponible es confusa y llena
                de términos legales complicados.
              </p>
              <p className="text-body-lg text-ink-600 mb-8">
                Nuestro portal existe para cambiar eso. Traducimos la complejidad legal a un
                español claro que cualquier persona pueda entender. No somos un sitio de ventas —
                somos un recurso educativo para la comunidad.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent-emerald flex-shrink-0 mt-0.5" />
                  <p className="text-ink-700">
                    Contenido verificado por abogados especializados
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent-emerald flex-shrink-0 mt-0.5" />
                  <p className="text-ink-700">
                    Actualizaciones cada vez que cambian las leyes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent-emerald flex-shrink-0 mt-0.5" />
                  <p className="text-ink-700">100% gratuito, sin costo oculto</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 rounded-3xl transform -rotate-3" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-editorial-xl">
                <Image
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800"
                  alt="Equipo editorial trabajando"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-cream-100/50">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-body-lg text-ink-600 max-w-2xl mx-auto">
              Estos principios guían todo lo que hacemos
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-serif font-semibold text-ink-900 text-lg mb-2">Confiabilidad</h3>
              <p className="text-ink-600 text-body-md">
                Solo publicamos información verificada por expertos legales.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent-emerald" />
              </div>
              <h3 className="font-serif font-semibold text-ink-900 text-lg mb-2">Claridad</h3>
              <p className="text-ink-600 text-body-md">
                Explicamos temas complejos de manera simple y directa.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent-ruby/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-accent-ruby" />
              </div>
              <h3 className="font-serif font-semibold text-ink-900 text-lg mb-2">Empatía</h3>
              <p className="text-ink-600 text-body-md">
                Entendemos los desafíos que enfrenta nuestra comunidad.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-accent-sapphire/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-sapphire" />
              </div>
              <h3 className="font-serif font-semibold text-ink-900 text-lg mb-2">Comunidad</h3>
              <p className="text-ink-600 text-body-md">
                Creamos contenido basado en las necesidades reales de nuestra gente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Powered By */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-4 lg:px-6">
          <div className="bg-gradient-to-br from-ink-900 to-ink-800 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-gold rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-copper rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <p className="text-cream-400 text-body-sm uppercase tracking-wider mb-4">
                Una iniciativa de responsabilidad social de
              </p>
              <h3 className="font-display text-display-sm text-cream-50 mb-4">
                Manuel Solis Law Firm
              </h3>
              <p className="text-cream-300 text-body-lg max-w-2xl mx-auto mb-8">
                Este portal es parte de nuestro compromiso con la comunidad. Creemos que el acceso
                a información legal no debería ser un privilegio, sino un derecho.
              </p>
              <Link
                href="https://manuelsolis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Conocer la Firma
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-cream-100/50">
        <div className="max-w-content mx-auto px-4 lg:px-6 text-center">
          <h2 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-6">
            ¿Tienes preguntas o sugerencias?
          </h2>
          <p className="text-body-lg text-ink-600 mb-8 max-w-xl mx-auto">
            Queremos escucharte. Si hay un tema que te gustaría que cubramos o tienes alguna
            pregunta, no dudes en contactarnos.
          </p>
          <Link href="/contacto" className="btn-primary">
            Contactar al Equipo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
