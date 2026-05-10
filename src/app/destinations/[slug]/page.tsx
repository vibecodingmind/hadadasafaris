'use client';

import { useParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Button } from '@/components/ui/button';
import { destinations, getDestinationBySlug } from '@/data/destinations';
import {
  MapPin,
  Calendar,
  ChevronDown,
  ArrowRight,
  Star,
  PawPrint,
  Compass,
  Send,
} from 'lucide-react';
import Link from 'next/link';

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const destination = getDestinationBySlug(slug);

  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const galleryRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const overviewInView = useInView(overviewRef, { once: true, margin: '-80px' });
  const highlightsInView = useInView(highlightsRef, { once: true, margin: '-80px' });
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero
        title={destination.name.split(' ').slice(0, -1).join(' ') || 'Explore'}
        highlight={destination.name.split(' ').slice(-1)[0]}
        subtitle={destination.tagline}
        image={destination.heroImage}
      />
      <Breadcrumb items={[
        { label: 'Destinations', href: '/destinations' },
        { label: destination.name },
      ]} />

      <main className="flex-1">
        {/* Overview */}
        <section className="py-24 bg-white" ref={overviewRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                  <MapPin className="w-3.5 h-3.5" /> {destination.region}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Discover <span className="text-[#B78A42]">{destination.name}</span>
                </h2>
                <p className="text-base text-[#333333]/60 leading-relaxed mb-5">
                  {destination.longDescription}
                </p>

                {/* Quick info pills */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-xs text-[#333333]/60">
                    <Calendar className="w-3.5 h-3.5 text-[#B78A42]" />
                    Best: {destination.bestTime}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-xs text-[#333333]/60">
                    <PawPrint className="w-3.5 h-3.5 text-[#B78A42]" />
                    {destination.wildlife.length}+ Key Species
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-xs text-[#333333]/60">
                    <Compass className="w-3.5 h-3.5 text-[#B78A42]" />
                    {destination.activities.length} Activities
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={overviewInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-28 space-y-6">
                  {/* CTA Card */}
                  <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl p-6">
                    <h3 className="font-bold text-[#333333] mb-2">Plan Your Visit</h3>
                    <p className="text-sm text-[#333333]/45 leading-relaxed mb-5">
                      Let us craft a personalized itinerary featuring {destination.name} and beyond.
                    </p>
                    <Link href="/contact">
                      <Button className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
                        INQUIRE NOW <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <div className="flex gap-3 mt-4">
                      <a
                        href="tel:+255123456789"
                        className="flex-1 text-center py-2.5 bg-white border border-[#B78A42]/10 rounded-xl text-xs font-semibold text-[#333333]/50 hover:text-[#B78A42] hover:border-[#B78A42]/20 transition-all"
                      >
                        Call Us
                      </a>
                      <a
                        href="https://wa.me/255123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2.5 bg-[#25D366]/8 border border-[#25D366]/15 rounded-xl text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/12 transition-all"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Quick Image */}
                  <div className="rounded-2xl overflow-hidden border border-[#B78A42]/5 shadow-lg shadow-[#333333]/5">
                    <img src={destination.image} alt={destination.name} className="w-full h-56 object-cover" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights & Wildlife & Activities */}
        <section className="py-24 bg-[#FAFAF7]" ref={highlightsRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Star className="w-3.5 h-3.5" /> What Awaits You
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                Why Visit <span className="text-[#B78A42]">{destination.name.split(' ').pop()}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#B78A42] mb-5">Highlights</h3>
                <div className="space-y-3">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-[#B78A42]/5 rounded-xl p-3.5 hover:border-[#B78A42]/15 transition-all duration-300 group">
                      <div className="w-8 h-8 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <Star className="w-4 h-4 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-sm text-[#333333]/70 group-hover:text-[#333333] transition-colors">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Wildlife */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#B78A42] mb-5">Wildlife</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.wildlife.map((w, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/60 hover:border-[#B78A42]/20 hover:text-[#333333] transition-all duration-300 cursor-default"
                    >
                      <PawPrint className="w-3 h-3 text-[#B78A42]" />
                      {w}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#B78A42] mb-5">Activities</h3>
                <div className="space-y-3">
                  {destination.activities.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-[#B78A42]/5 rounded-xl p-3.5 hover:border-[#B78A42]/15 transition-all duration-300 group">
                      <div className="w-8 h-8 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <Compass className="w-4 h-4 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-sm text-[#333333]/70 group-hover:text-[#333333] transition-colors">{a}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {destination.gallery && destination.gallery.length > 0 && (
          <section className="py-24 bg-white" ref={galleryRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Gallery
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                  Visual <span className="text-[#B78A42]">Journey</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <div className={`relative overflow-hidden ${i === 0 ? 'h-full min-h-[300px]' : 'h-48'}`}>
                      <img
                        src={img}
                        alt={`${destination.name} gallery ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-[#333333]/0 group-hover:bg-[#333333]/20 transition-all duration-500 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-semibold tracking-wider">View</span>
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
          <section className="py-24 bg-[#FAFAF7]" ref={faqRef}>
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
                    className="bg-white border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    >
                      <span className="text-sm font-semibold text-[#333333] group-hover:text-[#B78A42] transition-colors pr-4">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 text-[#B78A42] flex-shrink-0 transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-6 pb-5"
                      >
                        <div className="w-full h-px bg-[#B78A42]/10 mb-4" />
                        <p className="text-sm text-[#333333]/55 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Destinations */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <MapPin className="w-3.5 h-3.5" /> More to Explore
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">
                Other <span className="text-[#B78A42]">Destinations</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherDestinations.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group bg-[#FAFAF7] rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/20 hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/50 via-transparent to-transparent" />
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Explore <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">{destination.name.split(' ').pop()}</span>?
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Our expert team will craft a personalized safari itinerary featuring {destination.name} and beyond. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/30 group">
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
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-lg font-light transition-colors z-10"
          >
            Close
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img
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
        </div>
      )}

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
