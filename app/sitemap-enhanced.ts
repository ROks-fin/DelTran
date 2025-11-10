import { MetadataRoute } from 'next';

/**
 * Enhanced Sitemap Generator
 * Generates comprehensive sitemap for all pages and locales
 * Includes priority and change frequency for better SEO
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deltran.ai';
const locales = ['en', 'he', 'ar'];

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
}

/**
 * Static pages configuration
 * Define all static pages with their SEO properties
 */
const staticPages = [
  {
    path: '',
    priority: 1.0,
    changeFrequency: 'daily' as const,
    label: 'home',
  },
  {
    path: '/platform',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
    label: 'platform',
  },
  {
    path: '/pricing',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
    label: 'pricing',
  },
  {
    path: '/banks',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
    label: 'banks',
  },
  {
    path: '/investors',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    label: 'investors',
  },
  {
    path: '/contact',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    label: 'contact',
  },
  {
    path: '/about',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    label: 'about',
  },
  {
    path: '/blog',
    priority: 0.7,
    changeFrequency: 'daily' as const,
    label: 'blog',
  },
  {
    path: '/features',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
    label: 'features',
  },
  {
    path: '/security',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    label: 'security',
  },
  {
    path: '/api-docs',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
    label: 'api-docs',
  },
  {
    path: '/case-studies',
    priority: 0.6,
    changeFrequency: 'weekly' as const,
    label: 'case-studies',
  },
  {
    path: '/privacy',
    priority: 0.5,
    changeFrequency: 'yearly' as const,
    label: 'privacy',
  },
  {
    path: '/terms',
    priority: 0.5,
    changeFrequency: 'yearly' as const,
    label: 'terms',
  },
];

/**
 * Generate sitemap entries for all locales
 */
function generateLocalizedEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const currentDate = new Date().toISOString();

  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const localizedPath = `/${locale}${page.path}`;

      // Generate alternate language URLs
      const alternates: Record<string, string> = {};
      locales.forEach((altLocale) => {
        alternates[altLocale] = `${baseUrl}/${altLocale}${page.path}`;
      });
      alternates['x-default'] = `${baseUrl}/en${page.path}`;

      entries.push({
        url: `${baseUrl}${localizedPath}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return entries;
}

/**
 * Generate dynamic content entries (blog posts, case studies, etc.)
 * In production, this would fetch from a database or CMS
 */
async function generateDynamicEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  // Example: Blog posts
  // In production, fetch from your CMS or database
  const blogPosts: Array<{ slug: string; lastModified: string }> = [
    // { slug: 'ai-translation-future', lastModified: '2024-01-15' },
    // { slug: 'enterprise-security', lastModified: '2024-01-10' },
  ];

  blogPosts.forEach((post) => {
    locales.forEach((locale) => {
      const alternates: Record<string, string> = {};
      locales.forEach((altLocale) => {
        alternates[altLocale] = `${baseUrl}/${altLocale}/blog/${post.slug}`;
      });

      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return entries;
}

/**
 * Generate API documentation entries
 */
function generateAPIDocEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const apiEndpoints = [
    'overview',
    'authentication',
    'translation',
    'languages',
    'webhooks',
    'rate-limits',
    'errors',
  ];

  apiEndpoints.forEach((endpoint) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${baseUrl}/${locale}/api-docs/${endpoint}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return entries;
}

/**
 * Main sitemap export function
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = generateLocalizedEntries();
  const dynamicEntries = await generateDynamicEntries();
  const apiEntries = generateAPIDocEntries();

  return [...staticEntries, ...dynamicEntries, ...apiEntries];
}

/**
 * Generate sitemap index for large sites
 * Use this if you have more than 50,000 URLs
 */
export async function generateSitemapIndex(): Promise<string[]> {
  return [
    `${baseUrl}/sitemap-main.xml`,
    `${baseUrl}/sitemap-blog.xml`,
    `${baseUrl}/sitemap-docs.xml`,
    `${baseUrl}/sitemap-case-studies.xml`,
  ];
}

/**
 * Image sitemap generator
 * Helps Google index your images
 */
interface ImageSitemapEntry {
  url: string;
  images: Array<{
    loc: string;
    title?: string;
    caption?: string;
    geoLocation?: string;
    license?: string;
  }>;
}

export async function generateImageSitemap(): Promise<ImageSitemapEntry[]> {
  // In production, fetch actual images from your assets
  return [
    {
      url: `${baseUrl}/en`,
      images: [
        {
          loc: `${baseUrl}/images/hero-platform.jpg`,
          title: 'Deltran.ai Translation Platform',
          caption: 'Enterprise AI-powered translation platform',
        },
        {
          loc: `${baseUrl}/images/features-overview.jpg`,
          title: 'Platform Features',
          caption: 'Comprehensive translation features for enterprises',
        },
      ],
    },
  ];
}

/**
 * Video sitemap generator
 * Helps Google index your videos
 */
interface VideoSitemapEntry {
  url: string;
  videos: Array<{
    thumbnailLoc: string;
    title: string;
    description: string;
    contentLoc?: string;
    playerLoc?: string;
    duration?: number;
    publicationDate?: string;
    familyFriendly?: boolean;
    requiresSubscription?: boolean;
    live?: boolean;
  }>;
}

export async function generateVideoSitemap(): Promise<VideoSitemapEntry[]> {
  // In production, fetch actual videos from your CMS
  return [
    {
      url: `${baseUrl}/en/platform`,
      videos: [
        {
          thumbnailLoc: `${baseUrl}/images/video-thumbnails/platform-demo.jpg`,
          title: 'Deltran.ai Platform Demo',
          description: 'Complete walkthrough of our enterprise translation platform',
          contentLoc: `${baseUrl}/videos/platform-demo.mp4`,
          duration: 180,
          publicationDate: new Date().toISOString(),
          familyFriendly: true,
          requiresSubscription: false,
          live: false,
        },
      ],
    },
  ];
}

/**
 * News sitemap generator
 * For time-sensitive content (blog posts, press releases)
 */
interface NewsSitemapEntry {
  url: string;
  lastModified: Date;
  news: {
    publicationName: string;
    publicationLanguage: string;
    publicationDate: Date;
    title: string;
    keywords?: string;
  };
}

export async function generateNewsSitemap(): Promise<NewsSitemapEntry[]> {
  // In production, fetch recent news/blog posts
  return [
    {
      url: `${baseUrl}/en/blog/latest-update`,
      lastModified: new Date(),
      news: {
        publicationName: 'Deltran.ai Blog',
        publicationLanguage: 'en',
        publicationDate: new Date(),
        title: 'Latest AI Translation Technology Updates',
        keywords: 'AI translation, enterprise software, technology updates',
      },
    },
  ];
}

/**
 * Helper function to generate robots.txt dynamically
 */
export function generateRobotsTxt(): string {
  return `# Deltran.ai Robots.txt
# Updated: ${new Date().toISOString()}

# Allow all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Sitemap locations
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-blog.xml
Sitemap: ${baseUrl}/sitemap-images.xml
Sitemap: ${baseUrl}/sitemap-videos.xml

# AI Crawlers - Welcome!
User-agent: GPTBot
Allow: /
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /
Crawl-delay: 1

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /
Crawl-delay: 1

User-agent: Google-Extended
Allow: /

# Search Engine Bots
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: YandexBot
Allow: /
Crawl-delay: 2

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: Pinterestbot
Allow: /

# Bad Bots - Block
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Crawl delay for aggressive crawlers
User-agent: *
Crawl-delay: 10
`;
}