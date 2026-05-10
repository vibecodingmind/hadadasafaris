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
import { destinations, getDestinationBySlug } from '@/data/destinations';
import {
  MapPin,
  ChevronDown,
  ArrowRight,
  Send,
  Mountain,
  Clock,
  TrendingUp,
  TreePine,
  Cloud,
  Sun,
  Snowflake,
  Wheat,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

const climateIcons: Record<string, React.ElementType> = {
  Wheat,
  TreePine,
  Cloud,
  Sun,
  Snowflake,
};

const difficultyColors: Record<string, string> = {
  'Easy-Moderate': 'bg-green-100 text-green-700 border-green-200',
  'Moderate': 'bg-amber-100 text-amber-700 border-amber-200',
  'Moderate-Hard': 'bg-orange-100 text-orange-700 border-orange-200',
  'Challenging': 'bg-red-100 text-red-700 border-red-200',
};

function PhotoSlideshow({ images, alt }: { images: string[]; alt: string }) {
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
          alt={`${alt} slide ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
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

function ScrollableRoutes({ routes, routesInView }: { routes: typeof destinations[0]['routes']; routesInView: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

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
  }, [routes]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320;
    el.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative group/scroll">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-20 w-11 h-11 bg-white border border-[#B78A42]/15 rounded-full shadow-lg flex items-center justify-center text-[#B78A42] hover:bg-[#B78A42] hover:text-white hover:border-[#B78A42] transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-20 w-11 h-11 bg-white border border-[#B78A42]/15 rounded-full shadow-lg flex items-center justify-center text-[#B78A42] hover:bg-[#B78A42] hover:text-white hover:border-[#B78A42] transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {routes!.map((route, i) => (
          <motion.div
            key={route.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={routesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
          >
            <Link
              href={`/kilimanjaro/${route.slug}`}
              className="group/card block bg-white border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/25 hover:shadow-xl transition-all duration-500 h-full"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/kilimanjaro.png"
                  alt={route.name}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-full border backdrop-blur-xl ${difficultyColors[route.difficulty] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {route.difficulty}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-xl rounded-full">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold text-white tracking-wide">{route.duration}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#333333] mb-2 group-hover/card:text-[#B78A42] transition-colors">{route.name}</h3>
                <p className="text-xs text-[#333333]/45 leading-relaxed line-clamp-2 mb-4">{route.description}</p>
                <span className="inline-flex items-center gap-1 text-[#B78A42] text-xs font-semibold group-hover/card:gap-2 transition-all">
                  View Route <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-5">
        {routes!.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#B78A42]/20" />
        ))}
      </div>
    </div>
  );
}

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const destination = getDestinationBySlug(slug);

  const overviewRef = useRef(null);
  const routesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const overviewInView = useInView(overviewRef, { once: true, margin: '-80px' });
  const routesInView = useInView(routesRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
  const hasClimateZones = destination.climateZones && destination.climateZones.length > 0;
  const hasRoutes = destination.routes && destination.routes.length > 0;
  const hasGallery = destination.gallery && destination.gallery.length > 0;
  const slideshowImages = hasGallery ? destination.gallery! : [destination.image];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1">
        {/* Top spacer */}
        <div className="pt-24 lg:pt-28 bg-white" />

        {/* Overview — Title left + Photo Slideshow right */}
        <section className="pb-20 lg:pb-28 bg-white" ref={overviewRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Discover <span className="text-[#B78A42]">{destination.name}</span>
                </h2>
                <p className="text-base text-[#333333]/60 leading-relaxed">
                  {destination.longDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group">
                  {slideshowImages.length > 1 ? (
                    <PhotoSlideshow images={slideshowImages} alt={destination.name} />
                  ) : (
                    <img src={destination.image} alt={destination.name} className="w-full h-[480px] object-cover" />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Climate Zones */}
        {hasClimateZones && (
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
                  Climate <span className="text-[#B78A42]">Zones</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  From tropical rainforest to arctic glacier, experience distinct worlds in a single ascent.
                </p>
              </motion.div>

              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(destination.climateZones!.length, 5)} gap-4`}>
                {destination.climateZones!.map((zone, i) => {
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

        {/* Climbing Routes */}
        {hasRoutes && (
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
                  Distinct routes to the summit, each with its own character, scenery, and challenge level.
                </p>
              </motion.div>

              <ScrollableRoutes routes={destination.routes} routesInView={routesInView} />
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

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
