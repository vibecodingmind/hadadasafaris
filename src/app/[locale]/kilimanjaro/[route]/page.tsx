import RoutePageClient from './RoutePageClient';

export function generateStaticParams() {
  const routes = ['machame', 'lemosho', 'marangu', 'umbwe', 'rongai', 'shira'];
  const locales = ['en', 'ar', 'zh', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'];
  return locales.flatMap(locale => routes.map(route => ({ locale, route })));
}

export default function RoutePage() {
  return <RoutePageClient />;
}
