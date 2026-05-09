'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

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
        href="https://wa.me/255123456789?text=Hello%20Hadada%20Safaris!%20I'm%20interested%20in%20a%20safari."
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
