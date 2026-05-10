import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Hadada Safaris to start planning your dream Tanzania safari. Email, call, or WhatsApp us — our team responds within 24 hours.',
  openGraph: {
    title: 'Contact Hadada Safaris — Plan Your Dream Safari',
    description:
      'Start planning your dream safari — we would love to hear from you. Multiple ways to connect: email, phone, WhatsApp, or visit us in Arusha.',
    images: [{ url: '/images/hero-safari.png', width: 1344, height: 768, alt: 'Contact Hadada Safaris' }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
