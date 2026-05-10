'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';

const photos = [
  { src: '/images/serengeti-elephants.png', alt: 'Elephants in Serengeti', span: 'col-span-2 row-span-2' },
  { src: '/images/ngorongoro-crater.png', alt: 'Ngorongoro Crater', span: '' },
  { src: '/images/zanzibar-beach.png', alt: 'Zanzibar Beach', span: '' },
  { src: '/images/migration.png', alt: 'Great Migration', span: '' },
  { src: '/images/kilimanjaro.png', alt: 'Mount Kilimanjaro', span: '' },
  { src: '/images/luxury-camp.png', alt: 'Luxury Safari Camp', span: 'col-span-2 row-span-1' },
  { src: '/images/ngorongoro-lunch.png', alt: 'Bush Lunch', span: '' },
  { src: '/images/cultural-experience.png', alt: 'Cultural Experience', span: '' },
  { src: '/images/balloon-safari.png', alt: 'Balloon Safari', span: '' },
  { src: '/images/lion-portrait.png', alt: 'Lion Portrait', span: '' },
];

export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            Safari <span className="text-[#B78A42]">Moments</span>
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            A glimpse into the extraordinary experiences awaiting you in Tanzania
          </p>
        </motion.div>

        {/* Clean grid layout — featured image + uniform tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${photo.span}`}
              onClick={() => setSelectedPhoto(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  {photo.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[#1a1a1a]/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img
            src={selectedPhoto}
            alt="Gallery photo"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}
