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
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'Mount Kilimanjaro', slug: 'kilimanjaro', image: '/images/kilimanjaro.png', tagline: "Africa's Highest Peak", description: 'Rising 5,895m above sea level, Kilimanjaro is Africa\'s tallest mountain and the world\'s highest free-standing peak. Trek through five distinct climate zones from tropical rainforest to arctic summit.' },
  { name: 'Serengeti National Park', slug: 'serengeti', image: '/images/serengeti-elephants.png', tagline: 'The Great Migration', description: 'Home to the legendary Great Migration, the Serengeti hosts over 2 million wildebeest and zebra in an endless cycle of life. Witness thrilling predator-prey interactions on the vast golden plains.' },
  { name: 'Ngorongoro Conservation Area', slug: 'ngorongoro', image: '/images/ngorongoro-crater.png', tagline: 'The World\'s Largest Caldera', description: 'A natural wonder and UNESCO World Heritage Site, the Ngorongoro Crater shelters one of Africa\'s densest wildlife populations including the Big Five within its 260km² volcanic bowl.' },
  { name: 'Olduvai Gorge', slug: 'olduvai', image: '/images/olduvai-gorge.png', tagline: 'Cradle of Mankind', description: 'One of the most important paleoanthropological sites in the world, where some of the earliest human fossils were discovered. Walk where our ancestors walked millions of years ago.' },
  { name: 'Lake Manyara National Park', slug: 'lake-manyara', image: '/images/lake-manyara.png', tagline: 'Tree-Climbing Lions', description: 'Famous for its tree-climbing lions, flamingo-lined lake shores, and dense groundwater forest. A compact park that delivers incredible diversity in a stunning Rift Valley setting.' },
  { name: 'Gombe Stream National Park', slug: 'gombe', image: '/images/gombe-stream.png', tagline: 'Chimpanzee Sanctuary', description: 'Made famous by Jane Goodall\'s pioneering research, Gombe is home to habituated chimpanzee communities. Trek through lush forest to observe our closest relatives in the wild.' },
  { name: 'Selous National Park', slug: 'selous', image: '/images/selous.png', tagline: "Africa's Largest Reserve", description: 'One of the largest faunal reserves in the world, Selous offers remote, untouched wilderness with boat safaris, walking safaris, and fly camping under the stars.' },
  { name: 'Ruaha National Park', slug: 'ruaha', image: '/images/ruaha.png', tagline: 'Untamed Wilderness', description: 'Tanzania\'s largest national park is a hidden gem with dramatic landscapes, 10% of the world\'s lions, and rare species like the African wild dog. True off-the-beaten-path safari.' },
  { name: 'Katavi National Park', slug: 'katavi', image: '/images/katavi.png', tagline: 'Remote & Unspoiled', description: 'One of Tanzania\'s most isolated parks, Katavi offers an untouched safari experience with massive herds of buffalo, hippos by the thousand, and very few other visitors.' },
  { name: 'Zanzibar Beaches', slug: 'zanzibar', image: '/images/zanzibar-beach.png', tagline: 'Paradise Island', description: 'Turquoise waters, pristine white sand beaches, and a rich Swahili cultural heritage. The perfect place to unwind after a safari or enjoy a tropical island escape.' },
  { name: 'Stone Town', slug: 'stone-town', image: '/images/stone-town.png', tagline: 'Historic Swahili City', description: 'A UNESCO World Heritage Site, Stone Town is a labyrinth of narrow streets, ornate carved doors, spice markets, and centuries of Arab, Persian, Indian, and European influences.' },
  { name: 'Mafia Island', slug: 'mafia', image: '/images/mafia-island.png', tagline: 'Marine Paradise', description: 'Home to the Mafia Island Marine Park, this unspoiled island offers world-class diving, whale shark encounters, and pristine coral reefs without the tourist crowds.' },
  { name: 'Pemba Island', slug: 'pemba', image: '/images/pemba-island.png', tagline: 'The Green Island', description: 'Known as "The Green Island" for its lush vegetation, Pemba offers exclusive clove plantations, pristine diving, and a deeply authentic Swahili cultural experience.' },
  { name: 'Lake Victoria', slug: 'lake-victoria', image: '/images/lake-victoria.png', tagline: "Africa's Largest Lake", description: 'The source of the Nile and Africa\'s largest freshwater lake. Visit fishing villages, explore Rubondo Island National Park, and witness spectacular birdlife along the shores.' },
];

export default function DestinationsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero
        title="Explore"
        highlight="Destinations"
        subtitle="From the peak of Kilimanjaro to the shores of Zanzibar, discover the incredible diversity of Tanzania"
        image="/images/migration.png"
      />
      <Breadcrumb items={[{ label: 'Destinations' }]} />
      <main className="flex-1">
        <section className="py-24 bg-[#FAFAF7]" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <MapPin className="w-3.5 h-3.5" /> All Destinations
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">Tanzania&apos;s <span className="text-[#B78A42]">Treasures</span></h2>
              <p className="text-base text-[#333333]/50 max-w-xl mx-auto">Each destination offers a unique piece of the Tanzanian puzzle</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, i) => (
                <motion.a
                  key={dest.slug}
                  href={`/destinations#${dest.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.5 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-xl border border-white/25 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">{dest.tagline}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#333333] mb-2 group-hover:text-[#B78A42] transition-colors">{dest.name}</h3>
                    <p className="text-sm text-[#333333]/45 leading-relaxed line-clamp-3">{dest.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#B78A42] text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                      Discover <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.a>
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
