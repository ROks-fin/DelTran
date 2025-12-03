/**
 * Premium Fintech Footer Component
 * Bank-grade minimal design with refined spacing
 *
 * PERFORMANCE: Server Component fetches translations, passes to Client Component
 *
 * Features:
 * - 4-column grid with brand emphasis
 * - Refined typography hierarchy
 * - Subtle hover states with gold accents
 * - Pre-launch disclaimer with premium styling
 */

import { getLocale, getTranslations } from 'next-intl/server';
import { FooterClient } from './FooterClient';

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const currentYear = new Date().getFullYear();

  // Pre-fetch all translations to pass to client component
  const translations = {
    description: t('description'),
    links: {
      platform: t('links.platform'),
      network: t('links.network'),
      company: t('links.company'),
      contact: t('links.contact'),
      privacy: t('links.privacy'),
      terms: t('links.terms'),
    },
    cta: {
      title: t('cta.title'),
      description: t('cta.description'),
      button: t('cta.button'),
    },
    disclaimer: {
      important: t('disclaimer.important'),
      text: t('disclaimer.text'),
    },
    copyright: t('copyright', { year: currentYear }),
    allRightsReserved: t('allRightsReserved'),
  };

  return (
    <FooterClient
      locale={locale}
      translations={translations}
      currentYear={currentYear}
    />
  );
}
