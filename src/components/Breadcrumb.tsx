'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="flex items-center gap-1 text-[#333333]/40 hover:text-[#B78A42] transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-[#333333]/20" />
            {item.href ? (
              <Link href={item.href} className="text-[#333333]/40 hover:text-[#B78A42] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#B78A42] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
