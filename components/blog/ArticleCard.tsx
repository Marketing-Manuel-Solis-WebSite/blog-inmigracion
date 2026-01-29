'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'horizontal' | 'compact';
  index?: number;
}

export default function ArticleCard({ post, variant = 'default', index = 0 }: ArticleCardProps) {
  const categoryColorClasses = {
    gold: 'category-badge',
    emerald: 'category-badge category-badge-emerald',
    ruby: 'category-badge category-badge-ruby',
    sapphire: 'category-badge category-badge-sapphire',
  };

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-[16/10] lg:aspect-[21/9] rounded-3xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 lg:p-12 flex flex-col justify-end">
              <div className="max-w-3xl">
                <span className={categoryColorClasses[post.category.color]}>
                  {post.category.name}
                </span>
                <h2 className="font-display text-display-sm lg:text-display-md text-cream-50 mt-4 mb-4 group-hover:text-accent-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-cream-200 text-body-lg mb-6 line-clamp-2 hidden sm:block">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-cream-300 text-body-sm">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="w-1 h-1 rounded-full bg-cream-400" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readingTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <Link href={`/blog/${post.slug}`} className="flex gap-4 lg:gap-6">
          <div className="relative w-32 h-24 lg:w-48 lg:h-32 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0 py-1">
            <span className={`${categoryColorClasses[post.category.color]} text-xs`}>
              {post.category.name}
            </span>
            <h3 className="font-serif font-semibold text-ink-900 text-heading-md mt-2 mb-2 line-clamp-2 group-hover:text-accent-gold transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 text-ink-500 text-body-sm">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="hidden sm:flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="flex items-start gap-4">
            <span className="text-4xl font-display font-bold text-ink-200 group-hover:text-accent-gold transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h4 className="font-serif font-semibold text-ink-900 text-body-lg mb-1 group-hover:text-accent-gold transition-colors line-clamp-2">
                {post.title}
              </h4>
              <span className="text-ink-500 text-body-sm">{post.readingTime}</span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-editorial overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={categoryColorClasses[post.category.color]}>
              {post.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif font-semibold text-ink-900 text-heading-lg mb-3 line-clamp-2 group-hover:text-accent-gold transition-colors">
            {post.title}
          </h3>
          <p className="text-ink-600 text-body-md mb-4 line-clamp-2">{post.excerpt}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-ink-100">
            <div className="flex items-center gap-3 text-ink-500 text-body-sm">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="w-1 h-1 rounded-full bg-ink-300" />
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
            <span className="text-accent-gold group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
