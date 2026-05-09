'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function BalloonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/balloon-safari.png"
          alt="Hot air balloon safari over Serengeti"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1B4332]/70 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 text-[#C8A45C] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            Once In A Lifetime
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Experience the Serengeti{' '}
            <span className="text-[#C8A45C]">From Above</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Float silently over the endless plains as the sun rises, witnessing herds of
            wildlife from a perspective few ever experience. Our balloon safaris are the
            crown jewel of any Tanzanian adventure.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
          >
            <div className="text-left">
              <div className="text-xs text-white/50 tracking-wider">Starting From</div>
              <div className="text-2xl font-bold text-[#C8A45C]">$599</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <a
              href="#"
              className="px-6 py-2.5 bg-[#C8A45C] hover:bg-[#B8943F] text-[#1B4332] font-bold text-sm rounded-full tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A45C]/20"
            >
              BOOK NOW
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
