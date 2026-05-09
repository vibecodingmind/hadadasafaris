'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Calendar, ArrowRight, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';

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
  {
    title: 'Dry Season Private Safari',
    image: '/images/serengeti-elephants.png',
    duration: '9 Days',
    groupSize: '2-6 People',
    tag: 'Exclusive',
  },
  {
    title: 'Immersive Culture Trips',
    image: '/images/cultural-experience.png',
    duration: '5 Days',
    groupSize: '4-10 People',
    tag: 'Culture',
  },
];

export default function ItinerariesSection() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  return (
    <section id="itineraries" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#B78A42]/2 rounded-full blur-[150px]" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Calendar className="w-3.5 h-3.5" />
                Itineraries
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
                Curated Safari <span className="text-[#B78A42]">Experiences</span>
              </h2>
              <p className="text-base text-[#333333]/50 max-w-xl leading-relaxed">
                Choose from our handpicked itineraries or let us customize one just for you
              </p>
            </div>

            {/* Navigation arrows + View All */}
            <div className="flex items-center gap-3 flex-shrink-0">

              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-[#FAFAF7] shadow-md hover:shadow-lg text-[#333333] hover:text-[#B78A42]'
                    : 'bg-[#FAFAF7]/50 text-[#333333]/20 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'bg-[#FAFAF7] shadow-md hover:shadow-lg text-[#333333] hover:text-[#B78A42]'
                    : 'bg-[#FAFAF7]/50 text-[#333333]/20 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scrollable itinerary cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] pr-4 md:pr-8 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {itineraries.map((item, i) => (
              <motion.a
                key={item.title}
                href="/itineraries"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                className="group flex-shrink-0 w-[300px] md:w-[330px] relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-[#B78A42]/8 hover:border-[#B78A42]/20 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/40 via-transparent to-transparent" />

                  {/* Tag - glass pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/25 backdrop-blur-xl border border-white/25 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                    {item.tag}
                  </span>

                  {/* Duration & group size - glass pills */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-white/90 text-xs bg-white/15 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3 text-[#D5BC92]" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1 text-white/90 text-xs bg-white/15 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded-full">
                      <Users className="w-3 h-3 text-[#D5BC92]" />
                      {item.groupSize}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#333333] leading-snug truncate group-hover:text-[#B78A42] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </motion.a>
            ))}

            {/* View All card - glassy */}
            <a
              href="/itineraries"
              className="group flex-shrink-0 w-[200px] md:w-[220px] rounded-2xl bg-white/60 backdrop-blur-sm border border-[#B78A42]/15 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:bg-white/80 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full border-2 border-[#B78A42]/30 flex items-center justify-center group-hover:border-[#B78A42] group-hover:bg-[#B78A42]/5 transition-all">
                <ArrowRight className="w-6 h-6 text-[#B78A42]" />
              </div>
              <div className="text-center px-4">
                <span className="text-[#333333] font-bold text-sm block">View All</span>
                <span className="text-[#333333]/40 text-xs">Itineraries</span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
