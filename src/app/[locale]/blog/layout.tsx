import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safari Journal | Hadada Safaris',
  description: 'Stories, guides, and inspiration from the heart of Tanzania\'s wilderness. Expert tips on safaris, wildlife, culture, adventure, and conservation.',
  openGraph: {
    title: 'Safari Journal | Hadada Safaris',
    description: 'Stories, guides, and inspiration from the heart of Tanzania\'s wilderness.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
