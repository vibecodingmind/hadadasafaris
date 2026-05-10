import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Safari',
  description:
    'Book your dream Tanzania safari with Hadada Safaris. Complete our simple booking form and our team will craft a personalized itinerary within 24 hours. No payment required.',
  openGraph: {
    title: 'Book Your Safari — Hadada Safaris',
    description:
      'Reserve your dream safari with Hadada Safaris. No payment required, free itinerary revision, 48-hour confirmation. Serengeti, Kilimanjaro, Zanzibar and more.',
    images: [{ url: '/images/hero-safari.png', width: 1344, height: 768, alt: 'Book a Safari with Hadada' }],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
