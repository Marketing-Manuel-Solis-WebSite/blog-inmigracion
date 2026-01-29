'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle, FileText } from 'lucide-react';

interface CTABoxProps {
  variant?: 'consultation' | 'newsletter' | 'guide';
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

const variants = {
  consultation: {
    icon: Phone,
    title: '¿Necesitas ayuda legal?',
    description:
      'Consulta gratis con un abogado especializado. Revisamos tu caso sin costo y te explicamos tus opciones.',
    buttonText: 'Consulta Gratis',
    buttonHref: '/contacto',
  },
  newsletter: {
    icon: MessageCircle,
    title: 'Mantente informado',
    description:
      'Recibe las últimas noticias sobre inmigración y cambios en las leyes directamente en tu correo.',
    buttonText: 'Suscribirme',
    buttonHref: '#newsletter',
  },
  guide: {
    icon: FileText,
    title: 'Descarga la guía completa',
    description:
      'Obtén nuestra guía gratuita con todos los pasos y documentos necesarios para tu trámite.',
    buttonText: 'Descargar Guía',
    buttonHref: '/guias',
  },
};

export default function CTABox({
  variant = 'consultation',
  title,
  description,
  buttonText,
  buttonHref,
}: CTABoxProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 cta-box"
    >
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-copper flex items-center justify-center shadow-glow-gold flex-shrink-0">
          <Icon className="w-8 h-8 text-cream-50" />
        </div>

        <div className="flex-1">
          <h4 className="font-serif font-semibold text-cream-50 text-heading-lg mb-2">
            {title || config.title}
          </h4>
          <p className="text-cream-300 text-body-md">{description || config.description}</p>
        </div>

        <Link
          href={buttonHref || config.buttonHref}
          className="btn-gold whitespace-nowrap flex-shrink-0"
        >
          {buttonText || config.buttonText}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
}
