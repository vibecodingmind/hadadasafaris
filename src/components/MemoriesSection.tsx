'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Camera, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function MemoriesSection() {
  const t = useTranslations('memories');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden bg-white" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] bg-[#B78A42]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <Heart className="w-3.5 h-3.5" />
              {t('label')}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              {t('title')}
            </h2>

            <p className="text-base text-[#333333]/55 leading-relaxed mb-8">
              {t('description')}
            </p>

            {/* Feature pills - glass style */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: Camera, label: t('wildlifeEncounters') },
                { icon: Heart, label: t('culturalImmersion') },
                { icon: Star, label: t('luxuryInTheWild') },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-sm text-[#333333] font-medium hover:bg-[#B78A42]/5 hover:border-[#B78A42]/20 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4 text-[#B78A42]" />
                  {item.label}
                </span>
              ))}
            </div>

            <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/20 group">
              {t('exploreMore')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Image with glass overlay card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#333333]/5">
              <img
                src="/images/migration.png"
                alt="Wildebeest Migration"
                className="w-full h-[500px] object-cover"
              />

            </div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#B78A42]/10 rounded-3xl" />
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#B78A42]/5 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
