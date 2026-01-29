'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { navigation, siteConfig } from '@/lib/config';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-editorial border-b border-ink-100/50'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className="hidden lg:block bg-ink-900 text-cream-100">
          <div className="max-w-wide mx-auto px-6 py-2 flex justify-between items-center text-body-sm">
            <p>Tu guía confiable sobre inmigración y derechos legales en USA</p>
            <div className="flex items-center gap-6">
              <a href="tel:+18000000000" className="hover:text-accent-gold transition-colors">
                📞 1-800-000-0000
              </a>
              <span className="text-ink-400">|</span>
              <span>🇺🇸 Español</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="max-w-wide mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-18 lg:h-22">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper flex items-center justify-center shadow-glow-gold group-hover:scale-105 transition-transform">
                <span className="text-cream-50 font-display font-bold text-xl lg:text-2xl">P</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-semibold text-ink-900 text-lg lg:text-xl leading-tight">
                  El Portal del
                </h1>
                <p className="text-accent-gold font-serif text-sm lg:text-base -mt-1">Inmigrante</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-ink-700 hover:text-ink-900 font-medium text-body-md link-underline transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 lg:p-3 rounded-xl hover:bg-ink-100/50 transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-ink-600" />
              </button>

              {/* CTA Button */}
              <Link
                href="/contacto"
                className="hidden md:inline-flex btn-gold text-sm"
              >
                Consulta Gratis
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-ink-100/50 transition-colors"
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-ink-700" />
                ) : (
                  <Menu className="w-6 h-6 text-ink-700" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 max-w-full bg-cream-50 shadow-editorial-xl"
            >
              <div className="p-6 pt-24">
                <div className="flex flex-col gap-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-ink-800 hover:text-accent-gold hover:bg-ink-50 rounded-xl font-medium text-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-ink-100">
                  <Link
                    href="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-gold w-full justify-center"
                  >
                    Consulta Gratis
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4"
          >
            <div
              className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-cream-50 rounded-2xl shadow-editorial-xl overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <Search className="w-6 h-6 text-ink-400" />
                  <input
                    type="text"
                    placeholder="Buscar artículos, guías, noticias..."
                    className="flex-1 bg-transparent text-xl text-ink-800 placeholder:text-ink-400 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-ink-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-ink-500" />
                  </button>
                </div>
              </div>
              <div className="border-t border-ink-100 p-4">
                <p className="text-body-sm text-ink-500 mb-3">Búsquedas populares:</p>
                <div className="flex flex-wrap gap-2">
                  {['DACA 2024', 'Visa U requisitos', 'Accidente sin papeles', 'TPS Venezuela'].map(
                    (term) => (
                      <button
                        key={term}
                        className="px-3 py-1.5 bg-ink-100/50 text-ink-700 rounded-full text-sm hover:bg-accent-gold/10 hover:text-accent-gold transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-18 lg:h-32" />
    </>
  );
}
