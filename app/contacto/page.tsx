import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contacto | Consulta Gratuita',
  description:
    'Contáctanos para una consulta legal gratuita. Estamos aquí para ayudarte con tu caso de inmigración, accidentes o cualquier asunto legal.',
  openGraph: {
    title: `Contacto | ${siteConfig.name}`,
    description: 'Obtén una consulta legal gratuita con nuestro equipo de expertos.',
    url: `${siteConfig.url}/contacto`,
  },
  alternates: {
    canonical: `${siteConfig.url}/contacto`,
  },
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Teléfono',
    description: 'Llámanos para una consulta gratuita',
    value: '1-800-XXX-XXXX',
    action: 'tel:+18001234567',
    actionText: 'Llamar ahora',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Envíanos tu consulta por correo',
    value: 'info@elportaldelinmigrante.com',
    action: 'mailto:info@elportaldelinmigrante.com',
    actionText: 'Enviar email',
  },
  {
    icon: MessageSquare,
    title: 'Chat en Vivo',
    description: 'Habla con un representante ahora',
    value: 'Disponible 24/7',
    action: '#chat',
    actionText: 'Iniciar chat',
  },
];

const officeHours = [
  { day: 'Lunes - Viernes', hours: '8:00 AM - 8:00 PM' },
  { day: 'Sábado', hours: '9:00 AM - 5:00 PM' },
  { day: 'Domingo', hours: 'Solo emergencias' },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 pb-16 lg:pb-24 bg-gradient-to-b from-accent-gold/10 to-cream-50">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <Breadcrumbs
            items={[{ label: 'Contacto', href: '/contacto' }]}
          />

          <div className="max-w-3xl">
            <span className="inline-block text-body-sm font-medium uppercase tracking-wider text-accent-gold mb-4">
              Estamos Para Ayudarte
            </span>
            <h1 className="font-display text-display-md lg:text-display-lg text-ink-900 mb-6">
              Contáctanos
            </h1>
            <p className="text-body-lg text-ink-600">
              ¿Tienes preguntas sobre tu caso? Nuestro equipo está listo para ayudarte. 
              Ofrecemos consultas gratuitas y confidenciales.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-mesh">
        <div className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="bg-white rounded-2xl p-8 shadow-editorial hover:shadow-editorial-lg transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-accent-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mb-2">{method.title}</h3>
                  <p className="text-ink-500 text-sm mb-3">{method.description}</p>
                  <p className="font-medium text-ink-800 mb-4">{method.value}</p>
                  <a
                    href={method.action}
                    className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-copper font-medium transition-colors"
                  >
                    {method.actionText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-editorial">
                <h2 className="font-serif text-2xl text-ink-900 mb-2">
                  Envíanos un Mensaje
                </h2>
                <p className="text-ink-500 mb-8">
                  Completa el formulario y te responderemos en menos de 24 horas.
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-ink-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-cream-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-ink-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-cream-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="tipo" className="block text-sm font-medium text-ink-700 mb-2">
                      Tipo de caso
                    </label>
                    <select
                      id="tipo"
                      name="tipo"
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all bg-white"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="inmigracion">Inmigración</option>
                      <option value="visas">Visas Humanitarias</option>
                      <option value="accidentes">Accidentes</option>
                      <option value="derechos">Derechos Legales</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-ink-700 mb-2">
                      Cuéntanos sobre tu caso *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-none"
                      placeholder="Describe brevemente tu situación..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacidad"
                      name="privacidad"
                      required
                      className="mt-1 w-4 h-4 rounded border-cream-300 text-accent-gold focus:ring-accent-gold"
                    />
                    <label htmlFor="privacidad" className="text-sm text-ink-500">
                      Acepto la{' '}
                      <a href="/privacidad" className="text-accent-gold hover:underline">
                        política de privacidad
                      </a>{' '}
                      y autorizo el contacto por parte del equipo legal.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-accent-gold to-accent-copper text-white font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-editorial">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-accent-gold" />
                  <h3 className="font-serif text-lg text-ink-900">Horario de Atención</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between text-sm border-b border-cream-100 pb-2 last:border-0"
                    >
                      <span className="text-ink-600">{schedule.day}</span>
                      <span className="font-medium text-ink-800">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-editorial">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent-gold" />
                  <h3 className="font-serif text-lg text-ink-900">Ubicación</h3>
                </div>
                <p className="text-ink-600 text-sm mb-4">
                  Atendemos casos en todo Estados Unidos con oficinas en las principales ciudades.
                </p>
                <div className="bg-cream-100 rounded-xl p-4 text-center">
                  <p className="text-sm text-ink-500">
                    Consultas disponibles en persona, por teléfono o videollamada
                  </p>
                </div>
              </div>

              {/* Emergency Note */}
              <div className="bg-gradient-to-br from-accent-ruby/10 to-accent-ruby/5 border border-accent-ruby/20 rounded-2xl p-6">
                <h3 className="font-serif text-lg text-ink-900 mb-2">¿Emergencia Legal?</h3>
                <p className="text-ink-600 text-sm mb-4">
                  Si tienes una emergencia migratoria o legal urgente, llámanos inmediatamente.
                </p>
                <a
                  href="tel:+18001234567"
                  className="inline-flex items-center gap-2 text-accent-ruby font-semibold hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  Línea de Emergencias 24/7
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-ink-900 text-white">
        <div className="max-w-wide mx-auto px-4 lg:px-6 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl mb-4">
            Tu Información Está Segura Con Nosotros
          </h2>
          <p className="text-ink-300 max-w-2xl mx-auto">
            Toda la información que compartas es 100% confidencial y está protegida por el 
            privilegio abogado-cliente. No compartimos tus datos con terceros ni con 
            ninguna agencia gubernamental.
          </p>
        </div>
      </section>
    </div>
  );
}
