'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Calendar, Clock, Users, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const itineraries = [
  { title: 'Amazing Departure in 2024/27', image: '/images/hero-safari.png', duration: '7 Days', groupSize: '2-6 People', tag: 'Popular', price: 'From $2,500', highlights: ['Serengeti Game Drives', 'Ngorongoro Crater', 'Tarangire National Park', 'Lake Manyara'], description: 'Experience the best of Tanzania\'s northern circuit in a week-long adventure. From the elephant herds of Tarangire to the big cats of the Serengeti, this itinerary delivers the quintessential safari.' },
  { title: 'Migration Safari Program', image: '/images/migration.png', duration: '10 Days', groupSize: '2-8 People', tag: 'Signature', price: 'From $4,200', highlights: ['Great Migration', 'Central Serengeti', 'Ndutu Calving Grounds', 'Ngorongoro Crater'], description: 'Witness nature\'s greatest spectacle — the Great Migration. Follow millions of wildebeest and zebra across the Serengeti plains, with expert guides positioning you for the most dramatic moments.' },
  { title: 'Luxury Honeymoon Package', image: '/images/luxury-camp.png', duration: '8 Days', groupSize: '2 People', tag: 'Romance', price: 'From $5,800', highlights: ['Private Safari Vehicle', 'Luxury Lodge Stays', 'Zanzibar Beach Extension', 'Romantic Bush Dinners'], description: 'The perfect blend of adventure and romance. Enjoy private game drives, intimate bush dinners under the stars, and end with turquoise waters on Zanzibar\'s pristine beaches.' },
  { title: 'Luxury Summer Zanzibar', image: '/images/zanzibar-beach.png', duration: '6 Days', groupSize: '2-4 People', tag: 'Beach', price: 'From $2,800', highlights: ['Beachfront Villa', 'Spice Tour', 'Sunset Dhow Cruise', 'Snorkeling & Diving'], description: 'Escape to the Spice Island for pure tropical luxury. Stay in beachfront villas, explore historic Stone Town, sail on a traditional dhow at sunset, and discover vibrant coral reefs.' },
  { title: 'Dry Season Private Safari', image: '/images/serengeti-elephants.png', duration: '9 Days', groupSize: '2-6 People', tag: 'Exclusive', price: 'From $4,500', highlights: ['Private Guide & Vehicle', 'Ruaha National Park', 'Selous Game Reserve', 'Fly Camping'], description: 'An exclusive journey through Tanzania\'s southern circuit during the prime dry season. Experience remote, crowd-free wilderness with extraordinary wildlife encounters.' },
  { title: 'Immersive Culture Trips', image: '/images/cultural-experience.png', duration: '5 Days', groupSize: '4-10 People', tag: 'Culture', price: 'From $1,800', highlights: ['Maasai Village Visit', 'Hadzabe Bushmen', 'Iraqw Cultural Tour', 'Local Cooking Class'], description: 'Connect with Tanzania\'s rich cultural heritage. Spend time with Maasai warriors, hunt with the Hadzabe bushmen, and learn traditional crafts from local artisans.' },
  { title: 'Custom and Traditional Trip', image: '/images/ngorongoro-lunch.png', duration: 'Custom', groupSize: 'Flexible', tag: 'Tailor-Made', price: 'Contact Us', highlights: ['Fully Customizable', 'Any Duration', 'Any Destination', 'Your Budget'], description: 'Can\'t find exactly what you\'re looking for? Let us design a safari from scratch, built entirely around your interests, budget, timeline, and travel style.' },
];

export default function ItinerariesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero title="Safari" highlight="Itineraries" subtitle="Handcrafted journeys designed to immerse you in the magic of Tanzania" image="/images/serengeti-elephants.png" />
      <Breadcrumb items={[{ label: 'Itineraries' }]} />
      <main className="flex-1">
        <section className="py-24 bg-[#FAFAF7]" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4"><Calendar className="w-3.5 h-3.5" /> All Itineraries</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">Curated <span className="text-[#B78A42]">Experiences</span></h2>
            </motion.div>

            <div className="space-y-8">
              {itineraries.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="bg-white rounded-2xl border border-[#B78A42]/5 hover:border-[#B78A42]/15 hover:shadow-xl transition-all duration-500 overflow-hidden group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-xl border border-white/25 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">{item.tag}</span>
                      <div className="absolute bottom-4 left-4 flex items-center gap-3 lg:hidden">
                        <span className="flex items-center gap-1 text-white text-xs bg-white/15 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded-full"><Clock className="w-3 h-3 text-[#D5BC92]" />{item.duration}</span>
                        <span className="flex items-center gap-1 text-white text-xs bg-white/15 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded-full"><Users className="w-3 h-3 text-[#D5BC92]" />{item.groupSize}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-2 p-6 lg:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#333333] group-hover:text-[#B78A42] transition-colors">{item.title}</h3>
                          <div className="hidden lg:flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-[#333333]/50 text-xs"><Clock className="w-3.5 h-3.5 text-[#B78A42]" />{item.duration}</span>
                            <span className="flex items-center gap-1 text-[#333333]/50 text-xs"><Users className="w-3.5 h-3.5 text-[#B78A42]" />{item.groupSize}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[#B78A42] font-bold text-lg">{item.price}</span>
                          <span className="text-[#333333]/30 text-xs block">per person</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#333333]/50 leading-relaxed mb-5">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.highlights.map((h) => (
                          <span key={h} className="inline-flex items-center gap-1 px-3 py-1 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/50">
                            <Star className="w-3 h-3 text-[#B78A42]" />{h}
                          </span>
                        ))}
                      </div>
                      <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group/btn">
                        INQUIRE NOW <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
