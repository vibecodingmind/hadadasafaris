'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { src: '/images/serengeti-elephants.png', alt: 'Elephants in Serengeti', span: 'col-span-2 row-span-2' },
  { src: '/images/ngorongoro-crater.png', alt: 'Ngorongoro Crater', span: '' },
  { src: '/images/zanzibar-beach.png', alt: 'Zanzibar Beach', span: '' },
  { src: '/images/migration.png', alt: 'Great Migration', span: '' },
  { src: '/images/kilimanjaro.png', alt: 'Mount Kilimanjaro', span: '' },
  { src: '/images/luxury-camp.png', alt: 'Luxury Safari Camp', span: 'col-span-2 row-span-1' },
  { src: '/images/ngorongoro-lunch.png', alt: 'Bush Lunch', span: '' },
  { src: '/images/cultural-experience.png', alt: 'Cultural Experience', span: '' },
  { src: '/images/balloon-safari-hero.png', alt: 'Balloon Safari', span: '' },
  { src: '/images/lion-portrait.png', alt: 'Lion Portrait', span: '' },
];

export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const goTo = useCallback(
    (dir: 'prev' | 'next') => {
      if (lightboxIndex === null) return;
      setLightboxIndex(
        dir === 'next'
          ? (lightboxIndex + 1) % photos.length
          : lightboxIndex === 0
          ? photos.length - 1
          : lightboxIndex - 1
      );
    },
    [lightboxIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo('next');
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo('prev');
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goTo]);

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 60) {
      goTo(diff < 0 ? 'next' : 'prev');
    }
    touchStartX.current = null;
  };

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
            A glimpse into the extraordinary experiences awaiting you in Tanzania — click any image to explore
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${photo.span}`}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  {photo.alt}
                </span>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ FULL LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[2000] bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-4 md:px-8 relative z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-sm font-medium">
                  {lightboxIndex + 1} / {photos.length}
                </span>
                <span className="text-white/30 text-sm hidden sm:inline">—</span>
                <span className="text-white/40 text-sm hidden sm:inline">{photos[lightboxIndex].alt}</span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Image area */}
            <div
              className="flex-1 flex items-center justify-center px-4 md:px-12 pb-4 relative"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Prev button */}
              <button
                onClick={() => goTo('prev')}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].alt}
                  className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Next button */}
              <button
                onClick={() => goTo('next')}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div
              className="px-4 pb-4 md:pb-6 flex justify-center gap-2 overflow-x-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  onClick={() => setLightboxIndex(i)}
                  className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    i === lightboxIndex
                      ? 'border-[#B78A42] opacity-100 scale-105'
                      : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
