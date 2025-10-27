/**
 * Метаданные для главной страницы
 */

import { generatePageMetadata, LocaleKey } from '@/lib/seo/config';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'DelTran - Global Payment Infrastructure | Cross-Border Payments',
    ar: 'DelTran - البنية التحتية العالمية للدفع | المدفوعات عبر الحدود',
    he: 'DelTran - תשתית תשלומים גלובלית | תשלומים חוצי גבולות',
  };

  const descriptions = {
    en: 'One rail. Infinite reach. Next-generation cross-border payment rails with instant settlements, bank-grade security, and global reach. ADGM regulated financial infrastructure.',
    ar: 'سكة واحدة. وصول لا حدود له. قضبان الدفع عبر الحدود من الجيل التالي مع التسويات الفورية والأمان على مستوى البنوك والوصول العالمي.',
    he: 'מסילה אחת. טווח אינסופי. מסילות תשלום חוצות גבולות מהדור הבא עם סליקה מיידית, אבטחה ברמת בנקאית וטווח גלובלי.',
  };

  const keywords = [
    'cross-border payments',
    'global payment infrastructure',
    'instant settlement',
    'payment rails',
    'ADGM regulated',
    'bank-grade security',
    'international money transfer',
    'fintech platform',
    'real-time payments',
    'payment gateway',
    'global transactions',
    'financial infrastructure',
  ];

  return generatePageMetadata({
    title: titles[locale as LocaleKey] || titles.en,
    description: descriptions[locale as LocaleKey] || descriptions.en,
    path: '',
    locale: locale as LocaleKey,
    keywords,
    openGraph: {
      title: titles[locale as LocaleKey] || titles.en,
      description: descriptions[locale as LocaleKey] || descriptions.en,
      type: 'website',
    },
  });
}
