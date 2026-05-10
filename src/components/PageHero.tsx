'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  highlight?: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ title, highlight, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}{' '}
            {highlight && (
              <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
