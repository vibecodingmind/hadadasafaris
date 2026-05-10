import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Camps & Lodges',
  description:
    'Explore our curated collection of Tanzania\'s finest safari camps and lodges. From luxury tented camps in the Serengeti to crater rim elegance at Ngorongoro — handpicked for quality, location, and sustainability.',
  openGraph: {
    title: 'Luxury Safari Camps & Lodges — Hadada Safaris',
    description:
      'We have carefully curated a collection of Tanzania\'s finest camps and lodges — each one selected for quality, location, service, and sustainability.',
    images: [{ url: '/images/luxury-camp.png', width: 1344, height: 768, alt: 'Luxury Safari Camps & Lodges' }],
  },
};

export default function CampsLodgesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
