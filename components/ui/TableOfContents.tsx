'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { TableOfContentsItem } from '@/types';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="bg-cream-100/50 rounded-2xl border border-ink-100/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-cream-200/50 transition-colors"
      >
        <span className="flex items-center gap-2 font-serif font-semibold text-ink-800">
          <List className="w-5 h-5 text-accent-gold" />
          Contenido del artículo
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-ink-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-ink-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="p-4 pt-0 space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-2 px-3 rounded-lg text-body-sm transition-colors ${
                      item.level === 3 ? 'ml-4' : ''
                    } ${
                      activeId === item.id
                        ? 'bg-accent-gold/10 text-accent-gold font-medium'
                        : 'text-ink-600 hover:text-ink-900 hover:bg-cream-200/50'
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
