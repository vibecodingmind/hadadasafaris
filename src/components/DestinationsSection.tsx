'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    name: 'Mount Kilimanjaro',
    slug: 'kilimanjaro',
    image: '/images/kilimanjaro.png',
    tagline: "Africa's Highest Peak",
  },
  {
    name: 'Serengeti National Park',
    slug: 'serengeti',
    image: '/images/serengeti-elephants.png',
    tagline: 'The Great Migration',
  },
  {
    name: 'Ngorongoro Conservation Area',
    slug: 'ngorongoro',
    image: '/images/ngorongoro-crater.png',
    tagline: 'The World\'s Largest Caldera',
  },
  {
    name: 'Olduvai Gorge',
    slug: 'olduvai',
    image: '/images/olduvai-gorge.png',
    tagline: 'Cradle of Mankind',
  },
  {
    name: 'Lake Manyara National Park',
    slug: 'lake-manyara',
    image: '/images/lake-manyara.png',
    tagline: 'Tree-Climbing Lions',
  },
  {
    name: 'Gombe Stream National Park',
    slug: 'gombe',
    image: '/images/gombe-stream.png',
    tagline: 'Chimpanzee Sanctuary',
  },
  {
    name: 'Selous National Park',
    slug: 'selous',
    image: '/images/selous.png',
    tagline: "Africa's Largest Reserve",
  },
  {
    name: 'Ruaha National Park',
    slug: 'ruaha',
    image: '/images/ruaha.png',
    tagline: 'Untamed Wilderness',
  },
  {
    name: 'Katavi National Park',
    slug: 'katavi',
    image: '/images/katavi.png',
    tagline: 'Remote & Unspoiled',
  },
  {
    name: 'Zanzibar Beaches',
    slug: 'zanzibar',
    image: '/images/zanzibar-beach.png',
    tagline: 'Paradise Island',
  },
  {
    name: 'Stone Town',
    slug: 'stone-town',
    image: '/images/stone-town.png',
    tagline: 'Historic Swahili City',
  },
  {
    name: 'Mafia Island',
    slug: 'mafia',
    image: '/images/mafia-island.png',
    tagline: 'Marine Paradise',
  },
  {
    name: 'Pemba Island',
    slug: 'pemba',
    image: '/images/pemba-island.png',
    tagline: 'The Green Island',
  },
  {
    name: 'Lake Victoria',
    slug: 'lake-victoria',
    image: '/images/lake-victoria.png',
    tagline: "Africa's Largest Lake",
  },
];

export default function DestinationsSection() {
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
    const cardWidth = 300;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  return (
    <section id="destinations" className="py-24 bg-[#F8F4EC] relative overflow-hidden" ref={ref}>
      {/* Top transition from dark hero */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#333333]/8 to-transparent" />
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#B78A42]/5 -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                <MapPin className="w-4 h-4" />
                Destinations
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
                Discover Tanzania&apos;s Top Destinations
              </h2>
              <p className="text-base text-[#333333]/55 max-w-xl leading-relaxed">
                From the breathtaking peak of Kilimanjaro to the idyllic shores of Zanzibar, every corner tells a story.
              </p>
            </div>

            {/* Navigation arrows + View All */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="/destinations"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B78A42] hover:text-[#333333] transition-colors mr-2"
              >
                View All Destinations
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-[#333333] hover:bg-[#B78A42] text-white'
                    : 'bg-[#333333]/10 text-[#333333]/30 cursor-not-allowed'
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
                    ? 'bg-[#333333] hover:bg-[#B78A42] text-white'
                    : 'bg-[#333333]/10 text-[#333333]/30 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scrollable destination cards - single row */}
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
            {destinations.map((dest, i) => (
              <motion.a
                key={dest.name}
                href={`/destinations#${dest.slug}`}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                className="group flex-shrink-0 w-[260px] md:w-[280px] relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-[#000000]/45" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[#B78A42] text-[11px] font-semibold tracking-wider uppercase block mb-1.5">
                      {dest.tagline}
                    </span>
                    <h3 className="text-white font-bold text-base leading-tight truncate">
                      {dest.name}
                    </h3>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* View All card at end */}
            <a
              href="/destinations"
              className="group flex-shrink-0 w-[200px] md:w-[220px] rounded-2xl bg-[#333333] flex flex-col items-center justify-center gap-4 hover:bg-[#B78A42] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <div className="text-center px-4">
                <span className="text-white font-bold text-sm block">View All</span>
                <span className="text-white/50 text-xs">Destinations</span>
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
