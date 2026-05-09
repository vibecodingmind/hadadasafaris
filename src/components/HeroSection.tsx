'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-safari.png"
          alt="African Safari Sunset"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#333333]/60" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 via-transparent to-[#333333]/40" />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#B78A42]/5 blur-3xl" />

      {/* Content - Centered */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#B78A42]/20 border border-[#B78A42]/30 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
            Tanzania Awaits
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 whitespace-nowrap bg-gradient-to-r from-white via-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent"
        >
          Explore Tanzania&apos;s Wonders
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          At Hadada Safari, we specialize in creating exceptional safari experiences
          that connect you to Tanzania&apos;s breathtaking landscapes, vibrant cultures,
          and magnificent wildlife.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
            INQUIRE NOW
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button className="bg-white/15 backdrop-blur-sm border border-white/40 text-white hover:bg-white/25 hover:border-[#B78A42] font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 group">
            <MapPin className="w-4 h-4 mr-2" />
            DESTINATIONS
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '5000+', label: 'Happy Travelers' },
            { number: '50+', label: 'Unique Routes' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#B78A42]">{stat.number}</div>
              <div className="text-xs text-white/60 tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
