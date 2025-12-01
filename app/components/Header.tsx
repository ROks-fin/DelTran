'use client';

/**
 * Premium Fintech Header Component
 * Bank-grade minimal design with refined spacing and hover states
 *
 * Performance:
 * - CSS-only animations (no Framer Motion)
 * - Optimized scroll handler with RAF throttling
 * - startTransition for non-urgent state updates (reduces TBT)
 */

import { useState, useEffect, useCallback, startTransition } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';

// Only 4 navigation items - minimal fintech standard
const navigation = [
  { name: 'platform', href: '/platform' },
  { name: 'network', href: '/network' },
  { name: 'company', href: '/company' },
  { name: 'contact', href: '/contact' },
];

// 3 supported languages only
const languages = [
  { code: 'en', name: 'English', nativeName: 'EN' },
  { code: 'ar', name: 'Arabic', nativeName: 'AR', dir: 'rtl' as const },
  { code: 'he', name: 'Hebrew', nativeName: 'HE', dir: 'rtl' as const },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // PERFORMANCE: Defer scroll handler until after hydration with idle callback
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // PERFORMANCE: Use startTransition for non-urgent UI update
          startTransition(() => {
            setIsScrolled(window.scrollY > 20);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    if (window.scrollY > 20) setIsScrolled(true);

    // Defer adding scroll listener to reduce TBT
    const timeoutId = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => window.addEventListener('scroll', handleScroll, { passive: true }))
      : setTimeout(() => window.addEventListener('scroll', handleScroll, { passive: true }), 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (typeof timeoutId === 'number') {
        if (typeof cancelIdleCallback !== 'undefined') {
          cancelIdleCallback(timeoutId);
        } else {
          clearTimeout(timeoutId);
        }
      }
    };
  }, []);

  // Close menus on escape key - only attach when needed
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close language dropdown on outside click - only attach when needed
  useEffect(() => {
    if (!isLangOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-lang-dropdown]')) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleLanguageChange = (langCode: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${langCode}`);
    router.push(newPathname);
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Check if current page matches nav item
  const isActivePage = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        isScrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <nav className="container-premium flex items-center justify-between h-[72px]">
        {/* Logo - Left */}
        <Link href={`/${locale}`} className="group relative flex items-center gap-2.5">
          <Logo size={32} />
          <span className="text-lg font-display font-semibold tracking-tight text-white">
            DelTran
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = isActivePage(item.href);
            return (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className={cn(
                  "relative px-4 py-2 rounded-lg",
                  "text-[13px] font-medium tracking-wide uppercase",
                  isActive
                    ? "text-gold"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]",
                  "after:absolute after:left-4 after:right-4 after:bottom-1",
                  "after:h-[1.5px] after:rounded-full",
                  isActive
                    ? "after:bg-gold after:opacity-100"
                    : "after:bg-gold after:opacity-0"
                )}
              >
                {t(item.name)}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-3" />

          {/* Language Switcher - Compact */}
          <div className="relative" data-lang-dropdown>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-label="Select language"
              aria-expanded={isLangOpen}
              aria-haspopup="true"
              className={cn(
                "group flex items-center gap-1.5 px-3 py-2 rounded-lg",
                "text-[13px] font-medium tracking-wide",
                "text-white/60 hover:text-white hover:bg-white/[0.04]",
                isLangOpen && "text-white bg-white/[0.04]"
              )}
            >
              <span>{currentLanguage.nativeName}</span>
              <ChevronDown className={cn(
                "w-3.5 h-3.5",
                isLangOpen && "rotate-180"
              )} />
            </button>

            {/* Language Dropdown - CSS transitions */}
            <div
              className={cn(
                "absolute right-0 mt-2 w-36 py-1.5 rounded-xl",
                "bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08]",
                "overflow-hidden shadow-2xl z-[100]",
                "origin-top-right",
                isLangOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              )}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  aria-label={`Switch to ${lang.name}`}
                  aria-current={lang.code === locale ? 'true' : 'false'}
                  dir={lang.dir}
                  className={cn(
                    "w-full px-4 py-2.5 text-left",
                    "flex items-center justify-between",
                    lang.code === locale
                      ? "text-gold bg-gold/10"
                      : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <span className="text-sm font-medium">{lang.name}</span>
                  <span className="text-xs text-white/40">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          className={cn(
            "md:hidden p-2.5 rounded-lg",
            "text-white/70 hover:text-white",
            "hover:bg-white/[0.05] active:bg-white/[0.08]",
            "min-w-[44px] min-h-[44px] flex items-center justify-center"
          )}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation - CSS transitions */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "md:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl border-t border-white/[0.05]",
          "overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-premium py-4">
          <div className="space-y-0.5">
            {navigation.map((item, index) => {
              const isActive = isActivePage(item.href);
              return (
                <div
                  key={item.name}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-4 py-3.5 rounded-xl",
                      "min-h-[48px] flex items-center",
                      isActive
                        ? "text-gold bg-gold/10"
                        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="text-[15px] font-medium">{t(item.name)}</span>
                  </Link>
                </div>
              );
            })}

            {/* Mobile Language Switcher */}
            <div className="pt-3 mt-3 border-t border-white/[0.06]">
              <p className="px-4 text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-medium">
                Language
              </p>
              <div className="grid grid-cols-3 gap-2 px-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    dir={lang.dir}
                    className={cn(
                      "py-2.5 rounded-lg text-center",
                      lang.code === locale
                        ? "bg-gold/20 text-gold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="text-sm font-medium">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
