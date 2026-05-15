'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

export default function FAQSection() {
  const t = useTranslations('faq');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-[#B78A42]/2 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            {t('title')}
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className="font-semibold text-[#333333] text-sm md:text-base pr-4 group-hover:text-[#B78A42] transition-colors">
                  {t(key)}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#B78A42] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="w-12 h-px bg-[#B78A42]/20 mb-4" />
                  <p className="text-sm text-[#333333]/50 leading-relaxed">
                    {t(`a${i + 1}`)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
