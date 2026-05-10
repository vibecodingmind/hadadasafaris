'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Users, Award, Globe, Heart, Target, Shield } from 'lucide-react';

const team = [
  { name: 'Petti', role: 'Founder & CEO', image: '/images/hero-safari.png' },
  { name: 'James', role: 'Head of Operations', image: '/images/serengeti-elephants.png' },
  { name: 'Grace', role: 'Safari Consultant', image: '/images/cultural-experience.png' },
  { name: 'Daniel', role: 'Lead Guide', image: '/images/ngorongoro-lunch.png' },
];

const values = [
  { icon: Heart, title: 'Passion for Africa', desc: 'Every journey we craft is driven by our deep love for Tanzania\'s wildlife, landscapes, and people.' },
  { icon: Shield, title: 'Safety & Trust', desc: 'Your safety is paramount. We maintain the highest standards in vehicles, guides, and emergency protocols.' },
  { icon: Target, title: 'Attention to Detail', desc: 'From your preferred pillow type to the perfect sunset viewing spot, no detail is too small for us.' },
  { icon: Globe, title: 'Local Expertise', desc: 'Born and raised in Tanzania, our team knows every hidden gem, secret trail, and cultural treasure.' },
  { icon: Award, title: 'Excellence', desc: 'We consistently earn top ratings because we never stop raising the bar for safari experiences.' },
  { icon: Users, title: 'Community First', desc: 'We invest in local communities, employ local guides, and ensure tourism benefits everyone.' },
];

export default function AboutPage() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const in1 = useInView(ref1, { once: true, margin: '-100px' });
  const in2 = useInView(ref2, { once: true, margin: '-100px' });
  const in3 = useInView(ref3, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero
        title="About"
        highlight="Hadada Safaris"
        subtitle="Born from a love of Tanzania, we craft extraordinary journeys that connect travelers to the soul of Africa"
        image="/images/hero-safari.png"
      />

      <main className="flex-1">
        {/* Story Section */}
        <section className="py-24 bg-white" ref={ref1}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={in1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">Our Story</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">
                  Where <span className="text-[#B78A42]">Passion</span> Meets Purpose
                </h2>
                <p className="text-base text-[#333333]/55 leading-relaxed mb-5">
                  Hadada Safaris was founded with a simple yet powerful vision: to share the magic of Tanzania with the world in a way that honors the land, empowers local communities, and creates life-changing experiences for every traveler.
                </p>
                <p className="text-base text-[#333333]/55 leading-relaxed mb-5">
                  Named after the Hadada Ibis — a bird whose distinctive call echoes across the Tanzanian landscape at dawn — our company embodies the spirit of awakening. Just as the Hadada signals the start of a new day in the bush, we mark the beginning of your most unforgettable adventure.
                </p>
                <p className="text-sm text-[#333333]/40 leading-relaxed">
                  With over 15 years of experience, we have guided thousands of travelers through Tanzania&apos;s most spectacular destinations, from the Serengeti plains to the peak of Kilimanjaro, always with an unwavering commitment to excellence, safety, and responsible tourism.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={in1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#333333]/5">
                  <img src="/images/ngorongoro-lunch.png" alt="Our team in the field" className="w-full h-[500px] object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#B78A42]/5 rounded-3xl -z-10" />
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#B78A42]/10 rounded-3xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-[#FAFAF7]" ref={ref2}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={in2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Our Values</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">What <span className="text-[#B78A42]">Drives</span> Us</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={in2 ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  className="bg-white/70 backdrop-blur-sm border border-[#B78A42]/8 rounded-2xl p-6 hover:bg-white hover:border-[#B78A42]/20 hover:shadow-lg transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-xl flex items-center justify-center mb-4 transition-all duration-500">
                    <v.icon className="w-6 h-6 text-[#B78A42] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-bold text-[#333333] mb-2">{v.title}</h3>
                  <p className="text-sm text-[#333333]/45 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-white" ref={ref3}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={in3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Our Team</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">Meet the <span className="text-[#B78A42]">Experts</span></h2>
              <p className="text-base text-[#333333]/50 max-w-xl mx-auto">The passionate people behind your unforgettable Tanzania experience</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={in3 ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="group bg-[#FAFAF7] rounded-2xl overflow-hidden border border-[#B78A42]/5 hover:border-[#B78A42]/15 hover:shadow-lg transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-[#333333]">{member.name}</h3>
                    <p className="text-xs text-[#B78A42] tracking-wider uppercase mt-1">{member.role}</p>
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
