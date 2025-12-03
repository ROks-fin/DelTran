'use client';

/**
 * Premium Fintech Footer Component - Client Side
 * Handles animations with framer-motion
 */

import Link from 'next/link';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import {
  FooterColumn,
  FooterWrapper,
  FooterLinkItem,
  FooterDisclaimer,
  FooterBottomBar
} from './motion/FooterAnimated';

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

interface FooterClientProps {
  locale: string;
  translations: {
    description: string;
    links: {
      platform: string;
      network: string;
      company: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
    disclaimer: {
      important: string;
      text: string;
    };
    copyright: string;
    allRightsReserved: string;
  };
  currentYear: number;
}

export function FooterClient({ locale, translations: t, currentYear }: FooterClientProps) {
  // Products column
  const productLinks = [
    { name: 'platform' as const, href: '/platform' },
    { name: 'network' as const, href: '/network' },
  ];

  // Company column
  const companyLinks = [
    { name: 'company' as const, href: '/company' },
    { name: 'contact' as const, href: '/contact' },
  ];

  // Legal links
  const legalLinks = [
    { name: 'privacy' as const, href: '/privacy' },
    { name: 'terms' as const, href: '/terms' },
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

      <FooterWrapper className="relative container-premium py-16 lg:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand Column - Takes 2 columns on larger screens */}
          <FooterColumn delay={0}>
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
                {t.description}
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
          </FooterColumn>

          {/* Products Column */}
          <FooterColumn delay={0.1}>
            <div>
              <h3 className={columnTitleStyles}>Products</h3>
              <ul className="space-y-2.5">
                {productLinks.map((link, index) => (
                  <FooterLinkItem key={link.name} delay={0.15 + index * 0.05}>
                    <Link href={`/${locale}${link.href}`} className={linkStyles}>
                      <span>{t.links[link.name]}</span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0"
                      />
                    </Link>
                  </FooterLinkItem>
                ))}
              </ul>
            </div>
          </FooterColumn>

          {/* Company Column */}
          <FooterColumn delay={0.15}>
            <div>
              <h3 className={columnTitleStyles}>Company</h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link, index) => (
                  <FooterLinkItem key={link.name} delay={0.2 + index * 0.05}>
                    <Link href={`/${locale}${link.href}`} className={linkStyles}>
                      <span>{t.links[link.name]}</span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0"
                      />
                    </Link>
                  </FooterLinkItem>
                ))}
              </ul>
            </div>
          </FooterColumn>

          {/* Legal Column */}
          <FooterColumn delay={0.2}>
            <div>
              <h3 className={columnTitleStyles}>Legal</h3>
              <ul className="space-y-2.5">
                {legalLinks.map((link, index) => (
                  <FooterLinkItem key={link.name} delay={0.25 + index * 0.05}>
                    <Link href={`/${locale}${link.href}`} className={linkStyles}>
                      <span>{t.links[link.name]}</span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0"
                      />
                    </Link>
                  </FooterLinkItem>
                ))}
              </ul>
            </div>
          </FooterColumn>

          {/* CTA Column */}
          <FooterColumn delay={0.25}>
            <div className="col-span-2 md:col-span-1">
              <h3 className={columnTitleStyles}>{t.cta.title}</h3>
              <p className="text-white/60 text-[13px] leading-relaxed mb-4">
                {t.cta.description}
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
                <span>{t.cta.button}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FooterColumn>
        </div>

        {/* Pre-launch Disclaimer */}
        <FooterDisclaimer>
          <div className="mt-14 pt-8 border-t border-white/[0.04]">
            <div
              className={cn(
                "px-5 py-4 rounded-xl",
                "bg-white/[0.02] border border-white/[0.06]"
              )}
            >
              <p className="text-[11px] text-white/60 text-center leading-relaxed">
                <span className="text-white/60 font-medium">{t.disclaimer.important}</span>
                {' '}
                {t.disclaimer.text}
              </p>
            </div>
          </div>
        </FooterDisclaimer>

        {/* Bottom Bar */}
        <FooterBottomBar>
          <div className="mt-8 pt-6 border-t border-white/[0.04]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-white/40 text-[11px]">
                {t.copyright}
              </p>
              <p className="text-white/40 text-[11px]">
                {t.allRightsReserved}
              </p>
            </div>
          </div>
        </FooterBottomBar>
      </FooterWrapper>
    </footer>
  );
}
