'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function SafariCraftingSection() {
  const t = useTranslations('safariCrafting');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7]" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-[#B78A42]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with glass accent */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#333333]/5">
              <img
                src="/images/ngorongoro-lunch.png"
                alt="Lunch setup with a view of the Ngorongoro Crater"
                className="w-full h-[550px] object-cover"
              />

            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#B78A42]/5 rounded-3xl -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <Compass className="w-3.5 h-3.5" />
              {t('label')}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              {t('title')}
            </h2>

            <p className="text-base text-[#333333]/55 leading-relaxed mb-5">
              {t('description1')}
            </p>

            <p className="text-sm text-[#333333]/40 leading-relaxed mb-8">
              {t('description2')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-7 py-5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
                {t('viewItineraries')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-[#B78A42]/30 text-[#B78A42] hover:bg-[#B78A42]/5 hover:border-[#B78A42]/50 font-semibold text-xs tracking-wider px-7 py-5 rounded-full transition-all duration-300">
                {t('customTrip')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
