'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { ChevronLeft, ChevronRight, MapPin, Plane, Clock } from 'lucide-react';

/* ─── Airline Data ─── */
interface AirlineSlide {
  src: string;
  alt: string;
}

interface Airline {
  name: string;
  subtitle: string;
  location: string;
  description: string;
  slides: AirlineSlide[];
}

const airlines: Airline[] = [
  {
    name: 'Flightlink Tanzania',
    subtitle: 'Reliable. Safe. Convenient.',
    location: 'Zanzibar, Serengeti, Arusha, Dar es Salaam, Mombasa',
    description:
      'Flightlink Tanzania is a premier airline offering reliable, safe, and convenient travel across Tanzania and East Africa. With a strong reputation for exceptional service and punctuality, Flightlink connects travelers to key destinations, including major cities and iconic safari locations. Whether you\'re heading to Zanzibar, Serengeti, or beyond, Flightlink ensures a seamless journey with modern aircraft and professional staff. Their commitment to on-time performance and passenger comfort makes them the preferred choice for safari travelers who value reliability and convenience.',
    slides: [
      { src: '/images/flightlink.png', alt: 'Flightlink Tanzania aircraft' },
      { src: '/images/domestic-flight-hero.png', alt: 'Domestic flight over Tanzania' },
      { src: '/images/bush-airstrip.png', alt: 'Bush airstrip in Tanzania' },
    ],
  },
  {
    name: 'Auric Air',
    subtitle: 'Safety, Reliability & Adventure',
    location: 'Selous, Ruaha, Serengeti, Katavi, Mahale, Kigoma',
    description:
      'Auric Air is a trusted aviation services provider and a valued supplier for Hadada Safaris. They offer a range of air travel solutions tailored to meet the needs of safari operators and travelers exploring Tanzania and East Africa. With a strong commitment to safety, reliability, and customer satisfaction, Auric Air provides charter flights, scheduled services, and customized itineraries that enhance the safari experience. Their fleet of well-maintained aircraft ensures smooth and efficient travel, allowing guests to reach remote and spectacular safari destinations with ease. Whether you need a scheduled flight to a major airstrip or a bespoke charter to a remote bush camp, Auric Air delivers with professionalism and care.',
    slides: [
      { src: '/images/auric-air.png', alt: 'Auric Air aircraft' },
      { src: '/images/domestic-flight-hero.png', alt: 'Domestic flight over Tanzania' },
      { src: '/images/bush-airstrip.png', alt: 'Bush airstrip in Tanzania' },
    ],
  },
];

const flightRoutes = [
  { from: 'Arusha', to: 'Serengeti', time: '1h 15min', type: 'Scheduled' },
  { from: 'Arusha', to: 'Zanzibar', time: '1h 30min', type: 'Scheduled' },
  { from: 'Dar es Salaam', to: 'Serengeti', time: '2h 00min', type: 'Scheduled' },
  { from: 'Zanzibar', to: 'Selous', time: '1h 15min', type: 'Charter' },
  { from: 'Arusha', to: 'Ruaha', time: '2h 30min', type: 'Charter' },
  { from: 'Arusha', to: 'Katavi', time: '3h 00min', type: 'Charter' },
];

