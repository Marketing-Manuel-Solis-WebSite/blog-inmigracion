import type { Metadata, Viewport } from 'next';
import { siteConfig, seoKeywords } from '@/lib/config';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/schema';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFDF7',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Guía de Inmigración y Derechos Legales en USA`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: seoKeywords.global,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Tu Guía Confiable`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Tu Guía Confiable`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'es-MX': siteConfig.url,
      'es-US': siteConfig.url,
    },
  },
  category: 'legal',
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Houston',
    'content-language': 'es-MX',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={[generateOrganizationSchema(), generateWebsiteSchema()]} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
