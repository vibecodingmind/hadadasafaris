'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
  { name: 'Entara Camps', logo: '⛺' },
  { name: 'Nimali Africa', logo: '🌿' },
  { name: 'Coastal Aviation', logo: '✈️' },
  { name: 'Serengeti Balloon', logo: '🎈' },
  { name: 'TANAPA', logo: '🏔️' },
  { name: 'NCAA', logo: '🦏' },
  { name: 'Tanzania Tourism', logo: '🇹🇿' },
  { name: 'Zanzi Resort', logo: '🏝️' },
];

export default function PartnersStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 bg-white border-t border-b border-[#B78A42]/5 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Trusted Partners
          </span>
          <h3 className="text-lg text-[#333333]/40 font-medium">Working with the best in Tanzania</h3>
        </motion.div>

        {/* Infinite scroll strip */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-scroll gap-12 items-center">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-[#FAFAF7] rounded-xl border border-[#B78A42]/5 hover:border-[#B78A42]/15 hover:shadow-sm transition-all duration-300 cursor-default"
              >
                <span className="text-2xl">{partner.logo}</span>
                <span className="text-sm font-medium text-[#333333]/50 whitespace-nowrap">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
