'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SafariCraftingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image with glass accent */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/ngorongoro-lunch.png"
                alt="Lunch setup with a view of the Ngorongoro Crater"
                className="w-full h-[550px] object-cover"
              />
              {/* Glass overlay label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl px-5 py-3"
              >
                <span className="text-white/60 text-[10px] tracking-wider uppercase block">With a view of</span>
                <span className="text-white font-bold text-sm">Ngorongoro Crater</span>
              </motion.div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 border-2 border-[#B78A42]/12 rounded-3xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
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
            </p>

            {/* Stats row - glass style */}
            <div className="flex gap-4 mb-10">
              {[
                { number: '15+', label: 'Years' },
                { number: '5K+', label: 'Travelers' },
                { number: '98%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 text-center bg-[#F9F7F2] rounded-xl py-4 px-3">
                  <div className="text-xl font-bold text-[#B78A42]">{stat.number}</div>
                  <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#333333] hover:bg-[#2A2A2A] text-white font-bold text-xs tracking-wider px-7 py-5 rounded-full transition-all duration-300 group">
                VIEW ITINERARIES
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-[#B78A42] text-[#B78A42] hover:bg-[#B78A42]/8 font-semibold text-xs tracking-wider px-7 py-5 rounded-full">
                CUSTOM TRIP
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
