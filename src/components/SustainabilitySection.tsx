'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Heart, Users, TreePine } from 'lucide-react';

const pillars = [
  {
    icon: TreePine,
    title: 'Conservation First',
    description: 'We partner with parks and reserves that prioritize wildlife conservation. A portion of every safari goes directly to protecting Tanzania\'s endangered species and their habitats.',
  },
  {
    icon: Users,
    title: 'Community Empowerment',
    description: 'We employ local guides, support Maasai women\'s cooperatives, and invest in village education programs. Your safari directly benefits the communities you visit.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Practices',
    description: 'From carbon-offset transportation to plastic-free camps, we minimize our environmental footprint. Our partner lodges use solar power and sustainable water management.',
  },
  {
    icon: Heart,
    title: 'Responsible Tourism',
    description: 'We enforce strict wildlife viewing guidelines to ensure animals are never disturbed. Our safaris promote observation, not interference, preserving the natural balance.',
  },
];

export default function SustainabilitySection() {
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
              Sustainability
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              Travel With{' '}
              <span className="text-[#6B9E78]">Purpose</span>
            </h2>

            <p className="text-base text-[#333333]/55 leading-relaxed mb-8">
              At Hadada Safaris, we believe that extraordinary travel and environmental
              responsibility go hand in hand. Every safari we craft not only creates memories
              for you — it contributes to preserving Tanzania&apos;s wild heritage for generations to come.
            </p>

            <div className="flex gap-6">
              <div>
                <div className="text-3xl font-bold text-[#6B9E78]">5%</div>
                <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Revenue to Conservation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6B9E78]">100%</div>
                <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Local Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6B9E78]">0</div>
                <div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Single-Use Plastics</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="bg-white/70 backdrop-blur-sm border border-[#6B9E78]/8 rounded-2xl p-5 hover:bg-white hover:border-[#6B9E78]/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#6B9E78]/8 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#6B9E78]/15 transition-colors">
                  <pillar.icon className="w-5 h-5 text-[#6B9E78]" />
                </div>
                <h3 className="font-bold text-[#333333] text-sm mb-2">{pillar.title}</h3>
                <p className="text-xs text-[#333333]/45 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
