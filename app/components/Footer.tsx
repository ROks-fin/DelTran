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
    { name: 'investors', href: '/investors' },
    { name: 'contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'privacy', href: 'https://deltran.ai/privacy' },
    { name: 'terms', href: 'https://deltran.ai/terms' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
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
              Next-generation global payment infrastructure. One rail. Infinite reach.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
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
              Get Started
            </h3>
            <p className="text-white/60 text-sm">
              Ready to transform your payment infrastructure?
            </p>
            <motion.a
              href="https://deltran.ai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              Request Demo
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </motion.a>
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
