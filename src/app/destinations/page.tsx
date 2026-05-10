'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { MapPin, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';

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
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
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
                </Link>
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
