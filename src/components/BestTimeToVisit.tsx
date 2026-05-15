'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sun, CloudRain, Cloud, Thermometer } from 'lucide-react';
import { useTranslations } from 'next-intl';

const seasons = [
  {
    nameKey: 'drySeason',
    periodKey: 'drySeasonPeriod',
    descriptionKey: 'drySeasonDescription',
    ratingKey: 'drySeasonRating',
    icon: Sun,
    color: '#B78A42',
  },
  {
    nameKey: 'greenSeason',
    periodKey: 'greenSeasonPeriod',
    descriptionKey: 'greenSeasonDescription',
    ratingKey: 'greenSeasonRating',
    icon: CloudRain,
    color: '#6B9E78',
  },
  {
    nameKey: 'shoulderSeason',
    periodKey: 'shoulderSeasonPeriod',
    descriptionKey: 'shoulderSeasonDescription',
    ratingKey: 'shoulderSeasonRating',
    icon: Cloud,
    color: '#7BA7C9',
  },
];

export default function BestTimeToVisit() {
  const t = useTranslations('bestTime');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B78A42]/2 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Thermometer className="w-3.5 h-3.5" />
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            {t('title')}
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasons.map((season, i) => (
            <motion.div
              key={season.nameKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl p-7 hover:border-[#B78A42]/20 hover:shadow-lg transition-all duration-500 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${season.color}12` }}>
                  <season.icon className="w-6 h-6" style={{ color: season.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-[#333333]">{t(season.nameKey)}</h3>
                  <span className="text-xs text-[#333333]/40 tracking-wider">{t(season.periodKey)}</span>
                </div>
              </div>

              <p className="text-sm text-[#333333]/50 leading-relaxed mb-4">
                {t(season.descriptionKey)}
              </p>

              <span
                className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full"
                style={{ backgroundColor: `${season.color}12`, color: season.color }}
              >
                {t(season.ratingKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
