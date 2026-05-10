'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Plane,
  Clock,
  ArrowRight,
  Shield,
  Star,
  Compass,
  Users,
  Phone,
  CalendarCheck,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

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
  logo?: string;
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
    logo: '/images/flightlink.png',
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
    logo: '/images/auric-air.png',
  },
  {
    name: 'Coastal Aviation',
    subtitle: 'The Spirit of Adventure',
    location: 'Serengeti, Zanzibar, Arusha, Dar es Salaam, Selous, Mafia Island',
    description:
      'Coastal Aviation is one of Tanzania\'s most iconic domestic airlines, known for connecting travelers to the country\'s most breathtaking safari and coastal destinations. With decades of experience flying in East Africa, Coastal Aviation operates a fleet of reliable aircraft that serve both scheduled and charter routes. Their deep knowledge of the Tanzanian landscape and commitment to safety make them an ideal partner for Hadada Safaris. From the vast Serengeti plains to the turquoise waters of Zanzibar, Coastal Aviation ensures every flight is a memorable part of your adventure.',
    slides: [
      { src: '/images/domestic-flights-hero.png', alt: 'Coastal Aviation flight' },
      { src: '/images/domestic-flight-hero.png', alt: 'Domestic flight over Tanzania' },
      { src: '/images/bush-airstrip.png', alt: 'Bush airstrip in Tanzania' },
    ],
  },
  {
    name: 'Regional Air',
    subtitle: 'Connecting Tanzania with Excellence',
    location: 'Arusha, Serengeti, Manyara, Grumeti, Sasakwa, Loliondo',
    description:
      'Regional Air is a respected domestic carrier specializing in connecting Tanzania\'s northern safari circuit and beyond. Operating with a focus on safety, reliability, and personalized service, Regional Air provides scheduled and charter flights to some of the most sought-after destinations in East Africa. Their experienced pilots and well-maintained fleet ensure that every journey is comfortable and efficient. As a Hadada Safaris partner, Regional Air helps us deliver seamless travel experiences, allowing you to maximize your time in the bush and minimize travel hassle.',
    slides: [
      { src: '/images/domestic-flight-hero.png', alt: 'Regional Air flight' },
      { src: '/images/bush-airstrip.png', alt: 'Bush airstrip in Tanzania' },
      { src: '/images/domestic-flights-hero.png', alt: 'Aerial view of Tanzania' },
    ],
  },
];

const flightRoutes = [
  { from: 'Arusha', to: 'Serengeti', time: '1h 15min', type: 'Scheduled', fromCode: 'ARK', toCode: 'SEU' },
  { from: 'Arusha', to: 'Zanzibar', time: '1h 30min', type: 'Scheduled', fromCode: 'ARK', toCode: 'ZNZ' },
  { from: 'Dar es Salaam', to: 'Serengeti', time: '2h 00min', type: 'Scheduled', fromCode: 'DAR', toCode: 'SEU' },
  { from: 'Zanzibar', to: 'Selous', time: '1h 15min', type: 'Charter', fromCode: 'ZNZ', toCode: 'SEL' },
  { from: 'Arusha', to: 'Ruaha', time: '2h 30min', type: 'Charter', fromCode: 'ARK', toCode: 'RUA' },
  { from: 'Serengeti', to: 'Zanzibar', time: '1h 45min', type: 'Scheduled', fromCode: 'SEU', toCode: 'ZNZ' },
  { from: 'Arusha', to: 'Katavi', time: '3h 00min', type: 'Charter', fromCode: 'ARK', toCode: 'KAT' },
  { from: 'Dar es Salaam', to: 'Zanzibar', time: '0h 30min', type: 'Scheduled', fromCode: 'DAR', toCode: 'ZNZ' },
  { from: 'Zanzibar', to: 'Mafia Island', time: '0h 45min', type: 'Scheduled', fromCode: 'ZNZ', toCode: 'MFA' },
];

const whyFlyData = [
  {
    icon: Clock,
    title: 'Save Time',
    desc: 'Skip 10+ hour drives and reach remote safari camps in under 2 hours from major hubs.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'All partner airlines meet international safety standards with modern, well-maintained fleets.',
  },
  {
    icon: Compass,
    title: 'Scenic Views',
    desc: 'Witness Tanzania\'s landscapes from above — volcanoes, craters, and endless plains.',
  },
  {
    icon: Users,
    title: 'Expert Coordination',
    desc: 'We handle every booking, transfer, and schedule so you never have to worry.',
  },
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/5 pointer-events-none" />
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo('prev')}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo('next')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25"
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
            {/* Glass pill for location */}
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
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

