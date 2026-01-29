'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Car, Scale } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  articleCount?: number;
  index?: number;
}

const categoryIcons = {
  inmigracion: FileText,
  'visas-humanitarias': Shield,
  accidentes: Car,
  'derechos-legales': Scale,
};

const categoryGradients = {
  gold: 'from-accent-gold/20 to-accent-gold/5 hover:from-accent-gold/30 hover:to-accent-gold/10',
  emerald: 'from-accent-emerald/20 to-accent-emerald/5 hover:from-accent-emerald/30 hover:to-accent-emerald/10',
  ruby: 'from-accent-ruby/20 to-accent-ruby/5 hover:from-accent-ruby/30 hover:to-accent-ruby/10',
  sapphire: 'from-accent-sapphire/20 to-accent-sapphire/5 hover:from-accent-sapphire/30 hover:to-accent-sapphire/10',
};

const categoryTextColors = {
  gold: 'text-accent-gold',
  emerald: 'text-accent-emerald',
  ruby: 'text-accent-ruby',
  sapphire: 'text-accent-sapphire',
};

const categoryBorderColors = {
  gold: 'border-accent-gold/30 hover:border-accent-gold/50',
  emerald: 'border-accent-emerald/30 hover:border-accent-emerald/50',
  ruby: 'border-accent-ruby/30 hover:border-accent-ruby/50',
  sapphire: 'border-accent-sapphire/30 hover:border-accent-sapphire/50',
};

export default function CategoryCard({ category, articleCount = 0, index = 0 }: CategoryCardProps) {
  const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/categoria/${category.slug}`}
        className={`group block p-6 lg:p-8 rounded-2xl border bg-gradient-to-br transition-all duration-500 ${categoryGradients[category.color]} ${categoryBorderColors[category.color]}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-xl bg-cream-50 flex items-center justify-center shadow-editorial ${categoryTextColors[category.color]}`}
          >
            <Icon className="w-7 h-7" />
          </div>
          <span className="text-ink-400 text-body-sm">{articleCount} artículos</span>
        </div>

        <h3 className="font-serif font-semibold text-ink-900 text-heading-xl mb-2 group-hover:text-ink-700 transition-colors">
          {category.name}
        </h3>
        <p className="text-ink-600 text-body-md mb-4 line-clamp-2">{category.description}</p>

        <span
          className={`inline-flex items-center gap-2 font-medium ${categoryTextColors[category.color]}`}
        >
          Explorar
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );
}
