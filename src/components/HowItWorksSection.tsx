'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Sliders, Compass } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Share Your Inquiry',
    description: 'Tell us about your dream safari — your interests, preferred dates, group size, and budget. We listen to every detail.',
  },
  {
    icon: Sliders,
    number: '02',
    title: 'We Customize Your Trip',
    description: 'Our experts design a tailor-made itinerary just for you, handpicking lodges, routes, and experiences that match your vision.',
  },
  {
    icon: Compass,
    number: '03',
    title: 'Live Your Adventure',
    description: 'Arrive in Tanzania and immerse yourself in the journey of a lifetime. We handle every detail so you can focus on the wonder.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-[#FAFAF7] relative overflow-hidden" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B78A42]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            Three Simple <span className="text-[#B78A42]">Steps</span>
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            Planning your dream safari is easier than you think
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#B78A42]/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              className="relative text-center"
            >
              {/* Icon circle */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white border border-[#B78A42]/10 shadow-sm flex items-center justify-center group-hover:bg-[#B78A42] transition-all duration-500">
                  <step.icon className="w-8 h-8 text-[#B78A42]" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#B78A42] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#333333] mb-3">{step.title}</h3>
              <p className="text-sm text-[#333333]/50 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
