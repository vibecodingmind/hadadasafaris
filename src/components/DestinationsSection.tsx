'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const destinations = [
  {
    name: 'Serengeti National Park',
    image: '/images/serengeti-elephants.png',
    description: 'Home to the Great Migration and the Big Five, the Serengeti offers endless plains teeming with wildlife and dramatic predator-prey interactions.',
  },
  {
    name: 'Ngorongoro Crater',
    image: '/images/ngorongoro-crater.png',
    description: 'A UNESCO World Heritage Site and the world\'s largest intact volcanic caldera, home to nearly 30,000 animals including the rare black rhino.',
  },
  {
    name: 'Zanzibar Island',
    image: '/images/zanzibar-beach.png',
    description: 'Turquoise waters, pristine white sand beaches, and the historic Stone City make Zanzibar the perfect tropical retreat after your safari.',
  },
  {
    name: 'Mount Kilimanjaro',
    image: '/images/kilimanjaro.png',
    description: 'Africa\'s highest peak at 5,895m offers multiple trekking routes through diverse climatic zones from tropical rainforest to arctic summit.',
  },
  {
    name: 'Tarangire National Park',
    image: '/images/tarangire.png',
    description: 'Famous for its giant baobab trees and massive elephant herds, Tarangire offers an uncrowded safari experience with exceptional bird watching.',
  },
  {
    name: 'Cultural Experiences',
    image: '/images/cultural-experience.png',
    description: 'Immerse yourself in Maasai, Hadzabe, and Datoga cultures with authentic village visits, traditional dances, and age-old customs.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="destinations" className="py-24 bg-[#FDF6E3] relative overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C8A45C]/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#1B4332]/5 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#C8A45C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <MapPin className="w-4 h-4" />
            Destinations
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1B4332] mb-6">
            Discover Tanzania&apos;s Top Destinations
          </h2>
          <p className="text-lg text-[#588157]/80 max-w-3xl mx-auto leading-relaxed">
            Tanzania offers amazing cultural experiences, beautiful landscapes, pristine beaches,
            and wildlife encounters that are second to none. From the breathtaking wildebeest
            migration to the idyllic shores of Zanzibar, every corner tells a story.
          </p>
        </motion.div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#C8A45C]/90 text-[#1B4332] text-xs font-bold rounded-full tracking-wider">
                    <MapPin className="w-3 h-3" />
                    TANZANIA
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1B4332] mb-2 group-hover:text-[#C8A45C] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-sm text-[#588157]/70 leading-relaxed mb-4 line-clamp-3">
                  {dest.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-semibold text-[#C8A45C] hover:text-[#1B4332] transition-colors group/link"
                >
                  Explore More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
