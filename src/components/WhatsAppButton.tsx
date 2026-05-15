'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const pageMessageKeys: Record<string, string> = {
  '/camps-lodges': 'campsLodgesMessage',
  '/domestic-flights': 'flightsMessage',
  '/destinations/balloon-safari': 'balloonMessage',
  '/destinations/serengeti': 'serengetiMessage',
  '/destinations/ngorongoro': 'ngorongoroMessage',
  '/destinations/zanzibar': 'zanzibarMessage',
  '/destinations/kilimanjaro': 'kilimanjaroMessage',
  '/itineraries': 'itinerariesMessage',
  '/contact': 'contactMessage',
  '/booking': 'bookingMessage',
};

export default function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const getMessage = () => {
    // Check exact path first
    if (pageMessageKeys[pathname]) return t(pageMessageKeys[pathname]);
    // Check Kilimanjaro routes
    if (pathname.startsWith('/kilimanjaro/')) {
      const route = pathname.split('/').pop();
      const routeName = route ? route.charAt(0).toUpperCase() + route.slice(1) : '';
      return t('kilimanjaroRouteMessage', { route: routeName });
    }
    // Check destination pages
    if (pathname.startsWith('/destinations/')) {
      return t('destinationMessage');
    }
    // Default
    return t('defaultMessage');
  };

  const waUrl = `https://wa.me/255788071035?text=${encodeURIComponent(getMessage())}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, type: 'spring', stiffness: 200 }}
      className="fixed bottom-20 md:bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
        aria-label="Chat with us on WhatsApp"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 backdrop-blur-xl text-[#333333] text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-[#25D366]/20 whitespace-nowrap"
              role="tooltip"
            >
              {t('chatWithUs')}
            </motion.span>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-25" />
          {/* Outer glow ring */}
          <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/10 animate-pulse opacity-40" style={{ animationDuration: '3s' }} />
          <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:ring-offset-2">
            <MessageCircle className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}
