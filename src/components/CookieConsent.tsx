'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from 'lucide-react';
import { Link } from '@/i18n/navigation';

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
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-40 bg-white/85 backdrop-blur-2xl border border-[#B78A42]/10 rounded-2xl shadow-xl shadow-[#333333]/5 p-5"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-consent-description"
        >
          <button
            onClick={decline}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#FAFAF7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B78A42]/30"
            aria-label="Close cookie consent"
          >
            <X className="w-3.5 h-3.5 text-[#333333]/30" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#B78A42]/8 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-[#B78A42]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-[#333333] mb-1">We value your privacy</h4>
              <p id="cookie-consent-description" className="text-xs text-[#333333]/50 leading-relaxed mb-3">
                We use cookies to enhance your browsing experience, analyze our traffic, and serve targeted content. By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{' '}
                <Link href="/privacy" className="text-[#B78A42] hover:underline underline-offset-2">Privacy Policy</Link>.
                You can learn more about how we handle your data in our{' '}
                <Link href="/terms" className="text-[#B78A42] hover:underline underline-offset-2">Terms of Service</Link>.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-3 h-3 text-[#B78A42]/50 flex-shrink-0" />
                <span className="text-[10px] text-[#333333]/35">GDPR compliant — you may decline non-essential cookies at any time.</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={accept}
                  className="px-5 py-2 bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] text-white text-xs font-bold rounded-full tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B78A42]/50 focus:ring-offset-2 shadow-md shadow-[#B78A42]/10"
                >
                  ACCEPT
                </button>
                <button
                  onClick={decline}
                  className="px-5 py-2 bg-[#FAFAF7] hover:bg-[#F0EDE5] text-[#333333]/50 text-xs font-bold rounded-full tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#333333]/20 focus:ring-offset-2"
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
