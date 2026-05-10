import DestinationPageClient from './DestinationPageClient';

export function generateStaticParams() {
  const slugs = [
    'serengeti', 'ngorongoro', 'zanzibar', 'kilimanjaro', 'tarangire',
    'lake-manyara', 'selous', 'ruaha', 'katavi', 'gombe-stream',
    'lake-victoria', 'mafia-island', 'pemba-island', 'stone-town',
    'olduvai-gorge', 'balloon-safari',
  ];
  const locales = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export default function DestinationDetailPage() {
  return <DestinationPageClient />;
}
