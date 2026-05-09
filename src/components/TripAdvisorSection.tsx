'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Traveler',
    title: 'Hadada Safaris Exceeds Expectations',
    text: 'The Hadada team looked after us from the moment we set foot on Tanzania soil to the day of departure. Every detail was perfectly organized and the guides were incredibly knowledgeable.',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Happy Traveler',
    title: 'Highly Recommended Safari Experience',
    text: 'I would highly recommend Hadada Safaris to anyone wishing to travel around Arusha. Petti, the owner, met with us in several locations, ensuring a hands-on approach sharing her beautiful country.',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Safari Enthusiast',
    title: 'Fantastic Trip!',
    text: 'A truly fantastic trip from start to finish! The itinerary was perfectly balanced between wildlife viewing and cultural experiences. Our guide was exceptional — spotting animals we would have never found.',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Adventure Seeker',
    title: 'Unforgettable Tanzanian Adventure',
    text: 'From the Serengeti to Zanzibar, every moment was carefully curated. The accommodations were superb, the game drives thrilling, and the balloon safari was the highlight of our lives.',
    rating: 5,
    date: '2025',
  },
  {
    name: 'Nature Lover',
    title: 'A Perfect Family Safari',
    text: 'We traveled with our children and Hadada Safaris made sure every aspect was family-friendly. The guides were patient and engaging with the kids, and we felt completely safe throughout.',
    rating: 5,
    date: '2025',
  },
  {
    name: 'World Explorer',
    title: 'Dream Safari Come True',
    text: 'Hadada Safaris turned our dream into reality. From the Great Migration in Serengeti to the pristine beaches of Zanzibar, every detail was thoughtfully planned and flawlessly executed.',
    rating: 5,
    date: '2025',
  },
];

export default function TripAdvisorSection() {
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
    const cardWidth = 320;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  return (
    <section className="py-24 bg-[#FAFAF7] relative overflow-hidden" ref={ref}>
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B78A42]/30 to-transparent" />

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
                <Star className="w-4 h-4 fill-[#B78A42]" />
                Testimonials
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
                What Our <span className="text-[#B78A42]">Travelers</span> Say
              </h2>
              <p className="text-base text-[#333333]/50 max-w-xl leading-relaxed">
                Real experiences from travelers who discovered the magic of Tanzania with us
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3 flex-shrink-0">
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

        {/* Scrollable reviews - single row */}
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
            {reviews.map((review, i) => (
              <motion.div
                key={review.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                className="group flex-shrink-0 w-[300px] md:w-[320px] bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-[#B78A42]/10 hover:border-[#B78A42]/25 relative"
              >
                {/* Quote icon */}
                <Quote className="w-7 h-7 text-[#B78A42]/15 mb-3" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#B78A42] text-[#B78A42]" />
                  ))}
                </div>

                {/* Title */}
                <h4 className="font-bold text-[#333333] text-sm leading-snug mb-2 group-hover:text-[#B78A42] transition-colors">
                  {review.title}
                </h4>

                {/* Review text */}
                <p className="text-[13px] text-[#333333]/55 leading-relaxed mb-4 line-clamp-4">
                  {review.text}
                </p>

                {/* Reviewer info */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-[#333333]/8">
                  <div className="w-8 h-8 rounded-full bg-[#B78A42]/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#B78A42]">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-[#333333] block">{review.name}</span>
                    <span className="text-[11px] text-[#333333]/35">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-10 max-w-7xl mx-auto px-4 md:px-6"
        >
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g297913-d31720175-Reviews-Hadada_Safaris-Arusha_Arusha_Region.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#333333] hover:bg-[#2A2A2A] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-lg group"
          >
            See All Reviews
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
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
