import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Hadada Safaris — a passionate team of Tanzania safari experts crafting extraordinary journeys since 2009. Discover our story, values, and the people behind your unforgettable experience.',
  openGraph: {
    title: 'About Hadada Safaris — Luxury Tanzania Safari Experts',
    description:
      'Born from a love of Tanzania, we craft extraordinary journeys that connect travelers to the soul of Africa. Over 15 years of experience guiding thousands through Tanzania.',
    images: [{ url: '/images/hero-safari.png', width: 1344, height: 768, alt: 'Hadada Safaris Team' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
