import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Flights',
  description:
    'Fly to Tanzania\'s most spectacular safari destinations with our trusted airline partners. We arrange all domestic flights — Flightlink, Auric Air, Coastal Aviation, and Regional Air — for seamless safari travel.',
  openGraph: {
    title: 'Domestic Flights in Tanzania — Hadada Safaris',
    description:
      'Skip the drive and soar to adventure. We partner with Tanzania\'s most trusted domestic airlines to ensure your journey between safari destinations is smooth, safe, and scenic.',
    images: [{ url: '/images/domestic-flights-hero.png', width: 1344, height: 768, alt: 'Domestic Flights Tanzania' }],
  },
};

export default function DomesticFlightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
