'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#FAFAF7] flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <img
                src="/images/hadada-logo.png"
                alt="Hadada Safaris"
                className="h-16 w-auto object-contain"
              />
            </motion.div>

            {/* Loading bar */}
            <div className="mt-8 w-48 h-1 bg-[#B78A42]/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#B78A42] to-[#D5BC92] rounded-full"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-xs text-[#333333]/30 tracking-[0.3em] uppercase"
            >
              Loading your adventure
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
