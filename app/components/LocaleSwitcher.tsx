'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${langCode}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-gold/50 transition-all duration-300 group"
      >
        <Globe className="w-4 h-4 text-gold group-hover:text-gold-light" />
        <span className="text-sm font-medium text-white/90 dark:text-white/90">
          {currentLanguage.nativeName}
        </span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 rounded-xl bg-black/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/20 overflow-hidden shadow-2xl z-[100]"
          style={{ pointerEvents: 'auto' }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLanguageChange(lang.code);
              }}
              aria-label={`Switch to ${lang.name}`}
              aria-current={lang.code === locale ? 'true' : 'false'}
              className={`w-full px-4 py-3 text-left hover:bg-gold/30 transition-colors duration-200 cursor-pointer ${
                lang.code === locale ? 'bg-gold/20' : ''
              }`}
              dir={lang.dir}
              style={{ pointerEvents: 'auto' }}
            >
              <span className="block text-sm font-medium text-white">
                {lang.nativeName}
              </span>
              <span className="block text-xs text-white/70 mt-0.5">
                {lang.name}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
