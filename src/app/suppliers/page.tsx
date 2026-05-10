'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import { Tent, Plane, Wind, TreePine, Star, ExternalLink } from 'lucide-react';

const suppliers = [
  { category: 'Camp & Lodges', icon: Tent, description: 'Luxury tented camps and lodges nestled in the heart of Tanzania\'s wilderness', partners: [
    { name: 'Entara Camps and Lodges', desc: 'Boutique camps offering intimate, eco-friendly luxury in prime safari locations across Tanzania.', url: '#' },
    { name: 'Nimali Africa', desc: 'Unique, sustainable camps with stunning locations in Selous, Ruaha, and Serengeti.', url: '#' },
    { name: 'Serengeti Serena Safari Lodge', desc: 'Perched on a hill with panoramic Serengeti views, blending luxury with authentic African design.', url: '#' },
    { name: 'Ngorongoro Sopa Lodge', desc: 'Set on the crater rim with breathtaking views into the world\'s largest caldera.', url: '#' },
  ]},
  { category: 'Domestic Flights', icon: Plane, description: 'Reliable air transfers connecting you to Tanzania\'s most remote destinations', partners: [
    { name: 'Coastal Aviation', desc: 'Tanzania\'s leading safari air operator with scheduled and charter flights to all major parks and islands.', url: '#' },
    { name: 'Precision Air', desc: 'Domestic airline offering scheduled flights connecting Dar es Salaam, Arusha, Zanzibar, and more.', url: '#' },
    { name: 'Regional Air', desc: 'Charter and scheduled flights serving Tanzania\'s southern circuit and remote airstrips.', url: '#' },
  ]},
  { category: 'Balloon Safaris', icon: Wind, description: 'Soar above the Serengeti plains at dawn for a once-in-a-lifetime perspective', partners: [
    { name: 'Serengeti Balloon Safaris', desc: 'The original and most experienced balloon operator in the Serengeti. Dawn flights followed by a champagne bush breakfast.', url: '#' },
    { name: 'Balloons Over Serengeti', desc: 'Exclusive balloon experiences over the central Serengeti with intimate basket sizes and expert pilots.', url: '#' },
  ]},
  { category: 'Safari Experiences', icon: TreePine, description: 'Specialized operators enhancing your safari with unique activities and experiences', partners: [
    { name: 'Tanzania National Parks (TANAPA)', desc: 'The official authority managing Tanzania\'s national parks, ensuring conservation and visitor safety.', url: '#' },
    { name: 'Ngorongoro Conservation Area Authority', desc: 'Managing the Ngorongoro Conservation Area, balancing wildlife, Maasai pastoralism, and tourism.', url: '#' },
    { name: 'Walking Safaris Tanzania', desc: 'Guided walking safaris in Selous, Ruaha, and Serengeti for intimate bush experiences.', url: '#' },
  ]},
];

export default function SuppliersPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen flex flex-col">
      <PageHero title="Our" highlight="Suppliers" subtitle="Trusted partners who share our commitment to exceptional safari experiences" image="/images/luxury-camp.png" />
      <Breadcrumb items={[{ label: 'Our Suppliers' }]} />
      <main className="flex-1">
        <section className="py-24 bg-[#FAFAF7]" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4"><Star className="w-3.5 h-3.5" /> Trusted Partners</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">Partners We <span className="text-[#B78A42]">Trust</span></h2>
              <p className="text-base text-[#333333]/50 max-w-xl mx-auto">We work exclusively with partners who meet our high standards for quality, safety, and sustainability</p>
            </motion.div>

            <div className="space-y-12">
              {suppliers.map((cat, ci) => (
                <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + ci * 0.08, duration: 0.5 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#B78A42]/8 rounded-xl flex items-center justify-center"><cat.icon className="w-5 h-5 text-[#B78A42]" /></div>
                    <div>
                      <h3 className="text-lg font-bold text-[#333333]">{cat.category}</h3>
                      <p className="text-xs text-[#333333]/40">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.partners.map((p) => (
                      <div key={p.name} className="bg-white border border-[#B78A42]/5 rounded-2xl p-6 hover:border-[#B78A42]/15 hover:shadow-md transition-all duration-300 group">
                        <h4 className="font-bold text-[#333333] mb-2 group-hover:text-[#B78A42] transition-colors">{p.name}</h4>
                        <p className="text-sm text-[#333333]/45 leading-relaxed mb-3">{p.desc}</p>
                        <a href={p.url} className="inline-flex items-center gap-1 text-xs text-[#B78A42] font-semibold hover:gap-2 transition-all">
                          Visit Website <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
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
    </div>
  );
}
