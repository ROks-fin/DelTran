/**
 * Premium Fintech Footer Component
 * Bank-grade minimal design with refined spacing
 *
 * PERFORMANCE: Server Component for faster initial render
 *
 * Features:
 * - 4-column grid with brand emphasis
 * - Refined typography hierarchy
 * - Subtle hover states with gold accents
 * - Pre-launch disclaimer with premium styling
 */

import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

// Footer link styling - reusable
const linkStyles = cn(
  "text-white/70 hover:text-white",
  "text-[13px] leading-relaxed",
  "transition-colors duration-200",
  "flex items-center gap-1 group/link"
);

const columnTitleStyles = cn(
  "text-[10px] font-semibold uppercase tracking-[0.2em]",
  "text-white/30 mb-4"
);

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const currentYear = new Date().getFullYear();

  // Products column
  const productLinks = [
    { name: 'platform', href: '/platform' },
    { name: 'network', href: '/network' },
  ];

  // Company column
  const companyLinks = [
    { name: 'company', href: '/company' },
    { name: 'contact', href: '/contact' },
  ];

  // Legal links
  const legalLinks = [
    { name: 'privacy', href: '/privacy' },
    { name: 'terms', href: '/terms' },
  ];

  return (
    <footer className="relative bg-[#030303] border-t border-white/[0.06]">
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.03) 0%, transparent 50%)'
        }}
        aria-hidden="true"
      />

      <div className="relative container-premium py-16 lg:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand Column - Takes 2 columns on larger screens */}
          <div className="col-span-2 space-y-5">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2.5 group"
            >
              <Logo
                size={28}
              />
              <span className="text-lg font-display font-semibold tracking-tight text-white">
                DelTran
              </span>
            </Link>

            <p className="text-white/60 text-[13px] leading-relaxed max-w-[280px]">
              {t('description')}
            </p>

            {/* Social Icons - Moved to brand column */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/company/deltran-global"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(
                  "p-2 rounded-lg",
                  "text-white/30 hover:text-white",
                  "hover:bg-white/[0.04]"
                )}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className={columnTitleStyles}>Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={`/${locale}${link.href}`} className={linkStyles}>
                    <span>{t(`links.${link.name}`)}</span>
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className={columnTitleStyles}>Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={`/${locale}${link.href}`} className={linkStyles}>
                    <span>{t(`links.${link.name}`)}</span>
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className={columnTitleStyles}>Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={`/${locale}${link.href}`} className={linkStyles}>
                    <span>{t(`links.${link.name}`)}</span>
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className={columnTitleStyles}>{t('cta.title')}</h3>
            <p className="text-white/60 text-[13px] leading-relaxed mb-4">
              {t('cta.description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                "inline-flex items-center gap-2",
                "px-5 py-2.5 rounded-full",
                "text-[13px] font-semibold",
                "bg-gradient-to-r from-gold to-gold-light text-black",
                "group/cta"
              )}
            >
              <span>{t('cta.button')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pre-launch Disclaimer */}
        <div className="mt-14 pt-8 border-t border-white/[0.04]">
          <div
            className={cn(
              "px-5 py-4 rounded-xl",
              "bg-white/[0.02] border border-white/[0.06]"
            )}
          >
            <p className="text-[11px] text-white/60 text-center leading-relaxed">
              <span className="text-white/60 font-medium">{t('disclaimer.important')}</span>
              {' '}
              {t('disclaimer.text')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-[11px]">
              {t('copyright', { year: currentYear })}
            </p>
            <p className="text-white/40 text-[11px]">
              {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
