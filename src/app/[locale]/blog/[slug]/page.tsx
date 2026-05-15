import BlogPostClient from './BlogPostClient';

const locales = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];
const slugs = [
  'best-time-great-migration',
  'kilimanjaro-packing-guide',
  'serengeti-photography-tips',
  'cultural-tourism-tanzania',
  'ngorongoro-crater-guide',
  'zanzibar-beyond-beaches',
  'safari-with-kids',
  'conservation-success-stories',
];

export function generateStaticParams() {
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export default function BlogDetailPage() {
  return <BlogPostClient />;
}
