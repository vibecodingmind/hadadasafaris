'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SafariCraftingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A45C]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#C8A45C] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Compass className="w-4 h-4" />
              Expert Craftsmanship
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B4332] mb-6 leading-tight">
              Lunch set up with a view of the{' '}
              <span className="text-[#C8A45C]">Ngorongoro Crater</span>
            </h2>

            <h3 className="text-2xl md:text-3xl font-bold text-[#1B4332] mb-6">
              Crafting Exceptional Safaris
            </h3>

            <p className="text-lg text-[#588157]/70 leading-relaxed mb-6">
              From thrilling game drives in the Serengeti to serene moments in the
              Ngorongoro Crater, our expertly crafted itineraries ensure you experience
              the very best of Tanzania&apos;s wildlife and landscapes.
            </p>

            <p className="text-base text-[#588157]/60 leading-relaxed mb-8">
              Every detail of your safari is thoughtfully planned — from the luxury lodges
              you&apos;ll stay in, to the hidden gems only our experienced guides know about.
              We believe in creating journeys that go beyond expectations, where each day
              brings a new adventure and each sunset tells a different story.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#1B4332] hover:bg-[#2D5A3F] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 group">
                VIEW ITINERARIES
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 font-semibold text-sm tracking-wider px-8 py-6 rounded-full">
                CUSTOM TRIP
              </Button>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/ngorongoro-lunch.png"
                alt="Lunch setup with a view of the Ngorongoro Crater"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1B4332]">...with</div>
                <div className="text-lg font-bold text-[#C8A45C]">Experience</div>
              </div>
            </motion.div>

            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-[#C8A45C]/20 rounded-2xl -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
