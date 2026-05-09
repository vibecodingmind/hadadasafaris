'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ArrowRight, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const itineraries = [
  {
    title: 'Amazing Departure in 2024/27',
    image: '/images/hero-safari.png',
    duration: '7 Days',
    groupSize: '2-6 People',
    tag: 'Popular',
  },
  {
    title: 'Migration Safari Program',
    image: '/images/migration.png',
    duration: '10 Days',
    groupSize: '2-8 People',
    tag: 'Signature',
  },
  {
    title: 'Luxury Honeymoon Package',
    image: '/images/luxury-camp.png',
    duration: '8 Days',
    groupSize: '2 People',
    tag: 'Romance',
  },
  {
    title: 'Luxury Summer Zanzibar',
    image: '/images/zanzibar-beach.png',
    duration: '6 Days',
    groupSize: '2-4 People',
    tag: 'Beach',
  },
];

export default function ItinerariesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="itineraries" className="py-24 bg-[#333333] relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B78A42]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B78A42]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Calendar className="w-4 h-4" />
            Itineraries
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Curated Safari <span className="text-[#B78A42]">Experiences</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Choose from our handpicked itineraries or let us customize one just for you
          </p>
        </motion.div>

        {/* Itinerary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itineraries.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B78A42]/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#333333]/20 md:bg-gradient-to-r md:from-transparent md:to-[#333333]/40" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#B78A42] text-white text-xs font-bold rounded-full tracking-wider">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#B78A42] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-white/50 text-sm">
                      <Clock className="w-4 h-4 text-[#B78A42]" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/50 text-sm">
                      <Users className="w-4 h-4 text-[#B78A42]" />
                      {item.groupSize}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-semibold text-[#B78A42] hover:text-white transition-colors group/link"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/20 group">
            VIEW ALL ITINERARIES
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
