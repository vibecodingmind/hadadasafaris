'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/* ─── Lodge Data ─── */
interface LodgeSlide {
  src: string;
  alt: string;
}

interface Lodge {
  name: string;
  subtitle: string;
  location: string;
  description: string;
  slides: LodgeSlide[];
  darkBg?: boolean;
}

const lodges: Lodge[] = [
  {
    name: 'Taasa Tanzania Safari Lodge',
    subtitle: 'Centrally Located Luxury',
    location: 'Between Ngorongoro, Maasai Mara & Serengeti',
    description:
      'Centrally located between three of the largest safari ecosystems in the world — Ngorongoro Conservation Area, Maasai Mara National Reserve, and Serengeti National Park — TAASA Lodge offers luxurious accommodations, intimate crowd-free game viewing, and exclusive Big 5 encounters. During your stay, choose from a variety of activities: exhilarating game drives in open vehicles, guided bush walks, cultural visits to local communities, and world-class bird watching. With unparalleled customer service and stunning panoramic views of the surrounding landscape, TAASA Lodge is the perfect place to discover and experience the wonders of Tanzania.',
    slides: [
      { src: '/images/taasa-lodge.png', alt: 'Taasa Lodge exterior' },
      { src: '/images/taasa-lodge-2.png', alt: 'Taasa Lodge interior' },
      { src: '/images/taasa-lodge-3.png', alt: 'Taasa Lodge pool and savanna views' },
    ],
  },
  {
    name: 'Nomad Camps & Lodges',
    subtitle: 'Truly Great Adventures',
    location: 'Serengeti, Ngorongoro & Remote Tanzania',
    description:
      'Truly great adventures depend on truly exceptional basecamps. Nomad locates their camps deep in the heart of spellbinding wilderness, offering authentic luxury and ringside seats to the very best that nature has to offer. For decades, Nomad has been pioneering safari experiences in Tanzania, strategically placing camps in the most game-rich areas to ensure every moment delivers extraordinary wildlife encounters. From the legendary Serengeti plains to the untouched wilderness of southern Tanzania, Nomad camps are synonymous with authenticity and excellence — where the wilderness comes to your doorstep.',
    slides: [
      { src: '/images/nomad-camps.png', alt: 'Nomad Camps in Serengeti' },
      { src: '/images/nomad-camps-2.png', alt: 'Nomad Camps at sunset' },
      { src: '/images/nomad-camps-3.png', alt: 'Nomad Camps campfire gathering' },
    ],
  },
  {
    name: 'Asilia Camps & Lodges',
    subtitle: 'Enriching & Memorable',
    location: 'East Africa',
    description:
      'With Asilia, every safari experience is both enriching and memorable. Renowned for warm hospitality, exceptional service, and expert guiding, Asilia provides an unparalleled journey through the diverse landscapes of East Africa. Every aspect of your stay not only ensures the very best in safari experiences but also directly supports local communities and conservation efforts. Asilia operates a collection of award-winning camps powered by solar energy, employing local communities and funding conservation initiatives that protect the very wildlife their guests come to see. By choosing Asilia, you are making a positive impact on the people and environment of East Africa — this is luxury with purpose.',
    slides: [
      { src: '/images/asilia-camps.png', alt: 'Asilia Camps' },
      { src: '/images/asilia-camps-2.png', alt: 'Asilia Camps lounge area' },
      { src: '/images/asilia-camps-3.png', alt: 'Asilia Camps wildlife viewing deck' },
    ],
  },
  {
    name: 'Wilderness Collection',
    subtitle: 'Untamed Beauty, Five-Star Luxury',
    location: "Tanzania's Finest Wilderness Areas",
    description:
      "Wilderness Collection seamlessly blends the untamed beauty of Africa's wilderness with five-star luxury, offering an unforgettable and curated safari experience. Enjoy eco-sensitive tented accommodations, gourmet dining, and tailor-made adventures — all crafted to immerse you in the heart of nature with comfort and style. Each property in the collection has been thoughtfully designed to honour its extraordinary natural setting while delivering world-class hospitality, ensuring that your connection with the wild is never compromised by the comforts you deserve.",
    slides: [
      { src: '/images/wilderness-collection.png', alt: 'Wilderness Collection lodge' },
      { src: '/images/craters-edge.png', alt: "Crater's Edge – Ngorongoro" },
      { src: '/images/warangi-ridge.png', alt: 'Warangi Ridge – Serengeti' },
    ],
    darkBg: true,
  },
  {
    name: "Crater's Edge – Ngorongoro",
    subtitle: 'Elegance on the Crater Rim',
    location: 'Northeastern Ngorongoro Crater Rim',
    description:
      "Located on the serene northeastern rim of the Ngorongoro Crater, Crater's Edge offers seventeen luxurious, insulated tents — perfect for couples, families, or small groups seeking an intimate connection with one of Africa's greatest natural wonders. The lodge sits just one kilometre from Lemala Gate, granting effortless access to the crater floor for early-morning game drives. Guests enjoy stunning crater views from private decks, elegant dining experiences, a cozy lounge with fireplace, and a curated library — all designed to complement the awe-inspiring landscape that surrounds you.",
    slides: [
      { src: '/images/craters-edge.png', alt: "Crater's Edge exterior" },
      { src: '/images/craters-edge-2.png', alt: "Crater's Edge tent interior" },
      { src: '/images/craters-edge-3.png', alt: "Crater's Edge dining room" },
    ],
  },
  {
    name: 'Warangi Ridge – Serengeti',
    subtitle: 'Panoramic Serengeti Luxury',
    location: 'Central Serengeti',
    description:
      "Warangi Ridge sits in the heart of the Central Serengeti, offering fifteen luxury tents with private decks and panoramic views that stretch endlessly across the plains. Each tent features a private plunge pool, fireplace, indoor and outdoor showers, and a standalone bathtub — creating a private sanctuary amid one of the world's most spectacular wildlife arenas. Refined dining is served on dramatic rock-view decks, where the vast Serengeti unfolds before you. This is where the raw power of the Serengeti meets uncompromising luxury.",
    slides: [
      { src: '/images/warangi-ridge.png', alt: 'Warangi Ridge exterior' },
      { src: '/images/warangi-ridge-2.png', alt: 'Warangi Ridge private pool deck' },
      { src: '/images/warangi-ridge-3.png', alt: 'Warangi Ridge tent bathroom' },
    ],
  },
  {
    name: 'Lemala Camps & Lodges',
    subtitle: 'Eco-Conscious Luxury',
    location: 'Serengeti, Ngorongoro & Tarangire',
    description:
      "Lemala Camps & Lodges offer a premium collection of intimate tented camps and classic lodges located in Tanzania's most spectacular wildlife destinations — from the sweeping plains of the Serengeti to the dramatic rim of the Ngorongoro Crater and the ancient baobabs of Tarangire. Designed for discerning safari-goers, Lemala blends warm East African hospitality with eco-conscious luxury. Each camp provides front-row seats to wildlife experiences, personalised service, and immersive comfort — from crater rim elegance to thrilling plains encounters. Guests enjoy elegant tented accommodations with en-suite bathrooms, all-inclusive gourmet dining with bush meal options, private dining and sundowner setups, wellness facilities, and cultural visits that connect you with the land and its people.",
    slides: [
      { src: '/images/lemala-camps.png', alt: 'Lemala Camps' },
      { src: '/images/lemala-camps-2.png', alt: 'Lemala bush dining experience' },
      { src: '/images/lemala-camps-3.png', alt: 'Lemala Camps at misty crater rim' },
    ],
  },
  {
    name: 'Entara Camps & Lodges',
    subtitle: 'Authentic Wilderness Immersion',
    location: 'Serengeti, Ngorongoro & Southern Tanzania',
    description:
      "Entara Camps & Lodges deliver an authentic wilderness immersion, placing guests in the heart of Tanzania's most extraordinary landscapes without sacrificing comfort or warmth. Each camp is thoughtfully designed to blend seamlessly with its natural surroundings — from the vast golden plains of the Serengeti to the lush highlands of Ngorongoro and the remote beauty of southern Tanzania. Entara's intimate, eco-sensitive camps offer a genuine connection to the land: fall asleep to the sounds of the wild, wake to breathtaking sunrises, and share stories around the campfire under a canopy of stars. With expert local guides, personalised service, and a deep respect for the environment, Entara creates safari moments that feel both profoundly real and effortlessly comfortable.",
    slides: [
      { src: '/images/entara-camps.png', alt: 'Entara Camps in the wilderness' },
      { src: '/images/entara-camps-2.png', alt: 'Entara Camps tent interior' },
      { src: '/images/entara-camps-3.png', alt: 'Entara Camps bush breakfast' },
    ],
  },
  {
    name: 'Nimali Africa',
    subtitle: 'Contemporary Safari Elegance',
    location: 'Serengeti & Tarangire, Tanzania',
    description:
      "Nimali Africa redefines the safari experience with a collection of contemporary luxury lodges that celebrate the beauty of simplicity and the power of place. Set in some of Tanzania's most iconic locations — from the endless Serengeti plains to the ancient baobab-studded landscapes of Tarangire — each Nimali property is a masterclass in refined design, where clean modern lines meet the raw grandeur of the African bush. Spacious suites with floor-to-ceiling windows frame ever-changing vistas, private decks invite quiet contemplation, and plunge pools offer cool respite after a morning of game viewing. Nimali's commitment to sustainability, community partnership, and exceptional guiding ensures that every stay is as meaningful as it is memorable.",
    slides: [
      { src: '/images/nimali-africa.png', alt: 'Nimali Africa lodge' },
      { src: '/images/nimali-africa-2.png', alt: 'Nimali Africa suite with savanna views' },
      { src: '/images/nimali-africa-3.png', alt: 'Nimali Africa fire pit lounge' },
    ],
  },
  {
    name: 'Legendary Lodge',
    subtitle: 'A Peaceful Gateway',
    location: 'Arusha, Tanzania',
    description:
      "Set within a historic coffee estate on the outskirts of Arusha, Legendary Lodge offers a peaceful and luxurious gateway to Tanzania's Northern Safari Circuit. Surrounded by lush tropical gardens and the beauty of Mount Meru's landscapes, the lodge blends timeless elegance with warm Tanzanian hospitality. The lodge features spacious garden cottages and family cottages designed for comfort, privacy, and relaxation — with beautifully appointed interiors, fireplaces, private verandas, and tranquil surroundings. Guests can enjoy guided coffee tours through the neighbouring estate, garden spa treatments, cycling and walking trails, cultural excursions in Arusha, and private dining experiences. It is the perfect place to unwind before or after a safari adventure.",
    slides: [
      { src: '/images/legendary-lodge.png', alt: 'Legendary Lodge exterior' },
      { src: '/images/legendary-lodge-2.png', alt: 'Legendary Lodge gardens and Mount Meru' },
      { src: '/images/legendary-lodge-3.png', alt: 'Legendary Lodge cottage interior' },
    ],
  },
  {
    name: 'Acacia Farm Lodge',
    subtitle: 'Luxury on a Coffee Farm',
    location: 'Karatu, Great Rift Valley Escarpment',
    description:
      "Nestled on a working coffee farm high on the Great Rift Valley escarpment, Acacia Farm Lodge offers a perfect blend of luxury, tranquility, and authentic Tanzanian charm. Surrounded by lush gardens, coffee plants, and panoramic views of the Karatu highlands and nearby Ngorongoro forest, the lodge provides a peaceful retreat in the heart of Tanzania's Northern Safari Circuit. Ideally located between Lake Manyara, Tarangire, Ngorongoro Crater, and Serengeti National Park, Acacia Farm Lodge serves as an excellent base for safari adventures. Guests relax in spacious luxury suites featuring elegant African-inspired decor, private verandas, and modern comforts — complemented by a swimming pool, spa, fine dining, coffee tours, and guided nature walks.",
    slides: [
      { src: '/images/acacia-farm-lodge.png', alt: 'Acacia Farm Lodge' },
      { src: '/images/acacia-farm-lodge-2.png', alt: 'Acacia Farm Lodge Rift Valley views' },
      { src: '/images/acacia-farm-lodge-3.png', alt: 'Acacia Farm Lodge dining' },
    ],
  },
  {
    name: 'Elewana Camps & Lodges',
    subtitle: 'Exceptional Luxury Collection',
    location: 'Arusha, Serengeti, Ngorongoro & Beyond',
    description:
      "The Elewana Collection is known for its exceptional luxury lodges and tented camps set in some of Tanzania's most breathtaking destinations. Combining elegance, comfort, and authentic African hospitality, each property offers a unique stay surrounded by stunning landscapes and unforgettable natural beauty. From peaceful coffee estates in Arusha to the endless plains of the Serengeti and the scenic highlands of Ngorongoro, every lodge and camp is thoughtfully designed to provide privacy, relaxation, and personalised service. Guests enjoy beautifully appointed suites, fine dining experiences, wellness facilities, and immersive cultural and nature-inspired activities. With a strong commitment to sustainability and community support, Elewana properties deliver a refined and authentic East African experience.",
    slides: [
      { src: '/images/elewana-camps.png', alt: 'Elewana Camps' },
      { src: '/images/elewana-camps-2.png', alt: 'Elewana Camps suite interior' },
      { src: '/images/elewana-camps-3.png', alt: 'Elewana Camps sunset bar' },
    ],
  },
];

