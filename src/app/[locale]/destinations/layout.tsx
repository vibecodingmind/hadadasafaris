import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Explore Tanzania\'s most spectacular safari destinations — Serengeti, Ngorongoro Crater, Zanzibar, Kilimanjaro, Tarangire, Selous, Ruaha, and more. Each destination offers unique wildlife, landscapes, and experiences.',
  openGraph: {
    title: 'Safari Destinations — Hadada Safaris',
    description:
      'From the legendary Serengeti to the pristine beaches of Zanzibar, discover Tanzania\'s most extraordinary safari destinations with Hadada Safaris.',
    images: [{ url: '/images/hero-safari.png', width: 1344, height: 768, alt: 'Tanzania Safari Destinations' }],
  },
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
