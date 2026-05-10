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
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Star,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

const itineraries = [
  {
    title: 'Amazing Departure in 2024/27',
    slug: 'amazing-departure',
    image: '/images/amazing-departure.png',
    duration: '7 Days',
    groupSize: '2-6 People',
    tag: 'Popular',
    tagColor: 'bg-[#B78A42] text-white',
    price: 'From $2,500',
    region: 'Northern Circuit',
    highlights: ['Serengeti Game Drives', 'Ngorongoro Crater', 'Tarangire National Park', 'Lake Manyara'],
    description: 'Experience the best of Tanzania\'s northern circuit in a week-long adventure. From the elephant herds of Tarangire to the big cats of the Serengeti, this itinerary delivers the quintessential safari.',
  },
  {
    title: 'Migration Safari Program',
    slug: 'migration-safari',
    image: '/images/migration.png',
    duration: '10 Days',
    groupSize: '2-8 People',
    tag: 'Signature',
    tagColor: 'bg-[#1a1a1a] text-white',
    price: 'From $4,200',
    region: 'Serengeti & Ngorongoro',
    highlights: ['Great Migration', 'Central Serengeti', 'Ndutu Calving Grounds', 'Ngorongoro Crater'],
    description: 'Witness nature\'s greatest spectacle — the Great Migration. Follow millions of wildebeest and zebra across the Serengeti plains, with expert guides positioning you for the most dramatic moments.',
  },
  {
    title: 'Luxury Honeymoon Package',
    slug: 'luxury-honeymoon',
    image: '/images/honeymoon-package.png',
    duration: '8 Days',
    groupSize: '2 People',
    tag: 'Romance',
    tagColor: 'bg-rose-500 text-white',
    price: 'From $5,800',
    region: 'Serengeti & Zanzibar',
    highlights: ['Private Safari Vehicle', 'Luxury Lodge Stays', 'Zanzibar Beach Extension', 'Romantic Bush Dinners'],
    description: 'The perfect blend of adventure and romance. Enjoy private game drives, intimate bush dinners under the stars, and end with turquoise waters on Zanzibar\'s pristine beaches.',
  },
  {
    title: 'Luxury Summer Zanzibar',
    slug: 'luxury-zanzibar',
    image: '/images/zanzibar-beach.png',
    duration: '6 Days',
    groupSize: '2-4 People',
    tag: 'Beach',
    tagColor: 'bg-cyan-500 text-white',
    price: 'From $2,800',
    region: 'Zanzibar Island',
    highlights: ['Beachfront Villa', 'Spice Tour', 'Sunset Dhow Cruise', 'Snorkeling & Diving'],
    description: 'Escape to the Spice Island for pure tropical luxury. Stay in beachfront villas, explore historic Stone Town, sail on a traditional dhow at sunset, and discover vibrant coral reefs.',
  },
  {
    title: 'Dry Season Private Safari',
    slug: 'dry-season-safari',
    image: '/images/dry-season-safari.png',
    duration: '9 Days',
    groupSize: '2-6 People',
    tag: 'Exclusive',
    tagColor: 'bg-amber-700 text-white',
    price: 'From $4,500',
    region: 'Southern Circuit',
    highlights: ['Private Guide & Vehicle', 'Ruaha National Park', 'Selous Game Reserve', 'Fly Camping'],
    description: 'An exclusive journey through Tanzania\'s southern circuit during the prime dry season. Experience remote, crowd-free wilderness with extraordinary wildlife encounters.',
  },
  {
    title: 'Immersive Culture Trips',
    slug: 'culture-trips',
    image: '/images/culture-trips.png',
    duration: '5 Days',
    groupSize: '4-10 People',
    tag: 'Culture',
    tagColor: 'bg-orange-500 text-white',
    price: 'From $1,800',
    region: 'Northern Tanzania',
    highlights: ['Maasai Village Visit', 'Hadzabe Bushmen', 'Iraqw Cultural Tour', 'Local Cooking Class'],
    description: 'Connect with Tanzania\'s rich cultural heritage. Spend time with Maasai warriors, hunt with the Hadzabe bushmen, and learn traditional crafts from local artisans.',
  },
  {
    title: 'Custom and Traditional Trip',
    slug: 'custom-trip',
    image: '/images/custom-trip.png',
    duration: 'Custom',
    groupSize: 'Flexible',
    tag: 'Tailor-Made',
    tagColor: 'bg-[#333333] text-white',
    price: 'Contact Us',
    region: 'Your Choice',
    highlights: ['Fully Customizable', 'Any Duration', 'Any Destination', 'Your Budget'],
    description: 'Can\'t find exactly what you\'re looking for? Let us design a safari from scratch, built entirely around your interests, budget, timeline, and travel style.',
  },
];

