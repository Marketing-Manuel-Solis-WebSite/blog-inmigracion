'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Phone, ChevronRight, Globe, ArrowUpRight, Shield } from 'lucide-react';
import { navigation, siteConfig } from '@/lib/config';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar Minimalista */}
      <div className="bg-slate-950 text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-9 flex justify-between items-center text-xs">
          <a 
            href="https://manuelsolis.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Shield className="w-3 h-3 text-yellow-500" />
            <span className="font-medium">Manuel Solis Law Firm</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>

          <div className="flex items-center gap-4">
            <a href="tel:+18000000000" className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-yellow-500 transition-colors">
              <Phone className="w-3 h-3" />
              <span className="font-medium">1-800-000-0000</span>
            </a>
            
            <div className="h-3 w-px bg-white/10" />
            
            <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
              <Globe className="w-3 h-3" />
              <span className="font-medium">ES</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-sm shadow-sm border-b border-gray-100'
            : 'bg-white border-b border-gray-50'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Minimalista */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              <span className="text-yellow-500 font-bold text-lg">P</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-slate-900 text-base font-bold tracking-tight">
                El Portal
              </span>
              <span className="text-yellow-600 text-[10px] font-semibold uppercase tracking-wider">
                del Inmigrante
              </span>
            </div>
          </Link>

          {/* Navegación Simple */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-slate-900' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-yellow-500"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Acciones Limpias */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/contacto"
              className="hidden sm:inline-flex items-center px-4 py-1.5 bg-slate-950 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors ml-2"
            >
              Consulta Gratis
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-900"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-[100px]" />

      {/* Menú Móvil Limpio */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden bg-white"
          >
            <div className="pt-[100px] h-full overflow-y-auto">
              <div className="px-6 py-8">
                <nav className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-4 text-slate-900 hover:text-yellow-600 transition-colors border-b border-gray-50"
                      >
                        <span className="text-lg font-medium">{item.label}</span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 space-y-4"
                >
                  <Link
                    href="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3 bg-slate-950 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Agendar Consulta Gratis
                  </Link>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex gap-3">
                      <a href={siteConfig.links.facebook} className="flex-1 py-2.5 text-center text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        Facebook
                      </a>
                      <a href={siteConfig.links.instagram} className="flex-1 py-2.5 text-center text-sm text-slate-600 hover:text-pink-600 transition-colors">
                        Instagram
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Búsqueda Minimalista */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4"
          >
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3 p-4 border-b border-gray-50">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar información legal..."
                  className="flex-1 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">Búsquedas populares</p>
                <div className="flex flex-wrap gap-2">
                  {['Renovación DACA 2025', 'Visa U', 'Permiso de trabajo', 'Accidentes'].map(term => (
                    <button 
                      key={term}
                      className="px-3 py-1.5 text-sm text-slate-600 hover:text-yellow-600 border border-gray-200 hover:border-yellow-500 rounded-md transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
}