'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mountain, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const routes = [
  {
    name: 'Machame Route',
    difficulty: 'Moderate',
    duration: '7 Days',
    success: '95%',
    description: 'The most popular route with stunning scenery through diverse climatic zones.',
  },
  {
    name: 'Lemosho Route',
    difficulty: 'Moderate',
    duration: '8 Days',
    success: '97%',
    description: 'A longer, more scenic approach with excellent acclimatization profile.',
  },
  {
    name: 'Marangu Route',
    difficulty: 'Easy',
    duration: '6 Days',
    success: '85%',
    description: 'The only route with hut accommodation, also known as the Coca-Cola route.',
  },
  {
    name: 'Umbwe Route',
    difficulty: 'Challenging',
    duration: '7 Days',
    success: '90%',
    description: 'The shortest and steepest route, ideal for experienced trekkers.',
  },
  {
    name: 'Rongai Route',
    difficulty: 'Moderate',
    duration: '7 Days',
    success: '92%',
    description: 'The only route approaching from the north, offering a wilderness experience.',
  },
  {
    name: 'Shira Route',
    difficulty: 'Challenging',
    duration: '8 Days',
    success: '91%',
    description: 'A dramatic start at high altitude on the Shira Plateau with spectacular views.',
  },
];

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400',
  Moderate: 'bg-yellow-500/20 text-yellow-400',
  Challenging: 'bg-red-500/20 text-red-400',
};

export default function KilimanjaroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="kilimanjaro" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/images/kilimanjaro.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 text-[#C8A45C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Mountain className="w-4 h-4" />
              Mt. Kilimanjaro
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-6">
              Conquer Africa&apos;s Highest <span className="text-[#C8A45C]">Peak</span>
            </h2>
            <p className="text-[#588157]/70 leading-relaxed mb-8">
              At 5,895 meters (19,341 feet), Mount Kilimanjaro is Africa&apos;s highest
              mountain and the world&apos;s tallest free-standing mountain. Our expert
              guides will lead you through diverse climatic zones from tropical rainforest
              to arctic summit, ensuring the best chance of reaching Uhuru Peak.
            </p>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <img
                src="/images/kilimanjaro.png"
                alt="Mount Kilimanjaro"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Mountain className="w-5 h-5 text-[#C8A45C]" />
                  <span className="font-bold">5,895m</span>
                  <span className="text-white/70">/ 19,341 ft</span>
                </div>
              </div>
            </div>

            <Button className="bg-[#1B4332] hover:bg-[#2D5A3F] text-white font-bold text-sm tracking-wider px-8 py-6 rounded-full transition-all duration-300 group w-full md:w-auto">
              PLAN YOUR CLIMB
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Routes */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {routes.map((route, i) => (
                <motion.div
                  key={route.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group p-5 rounded-xl border border-[#1B4332]/10 hover:border-[#C8A45C]/30 bg-[#FDF6E3]/50 hover:bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[#1B4332] group-hover:text-[#C8A45C] transition-colors">
                      {route.name}
                    </h4>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full tracking-wider ${difficultyColors[route.difficulty]}`}>
                      {route.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-[#588157]/60 mb-3 leading-relaxed">
                    {route.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#588157]/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {route.success} Success
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
