'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BadgeDollarSign, Settings, Headphones, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const values = [
  {
    icon: BadgeDollarSign,
    title: 'Great Value Deals',
    description:
      'We put in extra effort to ensure you get full value and the best deals through your stay. Our team negotiates exclusive rates with premium lodges and camps, passing savings directly to you without compromising on quality.',
    highlight: 'Best Price Guarantee',
  },
  {
    icon: Settings,
    title: '100% Safari Customization',
    description:
      'Tell us about your dream trip and we\'ll tailor every detail to meet your exact requirements. Whether you want photography-focused, family-friendly, or exclusive luxury experiences, we design it around you.',
    highlight: 'Tailored For You',
  },
  {
    icon: Headphones,
    title: 'Constant Support',
    description:
      'We provide assistance from the planning phase through your entire stay. Our dedicated team is available 24/7 to ensure your journey is seamless, safe, and stress-free from landing to departure.',
    highlight: '24/7 Assistance',
  },
];

export default function ValueSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-[#FAFAF7]" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#B78A42]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left column - Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              The Hadada{' '}
              <span className="text-[#B78A42]">Difference</span>
            </h2>
            <p className="text-base text-[#333333]/55 leading-relaxed mb-8">
              We go above and beyond to make your Tanzanian safari an experience of a lifetime.
              Every journey is backed by our promise of value, customization, and unwavering support.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B78A42] hover:text-[#333333] transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>


          </motion.div>

          {/* Right column - Glass value cards */}
          <div className="lg:col-span-3 space-y-4">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="group relative bg-white/70 backdrop-blur-sm border border-[#B78A42]/8 rounded-2xl p-7 hover:bg-white hover:border-[#B78A42]/20 hover:shadow-lg transition-all duration-500 overflow-hidden cursor-default"
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#B78A42]/8 group-hover:bg-[#B78A42] flex items-center justify-center transition-all duration-500">
                    <item.icon className="w-7 h-7 text-[#B78A42] group-hover:text-white transition-colors duration-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-3 py-0.5 bg-[#B78A42]/8 text-[#B78A42] text-[10px] font-bold rounded-full tracking-wider mb-2">
                      {item.highlight}
                    </span>

                    <h3 className="text-lg font-bold text-[#333333] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#333333]/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#B78A42] to-[#D5BC92] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
