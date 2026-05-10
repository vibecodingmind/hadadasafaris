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
  Sparkles,
  Star,
  Check,
  Crown,
  Gem,
  Flame,
  Sunrise,
  Camera,
  Wine,
  UtensilsCrossed,
  Wind,
  Eye,
  Heart,
  Shield,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

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

/* ─── Balloon Safari: Timeline Steps ─── */
const balloonTimeline = [
  {
    time: '5:00 AM',
    title: 'Pre-Dawn Pickup',
    description: 'Collected from your lodge under starlit skies, driven to the launch site as the savannah sleeps.',
    icon: Moon,
    highlight: false,
  },
  {
    time: '5:30 AM',
    title: 'Balloon Inflation',
    description: 'Watch the balloon come to life as it inflates — a magical spectacle of fire, fabric, and anticipation.',
    icon: Flame,
    highlight: false,
  },
  {
    time: '6:00 AM',
    title: 'Sunrise Ascent',
    description: 'Lift off as dawn breaks. The Serengeti awakens below — herds stretching to the horizon, predators returning from the hunt.',
    icon: Sunrise,
    highlight: true,
  },
  {
    time: '6:30 AM',
    title: 'Low-Level Wildlife',
    description: 'Your pilot skims above treetops and riverbanks for intimate, eye-level encounters with elephants, hippos, and big cats.',
    icon: Eye,
    highlight: false,
  },
  {
    time: '6:50 AM',
    title: 'High Altitude Panorama',
    description: 'Rise above the plains to witness the vast scale of the Great Migration — millions of animals in motion.',
    icon: Wind,
    highlight: false,
  },
  {
    time: '7:15 AM',
    title: 'Champagne & Bush Breakfast',
    description: 'Land on the open plain for a traditional champagne toast, followed by a lavish full English breakfast under acacia trees.',
    icon: Wine,
    highlight: true,
  },
];

function Moon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

/* ─── Balloon Safari: Pricing Tiers ─── */
const balloonPackages = [
  {
    name: 'Classic Balloon',
    subtitle: 'Shared Experience',
    price: '$599',
    per: 'per person',
    features: [
      '1-hour balloon flight',
      'Champagne toast on landing',
      'Full English bush breakfast',
      'Return transfer to lodge',
      'Flight certificate',
    ],
    icon: Star,
    popular: false,
  },
  {
    name: 'Premium Balloon',
    subtitle: 'Smaller Basket',
    price: '$849',
    per: 'per person',
    features: [
      '1-hour flight in small basket (8 max)',
      'Champagne toast on landing',
      'Gourmet bush breakfast',
      'Private transfer to launch site',
      'Flight certificate & photos',
      'Post-flight game drive',
    ],
    icon: Crown,
    popular: true,
  },
  {
    name: 'Private Balloon',
    subtitle: 'Exclusive Charter',
    price: '$2,499',
    per: 'per couple',
    features: [
      'Private balloon for 2',
      'Custom flight path available',
      'Champagne & gourmet breakfast',
      'Private guide & vehicle',
      'Professional photos included',
      'Flexible launch timing',
      'Complimentary safari hat',
    ],
    icon: Gem,
    popular: false,
  },
];

/* ─── Photo Slideshow Component ─── */
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

