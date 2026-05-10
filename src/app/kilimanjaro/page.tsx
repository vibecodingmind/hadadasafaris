'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import { Mountain, Clock, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const routes = [
  { name: 'Machame Route', slug: 'machame', duration: '6-7 Days', difficulty: 'Moderate', successRate: '95%', image: '/images/kilimanjaro.png', description: 'Known as the "Whiskey Route," Machame is the most popular path to Uhuru Peak. It offers stunning scenic variety, excellent acclimatization with its climb-high-sleep-low profile, and a high summit success rate. You\'ll traverse through rainforest, moorland, alpine desert, and arctic zones.', highlights: ['Great acclimatization profile', 'Stunning scenic variety', 'Lava Tower ascent', 'Barranco Wall climb', 'High success rate'] },
  { name: 'Lemosho Route', slug: 'lemoso', duration: '7-8 Days', difficulty: 'Moderate', successRate: '96%', image: '/images/kilimanjaro.png', description: 'The Lemosho Route is considered the most beautiful trail on Kilimanjaro. Starting from the west, it offers pristine wilderness, fewer crowds in the early days, and excellent acclimatization. It joins the Machame route at Lava Tower and approaches the summit via Barafu Camp.', highlights: ['Most scenic route', 'Low traffic on early days', 'Excellent acclimatization', 'Shira Plateau traverse', 'Highest success rate'] },
  { name: 'Marangu Route', slug: 'marangu', duration: '5-6 Days', difficulty: 'Easy-Moderate', successRate: '85%', image: '/images/kilimanjaro.png', description: 'The "Coca-Cola Route" is the oldest and most established path. It\'s the only route with sleeping huts instead of tents, making it popular for budget-conscious climbers. However, its shorter duration means less acclimatization time.', highlights: ['Only route with huts', 'Shortest and cheapest', 'Gradual slope', 'Well-established path', 'Good for first-timers'] },
  { name: 'Umbwe Route', slug: 'umbwe', duration: '6-7 Days', difficulty: 'Challenging', successRate: '88%', image: '/images/kilimanjaro.png', description: 'The most direct and steepest route to the summit. Umbwe is for experienced trekkers seeking a challenge. The rapid ascent means acclimatization can be difficult, but the solitude and wild beauty are unmatched.', highlights: ['Shortest approach', 'Most challenging', 'Very few climbers', 'Dramatic scenery', 'Wild and untouched'] },
  { name: 'Rongai Route', slug: 'rongai', duration: '6-7 Days', difficulty: 'Moderate', successRate: '90%', image: '/images/kilimanjaro.png', description: 'The only route approaching from the north, Rongai offers a drier, less traveled experience. It retains a wilderness feel and passes through beautiful forest with chances to spot wildlife. The descent is via the Marangu route.', highlights: ['Drier weather', 'Less crowded', 'Wilderness experience', 'Good wildlife viewing', 'Unique northern approach'] },
  { name: 'Shira Route', slug: 'shira', duration: '7-8 Days', difficulty: 'Moderate-Hard', successRate: '91%', image: '/images/kilimanjaro.png', description: 'Starting at a high elevation on the Shira Plateau, this route is for those who want dramatic views from day one. The drive to the trailhead is an adventure itself. It joins the Machame route and offers excellent acclimatization.', highlights: ['High starting elevation', 'Dramatic plateau views', 'Good acclimatization', 'Less crowded', 'Scenic vehicle approach'] },
];

export default function KilimanjaroPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openRoute, setOpenRoute] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHero title="Mt." highlight="Kilimanjaro" subtitle="Conquer Africa's highest peak — 5,895m of pure determination and breathtaking beauty" image="/images/kilimanjaro.png" />
      <Breadcrumb items={[{ label: 'Mt. Kilimanjaro' }]} />
      <main className="flex-1">
        {/* Overview */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5"><Mountain className="w-3.5 h-3.5" /> The Roof of Africa</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-6 leading-tight">Climb <span className="text-[#B78A42]">Kilimanjaro</span></h2>
                <p className="text-base text-[#333333]/55 leading-relaxed mb-5">Mount Kilimanjaro is Africa&apos;s highest mountain and the world&apos;s tallest free-standing peak. Rising 5,895 meters above the Tanzanian plains, it offers climbers the extraordinary experience of passing through five distinct climate zones — from tropical rainforest to arctic glacier.</p>
                <p className="text-sm text-[#333333]/40 leading-relaxed mb-8">No technical climbing skills are required, making it accessible to anyone with good fitness and determination. Our experienced mountain guides, porters, and chefs ensure your safety and comfort throughout the journey.</p>
                <div className="flex gap-6">
                  <div><div className="text-3xl font-bold text-[#B78A42]">5,895m</div><div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Summit Height</div></div>
                  <div><div className="text-3xl font-bold text-[#B78A42]">6</div><div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Route Options</div></div>
                  <div><div className="text-3xl font-bold text-[#B78A42]">5</div><div className="text-[10px] text-[#333333]/40 tracking-wider uppercase mt-0.5">Climate Zones</div></div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#333333]/5"><img src="/images/kilimanjaro.png" alt="Mount Kilimanjaro" className="w-full h-[500px] object-cover" /></div>
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#B78A42]/5 rounded-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Routes */}
        <section className="py-24 bg-[#FAFAF7]" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4"><TrendingUp className="w-3.5 h-3.5" /> Choose Your Route</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#333333]">Climbing <span className="text-[#B78A42]">Routes</span></h2>
            </motion.div>

            <div className="space-y-4">
              {routes.map((route, i) => (
                <motion.div key={route.slug} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="bg-white border border-[#B78A42]/8 rounded-2xl overflow-hidden hover:border-[#B78A42]/15 transition-all duration-300"
                >
                  <button onClick={() => setOpenRoute(openRoute === route.slug ? null : route.slug)} className="w-full flex items-center justify-between px-6 py-5 text-left group">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                        <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#333333] group-hover:text-[#B78A42] transition-colors">{route.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1 text-xs text-[#333333]/40"><Clock className="w-3 h-3 text-[#B78A42]" />{route.duration}</span>
                          <span className="text-xs text-[#333333]/40">Difficulty: <span className="text-[#B78A42] font-medium">{route.difficulty}</span></span>
                          <span className="text-xs text-[#333333]/40">Success: <span className="text-[#B78A42] font-medium">{route.successRate}</span></span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#B78A42] transition-transform duration-300 ${openRoute === route.slug ? 'rotate-180' : ''}`} />
                  </button>
                  {openRoute === route.slug && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-6">
                      <div className="w-full h-px bg-[#B78A42]/10 mb-5" />
                      <p className="text-sm text-[#333333]/50 leading-relaxed mb-5">{route.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {route.highlights.map((h) => (<span key={h} className="inline-flex items-center gap-1 px-3 py-1 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-full text-xs text-[#333333]/50">{h}</span>))}
                      </div>
                      <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full group/btn">
                        INQUIRE ABOUT THIS ROUTE <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}
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
