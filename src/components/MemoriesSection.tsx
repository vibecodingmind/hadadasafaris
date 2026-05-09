'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Camera, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MemoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden bg-[#F9F7F2]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Glass card content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <Heart className="w-4 h-4" />
              Memories That Last
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
              Ready to Create Memories That Last{' '}
              <span className="text-[#B78A42]">Forever?</span>
            </h2>

            <p className="text-base text-[#333333]/60 leading-relaxed mb-8">
              At Hadada Safari, every journey is more than just a trip — it&apos;s a collection
              of moments that you&apos;ll cherish forever. From witnessing majestic wildlife up
              close to sharing laughter under the African sky, your adventure is waiting.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: Camera, label: 'Wildlife Encounters' },
                { icon: Heart, label: 'Cultural Immersion' },
                { icon: Star, label: 'Luxury in the Wild' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-[#B78A42]/15 rounded-full text-sm text-[#333333] font-medium"
                >
                  <item.icon className="w-4 h-4 text-[#B78A42]" />
                  {item.label}
                </span>
              ))}
            </div>

            <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/20 group">
              EXPLORE MORE
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Image with glass overlay card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/migration.png"
                alt="Wildebeest Migration"
                className="w-full h-[500px] object-cover"
              />
              {/* Glass overlay card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-[#B78A42] text-[#B78A42]" />
                      ))}
                    </div>
                    <span className="text-white font-bold text-sm">4.9/5 Rating</span>
                    <span className="text-white/60 text-xs ml-2">500+ Reviews</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Subtle decorative ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#B78A42]/15 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
