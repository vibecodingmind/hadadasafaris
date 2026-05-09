'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Camera, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MemoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-[#333333] relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[#B78A42]/5 blur-3xl" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(183,138,66,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/migration.png"
                alt="Wildebeest Migration"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/40 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 md:right-6 bg-white rounded-xl shadow-xl p-5 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#B78A42]/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#B78A42]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#333333]">4.9/5 Rating</div>
                  <div className="text-xs text-[#B78A42]">500+ Reviews</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#B78A42] text-[#B78A42]" />
                ))}
              </div>
            </motion.div>

            {/* Floating accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#B78A42]/30 rounded-2xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Heart className="w-4 h-4" />
              Memories That Last
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Create Memories That Last{' '}
              <span className="text-[#B78A42]">Forever?</span>
            </h2>

            <p className="text-lg text-white/70 leading-relaxed mb-8">
              At Hadada Safari, every journey is more than just a trip — it&apos;s a collection
              of moments that you&apos;ll cherish forever. From witnessing majestic wildlife up
              close to sharing laughter with friends under the African sky, your adventure
              is waiting to be written.
            </p>

            <div className="space-y-4 mb-10">
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
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#B78A42]/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#B78A42]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/20 group">
              EXPLORE MORE
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
