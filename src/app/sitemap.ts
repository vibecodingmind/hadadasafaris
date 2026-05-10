import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hadadasafaris.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/itineraries`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/camps-lodges`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/domestic-flights`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const destinations = [
    'serengeti', 'ngorongoro', 'zanzibar', 'kilimanjaro', 'tarangire',
    'lake-manyara', 'selous', 'ruaha', 'katavi', 'gombe-stream',
    'lake-victoria', 'mafia-island', 'pemba-island', 'stone-town',
    'olduvai-gorge', 'balloon-safari',
  ];

  const destinationPages = destinations.map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const kilimanjaroRoutes = ['machame', 'lemosho', 'marangu', 'umbwe', 'rongai', 'shira'];

  const kilimanjaroPages = kilimanjaroRoutes.map((route) => ({
    url: `${baseUrl}/kilimanjaro/${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...destinationPages, ...kilimanjaroPages];
}