/* ─── Slideshow Component (CSS Crossfade — robust, no stale closures) ─── */
function Slideshow({ slides, index }: { slides: LodgeSlide[]; index: number }) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const transitioningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const len = slides.length;

  // Keep ref in sync
  useEffect(() => { currentRef.current = current; }, [current]);

  const clearAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    clearAuto();
    intervalRef.current = setInterval(() => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setCurrent((c) => (c + 1) % len);
      setTimeout(() => { transitioningRef.current = false; }, 750);
    }, 5000);
  }, [clearAuto, len]);

  useEffect(() => {
    startAuto();
    return clearAuto;
  }, [startAuto, clearAuto]);

  // Reset to first slide when lodge index changes
  useEffect(() => {
    setCurrent(0);
    currentRef.current = 0;
    transitioningRef.current = false;
    startAuto();
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback(
    (dir: 'next' | 'prev') => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setCurrent((c) => dir === 'next' ? (c + 1) % len : c === 0 ? len - 1 : c - 1);
      startAuto();
      setTimeout(() => { transitioningRef.current = false; }, 750);
    },
    [len, startAuto]
  );

  const goToSlide = useCallback(
    (i: number) => {
      if (transitioningRef.current || i === currentRef.current) return;
      transitioningRef.current = true;
      setCurrent(i);
      startAuto();
      setTimeout(() => { transitioningRef.current = false; }, 750);
    },
    [startAuto]
  );

  // Touch / swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? 'next' : 'prev');
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group"
      onMouseEnter={clearAuto}
      onMouseLeave={startAuto}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
        {/* Render ALL images, only the current one is visible */}
        {slides.map((slide, i) => (
          <img
            key={`${index}-${i}`}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
            draggable={false}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent pointer-events-none z-10" />
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo('prev')}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-white opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black/40 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo('next')}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-white opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black/40 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-7 bg-white shadow-lg shadow-white/20' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      {slides.length > 1 && (
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/25 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-[11px] font-semibold text-white/80 tracking-wide">
            {current + 1} / {len}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Lodge Section Component ─── */
function LodgeSection({ lodge, index }: { lodge: Lodge; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  if (lodge.darkBg) {
    return (
      <section ref={ref} className="py-20 lg:py-28 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                <MapPin className="w-3 h-3" /> {lodge.location}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">{lodge.name}</h2>
              <p className="text-sm text-[#D5BC92] font-semibold tracking-wider uppercase mb-5">{lodge.subtitle}</p>
              <p className="text-white/55 leading-[1.85] text-[15px]">{lodge.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Slideshow slides={lodge.slides} index={index} />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={`py-20 lg:py-28 ${isEven ? 'bg-white' : 'bg-[#FAFAF7]'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={!isEven ? 'lg:order-2' : ''}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              <MapPin className="w-3 h-3" /> {lodge.location}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-2 leading-tight">{lodge.name}</h2>
            <p className="text-sm text-[#B78A42] font-semibold tracking-wider uppercase mb-5">{lodge.subtitle}</p>
            <p className="text-[#333333]/60 leading-[1.85] text-[15px]">{lodge.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={!isEven ? 'lg:order-1' : ''}
          >
            <Slideshow slides={lodge.slides} index={index} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function CampsAndLodgesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });

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
                  Partner Camps &amp; Lodges
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Where Luxury Meets{' '}
                  <span className="text-[#B78A42]">the Wild</span>
                </h1>
                <p className="text-base text-[#333333]/55 leading-[1.85]">
                  We have carefully curated a collection of Tanzania&apos;s finest camps and lodges — each one selected
                  for quality, location, service, and sustainability. These are not just places to stay; they are
                  integral parts of your safari experience, offering front-row seats to nature&apos;s greatest
                  spectacles while enveloping you in comfort and warmth.
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
                { value: '12', label: 'Partner Lodges' },
                { value: '6', label: 'Regions' },
                { value: '100%', label: 'Handpicked' },
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

        {/* ═══ LODGE SECTIONS ═══ */}
        {lodges.map((lodge, i) => (
          <LodgeSection key={lodge.name} lodge={lodge} index={i} />
        ))}

        {/* ═══ CLOSING SECTION ═══ */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/luxury-camp.png" alt="" className="w-full h-full object-cover opacity-10" />
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
              Ready to Experience{' '}
              <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                Luxury in the Wild
              </span>
              ?
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Let our team match you with the perfect lodge for your safari. We know each property
              personally and will recommend the ideal fit for your style, budget, and dream itinerary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#B78A42] hover:bg-[#A67A35] text-white text-sm font-bold tracking-wider rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30"
              >
                PLAN YOUR STAY
              </Link>
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