/* ─── Slideshow Component ─── */
function Slideshow({ slides, index }: { slides: AirlineSlide[]; index: number }) {
  const [current, setCurrent] = useState(0);
  const isTransitioningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (dir: 'next' | 'prev') => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setCurrent((prev) => (dir === 'next' ? (prev + 1) % slides.length : prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => { isTransitioningRef.current = false; }, 600);
    },
    [slides.length]
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => goTo('next'), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goTo]);

  const pauseAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const resumeAuto = () => {
    intervalRef.current = setInterval(() => goTo('next'), 5000);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
    >
      <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${index}-${current}`}
            src={slides[current].src}
            alt={slides[current].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo('prev')}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo('next')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isTransitioningRef.current) {
                  isTransitioningRef.current = true;
                  setCurrent(i);
                  setTimeout(() => { isTransitioningRef.current = false; }, 600);
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Airline Section Component ─── */
function AirlineSection({ airline, index }: { airline: Airline; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className={`py-20 lg:py-28 ${isEven ? 'bg-white' : 'bg-[#FAFAF7]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={!isEven ? 'lg:order-2' : ''}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              <MapPin className="w-3 h-3" /> {airline.location}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-2 leading-tight">
              {airline.name}
            </h2>
            <p className="text-sm text-[#B78A42] font-semibold tracking-wider uppercase mb-5">
              {airline.subtitle}
            </p>
            <p className="text-[#333333]/60 leading-[1.85] text-[15px]">
              {airline.description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={!isEven ? 'lg:order-1' : ''}
          >
            <Slideshow slides={airline.slides} index={index} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function DomesticFlightsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const routesRef = useRef(null);
  const routesInView = useInView(routesRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1">
        {/* Top spacer for fixed header */}
        <div className="pt-32 lg:pt-36 bg-white" />

        {/* ═══ HERO SECTION ═══ */}
        <section ref={heroRef} className="pb-20 lg:pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-5">
                  <Plane className="w-3.5 h-3.5" /> Domestic Flights
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Fly to the <span className="text-[#B78A42]">Wild</span>
                </h1>
                <p className="text-base text-[#333333]/55 leading-[1.85]">
                  Tanzania is vast — and the best way to reach its most spectacular corners is by air.
                  We partner with Tanzania&apos;s most trusted domestic airlines to ensure your journey
                  between safari destinations is as smooth, safe, and scenic as the adventure itself.
                  Skip the long drives and spend more time where it matters: in the bush.
                </p>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-10 flex flex-wrap gap-8 border-t border-[#B78A42]/8 pt-8"
            >
              {[
                { value: '2', label: 'Partner Airlines' },
                { value: '6+', label: 'Destinations' },
                { value: '100%', label: 'Safety Rated' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#B78A42]">{stat.value}</span>
                  <span className="text-[11px] text-[#333333]/35 font-semibold tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ AIRLINE SECTIONS ═══ */}
        {airlines.map((airline, i) => (
          <AirlineSection key={airline.name} airline={airline} index={i} />
        ))}

        {/* ═══ POPULAR ROUTES ═══ */}
        <section ref={routesRef} className="py-20 lg:py-28 bg-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={routesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Plane className="w-3.5 h-3.5" /> Popular Routes
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Connecting You to{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                  Every Corner
                </span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
                Our partner airlines service routes across Tanzania, from the northern circuit
                to the remote southern parks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flightRoutes.map((route, i) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={routesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.1] hover:border-[#B78A42]/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-semibold text-white/30 tracking-[0.2em] uppercase">
                      {route.type}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#B78A42]/10 flex items-center justify-center group-hover:bg-[#B78A42]/20 transition-colors duration-300">
                      <Plane className="w-3.5 h-3.5 text-[#B78A42]/60 group-hover:text-[#B78A42] transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-left min-w-[80px]">
                      <p className="text-sm font-bold text-white">{route.from}</p>
                    </div>
                    <div className="flex-1 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#B78A42]/50" />
                      <div className="flex-1 h-px bg-gradient-to-r from-[#B78A42]/30 to-white/15" />
                      <Plane className="w-3 h-3 text-[#B78A42] -rotate-0" />
                      <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-[#B78A42]/30" />
                      <div className="w-2 h-2 rounded-full bg-[#B78A42]/50" />
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm font-bold text-white">{route.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <span className="text-xs text-white/40 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {route.time}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-3 py-1 rounded-full ${
                        route.type === 'Scheduled'
                          ? 'bg-[#B78A42]/15 text-[#D5BC92]'
                          : 'bg-white/8 text-white/50'
                      }`}
                    >
                      {route.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/domestic-flight-hero.png" alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/8 blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              We&apos;ll Arrange{' '}
              <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                Everything
              </span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              All domestic flights are included in our safari packages. We handle every booking,
              transfer, and schedule so you can focus on the adventure ahead.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#B78A42] hover:bg-[#A67A35] text-white text-sm font-bold tracking-wider rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30"
              >
                PLAN YOUR SAFARI
              </a>
              <a
                href="https://wa.me/255788071035"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/15 transition-all duration-300"
              >
                WHATSAPP US
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
