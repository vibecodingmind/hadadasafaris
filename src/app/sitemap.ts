import type { MetadataRoute } from 'next';

const locales = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];
const baseUrl = 'https://hadadasafaris.com';

const staticPaths = [
  '',
  '/destinations',
  '/itineraries',
  '/camps-lodges',
  '/domestic-flights',
  '/contact',
  '/about',
  '/booking',
  '/privacy',
  '/terms',
];

const destinationSlugs = [
  'serengeti', 'ngorongoro', 'zanzibar', 'kilimanjaro', 'tarangire',
  'lake-manyara', 'selous', 'ruaha', 'katavi', 'gombe-stream',
  'lake-victoria', 'mafia-island', 'pemba-island', 'stone-town',
  'olduvai-gorge', 'balloon-safari',
];

const kilimanjaroRoutes = ['machame', 'lemosho', 'marangu', 'umbwe', 'rongai', 'shira'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Generate locale-prefixed entries for all static pages
  for (const locale of locales) {
    for (const path of staticPaths) {
      const priority = path === '' ? 1.0 : path === '/destinations' ? 0.9 : path === '/itineraries' || path === '/camps-lodges' ? 0.8 : path === '/booking' || path === '/contact' ? 0.7 : 0.5;
      const changeFreq = path === '' ? 'weekly' : path === '/privacy' || path === '/terms' ? 'yearly' : 'monthly';

      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq as MetadataRoute.Sitemap[0]['changeFrequency'],
        priority,
      });
    }

    // Destination detail pages
    for (const slug of destinationSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/destinations/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    // Kilimanjaro route pages
    for (const route of kilimanjaroRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}/kilimanjaro/${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
