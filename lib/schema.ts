import { BlogPost, BreadcrumbItem, FAQItem } from '@/types';
import { siteConfig } from './config';

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-000-0000',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'es-MX',
  };
}

// Article Schema
export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage.startsWith('http') 
      ? post.coverImage 
      : `${siteConfig.url}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category.name,
    inLanguage: 'es-MX',
    wordCount: post.content.split(/\s+/).length,
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// How-to Schema (for guide articles)
export function generateHowToSchema(
  title: string,
  description: string,
  steps: { name: string; text: string }[],
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    image: image ? `${siteConfig.url}${image}` : undefined,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Local Business Schema (for the law firm reference)
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Manuel Solis Law Firm',
    description: 'Abogados especializados en inmigración, accidentes y derechos legales.',
    url: 'https://manuelsolis.com',
    telephone: '+1-800-000-0000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77001',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.7604,
      longitude: -95.3698,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'State',
      name: 'Texas',
    },
  };
}

// Video Schema (for video content)
export function generateVideoSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string,
  embedUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: `${siteConfig.url}${thumbnailUrl}`,
    uploadDate,
    duration,
    embedUrl,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
  };
}

// Speakable Schema (for voice search optimization)
export function generateSpeakableSchema(cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}
