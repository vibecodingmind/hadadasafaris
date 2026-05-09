'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';

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

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
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

        {/* Reviews carousel/grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-[#F8F4EC] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#B78A42]/20"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#B78A42]/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#B78A42] text-[#B78A42]" />
                ))}
              </div>

              {/* Title */}
              <h4 className="font-bold text-[#333333] mb-2 group-hover:text-[#B78A42] transition-colors">
                {review.title}
              </h4>

              {/* Review text */}
              <p className="text-sm text-[#333333]/60 leading-relaxed mb-4">
                {review.text}
              </p>

              {/* Reviewer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#333333]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B78A42]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#B78A42]">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#333333]">{review.name}</span>
                    <span className="text-xs text-[#333333]/40 ml-2">{review.date}</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#333333]/30 tracking-wider uppercase">TripAdvisor</span>
              </div>
            </motion.div>
          ))}
        </div>

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
