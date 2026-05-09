'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-safari.png"
          alt="African Safari Sunset"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/70 via-[#333333]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-[#333333]/20" />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#B78A42]/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#B78A42]/20 border border-[#B78A42]/30 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
              Tanzania Awaits
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Welcome to{' '}
            <span className="text-[#B78A42]">Hadada Safaris</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
              Explore Tanzania&apos;s Wonders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            At Hadada Safari, we specialize in creating exceptional safari experiences
            that connect you to Tanzania&apos;s breathtaking landscapes, vibrant cultures,
            and magnificent wildlife.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/20 group">
              INQUIRE NOW
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-sm tracking-wider px-8 py-6 rounded-full backdrop-blur-sm group">
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              WATCH VIDEO
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-[#B78A42] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
