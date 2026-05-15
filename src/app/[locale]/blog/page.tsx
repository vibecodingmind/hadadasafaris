import BlogListingClient from './BlogListingClient';

const locales = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function BlogPage() {
  return <BlogListingClient />;
}
