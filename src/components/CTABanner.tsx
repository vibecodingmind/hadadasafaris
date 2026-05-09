'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-safari.png"
          alt="Safari landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/70 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/50 to-[#1a1a1a]/80" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D5BC92]/8 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
            Start Your Journey
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Plan Your{' '}
            <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">Dream Safari?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Let us craft a personalized Tanzanian adventure tailored to your interests, budget, and travel style. Your unforgettable journey starts with a single inquiry.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/25 group">
              START PLANNING
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-white/20 hover:border-white/40 font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300">
              VIEW ITINERARIES
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
