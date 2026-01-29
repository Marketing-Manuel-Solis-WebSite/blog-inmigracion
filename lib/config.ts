import { SiteConfig, Category, NavItem, Author } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'El Portal del Inmigrante',
  description: 'Tu guía confiable sobre inmigración, visas humanitarias, accidentes y derechos legales en Estados Unidos. Información clara, actualizada y en español.',
  url: 'https://elportaldelinmigrante.com',
  ogImage: '/images/og-default.jpg',
  links: {
    facebook: 'https://facebook.com/portalinmigrante',
    instagram: 'https://instagram.com/portalinmigrante',
  },
};

export const categories: Category[] = [
  {
    name: 'Inmigración',
    slug: 'inmigracion',
    description: 'Guías completas sobre visas, trámites migratorios, DACA, ciudadanía y más.',
    color: 'gold',
  },
  {
    name: 'Visas Humanitarias',
    slug: 'visas-humanitarias',
    description: 'Todo sobre Visa U, Visa T, asilo político, TPS y protecciones especiales.',
    color: 'emerald',
  },
  {
    name: 'Accidentes',
    slug: 'accidentes',
    description: 'Qué hacer después de un accidente, tus derechos y cómo obtener compensación.',
    color: 'ruby',
  },
  {
    name: 'Derechos Legales',
    slug: 'derechos-legales',
    description: 'Conoce tus derechos laborales, civiles y cómo protegerte legalmente.',
    color: 'sapphire',
  },
];

export const navigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Inmigración', href: '/categoria/inmigracion' },
  { label: 'Visas Humanitarias', href: '/categoria/visas-humanitarias' },
  { label: 'Accidentes', href: '/categoria/accidentes' },
  { label: 'Derechos Legales', href: '/categoria/derechos-legales' },
  { label: 'Nosotros', href: '/nosotros' },
];

export const defaultAuthor: Author = {
  name: 'Equipo Editorial',
  avatar: '/images/authors/editorial-team.jpg',
  role: 'Redacción',
  bio: 'Nuestro equipo de expertos en temas migratorios y legales.',
};

export const seoKeywords = {
  global: [
    'inmigración USA',
    'abogado de inmigración',
    'visa humanitaria',
    'DACA',
    'accidente de auto',
    'derechos del inmigrante',
    'abogado hispano',
    'visa U',
    'asilo político',
    'ciudadanía americana',
    'green card',
    'indocumentado derechos',
  ],
  inmigracion: [
    'cómo renovar DACA',
    'requisitos green card',
    'petición familiar',
    'visa de trabajo',
    'I-130',
    'I-485',
    'ajuste de estatus',
    'consulado mexicano',
  ],
  visasHumanitarias: [
    'visa U requisitos',
    'visa T',
    'asilo político USA',
    'TPS',
    'VAWA',
    'víctima de crimen',
    'protección migratoria',
  ],
  accidentes: [
    'accidente de auto sin papeles',
    'compensación por accidente',
    'abogado de accidentes',
    'demanda por accidente',
    'seguro de auto',
    'lesiones personales',
  ],
  derechosLegales: [
    'derechos laborales',
    'discriminación laboral',
    'salario mínimo',
    'derechos civiles',
    'deportación',
    'ICE derechos',
  ],
};
