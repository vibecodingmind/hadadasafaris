import type { Metadata } from 'next';
import { getAllDestinationSlugs, getDestinationBySlug } from '@/data/destinations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return {
    title: destination.name,
    description: destination.description,
    openGraph: {
      title: `${destination.name} — Hadada Safaris`,
      description: destination.description,
      images: [{ url: destination.image, width: 1344, height: 768, alt: destination.name }],
    },
  };
}

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export default function DestinationSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
