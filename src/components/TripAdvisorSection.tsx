'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Traveler',
    title: 'Hadada Safaris Exceeds Expectations',
    text: 'The Hadada team looked after us from the moment we set foot on Tanzania soil to the day of departure from Dar El Salam. We arranged for private transport for our family trip which started in Kilimanjaro and ended at Mafia Island. Every detail was perfectly organized and the guides were incredibly knowledgeable.',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Happy Traveler',
    title: 'Highly Recommended Safari Experience',
    text: 'I would highly recommend Hadada Safaris to anyone wishing to travel in this area around Arusha. Petti, the owner, met with us in several locations, ensuring a hands on approach, sharing with us her beautiful country. The personal touch made all the difference in our safari experience.',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Safari Enthusiast',
    title: 'Fantastic Trip!',
    text: 'A truly fantastic trip from start to finish! The itinerary was perfectly balanced between wildlife viewing and cultural experiences. Our guide was exceptional — spotting animals we would have never found on our own and sharing fascinating stories about Tanzania\'s wildlife and people.',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Adventure Seeker',
    title: 'Unforgettable Tanzanian Adventure',
    text: 'From the Serengeti to Zanzibar, every moment was carefully curated. The accommodations were superb, the game drives thrilling, and the balloon safari over the Serengeti was the highlight of our lives. Hadada Safaris made our dream trip a reality.',
    rating: 5,
    date: '2025',
  },
  {
    name: 'Nature Lover',
    title: 'A Perfect Family Safari',
    text: 'We traveled with our children and Hadada Safaris made sure every aspect was family-friendly. The guides were patient and engaging with the kids, and we felt completely safe throughout. Seeing the Big Five up close was a life-changing experience for the whole family.',
    rating: 5,
    date: '2025',
  },
];

export default function TripAdvisorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = reviews.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      ref={ref}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B78A42]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Star className="w-4 h-4 fill-[#B78A42]" />
            TripAdvisor Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-6">
            What Our <span className="text-[#B78A42]">Travelers</span> Say
          </h2>
          <p className="text-lg text-[#333333]/50 max-w-2xl mx-auto">
            Real reviews from real travelers who experienced the magic of Tanzania with Hadada Safaris
          </p>

          {/* TripAdvisor badge */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 fill-[#B78A42] text-[#B78A42]" />
              ))}
            </div>
            <span className="text-[#333333] font-bold text-lg">5.0</span>
            <span className="text-[#333333]/40 text-sm">on TripAdvisor</span>
          </div>
        </motion.div>

        {/* Reviews Slider - Single Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-11 h-11 rounded-full bg-[#333333] hover:bg-[#B78A42] text-white flex items-center justify-center shadow-lg transition-all duration-300 group"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-11 h-11 rounded-full bg-[#333333] hover:bg-[#B78A42] text-white flex items-center justify-center shadow-lg transition-all duration-300 group"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden mx-8 md:mx-14">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.title} className="w-full flex-shrink-0 px-3">
                  <div className="group relative bg-[#F8F4EC] rounded-2xl p-8 md:p-10 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#B78A42]/20 max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Left: Quote & Stars */}
                      <div className="flex flex-col items-center md:items-start gap-3 md:min-w-[140px]">
                        <Quote className="w-10 h-10 text-[#B78A42]/30" />
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-[#B78A42] text-[#B78A42]" />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-9 h-9 rounded-full bg-[#B78A42]/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#B78A42]">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-[#333333]">{review.name}</span>
                            <span className="text-xs text-[#333333]/40 ml-1.5">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Review content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-[#333333] mb-3 group-hover:text-[#B78A42] transition-colors">
                          {review.title}
                        </h4>
                        <p className="text-[#333333]/60 leading-relaxed text-[15px]">
                          {review.text}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <span className="text-[10px] text-[#333333]/30 tracking-wider uppercase">Reviewed on TripAdvisor</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? 'w-8 h-2.5 bg-[#B78A42]'
                    : 'w-2.5 h-2.5 bg-[#333333]/20 hover:bg-[#333333]/40'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA to TripAdvisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g297913-d31720175-Reviews-Hadada_Safaris-Arusha_Arusha_Region.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#333333] hover:bg-[#2A2A2A] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-lg group"
          >
            See All Reviews on TripAdvisor
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
