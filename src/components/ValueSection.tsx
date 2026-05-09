'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BadgeDollarSign, Settings, Headphones } from 'lucide-react';

const values = [
  {
    icon: BadgeDollarSign,
    title: 'Great Value Deals',
    description:
      'We put in extra work to ensure our clients get full value of the price paid & the best deals through their stay. Remember price is what you pay, value is what you get. Our team negotiates exclusive rates with premium lodges and camps, passing those savings directly to you without compromising on quality or experience.',
    highlight: 'Best Price Guarantee',
  },
  {
    icon: Settings,
    title: '100% Safari Customization',
    description:
      'Tell us about your trip requirement & we\'ll work together to tailor your trip to meet your exact requirement so you have a trip of your dreams. Whether you want to focus on photography, family-friendly activities, or exclusive luxury experiences, we design every detail around your preferences and budget.',
    highlight: 'Tailored For You',
  },
  {
    icon: Headphones,
    title: 'Constant Support',
    description:
      'We provide assistance in information & insights from the planning phase of your tour and overall through your stay in the country. Our dedicated support team is available 24/7 to ensure your journey is seamless, safe, and stress-free from the moment you land until your departure.',
    highlight: '24/7 Assistance',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function ValueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[#F8F4EC] relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#333333]/3 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-6">
            The Hadada <span className="text-[#B78A42]">Difference</span>
          </h2>
          <p className="text-lg text-[#333333]/50 max-w-2xl mx-auto">
            We go above and beyond to make your Tanzanian safari an experience of a lifetime
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B78A42] to-[#333333] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#333333] flex items-center justify-center mb-6 group-hover:bg-[#B78A42] transition-colors duration-300">
                <item.icon className="w-8 h-8 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Highlight badge */}
              <span className="inline-block px-3 py-1 bg-[#B78A42]/10 text-[#B78A42] text-xs font-bold rounded-full tracking-wider mb-4">
                {item.highlight}
              </span>

              <h3 className="text-xl font-bold text-[#333333] mb-4 group-hover:text-[#B78A42] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-[#333333]/50 leading-relaxed">
                {item.description}
              </p>

              {/* Background decorative */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#333333]/5 group-hover:bg-[#B78A42]/5 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
