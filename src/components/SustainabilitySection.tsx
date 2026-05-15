'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Heart, Users, TreePine } from 'lucide-react';
import { useTranslations } from 'next-intl';

const pillarKeys = [
  { icon: TreePine, titleKey: 'conservationTitle', descriptionKey: 'conservationDescription' },
  { icon: Users, titleKey: 'communityTitle', descriptionKey: 'communityDescription' },
  { icon: Leaf, titleKey: 'ecoTitle', descriptionKey: 'ecoDescription' },
  { icon: Heart, titleKey: 'responsibleTitle', descriptionKey: 'responsibleDescription' },
];

export default function SustainabilitySection() {
  const t = useTranslations('sustainability');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[#FAFAF7] relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#6B9E78]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6B9E78]/10 rounded-full text-[#6B9E78] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <Leaf className="w-3.5 h-3.5" />
              {t('label')}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              {t('title')}
            </h2>

            <p className="text-base text-[#333333]/55 leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="flex gap-6">
              <div>
                <div className="text-3xl font-bold text-[#6B9E78]">5%</div>
                <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">{t('revenueToConservation')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6B9E78]">100%</div>
                <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">{t('localGuides')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6B9E78]">0</div>
                <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">{t('singleUsePlastics')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillarKeys.map((pillar, i) => (
              <motion.div
                key={pillar.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="bg-white/70 backdrop-blur-sm border border-[#6B9E78]/8 rounded-2xl p-5 hover:bg-white hover:border-[#6B9E78]/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#6B9E78]/8 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#6B9E78]/15 transition-colors">
                  <pillar.icon className="w-5 h-5 text-[#6B9E78]" />
                </div>
                <h3 className="font-bold text-[#333333] text-sm mb-2">{t(pillar.titleKey)}</h3>
                <p className="text-xs text-[#333333]/45 leading-relaxed">{t(pillar.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
