'use client';

import { useParams } from 'next/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Button } from '@/components/ui/button';
import { destinations, getDestinationBySlug } from '@/data/destinations';
import {
  MapPin,
  ChevronDown,
  ArrowRight,
  Star,
  PawPrint,
  Compass,
  Send,
  Mountain,
  Clock,
  TrendingUp,
  TreePine,
  Cloud,
  Sun,
  Snowflake,
  Wheat,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
} from 'lucide-react';
import Link from 'next/link';

const climateIcons: Record<string, React.ElementType> = {
  Wheat,
  TreePine,
  Cloud,
  Sun,
  Snowflake,
};

function KilimanjaroSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="relative w-full h-[480px]">
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`Kilimanjaro slide ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      ))}
      {/* Gradient overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-400 ${
              i === current ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      {/* Prev / Next */}
      <button
        onClick={() => setCurrent(current === 0 ? total - 1 : current - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-all z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % total)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-all z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

const difficultyColors: Record<string, string> = {
  'Easy-Moderate': 'bg-green-100 text-green-700 border-green-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Moderate-Hard': 'bg-orange-100 text-orange-700 border-orange-200',
  'Challenging': 'bg-red-100 text-red-700 border-red-200',
};

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const destination = getDestinationBySlug(slug);

  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const routesRef = useRef(null);
  const wildlifeRef = useRef(null);
  const galleryRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const overviewInView = useInView(overviewRef, { once: true, margin: '-80px' });
  const highlightsInView = useInView(highlightsRef, { once: true, margin: '-80px' });
  const routesInView = useInView(routesRef, { once: true, margin: '-80px' });
  const wildlifeInView = useInView(wildlifeRef, { once: true, margin: '-80px' });
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [openRoute, setOpenRoute] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#333333] mb-4">Destination Not Found</h1>
            <p className="text-[#333333]/50 mb-6">The destination you are looking for does not exist.</p>
            <Link href="/destinations">
              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full">
                BROWSE DESTINATIONS
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

  const otherDestinations = destinations.filter(d => d.slug !== slug).slice(0, 3);
  const isKilimanjaro = slug === 'kilimanjaro';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />
      <PageHero
        title={destination.name.split(' ').slice(0, -1).join(' ') || 'Explore'}
        highlight={destination.name.split(' ').slice(-1)[0]}
        subtitle={destination.tagline}
        image={destination.heroImage}
      />
      <main className="flex-1">
        {/* Overview */}
        <section className="py-20 lg:py-28 bg-white" ref={overviewRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Title & Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  {isKilimanjaro ? (
                    <>Mt. <span className="text-[#B78A42]">Kilimanjaro</span></>
                  ) : (
                    <>Discover <span className="text-[#B78A42]">{destination.name}</span></>
                  )}
                </h2>
                <p className="text-base text-[#333333]/60 leading-relaxed">
                  {destination.longDescription}
                </p>
              </motion.div>

              {/* Right: Photo Slideshow */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group">
                  {/* Slides */}
                  {isKilimanjaro && destination.gallery ? (
                    <KilimanjaroSlideshow images={destination.gallery} />
                  ) : (
                    <img src={destination.image} alt={destination.name} className="w-full h-[480px] object-cover" />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Climate Zones (Kilimanjaro-specific) */}
        {isKilimanjaro && destination.climateZones && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7]">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <TrendingUp className="w-3.5 h-3.5" /> Ascent Profile
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Five <span className="text-[#B78A42]">Climate Zones</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  From tropical rainforest to arctic glacier, Kilimanjaro takes you through five distinct worlds in a single ascent.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {destination.climateZones.map((zone, i) => {
                  const ZoneIcon = climateIcons[zone.icon] || Mountain;
                  return (
                    <motion.div
                      key={zone.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                      className="bg-white border border-[#B78A42]/5 rounded-2xl p-5 hover:border-[#B78A42]/15 hover:shadow-lg transition-all duration-500 group text-center"
                    >
                      <div className="w-12 h-12 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                        <ZoneIcon className="w-5 h-5 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-sm text-[#333333] mb-1">{zone.name}</h3>
                      <div className="text-[10px] text-[#B78A42] font-semibold tracking-wider uppercase mb-2">{zone.elevation}</div>
                      <p className="text-xs text-[#333333]/45 leading-relaxed">{zone.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Climbing Routes (Kilimanjaro-specific) */}
        {isKilimanjaro && destination.routes && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7]" ref={routesRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={routesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Mountain className="w-3.5 h-3.5" /> Choose Your Path
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Climbing <span className="text-[#B78A42]">Routes</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  Six distinct routes to Uhuru Peak, each with its own character, scenery, and challenge level.
                </p>
              </motion.div>

              <div className="space-y-4">
                {destination.routes.map((route, i) => (
                  <motion.div
                    key={route.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={routesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className="bg-white border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenRoute(openRoute === route.slug ? null : route.slug)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    >
                      <div className="flex items-center gap-5 flex-1 min-w-0">
                        <div className="w-14 h-14 bg-[#B78A42]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mountain className="w-6 h-6 text-[#B78A42]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#333333] group-hover:text-[#B78A42] transition-colors">{route.name}</h3>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="flex items-center gap-1 text-xs text-[#333333]/40">
                              <Clock className="w-3 h-3 text-[#B78A42]" /> {route.duration}
                            </span>
                            <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${difficultyColors[route.difficulty] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                              {route.difficulty}
                            </span>
                            <span className="text-xs text-[#333333]/40">
                              Success: <span className="text-[#B78A42] font-semibold">{route.successRate}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-[#B78A42] transition-transform duration-300 flex-shrink-0 ml-4 ${openRoute === route.slug ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openRoute === route.slug && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="w-full h-px bg-[#B78A42]/10 mb-5" />
                            <p className="text-sm text-[#333333]/55 leading-relaxed mb-5">{route.description}</p>
                            <div className="flex flex-wrap gap-2 mb-5">
                              {route.highlights.map((h) => (
                                <span key={h} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/50">
                                  <Star className="w-3 h-3 text-[#B78A42]" /> {h}
                                </span>
                              ))}
                            </div>
                            <Link href="/contact">
                              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full group/btn transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20">
                                INQUIRE ABOUT THIS ROUTE <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Wildlife & Activities (hidden for Kilimanjaro) */}
        {!isKilimanjaro && (
        <section className="py-20 lg:py-28 bg-white" ref={wildlifeRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Wildlife */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={wildlifeInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                  <PawPrint className="w-3.5 h-3.5" /> Wildlife
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">
                  {isKilimanjaro ? 'Mountain Wildlife' : 'The Wild Inhabitants'}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {destination.wildlife.map((w, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={wildlifeInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.03 + i * 0.03, duration: 0.4 }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-sm text-[#333333]/60 hover:border-[#B78A42]/20 hover:text-[#333333] hover:bg-[#B78A42]/5 transition-all duration-300 cursor-default"
                    >
                      <PawPrint className="w-3.5 h-3.5 text-[#B78A42]" /> {w}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Activities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={wildlifeInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                  <Compass className="w-3.5 h-3.5" /> Activities
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">
                  Things to Do
                </h3>
                <div className="space-y-3">
                  {destination.activities.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 15 }}
                      animate={wildlifeInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 hover:border-[#B78A42]/15 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <Compass className="w-4 h-4 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-medium text-[#333333]/70 group-hover:text-[#333333] transition-colors">{a}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        )}

        {/* Gallery (hidden for Kilimanjaro) */}
        {!isKilimanjaro && destination.gallery && destination.gallery.length > 0 && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7]" ref={galleryRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Eye className="w-3.5 h-3.5" /> Gallery
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Visual <span className="text-[#B78A42]">Journey</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {destination.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className={`rounded-2xl overflow-hidden cursor-pointer group ${
                      i === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                    onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                  >
                    <div className={`relative overflow-hidden ${i === 0 ? 'h-full min-h-[280px] md:min-h-[400px]' : 'h-44 md:h-52'}`}>
                      <img
                        src={img}
                        alt={`${destination.name} gallery ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-[#333333]/0 group-hover:bg-[#333333]/30 transition-all duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/25">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {destination.accordion && destination.accordion.length > 0 && (
          <section className="py-20 lg:py-28 bg-white" ref={faqRef}>
            <div className="max-w-3xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Common <span className="text-[#B78A42]">Questions</span>
                </h2>
              </motion.div>

              <div className="space-y-3">
                {destination.accordion.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    >
                      <span className="text-sm font-semibold text-[#333333] group-hover:text-[#B78A42] transition-colors pr-4">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 text-[#B78A42] flex-shrink-0 transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFAQ === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-5">
                            <div className="w-full h-px bg-[#B78A42]/10 mb-4" />
                            <p className="text-sm text-[#333333]/55 leading-relaxed">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Destinations */}
        <section className="py-20 lg:py-28 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <MapPin className="w-3.5 h-3.5" /> More to Explore
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                Other <span className="text-[#B78A42]">Destinations</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherDestinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-xl border border-white/25 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">{d.tagline}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#333333] mb-1 group-hover:text-[#B78A42] transition-colors">{d.name}</h3>
                    <p className="text-xs text-[#333333]/40 line-clamp-2">{d.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#B78A42] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/destinations">
                <Button className="bg-white border border-[#B78A42]/15 hover:border-[#B78A42]/30 text-[#B78A42] font-bold text-xs tracking-wider px-8 py-3 rounded-full transition-all duration-300 hover:shadow-md">
                  VIEW ALL DESTINATIONS
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden" ref={ctaRef}>
          <div className="absolute inset-0">
            <img src={destination.heroImage} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]" />
          </div>
          {/* Decorative orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D5BC92]/8 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
              Start Your Journey
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Explore{' '}
              <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                {destination.name.split(' ').pop()}
              </span>
              ?
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Our expert team will craft a personalized safari itinerary featuring {destination.name} and beyond. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                  PLAN YOUR SAFARI <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : destination.gallery.length - 1);
              }}
              className="absolute left-4 md:left-8 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex < destination.gallery.length - 1 ? lightboxIndex + 1 : 0);
              }}
              className="absolute right-4 md:right-8 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="max-w-5xl w-full px-4" onClick={e => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={destination.gallery[lightboxIndex]}
                alt={`${destination.name} gallery`}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="flex items-center justify-center gap-3 mt-5">
                {destination.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === lightboxIndex ? 'bg-[#B78A42] scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
