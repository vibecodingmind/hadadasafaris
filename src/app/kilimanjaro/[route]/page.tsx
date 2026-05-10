'use client';

import { useParams } from 'next/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Button } from '@/components/ui/button';
import { getRouteBySlug } from '@/data/destinations';
import {
  Mountain,
  Clock,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  XCircle,
  Lightbulb,
  ChevronDown,
  Send,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';

const difficultyColors: Record<string, string> = {
  'Easy-Moderate': 'bg-green-100 text-green-700 border-green-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Moderate-Hard': 'bg-orange-100 text-orange-700 border-orange-200',
  'Challenging': 'bg-red-100 text-red-700 border-red-200',
};

export default function RoutePage() {
  const params = useParams();
  const routeSlug = params.route as string;
  const data = getRouteBySlug(routeSlug);

  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const includesRef = useRef(null);
  const tipsRef = useRef(null);
  const ctaRef = useRef(null);

  const overviewInView = useInView(overviewRef, { once: true, margin: '-80px' });
  const itineraryInView = useInView(itineraryRef, { once: true, margin: '-80px' });
  const includesInView = useInView(includesRef, { once: true, margin: '-80px' });
  const tipsInView = useInView(tipsRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [openDay, setOpenDay] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#333333] mb-4">Route Not Found</h1>
            <p className="text-[#333333]/50 mb-6">The climbing route you are looking for does not exist.</p>
            <Link href="/destinations/kilimanjaro">
              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full">
                VIEW KILIMANJARO PAGE
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
        <CookieConsent />
      </div>
    );
  }

  const { route, destination } = data;
  const otherRoutes = destination.routes?.filter(r => r.slug !== routeSlug) || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />
      <PageHero
        title="Mt. Kilimanjaro"
        highlight={route.name.replace(' Route', '')}
        subtitle={`${route.duration} · ${route.difficulty} · ${route.successRate} Success Rate`}
        image="/images/kilimanjaro.png"
      />

      <main className="flex-1">
        {/* Route Overview */}
        <section className="py-20 lg:py-28 bg-white" ref={overviewRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full border ${difficultyColors[route.difficulty] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {route.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-wider uppercase">
                    <Clock className="w-3 h-3" /> {route.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-wider uppercase">
                    <TrendingUp className="w-3 h-3" /> {route.successRate} Success
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  <span className="text-[#B78A42]">{route.name}</span>
                </h2>
                <p className="text-base text-[#333333]/60 leading-relaxed mb-6">
                  {route.longDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {route.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/60">
                      <Star className="w-3 h-3 text-[#B78A42]" /> {h}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8">
                  <img src="/images/kilimanjaro.png" alt={route.name} className="w-full h-[480px] object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Day-by-Day Itinerary */}
        <section className="py-20 lg:py-28 bg-[#FAFAF7]" ref={itineraryRef}>
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={itineraryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Mountain className="w-3.5 h-3.5" /> Day by Day
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                Route <span className="text-[#B78A42]">Itinerary</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {route.itinerary.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={itineraryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="bg-white border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenDay(openDay === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <span className="text-xs font-bold text-[#B78A42] group-hover:text-white transition-colors">{day.day.replace('Day ', '')}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#333333] group-hover:text-[#B78A42] transition-colors">{day.title}</h3>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#B78A42] flex-shrink-0 transition-transform duration-300 ${openDay === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDay === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5">
                          <div className="w-full h-px bg-[#B78A42]/10 mb-4" />
                          <p className="text-sm text-[#333333]/55 leading-relaxed">{day.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Includes & Excludes */}
        <section className="py-20 lg:py-28 bg-white" ref={includesRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={includesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full text-green-700 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                  <CheckCircle className="w-3.5 h-3.5" /> Included
                </span>
                <h3 className="text-2xl font-bold text-[#333333] mb-6">What&apos;s Included</h3>
                <div className="space-y-3">
                  {route.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#333333]/60 group-hover:text-[#333333] transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={includesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full text-red-600 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                  <XCircle className="w-3.5 h-3.5" /> Not Included
                </span>
                <h3 className="text-2xl font-bold text-[#333333] mb-6">What&apos;s Not Included</h3>
                <div className="space-y-3">
                  {route.excludes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#333333]/60 group-hover:text-[#333333] transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-20 lg:py-28 bg-[#FAFAF7]" ref={tipsRef}>
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={tipsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Lightbulb className="w-3.5 h-3.5" /> Pro Tips
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                Expert <span className="text-[#B78A42]">Advice</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {route.tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={tipsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="bg-white border border-[#B78A42]/5 rounded-xl p-5 hover:border-[#B78A42]/15 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#B78A42]/8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-[#B78A42]" />
                    </div>
                    <p className="text-sm text-[#333333]/60 leading-relaxed">{tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Routes */}
        {otherRoutes.length > 0 && (
          <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <MapPin className="w-3.5 h-3.5" /> Other Routes
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Explore <span className="text-[#B78A42]">Alternatives</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {otherRoutes.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/kilimanjaro/${r.slug}`}
                    className="group bg-[#FAFAF7] rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img src="/images/kilimanjaro.png" alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                      <span className={`absolute top-2 right-2 px-2 py-0.5 text-[9px] font-bold rounded-full border ${difficultyColors[r.difficulty] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {r.difficulty}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-[#333333] mb-1 group-hover:text-[#B78A42] transition-colors">{r.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-[#333333]/40">
                        <Clock className="w-3 h-3 text-[#B78A42]" /> {r.duration}
                        <span>·</span>
                        <span>{r.successRate}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/destinations/kilimanjaro">
                  <Button className="bg-white border border-[#B78A42]/15 hover:border-[#B78A42]/30 text-[#B78A42] font-bold text-xs tracking-wider px-8 py-3 rounded-full transition-all duration-300 hover:shadow-md">
                    BACK TO KILIMANJARO
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden" ref={ctaRef}>
          <div className="absolute inset-0">
            <img src="/images/kilimanjaro.png" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
              Book Your Climb
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Conquer <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">{route.name.replace(' Route', '')}</span>?
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Our expert mountain team will guide you every step of the way on the {route.name}. Start planning your Kilimanjaro adventure today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                  BOOK THIS ROUTE <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/255123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/15 transition-all duration-300"
              >
                <Send className="w-4 h-4 text-[#25D366]" /> WHATSAPP US
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
