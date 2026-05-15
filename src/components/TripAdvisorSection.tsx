'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight, Award, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

const reviews = [
  {
    name: 'Sarah Mitchell',
    country: 'United Kingdom',
    title: 'Absolutely Breathtaking Safari Experience',
    text: 'From the moment we landed in Arusha to our final sunset in the Serengeti, every detail was perfect. Our guide Joseph spotted animals we would have never found on our own. The lodges were stunning and the food incredible.',
    rating: 5,
    date: 'January 2025',
    avatar: 'SM',
  },
  {
    name: 'Marco Bianchi',
    country: 'Italy',
    title: 'Sogno diventato realtà — Dream Come True',
    text: 'Hadada Safaris exceeded every expectation. Petti personally ensured our honeymoon was magical. The Ngorongoro Crater at sunrise is something that will stay with us forever. Truly a once-in-a-lifetime experience.',
    rating: 5,
    date: 'December 2024',
    avatar: 'MB',
  },
  {
    name: 'Jennifer Okafor',
    country: 'Nigeria',
    title: 'Professional, Personal, Perfect',
    text: 'As a solo female traveler, safety was my top concern. The Hadada team made me feel completely at ease from day one. My guide was not only knowledgeable but also genuinely passionate about conservation. Highly recommended!',
    rating: 5,
    date: 'November 2024',
    avatar: 'JO',
  },
  {
    name: 'Thomas Andersen',
    country: 'Denmark',
    title: 'The Best Family Vacation We\'ve Ever Had',
    text: 'Traveling with three kids under 12 seemed daunting, but Hadada crafted the perfect itinerary. The children were mesmerized by the wildlife, and the cultural visit to a Maasai village was eye-opening for all of us.',
    rating: 5,
    date: 'October 2024',
    avatar: 'TA',
  },
  {
    name: 'Priya Sharma',
    country: 'India',
    title: 'A Spiritual Connection with Nature',
    text: 'The balloon safari over the Serengeti at dawn was a spiritual experience. Watching the Great Migration from above was surreal. Hadada\'s attention to dietary needs and comfort made the luxury experience truly seamless.',
    rating: 5,
    date: 'September 2024',
    avatar: 'PS',
  },
  {
    name: 'David & Claire Thompson',
    country: 'Australia',
    title: 'Worth Every Single Penny',
    text: 'We\'ve traveled extensively but this safari topped everything. The Zanzibar extension after our Serengeti adventure was the perfect way to unwind. Petti and her team go above and beyond — you feel like family, not tourists.',
    rating: 5,
    date: 'August 2024',
    avatar: 'DT',
  },
  {
    name: 'Sophie Dubois',
    country: 'France',
    title: 'Un voyage inoubliable — An Unforgettable Journey',
    text: 'The Tarangire elephant herds were magnificent, and our guide knew exactly where to find the tree-climbing lions in Lake Manyara. Every accommodation was carefully selected. We cannot wait to return!',
    rating: 5,
    date: 'July 2024',
    avatar: 'SD',
  },
  {
    name: 'Robert & Linda Chang',
    country: 'Canada',
    title: '15th Anniversary Safari — Pure Magic',
    text: 'We chose Hadada for our milestone anniversary and they made it extraordinary. The private bush dinner under the stars, the sunrise game drives, and the personal touches throughout made it incredibly romantic and special.',
    rating: 5,
    date: 'June 2024',
    avatar: 'RC',
  },
];

const trustIndicatorKeys = [
  { icon: Star, label: '4.9/5', sublabelKey: 'tripAdvisorRating', color: 'from-[#B78A42] to-[#D5BC92]' },
  { icon: Users, label: '500+', sublabelKey: 'verifiedReviews', color: 'from-emerald-500 to-teal-600' },
  { icon: Award, label: '2024', sublabelKey: 'certificateOfExcellence', color: 'from-amber-500 to-orange-600' },
  { icon: ShieldCheck, label: '100%', sublabelKey: 'trustedOperator', color: 'from-blue-500 to-indigo-600' },
];

