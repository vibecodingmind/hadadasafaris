'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is the best time to go on safari in Tanzania?',
    answer: 'The best time for a safari in Tanzania is during the dry season from June to October. This is when animals gather around water sources, making them easier to spot. The Great Migration river crossings in the Serengeti typically occur from July to September. However, the green season (November to May) offers lush landscapes, fewer crowds, and excellent birdwatching.',
  },
  {
    question: 'How far in advance should I book my safari?',
    answer: 'We recommend booking at least 3-6 months in advance, especially for peak season (June-October) and if you want specific luxury lodges. For the Great Migration season, booking 8-12 months ahead is ideal. However, we can also accommodate last-minute bookings depending on availability.',
  },
  {
    question: 'Is Tanzania safe for tourists?',
    answer: 'Yes, Tanzania is one of the safest countries in East Africa for tourists. The people are warm and welcoming, and our experienced guides ensure your safety throughout your journey. We take every precaution to make your trip secure, from airport transfers to lodge selections in safe areas.',
  },
  {
    question: 'What should I pack for a safari?',
    answer: 'Essentials include neutral-colored clothing (khaki, olive, brown), a wide-brimmed hat, sunscreen, binoculars, a camera with zoom lens, comfortable walking shoes, and layers for cool mornings and warm afternoons. We provide a detailed packing list upon booking confirmation.',
  },
  {
    question: 'Can I customize my safari itinerary?',
    answer: 'Absolutely! That is our specialty. Every safari we create is tailored to your interests, budget, group size, and travel style. Whether you want to focus on wildlife photography, cultural immersion, luxury relaxation, or adventure activities, we design the perfect itinerary just for you.',
  },
  {
    question: 'What is included in the safari price?',
    answer: 'Our safari packages typically include all accommodations, meals, park fees, ground transportation in 4x4 vehicles, professional English-speaking guides, and bottled water during game drives. International flights, visas, tips, and personal items are generally not included. We provide a clear breakdown with every quote.',
  },
];

export default function FAQSection() {
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
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            Common <span className="text-[#B78A42]">Questions</span>
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            Everything you need to know before your Tanzanian adventure
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
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
                  {faq.question}
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
                    {faq.answer}
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
