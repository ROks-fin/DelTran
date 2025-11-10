'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'platform', href: '/platform' },
    { name: 'network', href: '/network' },
    { name: 'company', href: '/company' },
    { name: 'contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'privacy', href: 'https://deltran.ai/privacy' },
    { name: 'terms', href: 'https://deltran.ai/terms' },
  ];

  const resourceLinks = [
    { name: 'investors', href: '/investors' },
    { name: 'banks', href: '/banks' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link
              href="https://deltran.ai"
              className="inline-block group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-gradient"
              >
                DelTran
              </motion.div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm flex items-center group"
                  >
                    {t(`links.${link.name}`)}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm flex items-center group"
                  >
                    {t(`links.${link.name}`)}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm flex items-center group"
                  >
                    {t(`links.${link.name}`)}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              {t('cta.title')}
            </h3>
            <p className="text-white/60 text-sm">
              {t('cta.description')}
            </p>
            <Link href={`/${locale}/contact`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 cursor-pointer"
              >
                {t('cta.button')}
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Pre-launch Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-8">
            <p className="text-xs text-white/60 text-center leading-relaxed">
              <strong className="text-white/80">{t('disclaimer.important')}</strong> {t('disclaimer.text')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-sm">
              {t('copyright', { year: currentYear })}
            </p>
            <p className="text-white/40 text-sm">
              {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
