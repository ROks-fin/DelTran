/**
 * Breadcrumbs компонент для навигации и SEO
 * С поддержкой JSON-LD разметки
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema, SchemaScript } from '@/lib/seo/schemas';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  locale?: string;
}

export function Breadcrumbs({ items, locale = 'en' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Автоматическая генерация breadcrumbs из URL если не предоставлены
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname, locale);

  // Всегда добавляем главную страницу в начало
  const allItems = [
    { name: 'Home', url: '/' },
    ...breadcrumbItems,
  ];

  return (
    <>
      <SchemaScript schema={generateBreadcrumbSchema({ items: allItems, locale: locale as any })} />

      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm">
          {allItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
              )}

              {index === 0 ? (
                <Link
                  href={`/${locale}`}
                  className="flex items-center text-white/60 hover:text-gold transition-colors"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : index === allItems.length - 1 ? (
                <span className="text-gold font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={`/${locale}${item.url}`}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * Генерация breadcrumbs из пути URL
 */
function generateBreadcrumbsFromPath(pathname: string, locale: string): BreadcrumbItem[] {
  // Удаляем локаль из пути
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');

  if (!pathWithoutLocale || pathWithoutLocale === '/') {
    return [];
  }

  const segments = pathWithoutLocale.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Преобразуем сегмент в читаемое имя
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      name,
      url: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Компонент для навигационных ссылок по сайту
 */
export function InternalLinks({
  title,
  links,
  className,
}: {
  title?: string;
  links: Array<{ href: string; label: string; description?: string }>;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium group-hover:text-gold transition-colors">
                {link.label}
              </span>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </div>

            {link.description && (
              <p className="text-sm text-white/60">
                {link.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Компонент для "Читайте также" блока
 */
export function RelatedContent({
  title = 'Read More',
  items,
  locale = 'en',
}: {
  title?: string;
  items: Array<{
    title: string;
    href: string;
    description?: string;
    image?: string;
  }>;
  locale?: string;
}) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className="group block"
          >
            <div className="rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 transition-all duration-300">
              {item.image && (
                <div className="aspect-video bg-gradient-to-br from-gold/20 to-gold/5" />
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors mb-2">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-sm text-white/60 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
