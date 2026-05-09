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
        <div className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/50" />
      </div>

      {/* Soft golden glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#B78A42]/10 blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#D5BC92]/8 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-xl border border-white/25 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
            Tanzania Awaits
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white whitespace-nowrap"
        >
          Explore <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">Tanzania&apos;s</span> Wonders
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto"
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
          <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/25 group">
            INQUIRE NOW
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button className="bg-white/15 backdrop-blur-xl border border-white/25 text-white hover:bg-white/25 hover:border-white/40 font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300">
            <MapPin className="w-4 h-4 mr-2" />
            DESTINATIONS
          </Button>
        </motion.div>

        {/* Stats - frosted glass strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-5 shadow-lg shadow-black/5"
        >
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '55+', label: 'Happy Travelers' },
            { number: '25+', label: 'Unique Routes' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((stat, i) => (
            <div key={stat.label} className={`text-center ${i > 0 ? 'border-l border-white/15 pl-6 md:pl-10' : ''}`}>
              <div className="text-xl md:text-2xl font-bold text-[#D5BC92]">{stat.number}</div>
              <div className="text-[11px] text-white/55 tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
