'use client';

import { useParams } from 'next/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
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
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Flag,
  Info,
  Footprints,
  HelpCircle,
  DollarSign,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

const difficultyColors: Record<string, string> = {
  'Easy-Moderate': 'bg-green-100 text-green-700 border-green-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Moderate-Hard': 'bg-orange-100 text-orange-700 border-orange-200',
  'Challenging': 'bg-red-100 text-red-700 border-red-200',
};

/* ── Slideshow component for route photos ── */
function RouteSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="relative w-full h-full min-h-[320px]">
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`${alt} slide ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1a1a1a]/30 to-transparent" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-400 ${
              i === current ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrent(current === 0 ? total - 1 : current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-all z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % total)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-all z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ── Booking / Inquiry Sidebar Form ── */
function BookingSidebar({ routeName }: { routeName: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    groupSize: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-[#B78A42]/10 rounded-2xl shadow-lg shadow-[#333333]/5 overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-6 py-5">
        <h3 className="text-lg font-bold text-white mb-1">Book This Climb</h3>
        <p className="text-xs text-white/50">Fill in your details and we&apos;ll get back to you within 24 hours</p>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#333333]/70 mb-1.5 tracking-wide uppercase">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-lg text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#B78A42]/30 focus:ring-1 focus:ring-[#B78A42]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#333333]/70 mb-1.5 tracking-wide uppercase">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-lg text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#B78A42]/30 focus:ring-1 focus:ring-[#B78A42]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#333333]/70 mb-1.5 tracking-wide uppercase">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="+255 123 456 789"
            className="w-full px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-lg text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#B78A42]/30 focus:ring-1 focus:ring-[#B78A42]/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#333333]/70 mb-1.5 tracking-wide uppercase">Start Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => handleChange('date', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-lg text-sm text-[#333333] focus:outline-none focus:border-[#B78A42]/30 focus:ring-1 focus:ring-[#B78A42]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#333333]/70 mb-1.5 tracking-wide uppercase">Group Size</label>
            <select
              value={formData.groupSize}
              onChange={e => handleChange('groupSize', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-lg text-sm text-[#333333] focus:outline-none focus:border-[#B78A42]/30 focus:ring-1 focus:ring-[#B78A42]/20 transition-all"
            >
              <option value="">Select</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6+">6+ People</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#333333]/70 mb-1.5 tracking-wide uppercase">Message</label>
          <textarea
            value={formData.message}
            onChange={e => handleChange('message', e.target.value)}
            placeholder="Any special requests or questions..."
            rows={3}
            className="w-full px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-lg text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#B78A42]/30 focus:ring-1 focus:ring-[#B78A42]/20 transition-all resize-none"
          />
        </div>

        <Button className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
          SEND INQUIRY <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <a
          href="https://wa.me/255123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl text-[#25D366] text-sm font-semibold tracking-wider hover:bg-[#25D366]/15 transition-all duration-300"
        >
          <Send className="w-4 h-4" /> WHATSAPP US
        </a>
      </div>
    </div>
  );
}

export default function RoutePage() {
  const params = useParams();
  const routeSlug = params.route as string;
  const data = getRouteBySlug(routeSlug);

  const pageRef = useRef(null);
  const itineraryRef = useRef(null);
  const includesRef = useRef(null);
  const tipsRef = useRef(null);
  const faqRef = useRef(null);
  const ratesRef = useRef(null);

  const itineraryInView = useInView(itineraryRef, { once: true, margin: '-80px' });
  const includesInView = useInView(includesRef, { once: true, margin: '-80px' });
  const tipsInView = useInView(tipsRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ratesInView = useInView(ratesRef, { once: true, margin: '-80px' });

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

  // Slideshow images — use gallery from Kilimanjaro destination
  const slideshowImages = destination.gallery && destination.gallery.length > 1
    ? destination.gallery
    : ['/images/kilimanjaro.png', '/images/hero-safari.png', '/images/migration.png'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1" ref={pageRef}>
        {/* Top spacer */}
        <div className="pt-32 lg:pt-36 bg-white" />

        {/* ═══ TITLE SECTION ═══ */}
        <section className="pb-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#B78A42] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Mt. Kilimanjaro
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4 leading-tight">
                {route.name}
              </h1>
              <p className="text-base text-[#333333]/55 leading-relaxed max-w-3xl">
                {route.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ TWO PHOTOS: Map left + Slideshow right ═══ */}
        <section className="pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left — Route Map */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-lg shadow-[#333333]/8 bg-[#1a1a1a] h-[320px] md:h-[380px]"
              >
                <img
                  src={`/images/kilimanjaro-${routeSlug}-map.png`}
                  alt={`${route.name} Map`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center text-white/40">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                          <span class="mt-2 text-xs font-semibold tracking-wider uppercase">Route Map</span>
                          <span class="text-[10px] text-white/25 mt-1">${route.name}</span>
                        </div>
                      `;
                    }
                  }}
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full">
                  <span className="text-[10px] font-bold text-white tracking-wider uppercase">Route Map</span>
                </div>
              </motion.div>

              {/* Right — Photo Slideshow */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-lg shadow-[#333333]/8 h-[320px] md:h-[380px]"
              >
                <RouteSlideshow images={slideshowImages} alt={route.name} />
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full">
                  <span className="text-[10px] font-bold text-white tracking-wider uppercase">Photos</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ MAIN CONTENT + SIDEBAR ═══ */}
        <section className="py-12 lg:py-16 bg-white border-t border-[#B78A42]/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

              {/* ─── LEFT: Main Content (2/3) ─── */}
              <div className="lg:col-span-2 space-y-16">

                {/* Overview */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#B78A42]/10 rounded-lg flex items-center justify-center">
                        <Info className="w-4 h-4 text-[#B78A42]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#333333]">Overview</h2>
                    </div>
                    <p className="text-[#333333]/60 leading-relaxed text-[15px]">
                      {route.longDescription}
                    </p>
                  </motion.div>
                </div>

                {/* Route Summary */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#B78A42]/10 rounded-lg flex items-center justify-center">
                        <Flag className="w-4 h-4 text-[#B78A42]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#333333]">Route Summary</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                        <Clock className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                        <div className="text-xs text-[#333333]/40 font-semibold tracking-wider uppercase mb-1">Duration</div>
                        <div className="text-sm font-bold text-[#333333]">{route.duration}</div>
                      </div>
                      <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                        <Mountain className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                        <div className="text-xs text-[#333333]/40 font-semibold tracking-wider uppercase mb-1">Difficulty</div>
                        <div className="text-sm font-bold text-[#333333]">{route.difficulty}</div>
                      </div>
                      <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                        <TrendingUp className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                        <div className="text-xs text-[#333333]/40 font-semibold tracking-wider uppercase mb-1">Success Rate</div>
                        <div className="text-sm font-bold text-[#333333]">{route.successRate}</div>
                      </div>
                      <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                        <Footprints className="w-5 h-5 text-[#B78A42] mx-auto mb-2" />
                        <div className="text-xs text-[#333333]/40 font-semibold tracking-wider uppercase mb-1">Approach</div>
                        <div className="text-sm font-bold text-[#333333]">South{routeSlug === 'rongai' ? 'North' : routeSlug === 'lemosho' || routeSlug === 'shira' ? 'West' : ''}</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {route.highlights.map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B78A42]/5 border border-[#B78A42]/8 rounded-full text-xs text-[#333333]/60">
                          <Star className="w-3 h-3 text-[#B78A42]" /> {h}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div ref={itineraryRef}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={itineraryInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#B78A42]/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#B78A42]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#333333]">Day-by-Day Itinerary</h2>
                    </div>

                    <div className="space-y-3">
                      {route.itinerary.map((day, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={itineraryInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                          className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                        >
                          <button
                            onClick={() => setOpenDay(openDay === i ? null : i)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-9 h-9 bg-[#B78A42] rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-white">{day.day.replace('Day ', '')}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-[#333333] group-hover:text-[#B78A42] transition-colors">{day.title}</h3>
                              </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#B78A42]/50 flex-shrink-0 transition-transform duration-300 ${openDay === i ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {openDay === i && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <div className="px-5 pb-4">
                                  <div className="w-full h-px bg-[#B78A42]/10 mb-3" />
                                  <p className="text-sm text-[#333333]/50 leading-relaxed">{day.description}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Includes & Excludes */}
                <div ref={includesRef}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={includesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Included */}
                      <div className="bg-[#FAFAF7] rounded-xl border border-green-100 p-6">
                        <div className="flex items-center gap-2 mb-5">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <h3 className="text-lg font-bold text-[#333333]">What&apos;s Included</h3>
                        </div>
                        <div className="space-y-2.5">
                          {route.includes.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-[#333333]/55 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Excluded */}
                      <div className="bg-[#FAFAF7] rounded-xl border border-red-100 p-6">
                        <div className="flex items-center gap-2 mb-5">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <h3 className="text-lg font-bold text-[#333333]">Not Included</h3>
                        </div>
                        <div className="space-y-2.5">
                          {route.excludes.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <XCircle className="w-3.5 h-3.5 text-red-300 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-[#333333]/55 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Tips */}
                <div ref={tipsRef}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={tipsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#B78A42]/10 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-[#B78A42]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#333333]">Expert Tips</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {route.tips.map((tip, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={tipsInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                          className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 hover:border-[#B78A42]/12 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 bg-[#B78A42]/8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Lightbulb className="w-3.5 h-3.5 text-[#B78A42]" />
                            </div>
                            <p className="text-sm text-[#333333]/55 leading-relaxed">{tip}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* FAQ */}
                {route.faq && route.faq.length > 0 && (
                  <div ref={faqRef}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={faqInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-[#B78A42]/10 rounded-lg flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-[#B78A42]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#333333]">Frequently Asked Questions</h2>
                      </div>

                      <div className="space-y-3">
                        {route.faq.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={faqInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                            className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                          >
                            <button
                              onClick={() => setOpenDay(openDay === 100 + i ? null : 100 + i)}
                              className="w-full flex items-center justify-between px-5 py-4 text-left group"
                            >
                              <span className="text-sm font-semibold text-[#333333] group-hover:text-[#B78A42] transition-colors pr-4">{item.question}</span>
                              <ChevronDown className={`w-4 h-4 text-[#B78A42]/50 flex-shrink-0 transition-transform duration-300 ${openDay === 100 + i ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {openDay === 100 + i && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  <div className="px-5 pb-4">
                                    <div className="w-full h-px bg-[#B78A42]/10 mb-3" />
                                    <p className="text-sm text-[#333333]/50 leading-relaxed">{item.answer}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Rates */}
                <div ref={ratesRef}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={ratesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#B78A42]/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-[#B78A42]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#333333]">Rates</h2>
                    </div>

                    <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl p-8 text-center">
                      <div className="w-14 h-14 bg-[#B78A42]/8 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <Phone className="w-6 h-6 text-[#B78A42]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#333333] mb-3">Request a Quote</h3>
                      <p className="text-sm text-[#333333]/50 leading-relaxed max-w-md mx-auto mb-6">
                        Our {route.name} pricing is customized based on your group size, preferred dates, and accommodation preferences. Contact us for a personalized quote and let our team plan your perfect Kilimanjaro adventure.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/contact">
                          <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 group">
                            REQUEST A QUOTE <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <a
                          href="https://wa.me/255123456789"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/15 rounded-full text-[#25D366] text-xs font-semibold tracking-wider hover:bg-[#25D366]/15 transition-all duration-300"
                        >
                          <Send className="w-3.5 h-3.5" /> WHATSAPP US
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>

              {/* ─── RIGHT: Sidebar Booking Form (1/3) ─── */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-28">
                  <BookingSidebar routeName={route.name} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══ OTHER ROUTES ═══ */}
        {otherRoutes.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#FAFAF7] border-t border-[#B78A42]/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <span className="inline-block text-[#B78A42] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                  Other Routes
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
                  Explore Alternative Routes
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherRoutes.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/kilimanjaro/${r.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img src="/images/kilimanjaro.png" alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                      <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-full border backdrop-blur-xl ${difficultyColors[r.difficulty] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {r.difficulty}
                      </span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="px-2.5 py-1 bg-white/20 backdrop-blur-xl rounded-full">
                          <span className="text-[10px] font-bold text-white tracking-wider">{r.duration}</span>
                        </div>
                        <div className="px-2.5 py-1 bg-[#B78A42]/80 backdrop-blur-xl rounded-full">
                          <span className="text-[10px] font-bold text-white tracking-wider">{r.successRate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#333333] mb-2 group-hover:text-[#B78A42] transition-colors">{r.name}</h3>
                      <p className="text-xs text-[#333333]/45 leading-relaxed line-clamp-2 mb-3">{r.description}</p>
                      <span className="inline-flex items-center gap-1 text-[#B78A42] text-xs font-semibold group-hover:gap-2 transition-all">
                        View Route <ArrowRight className="w-3 h-3" />
                      </span>
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
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
