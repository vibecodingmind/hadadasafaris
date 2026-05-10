import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safari Itineraries',
  description:
    'Explore our handcrafted Tanzania safari itineraries — from 5-day cultural trips to 10-day Great Migration safaris. Every journey is 100% tailorable to your interests, budget, and timeline.',
  openGraph: {
    title: 'Safari Itineraries — Hadada Safaris',
    description:
      'Journeys designed to inspire. From the legendary Serengeti to the untouched southern parks, each trip is designed to maximize your time in the wild while enveloping you in comfort.',
    images: [{ url: '/images/hero-safari.png', width: 1344, height: 768, alt: 'Tanzania Safari Itineraries' }],
  },
};

export default function ItinerariesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