/* ─── Route Card Component ─── */
function RouteCard({ route, index, isInView }: { route: typeof flightRoutes[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.5 }}
      className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-5 md:p-6 hover:bg-white/[0.12] hover:border-[#B78A42]/30 transition-all duration-500 group cursor-pointer"
    >
      {/* Type badge + plane icon */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase ${
            route.type === 'Scheduled'
              ? 'bg-[#B78A42]/15 text-[#D5BC92] backdrop-blur-sm border border-[#B78A42]/20'
              : 'bg-white/8 text-white/50 backdrop-blur-sm border border-white/10'
          }`}
        >
          {route.type}
        </span>
        <div className="w-9 h-9 rounded-full bg-[#B78A42]/10 backdrop-blur-sm border border-[#B78A42]/15 flex items-center justify-center group-hover:bg-[#B78A42]/20 transition-colors duration-300">
          <Plane className="w-4 h-4 text-[#B78A42]/60 group-hover:text-[#B78A42] transition-colors duration-300" />
        </div>
      </div>

      {/* Route visualization */}
      <div className="flex items-center gap-2 mb-5">
        <div className="text-left flex-1">
          <p className="text-[10px] text-white/30 font-semibold tracking-wider mb-0.5">{route.fromCode}</p>
          <p className="text-sm md:text-base font-bold text-white leading-tight">{route.from}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#B78A42]/50 ring-2 ring-[#B78A42]/20" />
          <div className="flex-1 h-px bg-gradient-to-r from-[#B78A42]/40 via-white/20 to-[#B78A42]/40 min-w-[32px]" />
          <Plane className="w-3.5 h-3.5 text-[#B78A42]" />
          <div className="flex-1 h-px bg-gradient-to-r from-[#B78A42]/40 via-white/20 to-[#B78A42]/40 min-w-[32px]" />
          <div className="w-2 h-2 rounded-full bg-[#B78A42]/50 ring-2 ring-[#B78A42]/20" />
        </div>
        <div className="text-right flex-1">
          <p className="text-[10px] text-white/30 font-semibold tracking-wider mb-0.5">{route.toCode}</p>
          <p className="text-sm md:text-base font-bold text-white leading-tight">{route.to}</p>
        </div>
      </div>

      {/* Time footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
        <span className="text-xs text-white/40 flex items-center gap-1.5">
          <Clock className="w-3 h-3" /> {route.time}
        </span>
        <span className="text-[10px] text-[#B78A42]/60 group-hover:text-[#B78A42] flex items-center gap-1 transition-colors duration-300">
          View details <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function DomesticFlightsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const routesRef = useRef(null);
  const routesInView = useInView(routesRef, { once: true, margin: '-60px' });
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' });
  const partnerRef = useRef(null);
  const partnerInView = useInView(partnerRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1">
        {/* ═══ HERO SECTION ═══ */}
        <section ref={heroRef} className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/domestic-flights-hero.png"
              alt="Domestic flight over Tanzania"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/50 to-[#1a1a1a]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/40" />
          </div>

          {/* Decorative orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#B78A42]/8 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/6 w-64 h-64 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full pt-32 pb-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                {/* Glass pill badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
                  <Plane className="w-3.5 h-3.5" /> Domestic Flights
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                  Fly to the{' '}
                  <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                    Wild
                  </span>
                </h1>
                <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-10">
                  Tanzania is vast — and the best way to reach its most spectacular corners is by air.
                  We partner with Tanzania&apos;s most trusted domestic airlines to ensure your journey
                  between safari destinations is as smooth, safe, and scenic as the adventure itself.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#B78A42] hover:bg-[#A67A35] text-white text-sm font-bold tracking-wider rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 hover:scale-[1.02]"
                  >
                    <CalendarCheck className="w-4 h-4" /> BOOK A FLIGHT
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white text-sm font-semibold tracking-wider rounded-full transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Phone className="w-4 h-4" /> TALK TO US
                  </Link>
                </div>
              </motion.div>

              {/* Stats bar with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-14"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {[
                      { value: '4', label: 'Partner Airlines', icon: Plane },
                      { value: '9+', label: 'Destinations', icon: MapPin },
                      { value: '100%', label: 'Safety Rated', icon: Shield },
                      { value: '15+', label: 'Years Experience', icon: Star },
                    ].map((stat) => (
                      <div key={stat.label} className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-[#B78A42]/15 backdrop-blur-sm border border-[#B78A42]/20 flex items-center justify-center mb-3">
                          <stat.icon className="w-4 h-4 text-[#D5BC92]" />
                        </div>
                        <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</span>
                        <span className="text-[10px] text-white/40 font-semibold tracking-[0.15em] uppercase leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-[#B78A42]"
              />
            </div>
          </motion.div>
        </section>

        {/* ═══ WHY FLY SECTION ═══ */}
        <section ref={whyRef} className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden">
          {/* Decorative bg orb */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                <Star className="w-3.5 h-3.5" /> Why Fly Domestic
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4 leading-tight">
                Skip the Drive,{' '}
                <span className="text-[#B78A42]">Soar to Adventure</span>
              </h2>
              <p className="text-[#333333]/50 max-w-2xl mx-auto leading-relaxed">
                Flying isn&apos;t just faster — it&apos;s part of the experience. See Tanzania from a perspective
                few ever witness.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyFlyData.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="bg-white/70 backdrop-blur-xl border border-[#B78A42]/10 rounded-2xl p-6 hover:bg-white hover:border-[#B78A42]/25 hover:shadow-xl hover:shadow-[#B78A42]/5 transition-all duration-500 group text-center"
                >
                  <div className="w-14 h-14 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 mx-auto">
                    <item.icon className="w-6 h-6 text-[#B78A42] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-bold text-[#333333] mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-[#333333]/45 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PARTNER AIRLINES STRIP ═══ */}
        <section ref={partnerRef} className="py-16 bg-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#B78A42]/3 blur-[80px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={partnerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                <Shield className="w-3.5 h-3.5" /> Trusted Partners
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
                Our <span className="text-[#B78A42]">Airline</span> Partners
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {airlines.map((airline, i) => (
                <motion.div
                  key={airline.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={partnerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="bg-[#FAFAF7]/80 backdrop-blur-xl border border-[#B78A42]/10 rounded-2xl p-6 hover:bg-white hover:border-[#B78A42]/20 hover:shadow-lg hover:shadow-[#B78A42]/5 transition-all duration-500 group text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl border border-[#B78A42]/10 flex items-center justify-center mb-4 mx-auto group-hover:border-[#B78A42]/30 transition-colors duration-300 overflow-hidden">
                    {airline.logo ? (
                      <img src={airline.logo} alt={airline.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <Plane className="w-7 h-7 text-[#B78A42]/40 group-hover:text-[#B78A42] transition-colors duration-300" />
                    )}
                  </div>
                  <h3 className="font-bold text-[#333333] text-sm mb-1">{airline.name}</h3>
                  <p className="text-[10px] text-[#B78A42]/70 tracking-wider uppercase font-semibold">
                    {airline.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ AIRLINE SECTIONS ═══ */}
        {airlines.map((airline, i) => (
          <AirlineSection key={airline.name} airline={airline} index={i} />
        ))}

        {/* ═══ POPULAR ROUTES ═══ */}
        <section ref={routesRef} className="py-20 lg:py-28 bg-[#1a1a1a] text-white relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#B78A42]/6 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#B78A42]/4 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={routesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                <Plane className="w-3.5 h-3.5" /> Popular Routes
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Connecting You to{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                  Every Corner
                </span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
                Our partner airlines service routes across Tanzania, from the northern circuit
                to the remote southern parks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {flightRoutes.map((route, i) => (
                <RouteCard key={`${route.from}-${route.to}`} route={route} index={i} isInView={routesInView} />
              ))}
            </div>

            {/* Route note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={routesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 text-center"
            >
              <p className="text-white/25 text-xs tracking-wider">
                * All routes and times are approximate and subject to seasonal schedules. Charter flights available on request.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src="/images/domestic-flight-hero.png" alt="" className="w-full h-full object-cover opacity-[0.07]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]" />
          </div>

          {/* Decorative orbs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#B78A42]/8 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto px-4 md:px-6"
          >
            {/* Glass card */}
            <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] rounded-3xl p-8 md:p-14 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/15 backdrop-blur-xl border border-[#B78A42]/20 rounded-full text-[#D5BC92] text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
                <Plane className="w-3.5 h-3.5" /> Let Us Handle Everything
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                We&apos;ll Arrange{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                  Everything
                </span>
              </h2>
              <p className="text-white/40 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                All domestic flights are included in our safari packages. We handle every booking,
                transfer, and schedule so you can focus on the adventure ahead.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#B78A42] hover:bg-[#A67A35] text-white text-sm font-bold tracking-wider rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 hover:scale-[1.02]"
                >
                  <Phone className="w-4 h-4" /> PLAN YOUR SAFARI
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/20 hover:border-white/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <CalendarCheck className="w-4 h-4" /> BOOK NOW
                </Link>
              </div>
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
