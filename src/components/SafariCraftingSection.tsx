'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SafariCraftingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* Two-column editorial layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left - Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white flex items-center"
        >
          <div className="px-8 md:px-16 py-16 lg:py-0">
            <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <Compass className="w-4 h-4" />
              Expert Craftsmanship
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              Crafting Exceptional{' '}
              <span className="text-[#B78A42]">Safaris</span>
            </h2>

            <p className="text-base text-[#333333]/60 leading-relaxed mb-5">
              From thrilling game drives in the Serengeti to serene moments in the
              Ngorongoro Crater, our expertly crafted itineraries ensure you experience
              the very best of Tanzania&apos;s wildlife and landscapes.
            </p>

            <p className="text-sm text-[#333333]/45 leading-relaxed mb-8">
              Every detail of your safari is thoughtfully planned — from the luxury lodges
              you&apos;ll stay in, to the hidden gems only our experienced guides know about.
              We believe in creating journeys that go beyond expectations.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {[
                { number: '15+', label: 'Years' },
                { number: '5000+', label: 'Travelers' },
                { number: '98%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#B78A42]">{stat.number}</div>
                  <div className="text-[11px] text-[#333333]/40 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#333333] hover:bg-[#2A2A2A] text-white font-bold text-xs tracking-wider px-7 py-5 rounded-full transition-all duration-300 group">
                VIEW ITINERARIES
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-[#B78A42] text-[#B78A42] hover:bg-[#B78A42]/10 font-semibold text-xs tracking-wider px-7 py-5 rounded-full">
                CUSTOM TRIP
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative min-h-[400px] lg:min-h-0"
        >
          <img
            src="/images/ngorongoro-lunch.png"
            alt="Lunch setup with a view of the Ngorongoro Crater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 lg:to-white/5" />

          {/* Floating label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-8 left-8 bg-[#333333]/90 backdrop-blur-sm rounded-lg px-5 py-3"
          >
            <span className="text-white/50 text-[10px] tracking-wider uppercase block">Lunch with a view of</span>
            <span className="text-[#B78A42] font-bold text-sm">Ngorongoro Crater</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
