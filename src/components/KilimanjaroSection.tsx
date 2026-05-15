'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mountain, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const routeKeys = [
  { nameKey: 'machame', duration: '7 Days', success: '95%' },
  { nameKey: 'lemosho', duration: '8 Days', success: '97%' },
  { nameKey: 'marangu', duration: '6 Days', success: '85%' },
  { nameKey: 'umbwe', duration: '7 Days', success: '90%' },
  { nameKey: 'rongai', duration: '7 Days', success: '92%' },
  { nameKey: 'shira', duration: '8 Days', success: '91%' },
];

export default function KilimanjaroSection() {
  const t = useTranslations('kilimanjaro');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const difficultyColors: Record<string, string> = {
    [t('easy')]: 'bg-green-500/20 text-green-400',
    [t('moderate')]: 'bg-[#B78A42]/20 text-[#B78A42]',
    [t('challenging')]: 'bg-red-500/20 text-red-400',
  };

  return (
    <section id="kilimanjaro" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/images/kilimanjaro.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Mountain className="w-4 h-4" />
              {t('label')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">
              {t('title')}
            </h2>
            <p className="text-[#333333]/60 leading-relaxed mb-8">
              {t('description')}
            </p>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <img
                src="/images/kilimanjaro.png"
                alt={t('label')}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Mountain className="w-5 h-5 text-[#B78A42]" />
                  <span className="font-bold">5,895m</span>
                  <span className="text-white/70">/ 19,341 ft</span>
                </div>
              </div>
            </div>

            <Button className="bg-[#333333] hover:bg-[#2A2A2A] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 group w-full md:w-auto">
              {t('planYourClimb')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Routes */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {routeKeys.map((route, i) => {
                const difficulty = t(`${route.nameKey}Difficulty`);
                return (
                  <motion.div
                    key={route.nameKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group p-5 rounded-xl border border-[#333333]/10 hover:border-[#B78A42]/30 bg-[#F8F4EC]/50 hover:bg-white transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#333333] group-hover:text-[#B78A42] transition-colors">
                        {t(route.nameKey)}
                      </h4>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full tracking-wider ${difficultyColors[difficulty] || ''}`}>
                        {difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-[#333333]/50 mb-3 leading-relaxed">
                      {t(`${route.nameKey}Description`)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#333333]/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {route.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {route.success} {t('success')}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
