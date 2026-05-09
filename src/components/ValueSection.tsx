'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BadgeDollarSign, Settings, Headphones, ArrowRight } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left column - Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
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
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B78A42] hover:text-[#333333] transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Stats accent */}
            <div className="mt-10 hidden lg:block">
              <div className="w-16 h-1 bg-[#B78A42]/30 rounded-full mb-5" />
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#333333]">15+</div>
                  <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#333333]">5K+</div>
                  <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Travelers</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Glass value cards */}
          <div className="lg:col-span-3 space-y-4">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="group relative bg-[#F9F7F2] rounded-2xl p-7 hover:bg-[#333333] transition-all duration-500 overflow-hidden cursor-default"
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white shadow-sm group-hover:bg-[#B78A42] group-hover:shadow-lg flex items-center justify-center transition-all duration-500">
                    <item.icon className="w-7 h-7 text-[#B78A42] group-hover:text-white transition-colors duration-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-3 py-0.5 bg-[#B78A42]/8 group-hover:bg-[#B78A42]/15 text-[#B78A42] text-[10px] font-bold rounded-full tracking-wider mb-2 transition-colors duration-500">
                      {item.highlight}
                    </span>

                    <h3 className="text-lg font-bold text-[#333333] group-hover:text-white mb-2 transition-colors duration-500">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#333333]/55 group-hover:text-white/60 leading-relaxed transition-colors duration-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#B78A42] to-[#D5BC92] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
