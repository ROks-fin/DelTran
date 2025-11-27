'use client';

/**
 * Optimized Header Component
 * Performance improvements:
 * - Removed infinite gradient animation (was causing high TBT)
 * - Removed unused mousePosition tracking
 * - Simplified hover states with CSS transitions
 * - Reduced motion for prefers-reduced-motion users
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'platform', href: '/platform' },
  { name: 'network', href: '/network' },
  { name: 'company', href: '/company' },
  { name: 'contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('navigation');
  const prefersReducedMotion = useReducedMotion();

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? { opacity: 1 } : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-black/60 backdrop-blur-2xl'
            : 'bg-transparent'
        )}
      >
        {/* Subtle gradient line - CSS only, no JS animation */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="https://deltran.ai" className="group relative">
              <div className="relative flex items-center gap-2 sm:gap-3">
                <Logo size={36} className="sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" />
                <span className="text-xl sm:text-2xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-white via-white to-gold/80 bg-clip-text text-transparent">
                    DelTran
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="relative px-2 py-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
                <div className="relative flex items-center gap-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={`/${locale}${item.href}`}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="relative px-4 xl:px-5 py-2.5 rounded-xl transition-colors duration-200"
                    >
                      {/* Hover background */}
                      <AnimatePresence>
                        {hoveredItem === item.name && (
                          <motion.div
                            layoutId="nav-hover"
                            className="absolute inset-0 bg-white/[0.08] rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>

                      <span className={cn(
                        "relative z-10 text-sm font-medium transition-colors duration-200",
                        hoveredItem === item.name
                          ? "text-white"
                          : "text-white/60 hover:text-white/90"
                      )}>
                        {t(item.name)}
                      </span>
                    </Link>
                  ))}

                  {/* Divider */}
                  <div className="w-px h-6 bg-white/10 mx-2" />

                  {/* LocaleSwitcher */}
                  <div className="px-2">
                    <LocaleSwitcher />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Link href={`/${locale}/contact`}>
                <button className="relative group px-6 xl:px-7 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-black font-bold text-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-gold/30">
                  {/* Shine effect on hover - CSS only */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    <span>{t('getStarted')}</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-3 rounded-xl bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden bg-black/80 backdrop-blur-2xl border-t border-white/5"
            >
              <div className="container mx-auto px-4 py-4 sm:py-6">
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={closeMobileMenu}
                        className="block px-4 py-3.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
                      >
                        <span className="font-medium">{t(item.name)}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Locale Switcher */}
                  <div className="pt-4 pb-2 border-t border-white/5">
                    <div className="px-4">
                      <LocaleSwitcher />
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <Link
                    href={`/${locale}/contact`}
                    onClick={closeMobileMenu}
                    className="block mx-4 mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-black font-bold text-center min-h-[44px] flex items-center justify-center"
                  >
                    {t('getStarted')}
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Scroll progress indicator - simplified */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light z-[60] transition-all duration-150"
        style={{ width: '0%' }}
        id="scroll-progress"
      />
    </>
  );
}
