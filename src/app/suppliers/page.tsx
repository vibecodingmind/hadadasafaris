'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Star,
  Check,
  ArrowRight,
  Send,
  ChevronDown,
  Wifi,
  UtensilsCrossed,
  Bath,
  Users,
  Clock,
  Coffee,
  TreePine,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

/* ─── Lodge Data ─── */
const lodges = [
  {
    name: 'Taasa Tanzania Safari Lodge',
    image: '/images/taasa-lodge.png',
    location: 'Between Ngorongoro, Maasai Mara & Serengeti',
    tagline: 'Centrally Located Luxury',
    description: 'Centrally located between 3 of the largest safari ecosystems in the world — Ngorongoro Conservation Area, Maasai Mara National Reserve, and Serengeti National Park. TAASA Lodge offers luxurious accommodations, intimate, crowd-free game viewing and exclusive Big 5 encounters.',
    longDescription: 'During your stay, choose from a variety of activities, from exhilarating game drives in open vehicles and bush walks to cultural visits and bird watching. With unparalleled customer service and stunning views of the surrounding landscape, TAASA Lodge is the perfect place to discover and experience the wonders of Tanzania.',
    highlights: ['Big 5 encounters', 'Open vehicle game drives', 'Bush walks', 'Cultural visits', 'Bird watching', 'Panoramic views'],
  },
  {
    name: 'Nomad Camps & Lodges',
    image: '/images/nomad-camps.png',
    location: 'Serengeti, Ngorongoro & Remote Tanzania',
    tagline: 'Truly Great Adventures',
    description: 'Truly great adventures depend on truly exceptional basecamps. We locate our camps deep in the heart of spellbinding wilderness. Enjoy authentic luxury and ringside seats to the very best that nature has to offer.',
    longDescription: 'Nomad has been pioneering safari experiences in Tanzania for decades. Their camps are strategically placed in the most game-rich areas, ensuring that every moment of your stay delivers extraordinary wildlife encounters. From the legendary Serengeti plains to the untouched wilderness of southern Tanzania, Nomad camps are synonymous with authenticity and excellence.',
    highlights: ['Deep wilderness locations', 'Authentic luxury', 'Expert guiding', 'Ringside wildlife seats', 'Pioneering heritage', 'Southern circuit specialists'],
  },
  {
    name: 'Asilia Camps & Lodges',
    image: '/images/asilia-camps.png',
    location: 'East Africa',
    tagline: 'Enriching & Memorable',
    description: 'With Asilia, we offer our guests a safari experience that is both enriching and memorable. Renowned for their warm hospitality, exceptional service, and expert guiding, Asilia provides an unparalleled journey through the diverse landscapes of East Africa. Every aspect of your stay not only ensures you the very best in safari experiences but also directly supports local communities and conservation efforts. By choosing to stay with Asilia, you\'re making a positive impact on the people and environment of East Africa.',
    longDescription: 'Asilia operates a collection of award-winning camps and lodges across East Africa, each one carefully positioned in prime wildlife areas. Their commitment to sustainability goes beyond token gestures — Asilia camps are powered by solar energy, employ local communities, and fund conservation initiatives that protect the very wildlife their guests come to see. This is luxury with purpose.',
    highlights: ['Warm hospitality', 'Expert guiding', 'Conservation focus', 'Community support', 'Solar-powered camps', 'Award-winning'],
  },
];

const wildernessProperties = [
  {
    name: 'Crater\'s Edge – Ngorongoro',
    image: '/images/craters-edge.png',
    location: 'Northeastern Ngorongoro Crater Rim',
    description: 'Located on the serene northeastern rim of the Ngorongoro Crater, Crater\'s Edge offers 17 luxurious, insulated tents — perfect for couples, families, or small groups. The lodge is just 1 km from Lemala Gate and features stunning crater views, elegant dining, a cozy lounge, and a curated library.',
    highlights: ['10 Double, 5 Twin, and 2 Family Tents', 'All meals, house drinks, Wi-Fi & laundry included', 'À la carte & in-room dining available', 'Excludes park fees, game drives, premium beverages', 'Check-in: 14:00 | Check-out: 10:00'],
  },
  {
    name: 'Warangi Ridge – Serengeti',
    image: '/images/warangi-ridge.png',
    location: 'Central Serengeti',
    description: 'Warangi Ridge sits in the heart of the Central Serengeti, offering 15 luxury tents with private decks and panoramic views. Enjoy a plunge pool, fireplace, indoor/outdoor showers, and refined dining on dramatic rock-view decks.',
    highlights: ['13 Double tents (convertible), 1 Family Suite', 'Private pools, bathtubs, minibars, and fireplaces', 'All meals, drinks (excl. premium), gym access, Wi-Fi', 'Excludes park fees, game drives, airstrip transfers', 'Check-in: 14:00 | Check-out: 10:00'],
  },
];

