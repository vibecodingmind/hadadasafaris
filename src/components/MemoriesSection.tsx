'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Camera, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MemoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden" ref={ref}>
      {/* Top transition from cream destinations */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F8F4EC] to-transparent z-10" />
      {/* Full-width cinematic image */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img
          src="/images/migration.png"
          alt="Wildebeest Migration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#333333]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#333333]/80 via-[#333333]/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              >
                <Heart className="w-4 h-4" />
                Memories That Last
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Ready to Create Memories That Last{' '}
                <span className="text-[#B78A42]">Forever?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-white/75 leading-relaxed mb-10"
              >
                At Hadada Safari, every journey is more than just a trip — it&apos;s a collection
                of moments that you&apos;ll cherish forever. From witnessing majestic wildlife up
                close to sharing laughter under the African sky, your adventure is waiting.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                  EXPLORE MORE
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights bar below the image */}
      <div className="bg-[#333333]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              {
                icon: Camera,
                title: 'Unforgettable Wildlife Encounters',
                desc: 'Witness the Big Five and the Great Migration in their natural habitat.',
              },
              {
                icon: Heart,
                title: 'Cultural Immersion',
                desc: 'Connect with local communities and experience authentic Tanzanian traditions.',
              },
              {
                icon: Star,
                title: 'Luxury in the Wild',
                desc: 'Stay in hand-picked luxury lodges and tented camps amid breathtaking scenery.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 py-8 md:py-10 md:px-8 first:pl-0 last:pr-0"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#B78A42]/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#B78A42]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
