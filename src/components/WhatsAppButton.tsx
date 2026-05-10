'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const pageMessages: Record<string, string> = {
  '/camps-lodges': 'Hello! I\'m interested in your partner camps and lodges. Can you help me choose the right one for my safari?',
  '/domestic-flights': 'Hello! I\'d like to know more about domestic flights for my safari. Can you help with booking?',
  '/destinations/balloon-safari': 'Hello! I\'m interested in booking a balloon safari over the Serengeti. What are the options?',
  '/destinations/serengeti': 'Hello! I\'d love to plan a safari to the Serengeti. Can you help me create an itinerary?',
  '/destinations/ngorongoro': 'Hello! I\'m interested in visiting the Ngorongoro Crater. Can you help plan my trip?',
  '/destinations/zanzibar': 'Hello! I\'d like to plan a trip to Zanzibar. Can you help me with options?',
  '/destinations/kilimanjaro': 'Hello! I\'m interested in climbing Mount Kilimanjaro. Which route do you recommend?',
  '/itineraries': 'Hello! I\'d like to explore your safari itineraries. Can you recommend one for me?',
  '/contact': 'Hello! I\'d like to get in touch about planning a safari.',
};

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const getMessage = () => {
    // Check exact path first
    if (pageMessages[pathname]) return pageMessages[pathname];
    // Check Kilimanjaro routes
    if (pathname.startsWith('/kilimanjaro/')) {
      const route = pathname.split('/').pop();
      return `Hello! I'm interested in climbing Kilimanjaro via the ${route ? route.charAt(0).toUpperCase() + route.slice(1) : ''} route. Can you help me plan?`;
    }
    // Check destination pages
    if (pathname.startsWith('/destinations/')) {
      return 'Hello! I\'m interested in one of your safari destinations. Can you help me plan my trip?';
    }
    // Default
    return 'Hello Hadada Safaris! I\'m interested in planning a safari in Tanzania.';
  };

  const waUrl = `https://wa.me/255788071035?text=${encodeURIComponent(getMessage())}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-white text-[#333333] text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-[#25D366]/20 whitespace-nowrap"
            >
              Chat with us
            </motion.span>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-colors duration-300">
            <MessageCircle className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}
