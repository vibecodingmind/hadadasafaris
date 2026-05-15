'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Sliders, Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    titleKey: 'step1Title',
    descriptionKey: 'step1Description',
  },
  {
    icon: Sliders,
    number: '02',
    titleKey: 'step2Title',
    descriptionKey: 'step2Description',
  },
  {
    icon: Compass,
    number: '03',
    titleKey: 'step3Title',
    descriptionKey: 'step3Description',
  },
];

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[#FAFAF7] relative overflow-hidden" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B78A42]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            {t('title')}
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#B78A42]/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              className="relative text-center"
            >
              {/* Icon circle */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white border border-[#B78A42]/10 shadow-sm flex items-center justify-center group-hover:bg-[#B78A42] transition-all duration-500">
                  <step.icon className="w-8 h-8 text-[#B78A42]" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#B78A42] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#333333] mb-3">{t(step.titleKey)}</h3>
              <p className="text-sm text-[#333333]/50 leading-relaxed max-w-xs mx-auto">
                {t(step.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
