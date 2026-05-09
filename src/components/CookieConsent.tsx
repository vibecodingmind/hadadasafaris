'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hadada-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('hadada-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem('hadada-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-40 bg-white/90 backdrop-blur-2xl border border-[#B78A42]/10 rounded-2xl shadow-xl p-5"
        >
          <button
            onClick={decline}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#FAFAF7] transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5 text-[#333333]/30" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#B78A42]/8 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-[#B78A42]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-[#333333] mb-1">We value your privacy</h4>
              <p className="text-xs text-[#333333]/45 leading-relaxed mb-4">
                We use cookies to enhance your browsing experience and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={accept}
                  className="px-5 py-2 bg-[#B78A42] hover:bg-[#A67A35] text-white text-xs font-bold rounded-full tracking-wider transition-colors"
                >
                  ACCEPT
                </button>
                <button
                  onClick={decline}
                  className="px-5 py-2 bg-[#FAFAF7] hover:bg-[#F0EDE5] text-[#333333]/50 text-xs font-bold rounded-full tracking-wider transition-colors"
                >
                  DECLINE
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