/* ─── Scrollable Routes Component ─── */
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
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-20 w-11 h-11 bg-white/80 backdrop-blur-xl border border-[#B78A42]/15 rounded-full shadow-lg flex items-center justify-center text-[#B78A42] hover:bg-[#B78A42] hover:text-white hover:border-[#B78A42] transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-20 w-11 h-11 bg-white/80 backdrop-blur-xl border border-[#B78A42]/15 rounded-full shadow-lg flex items-center justify-center text-[#B78A42] hover:bg-[#B78A42] hover:text-white hover:border-[#B78A42] transition-all duration-300"
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
              className="group/card block bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden hover:border-[#B78A42]/25 hover:shadow-xl hover:shadow-[#B78A42]/10 transition-all duration-500 h-full"
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

/* ─── Balloon Safari Timeline Section ─── */
function BalloonTimeline({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#B78A42]/30 via-[#B78A42]/15 to-[#B78A42]/30 md:-translate-x-px" />

      <div className="space-y-8 md:space-y-12">
        {balloonTimeline.map((step, i) => {
          const Icon = step.icon;
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={step.time}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 pl-14 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <div className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 md:p-6 hover:bg-white/80 hover:border-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/5 transition-all duration-500 relative overflow-hidden group ${
                  step.highlight ? 'ring-1 ring-[#B78A42]/20' : ''
                }`}>
                  {step.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B78A42] to-[#D5BC92]" />
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-bold tracking-wider uppercase mb-3">
                    <Clock className="w-3 h-3" /> {step.time}
                  </span>
                  <h3 className="font-bold text-[#333333] text-lg mb-2 group-hover:text-[#B78A42] transition-colors">{step.title}</h3>
                  <p className="text-sm text-[#333333]/55 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step.highlight
                    ? 'bg-gradient-to-br from-[#B78A42] to-[#D5BC92] shadow-lg shadow-[#B78A42]/25'
                    : 'bg-white/80 backdrop-blur-xl border border-[#B78A42]/15 shadow-md'
                }`}>
                  <Icon className={`w-5 h-5 ${step.highlight ? 'text-white' : 'text-[#B78A42]'}`} />
                </div>
              </div>

              {/* Spacer for other side */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Balloon Safari Pricing Section ─── */
function BalloonPricing({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {balloonPackages.map((pkg, i) => {
        const Icon = pkg.icon;
        return (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
            className={`relative bg-white/60 backdrop-blur-xl border rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#B78A42]/10 group overflow-hidden ${
              pkg.popular
                ? 'border-[#B78A42]/30 ring-1 ring-[#B78A42]/20 hover:border-[#B78A42]/50'
                : 'border-white/50 hover:border-[#B78A42]/20'
            }`}
          >
            {/* Popular badge */}
            {pkg.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-[#B78A42] to-[#D5BC92] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl">
                  Most Popular
                </div>
              </div>
            )}

            {/* Glass sheen */}
            {pkg.popular && (
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#B78A42]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
            )}

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                pkg.popular
                  ? 'bg-gradient-to-br from-[#B78A42] to-[#D5BC92] shadow-lg shadow-[#B78A42]/20'
                  : 'bg-[#B78A42]/8 group-hover:bg-[#B78A42]'
              } transition-all duration-500`}>
                <Icon className={`w-5 h-5 ${pkg.popular ? 'text-white' : 'text-[#B78A42] group-hover:text-white'} transition-colors duration-500`} />
              </div>

              <h3 className="font-bold text-[#333333] text-xl mb-1">{pkg.name}</h3>
              <p className="text-xs text-[#B78A42]/70 font-semibold tracking-wider uppercase mb-5">{pkg.subtitle}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-[#B78A42]">{pkg.price}</span>
                <span className="text-sm text-[#333333]/40 ml-2">{pkg.per}</span>
              </div>

              <div className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-[#B78A42]' : 'text-[#B78A42]/50'}`} />
                    <span className="text-sm text-[#333333]/60">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/booking" className="block">
                <Button className={`w-full font-bold text-xs tracking-wider rounded-full transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] text-white shadow-lg shadow-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/30'
                    : 'bg-white/70 backdrop-blur-xl border border-[#B78A42]/20 text-[#B78A42] hover:bg-[#B78A42] hover:text-white hover:border-[#B78A42]'
                }`}>
                  BOOK THIS PACKAGE
                </Button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Page Component ─── */
export default function DestinationPageClient() {
  const params = useParams();
  const slug = params.slug as string;
  const destination = getDestinationBySlug(slug);
  const isBalloon = slug === 'balloon-safari';

  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const routesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const timelineRef = useRef(null);
  const pricingRef = useRef(null);
  const highlightsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const overviewInView = useInView(overviewRef, { once: true, margin: '-80px' });
  const routesInView = useInView(routesRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });
  const pricingInView = useInView(pricingRef, { once: true, margin: '-80px' });
  const highlightsInView = useInView(highlightsRef, { once: true, margin: '-80px' });

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
        {/* ═══ STUNNING HERO SECTION ═══ */}
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-end overflow-hidden" ref={heroRef}>
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={isBalloon ? '/images/balloon-safari-hero.png' : destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 via-[#1a1a1a]/30 to-[#1a1a1a]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/30" />
          </div>

          {/* Decorative orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#B78A42]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full bg-[#D5BC92]/8 blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] font-semibold tracking-[0.25em] uppercase mb-6 shadow-lg shadow-black/10">
                <MapPin className="w-3.5 h-3.5 text-[#D5BC92]" /> {destination.region}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05]">
                {destination.name.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === destination.name.split(' ').length - 1 ? (
                      <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">{word}</span>
                    ) : (
                      <>{word} </>
                    )}
                  </span>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-8">
                {destination.description}
              </p>

              {/* Glass info bar */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 md:p-6 shadow-lg shadow-black/5">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D5BC92]" />
                    <div>
                      <div className="text-[10px] text-white/40 font-semibold tracking-wider uppercase">Best Time</div>
                      <div className="text-sm text-white/80 font-medium">{destination.bestTime}</div>
                    </div>
                  </div>
                  {destination.elevation && (
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-[#D5BC92]" />
                      <div>
                        <div className="text-[10px] text-white/40 font-semibold tracking-wider uppercase">Elevation</div>
                        <div className="text-sm text-white/80 font-medium">{destination.elevation}</div>
                      </div>
                    </div>
                  )}
                  {destination.area && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D5BC92]" />
                      <div>
                        <div className="text-[10px] text-white/40 font-semibold tracking-wider uppercase">Area</div>
                        <div className="text-sm text-white/80 font-medium">{destination.area}</div>
                      </div>
                    </div>
                  )}
                  <div className="ml-auto">
                    <Link href="/booking">
                      <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full shadow-lg shadow-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/30 transition-all duration-300 group">
                        BOOK NOW <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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

        {/* ═══ HIGHLIGHTS — Glass Cards ═══ */}
        <section className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden" ref={highlightsRef}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#D5BC92]/4 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Why You&apos;ll Love It
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                Trip <span className="text-[#B78A42]">Highlights</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {destination.highlights.map((highlight, i) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 hover:bg-white/90 hover:border-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/5 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500">
                      <Star className="w-4 h-4 text-[#B78A42] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <p className="text-sm font-medium text-[#333333]/70 group-hover:text-[#333333] leading-relaxed pt-2">{highlight}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activities + Wildlife row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
              {/* Activities */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={highlightsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6"
              >
                <h3 className="font-bold text-[#333333] text-lg mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#B78A42]" /> Activities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity) => (
                    <span key={activity} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#B78A42]/5 border border-[#B78A42]/10 rounded-full text-xs font-medium text-[#333333]/60 hover:bg-[#B78A42]/10 hover:text-[#B78A42] transition-colors duration-300">
                      <Check className="w-3 h-3 text-[#B78A42]" /> {activity}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Wildlife */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={highlightsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6"
              >
                <h3 className="font-bold text-[#333333] text-lg mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#B78A42]" /> Wildlife You May See
                </h3>
                <div className="flex flex-wrap gap-2">
                  {destination.wildlife.map((animal) => (
                    <span key={animal} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#B78A42]/5 border border-[#B78A42]/10 rounded-full text-xs font-medium text-[#333333]/60 hover:bg-[#B78A42]/10 hover:text-[#B78A42] transition-colors duration-300">
                      🐾 {animal}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ OVERVIEW — Title left + Photo Slideshow right ═══ */}
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden" ref={overviewRef}>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#B78A42]/4 blur-[150px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#D5BC92]/3 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                  {destination.tagline}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Discover{' '}
                  <span className="text-[#B78A42]">{destination.name}</span>
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
                  {/* Glass overlay badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-xl border border-white/25 rounded-full text-white text-[10px] font-bold tracking-wider uppercase">
                      <Camera className="w-3 h-3" /> Gallery
                    </span>
                  </div>
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

        {/* ═══ BALLOON SAFARI: What to Expect Timeline ═══ */}
        {isBalloon && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden" ref={timelineRef}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B78A42]/3 blur-[150px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Sunrise className="w-3.5 h-3.5" /> Your Morning
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  What to <span className="text-[#B78A42]">Expect</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  From pre-dawn pickup to champagne breakfast — every moment of your balloon safari is carefully orchestrated.
                </p>
              </motion.div>

              <BalloonTimeline isInView={timelineInView} />
            </div>
          </section>
        )}

        {/* ═══ Climate Zones ═══ */}
        {hasClimateZones && !isBalloon && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <TrendingUp className="w-3.5 h-3.5" /> Explore the Landscape
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Distinct <span className="text-[#B78A42]">Zones</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  {destination.name} features diverse landscapes, each with its own character, wildlife, and natural beauty.
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
                      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 hover:bg-white/90 hover:border-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/5 transition-all duration-500 group text-center"
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

        {/* ═══ BALLOON SAFARI: Climate Zones (styled differently) ═══ */}
        {isBalloon && hasClimateZones && (
          <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#B78A42]/4 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Wind className="w-3.5 h-3.5" /> Flight Stages
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  The <span className="text-[#B78A42]">Experience</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  Your balloon safari unfolds through distinct phases, each offering a unique perspective on the Serengeti.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {destination.climateZones!.map((zone, i) => {
                  const ZoneIcon = climateIcons[zone.icon] || Mountain;
                  return (
                    <motion.div
                      key={zone.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                      className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 hover:bg-white/90 hover:border-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/5 transition-all duration-500 group text-center relative overflow-hidden"
                    >
                      {/* Step number */}
                      <div className="absolute top-3 right-3 w-7 h-7 bg-[#B78A42]/5 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#B78A42]/40">{i + 1}</span>
                      </div>
                      <div className="w-14 h-14 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500">
                        <ZoneIcon className="w-6 h-6 text-[#B78A42] group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="font-bold text-[#333333] mb-1">{zone.name}</h3>
                      <div className="text-[10px] text-[#B78A42] font-semibold tracking-wider uppercase mb-3">{zone.elevation}</div>
                      <p className="text-xs text-[#333333]/50 leading-relaxed">{zone.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══ BALLOON SAFARI: Pricing Tiers ═══ */}
        {isBalloon && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden" ref={pricingRef}>
            <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D5BC92]/4 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Gem className="w-3.5 h-3.5" /> Choose Your Experience
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Balloon Safari <span className="text-[#B78A42]">Packages</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mt-4">
                  Every package includes the signature balloon flight and champagne breakfast. Choose the level of exclusivity that suits you.
                </p>
              </motion.div>

              <BalloonPricing isInView={pricingInView} />
            </div>
          </section>
        )}

        {/* ═══ Climbing Routes ═══ */}
        {hasRoutes && (
          <section className="py-20 lg:py-28 bg-[#FAFAF7]" ref={routesRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={routesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
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

        {/* ═══ FAQ ═══ */}
        {destination.accordion && destination.accordion.length > 0 && (
          <section className={`py-20 lg:py-28 ${isBalloon ? 'bg-white' : 'bg-white'} relative overflow-hidden`} ref={faqRef}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B78A42]/3 blur-[150px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
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
                    className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden hover:border-[#B78A42]/20 hover:shadow-lg hover:shadow-[#B78A42]/5 transition-all duration-300"
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
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B78A42]/15 to-transparent mb-4" />
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

        {/* ═══ BALLOON SAFARI: Mid-page CTA ═══ */}
        {isBalloon && (
          <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
            <div className="absolute inset-0">
              <img src="/images/balloon-safari.png" alt="" className="w-full h-full object-cover opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]" />
            </div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D5BC92]/8 blur-[120px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[#D5BC92] text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Limited Availability
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Balloon Safaris Sell Out{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                  Fast
                </span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-10 max-w-xl mx-auto">
                With only a few balloons launching each morning, spaces are extremely limited — especially during peak migration season. Book early to secure your spot.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/booking">
                  <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group shadow-lg shadow-[#B78A42]/20">
                    RESERVE YOUR FLIGHT <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="bg-white/10 backdrop-blur-xl border border-white/15 text-white font-semibold text-sm tracking-wider px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/25 transition-all duration-300">
                    ASK A QUESTION
                  </Button>
                </Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* ═══ Other Destinations ═══ */}
        <section className={`py-20 lg:py-28 ${isBalloon ? 'bg-[#FAFAF7]' : 'bg-[#FAFAF7]'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
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
                  className="group bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50 hover:border-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/10 transition-all duration-500"
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
                <Button className="bg-white/70 backdrop-blur-xl border border-[#B78A42]/15 hover:border-[#B78A42]/30 text-[#B78A42] font-bold text-xs tracking-wider px-8 py-3 rounded-full transition-all duration-300 hover:shadow-md hover:bg-white/90">
                  VIEW ALL DESTINATIONS
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CTA Banner ═══ */}
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
              <Link href="/booking">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group shadow-lg shadow-[#B78A42]/20">
                  BOOK YOUR SAFARI <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white/10 backdrop-blur-xl border border-white/15 text-white font-semibold text-sm tracking-wider px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/25 transition-all duration-300">
                  CONTACT US
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