const lemalaServices = [
  'Elegant tented accommodations with en-suite bathrooms',
  'All-inclusive gourmet dining with à la carte and bush meal options',
  'Private dining and sundowner setups',
  'Complimentary Wi-Fi in common areas',
  'Laundry and housekeeping services',
  'Transfers to and from airstrips or park gates',
  'Cultural visits and guided nature walks',
  'Wellness facilities and spa treatments at select lodges',
  'Family-friendly accommodation and amenities',
];

const additionalLodges = [
  {
    name: 'Lemala Camps & Lodges',
    image: '/images/lemala-camps.png',
    location: 'Serengeti, Ngorongoro & Tarangire',
    tagline: 'Eco-Conscious Luxury',
    description: 'Lemala Camps & Lodges offer a premium collection of intimate tented camps and classic lodges located in Tanzania\'s most spectacular wildlife destinations, including the Serengeti, Ngorongoro Crater, and Tarangire.',
    longDescription: 'Designed for discerning safari-goers, Lemala blends warm East African hospitality with eco-conscious luxury. Each camp provides front-row seats to wildlife experiences, personalized service, and immersive comfort — from crater rim elegance to thrilling plains encounters. Lemala combines eco-sensitive luxury with warm Tanzanian hospitality, ensuring your stay is both relaxing and memorable.',
    highlights: ['Intimate tented camps', 'Eco-conscious luxury', 'Crater rim locations', 'Personalized service', 'Front-row wildlife', 'Warm hospitality'],
    services: lemalaServices,
  },
  {
    name: 'Legendary Lodge',
    image: '/images/legendary-lodge.png',
    location: 'Arusha, Tanzania',
    tagline: 'A Peaceful Gateway',
    description: 'Set within a historic coffee estate on the outskirts of Arusha, Legendary Lodge offers a peaceful and luxurious gateway to Tanzania\'s Northern Safari Circuit. Surrounded by lush tropical gardens and the beauty of Mount Meru\'s landscapes, the lodge blends timeless elegance with warm Tanzanian hospitality.',
    longDescription: 'The lodge features spacious garden cottages and family cottages designed for comfort, privacy, and relaxation. Guests can enjoy beautifully appointed interiors, fireplaces, private verandas, and tranquil surroundings that make it the perfect place to unwind before or after a safari adventure.',
    experiences: ['Guided coffee tours through the neighboring coffee estate', 'Garden spa treatments', 'Cycling and walking trails', 'Cultural excursions in Arusha', 'Private dining experiences', 'Relaxing afternoons surrounded by nature'],
    highlights: ['Historic coffee estate', 'Garden cottages', 'Mount Meru views', 'Pre/post safari retreat', 'Private verandas', 'Spa treatments'],
  },
  {
    name: 'Acacia Farm Lodge',
    image: '/images/acacia-farm-lodge.png',
    location: 'Karatu, Great Rift Valley Escarpment',
    tagline: 'Luxury on a Coffee Farm',
    description: 'Nestled on a working coffee farm high on the Great Rift Valley escarpment, Acacia Farm Lodge offers a perfect blend of luxury, tranquility, and authentic Tanzanian charm. Surrounded by lush gardens, coffee plants, and panoramic views of the Karatu highlands and nearby Ngorongoro forest, the lodge provides a peaceful retreat in the heart of Tanzania\'s Northern Safari Circuit.',
    longDescription: 'Ideally located between Lake Manyara, Tarangire, Ngorongoro Crater, and Serengeti National Park, Acacia Farm Lodge serves as an excellent base for safari adventures. Guests can relax in spacious luxury suites featuring elegant African-inspired décor, private verandas, and modern comforts designed for relaxation after a day in the wilderness.',
    experiences: ['Coffee tours on the working farm', 'Swimming pool & spa', 'Fine dining restaurant', 'Guided nature walks', 'Cultural experiences', 'Panoramic Rift Valley views'],
    highlights: ['Working coffee farm', 'Rift Valley views', 'Central location', 'African-inspired décor', 'Swimming pool & spa', 'Fine dining'],
  },
  {
    name: 'Elewana Camps & Lodges',
    image: '/images/elewana-camps.png',
    location: 'Arusha, Serengeti, Ngorongoro & Beyond',
    tagline: 'Exceptional Luxury Collection',
    description: 'The Elewana Collection is known for its exceptional luxury lodges and tented camps set in some of Tanzania\'s most breathtaking destinations. Combining elegance, comfort, and authentic African hospitality, each property offers a unique stay surrounded by stunning landscapes and unforgettable natural beauty.',
    longDescription: 'From peaceful coffee estates in Arusha to the endless plains of the Serengeti and the scenic highlands of Ngorongoro, every lodge and camp is thoughtfully designed to provide privacy, relaxation, and personalized service. Guests can enjoy beautifully appointed suites, fine dining experiences, wellness facilities, and immersive cultural and nature-inspired activities. With a strong commitment to sustainability and community support, Elewana properties deliver a refined and authentic East African experience.',
    highlights: ['Exceptional luxury collection', 'Breathtaking destinations', 'Fine dining experiences', 'Wellness facilities', 'Sustainability commitment', 'Personalized service'],
  },
];