export default function ItinerariesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

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
                  <Sparkles className="w-3.5 h-3.5" /> Safari Itineraries
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Journeys Designed to <span className="text-[#B78A42]">Inspire</span>
                </h1>
                <p className="text-base text-[#333333]/60 leading-relaxed mb-6">
                  Every itinerary we craft is a carefully orchestrated journey through Tanzania&apos;s most spectacular landscapes. From the legendary Serengeti to the untouched southern parks, each trip is designed to maximize your time in the wild while enveloping you in comfort and authenticity.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#B78A42]">7</div>
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase mt-1">Itineraries</div>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#B78A42]">5-10</div>
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase mt-1">Days</div>
                  </div>
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#B78A42]">100%</div>
                    <div className="text-[10px] text-[#333333]/40 font-semibold tracking-wider uppercase mt-1">Tailorable</div>
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
                    src="/images/hero-safari.png"
                    alt="Safari Itineraries"
                    className="w-full h-[400px] md:h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURED: First two itineraries (large cards) ═══ */}
        <section className="py-12 lg:py-16 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {itineraries.slice(0, 2).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                >
                  <Link href="/contact" className="group block bg-white rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-[#1a1a1a]/20 to-transparent" />
                      <span className={`absolute top-4 left-4 px-3 py-1.5 ${item.tagColor} text-[10px] font-bold rounded-full tracking-wider uppercase`}>
                        {item.tag}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D5BC92] transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-white/70 text-xs bg-white/10 backdrop-blur-xl px-2.5 py-1 rounded-full">
                            <Clock className="w-3 h-3 text-[#D5BC92]" /> {item.duration}
                          </span>
                          <span className="flex items-center gap-1 text-white/70 text-xs bg-white/10 backdrop-blur-xl px-2.5 py-1 rounded-full">
                            <MapPin className="w-3 h-3 text-[#D5BC92]" /> {item.region}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-[#333333]/50 leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {item.highlights.map((h) => (
                          <span key={h} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/50">
                            <Star className="w-3 h-3 text-[#B78A42]" /> {h}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#B78A42] font-bold text-lg">{item.price}</span>
                          <span className="text-[#333333]/30 text-xs block">per person</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[#B78A42] text-xs font-semibold group-hover:gap-2.5 transition-all">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GRID: Remaining itineraries ═══ */}
        <section ref={gridRef} className="py-12 lg:py-16 bg-[#FAFAF7]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.slice(2).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link href="/contact" className="group block bg-white rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-xl transition-all duration-500 h-full">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
                      <span className={`absolute top-4 left-4 px-3 py-1 ${item.tagColor} text-[10px] font-bold rounded-full tracking-wider uppercase`}>
                        {item.tag}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#D5BC92] transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-white/70 text-[11px]">
                            <Clock className="w-3 h-3 text-[#D5BC92]" /> {item.duration}
                          </span>
                          <span className="text-white/30">·</span>
                          <span className="flex items-center gap-1 text-white/70 text-[11px]">
                            <Users className="w-3 h-3 text-[#D5BC92]" /> {item.groupSize}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-[#333333]/50 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.highlights.slice(0, 3).map((h) => (
                          <span key={h} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-[11px] text-[#333333]/50">
                            <Star className="w-2.5 h-2.5 text-[#B78A42]" /> {h}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#B78A42] font-bold">{item.price}</span>
                          {item.price !== 'Contact Us' && <span className="text-[#333333]/30 text-xs"> /person</span>}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[#B78A42] text-xs font-semibold group-hover:gap-2 transition-all">
                          Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/serengeti-elephants.png" alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/10 blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 bg-[#B78A42] rounded-full animate-pulse" />
              Every Journey Is Personal
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Can&apos;t Choose? <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">We&apos;ll Help</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Tell us your dream, your timeline, and your budget — and we&apos;ll craft the perfect itinerary from scratch. Every safari is personal, and no two are ever the same.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                  PLAN MY SAFARI <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
