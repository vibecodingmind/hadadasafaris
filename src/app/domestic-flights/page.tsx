'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Button } from '@/components/ui/button';
import {
  Plane,
  MapPin,
  ArrowRight,
  Send,
  Shield,
  Clock,
  Compass,
  Star,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

const airlines = [
  {
    name: 'Flightlink Tanzania',
    image: '/images/flightlink.png',
    tagline: 'Reliable. Safe. Convenient.',
    description: 'Flightlink Tanzania is a premier airline offering reliable, safe, and convenient travel across Tanzania and East Africa. With a strong reputation for exceptional service and punctuality, Flightlink connects travelers to key destinations, including major cities and iconic safari locations.',
    longDescription: 'Whether you\'re heading to Zanzibar, Serengeti, or beyond, Flightlink ensures a seamless journey with modern aircraft and professional staff. Choose Flightlink for a smooth and enjoyable travel experience tailored to your adventure. Their commitment to on-time performance and passenger comfort makes them the preferred choice for safari travelers who value reliability and convenience.',
    destinations: ['Zanzibar', 'Serengeti', 'Arusha', 'Dar es Salaam', 'Mombasa'],
    features: ['Modern aircraft fleet', 'Exceptional service & punctuality', 'Key safari destinations', 'Professional crew', 'Seamless connections', 'East Africa network'],
    website: 'https://www.flightlink.co.tz',
  },
  {
    name: 'Auric Air',
    image: '/images/auric-air.png',
    tagline: 'Safety, Reliability & Adventure',
    description: 'Auric Air is a trusted aviation services provider and a valued supplier for Hadada Safaris. They offer a range of air travel solutions tailored to meet the needs of safari operators and travelers exploring Tanzania and East Africa. With a strong commitment to safety, reliability, and customer satisfaction, Auric Air provides charter flights, scheduled services, and customized itineraries that enhance the safari experience.',
    longDescription: 'Their fleet of well-maintained aircraft ensures smooth and efficient travel, allowing guests to reach remote and spectacular safari destinations with ease. Auric Air\'s expertise in aerial safaris and scenic flights complements Hadada Safaris\' mission to deliver unforgettable wildlife adventures and exceptional customer service. Whether you need a scheduled flight to a major airstrip or a bespoke charter to a remote bush camp, Auric Air delivers with professionalism and care.',
    destinations: ['Selous', 'Ruaha', 'Serengeti', 'Katavi', 'Mahale', 'Kigoma'],
    features: ['Charter & scheduled flights', 'Well-maintained fleet', 'Customized itineraries', 'Aerial safari expertise', 'Scenic flights available', 'Remote destination access'],
    website: 'https://www.auricair.com',
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

export default function DomesticFlightsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const routesRef = useRef(null);
  const routesInView = useInView(routesRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1">
        {/* Top spacer */}
        <div className="pt-32 lg:pt-36 bg-white" />

        {/* ═══ HERO ═══ */}
        <section ref={heroRef} className="pb-20 lg:pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Plane className="w-3.5 h-3.5" /> Domestic Flights
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Fly to the <span className="text-[#B78A42]">Wild</span>
                </h1>
                <p className="text-base text-[#333333]/60 leading-relaxed mb-6">
                  Tanzania is vast — and the best way to reach its most spectacular corners is by air. We partner with Tanzania&apos;s most trusted domestic airlines to ensure your journey between safari destinations is as smooth, safe, and scenic as the adventure itself. Skip the long drives and spend more time where it matters: in the bush.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <Shield className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase">Safety First</div>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <Clock className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase">On Time</div>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <Compass className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase">Remote Access</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8">
                  <img
                    src="/images/domestic-flights-hero.png"
                    alt="Domestic Flights Tanzania"
                    className="w-full h-[400px] md:h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ AIRLINES ═══ */}
        {airlines.map((airline, i) => (
          <section key={airline.name} className={`py-20 lg:py-28 ${i % 2 === 0 ? 'bg-[#FAFAF7]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i % 2 !== 0 ? '' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8 }}
                  className={i % 2 !== 0 ? 'lg:order-2' : ''}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                    <Plane className="w-3 h-3" /> Trusted Partner
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-3 leading-tight">{airline.name}</h2>
                  <p className="text-sm text-[#B78A42] font-semibold tracking-wider uppercase mb-4">{airline.tagline}</p>
                  <p className="text-[#333333]/60 leading-relaxed mb-4">{airline.description}</p>
                  <p className="text-[#333333]/50 leading-relaxed mb-6">{airline.longDescription}</p>

                  {/* Destinations */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-[#333333]/40 tracking-wider uppercase mb-3">Destinations Served</p>
                    <div className="flex flex-wrap gap-2">
                      {airline.destinations.map((d) => (
                        <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B78A42]/5 border border-[#B78A42]/8 rounded-full text-xs text-[#333333]/60">
                          <MapPin className="w-3 h-3 text-[#B78A42]" /> {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {airline.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/50">
                        <Star className="w-3 h-3 text-[#B78A42]" /> {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href="/contact">
                      <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
                        INQUIRE NOW <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <a
                      href={airline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B78A42] hover:text-[#333333] transition-colors"
                    >
                      Visit Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={i % 2 !== 0 ? 'lg:order-1' : ''}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group">
                    <img
                      src={airline.image}
                      alt={airline.name}
                      className="w-full h-[360px] md:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
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
                Connecting You to <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">Every Corner</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
                Our partner airlines service routes across Tanzania, from the northern circuit to the remote southern parks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flightRoutes.map((route, i) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={routesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-[#B78A42]/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white/30 tracking-wider uppercase">{route.type}</span>
                    <Plane className="w-4 h-4 text-[#B78A42]/40 group-hover:text-[#B78A42] transition-colors" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-sm font-bold text-white">{route.from}</p>
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#B78A42]/40" />
                      <div className="flex-1 h-px bg-white/15" />
                      <Plane className="w-3 h-3 text-[#B78A42]" />
                      <div className="flex-1 h-px bg-white/15" />
                      <div className="w-2 h-2 rounded-full bg-[#B78A42]/40" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-white">{route.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {route.time}
                    </span>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                      route.type === 'Scheduled' ? 'bg-[#B78A42]/15 text-[#D5BC92]' : 'bg-white/10 text-white/50'
                    }`}>
                      {route.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[120px]" />
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
                Need a Flight?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
                We&apos;ll Arrange <span className="text-[#B78A42]">Everything</span>
              </h2>
              <p className="text-[#333333]/50 leading-relaxed mb-8 max-w-lg mx-auto">
                All domestic flights are included in our safari packages. We handle every booking, transfer, and schedule so you can focus on the adventure ahead.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/20 group">
                    PLAN YOUR SAFARI <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/255788071035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/15 rounded-full text-[#25D366] text-sm font-semibold tracking-wider hover:bg-[#25D366]/15 transition-all duration-300"
                >
                  <Send className="w-4 h-4" /> WHATSAPP US
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
