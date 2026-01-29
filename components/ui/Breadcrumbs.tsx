import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schema';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Inicio', href: '/' }, ...items];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-1 text-body-sm">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-ink-300 mx-1" />}
              {index === allItems.length - 1 ? (
                <span className="text-ink-500" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-ink-600 hover:text-accent-gold transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