export default function TripAdvisorSection() {
  const t = useTranslations('tripAdvisor');
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Calculate active index based on scroll position
    const cardWidth = 340;
    const newIndex = Math.round(el.scrollLeft / (cardWidth + 20));
    setActiveIndex(Math.min(newIndex, reviews.length - 1));
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
    <section className="py-24 bg-gradient-to-b from-white to-[#FAFAF7] relative overflow-hidden" ref={ref}>
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#B78A42]/3 rounded-full blur-[150px]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#D5BC92]/5 rounded-full blur-[100px]" />

      <div className="relative z-10">
        {/* ── Trust Badges Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 md:px-6 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustIndicatorKeys.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.sublabelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 text-center hover:bg-white/80 hover:border-[#B78A42]/15 hover:shadow-xl hover:shadow-[#B78A42]/8 transition-all duration-500 overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className={`w-12 h-12 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-[#333333] mb-0.5">{badge.label}</p>
                  <p className="text-[11px] font-medium text-[#333333]/40 tracking-wide uppercase">{t(badge.sublabelKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Section Header ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Star className="w-3.5 h-3.5 fill-[#B78A42]" />
                {t('label')}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
                {t('title')}
              </h2>
              <p className="text-base text-[#333333]/50 max-w-xl leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* TripAdvisor badge */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/70 backdrop-blur-xl border border-[#B78A42]/15 rounded-2xl shadow-lg shadow-[#B78A42]/5">
                {/* TripAdvisor owl icon (simplified) */}
                <div className="w-10 h-10 bg-gradient-to-br from-[#34A853] to-[#4285F4] rounded-xl flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <circle cx="9" cy="12" r="3" />
                    <circle cx="15" cy="12" r="3" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none" />
                    <path d="M5.5 7.5L3 5M18.5 7.5L21 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-[#B78A42] text-[#B78A42]" />
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold text-[#333333]/50 tracking-wider uppercase">{t('ratedOnTripAdvisor')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {/* Progress dots (mobile) */}
              <div className="flex md:hidden items-center gap-1.5">
                {reviews.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-6 bg-[#B78A42]' : 'w-1.5 bg-[#B78A42]/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'bg-white/80 backdrop-blur-xl shadow-md hover:shadow-lg text-[#333333] hover:text-[#B78A42] border border-white/50'
                    : 'bg-white/30 text-[#333333]/20 cursor-not-allowed'
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
                    ? 'bg-white/80 backdrop-blur-xl shadow-md hover:shadow-lg text-[#333333] hover:text-[#B78A42] border border-white/50'
                    : 'bg-white/30 text-[#333333]/20 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Scrollable Review Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
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
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                className="group flex-shrink-0 w-[300px] md:w-[340px] bg-white/60 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/85 transition-all duration-500 border border-white/60 hover:border-[#B78A42]/20 shadow-sm hover:shadow-xl hover:shadow-[#B78A42]/8 relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B78A42]/0 to-[#D5BC92]/0 group-hover:from-[#B78A42]/3 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-[#B78A42]/15 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#B78A42] text-[#B78A42]" />
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-[#333333] text-sm leading-snug mb-2.5 group-hover:text-[#B78A42] transition-colors duration-300">
                    {review.title}
                  </h4>

                  {/* Review text */}
                  <p className="text-[13px] text-[#333333]/50 leading-relaxed mb-5 line-clamp-4">
                    {review.text}
                  </p>

                  {/* Reviewer info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#B78A42]/8">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B78A42] to-[#D5BC92] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#B78A42]/15">
                      <span className="text-[10px] font-bold text-white">
                        {review.avatar}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-[#333333] block">{review.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#B78A42]/70">{review.country}</span>
                        <span className="text-[11px] text-[#333333]/20">·</span>
                        <span className="text-[11px] text-[#333333]/30">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress indicator (desktop) */}
        <div className="hidden md:flex justify-center gap-1.5 mt-8">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-[#B78A42]' : 'w-2 bg-[#B78A42]/15'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-10 max-w-7xl mx-auto px-4 md:px-6"
        >
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g297913-d31720175-Reviews-Hadada_Safaris-Arusha_Arusha_Region.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/25 group shadow-lg shadow-[#B78A42]/15"
          >
            {t('seeAllReviews')}
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