/* ─── Sub-component: Lodge Section ─── */
function LodgeSection({ lodge, index }: { lodge: typeof lodges[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={!isEven ? 'lg:order-2' : ''}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              <MapPin className="w-3 h-3" /> {lodge.location}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-4 leading-tight">{lodge.name}</h2>
            <p className="text-sm text-[#B78A42] font-semibold tracking-wider uppercase mb-4">{lodge.tagline}</p>
            <p className="text-[#333333]/60 leading-relaxed mb-4">{lodge.description}</p>
            <p className="text-[#333333]/50 leading-relaxed mb-6">{lodge.longDescription}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {lodge.highlights.map((h, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B78A42]/5 border border-[#B78A42]/8 rounded-full text-xs text-[#333333]/60">
                  <Star className="w-3 h-3 text-[#B78A42]" /> {h}
                </span>
              ))}
            </div>
            <Link href="/contact">
              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
                INQUIRE NOW <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={!isEven ? 'lg:order-1' : ''}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group">
              <img
                src={lodge.image}
                alt={lodge.name}
                className="w-full h-[360px] md:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent" />
            </div>
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
  const wildernessRef = useRef(null);
  const wildernessInView = useInView(wildernessRef, { once: true, margin: '-60px' });
  const [openLodge, setOpenLodge] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1">
        {/* Top spacer */}
        <div className="pt-32 lg:pt-36 bg-white" />

        {/* ═══ HERO SECTION ═══ */}
        <section ref={heroRef} className="pb-20 lg:pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Partner Camps & Lodges
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Where Luxury Meets <span className="text-[#B78A42]">the Wild</span>
                </h1>
                <p className="text-base text-[#333333]/60 leading-relaxed mb-6">
                  We have carefully curated a collection of Tanzania&apos;s finest camps and lodges — each one selected to meet our exacting standards for quality, location, service, and sustainability. These are not just places to stay; they are integral parts of your safari experience, offering front-row seats to nature&apos;s greatest spectacles while enveloping you in comfort and warmth.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#B78A42]">8+</div>
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase mt-1">Partner Lodges</div>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#B78A42]">5</div>
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase mt-1">Regions</div>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#B78A42]">100%</div>
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase mt-1">Handpicked</div>
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
                    src="/images/luxury-camp.png"
                    alt="Luxury Safari Camp"
                    className="w-full h-[400px] md:h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl px-5 py-4">
                      <p className="text-white text-sm font-semibold tracking-wide">&ldquo;The lodge is the destination itself&rdquo;</p>
                      <p className="text-white/50 text-xs mt-1">— Hadada Safaris</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURED LODGES ═══ */}
        {lodges.map((lodge, i) => (
          <LodgeSection key={lodge.name} lodge={lodge} index={i} />
        ))}

        {/* ═══ WILDERNESS COLLECTION ═══ */}
        <section ref={wildernessRef} className="py-20 lg:py-28 bg-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={wildernessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <TreePine className="w-3.5 h-3.5" /> Wilderness Collection
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Untamed Beauty, <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">Five-Star Luxury</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
                Wilderness Collection seamlessly blends the untamed beauty of Africa&apos;s wilderness with five-star luxury, offering an unforgettable and curated safari experience. Enjoy eco-sensitive tented accommodations, gourmet dining, and tailor-made adventures — all crafted to immerse you in the heart of nature with comfort and style.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {wildernessProperties.map((prop, i) => (
                <motion.div
                  key={prop.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={wildernessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#B78A42]/30 transition-all duration-500 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={prop.image}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full text-[10px] text-white/80 font-semibold tracking-wider uppercase">
                        <MapPin className="w-3 h-3" /> {prop.location}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D5BC92] transition-colors">{prop.name}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{prop.description}</p>
                    <div className="space-y-2.5">
                      {prop.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#B78A42] mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-white/55 leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ADDITIONAL LODGES ═══ */}
        {additionalLodges.map((lodge, i) => (
          <section key={lodge.name} className={`py-20 lg:py-28 ${i % 2 === 0 ? 'bg-[#FAFAF7]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i % 2 !== 0 ? '' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8 }}
                  className={i % 2 !== 0 ? 'lg:order-2' : ''}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                    <MapPin className="w-3 h-3" /> {lodge.location}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-3 leading-tight">{lodge.name}</h2>
                  <p className="text-sm text-[#B78A42] font-semibold tracking-wider uppercase mb-4">{lodge.tagline}</p>
                  <p className="text-[#333333]/60 leading-relaxed mb-4">{lodge.description}</p>
                  <p className="text-[#333333]/50 leading-relaxed mb-6">{lodge.longDescription}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lodge.highlights.map((h, hi) => (
                      <span key={hi} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B78A42]/5 border border-[#B78A42]/8 rounded-full text-xs text-[#333333]/60">
                        <Star className="w-3 h-3 text-[#B78A42]" /> {h}
                      </span>
                    ))}
                  </div>

                  {/* Services (Lemala only) */}
                  {lodge.services && (
                    <div className="mb-6">
                      <button
                        onClick={() => setOpenLodge(openLodge === i ? null : i)}
                        className="flex items-center gap-2 text-sm font-semibold text-[#B78A42] hover:text-[#333333] transition-colors group"
                      >
                        <UtensilsCrossed className="w-4 h-4" />
                        Lodge Services
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openLodge === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openLodge === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 bg-white border border-[#B78A42]/8 rounded-xl p-5 space-y-2.5">
                              {lodge.services.map((s, si) => (
                                <div key={si} className="flex items-start gap-2.5">
                                  <Check className="w-3.5 h-3.5 text-[#B78A42] mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-[#333333]/55 leading-relaxed">{s}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Experiences (Legendary, Acacia) */}
                  {lodge.experiences && (
                    <div className="mb-6">
                      <button
                        onClick={() => setOpenLodge(openLodge === i ? null : i)}
                        className="flex items-center gap-2 text-sm font-semibold text-[#B78A42] hover:text-[#333333] transition-colors group"
                      >
                        <Coffee className="w-4 h-4" />
                        Experiences
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openLodge === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openLodge === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 bg-white border border-[#B78A42]/8 rounded-xl p-5 space-y-2.5">
                              {lodge.experiences.map((e, ei) => (
                                <div key={ei} className="flex items-start gap-2.5">
                                  <Sparkles className="w-3.5 h-3.5 text-[#B78A42] mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-[#333333]/55 leading-relaxed">{e}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <Link href="/contact">
                    <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
                      INQUIRE NOW <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={i % 2 !== 0 ? 'lg:order-1' : ''}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#333333]/8 group">
                    <img
                      src={lodge.image}
                      alt={lodge.name}
                      className="w-full h-[360px] md:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ═══ CTA BANNER ═══ */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/luxury-camp.png" alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D5BC92]/8 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
              Plan Your Stay
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Experience{' '}
              <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                Luxury in the Wild
              </span>
              ?
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Let our team match you with the perfect lodge for your safari. We know each property personally and will recommend the ideal fit for your style, budget, and dream itinerary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                  PLAN YOUR STAY <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/255788071035"
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
