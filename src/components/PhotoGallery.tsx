'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('photoGallery');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next

  const goTo = useCallback(
    (dir: 'prev' | 'next') => {
      if (lightboxIndex === null) return;
      setDirection(dir === 'next' ? 1 : -1);
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

  const openLightbox = (index: number) => {
    setDirection(0);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
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
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    // Only trigger swipe if horizontal movement is dominant
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
      goTo(diffX < 0 ? 'next' : 'prev');
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Image slide variants based on direction
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
      opacity: 0,
      scale: 0.96,
    }),
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
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#333333] mb-3">
            {t('title')}
          </h2>
          <p className="text-base text-[#333333]/50 max-w-xl mx-auto leading-relaxed">
            {t('description')}
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
              onClick={() => openLightbox(i)}
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
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-[#B78A42]/80 backdrop-blur-sm border border-[#B78A42] rounded-full flex items-center justify-center shadow-lg shadow-[#B78A42]/30">
                  <ZoomIn className="w-5 h-5 text-white" />
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex flex-col"
            role="dialog"
            aria-label="Photo lightbox"
            aria-modal="true"
            onClick={closeLightbox}
          >
            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex items-center justify-between px-4 py-4 md:px-8 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                {/* Image counter with golden accent */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white/80 text-xs font-semibold">
                  <span className="text-[#B78A42] font-bold">{lightboxIndex + 1}</span>
                  <span className="text-white/30">/</span>
                  <span>{photos.length}</span>
                </span>
                <span className="text-white/20 hidden sm:inline">—</span>
                <span className="text-white/40 text-sm hidden sm:inline truncate max-w-[200px]">
                  {photos[lightboxIndex].alt}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-[#B78A42]/30 hover:border-[#B78A42]/50 transition-all duration-300"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </motion.div>

            {/* Image area */}
            <div
              className="flex-1 flex items-center justify-center px-4 md:px-16 pb-4 relative min-h-0"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Prev button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onClick={() => goTo('prev')}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-[#B78A42]/30 hover:border-[#B78A42]/50 transition-all duration-300 z-10 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-[#B78A42] transition-colors" />
              </motion.button>

              {/* Image with slide animation */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={lightboxIndex}
                  custom={direction}
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].alt}
                  className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain rounded-xl shadow-2xl shadow-black/50"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Next button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onClick={() => goTo('next')}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center hover:bg-[#B78A42]/30 hover:border-[#B78A42]/50 transition-all duration-300 z-10 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:text-[#B78A42] transition-colors" />
              </motion.button>
            </div>

            {/* Bottom bar: Thumbnail strip + image caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Caption below image */}
              <div className="text-center pb-2 px-4">
                <p className="text-white/50 text-sm font-medium">{photos[lightboxIndex].alt}</p>
              </div>

              {/* Thumbnail strip */}
              <div className="px-4 pb-4 md:pb-6 flex justify-center gap-2 overflow-x-auto scrollbar-hide">
                {photos.map((photo, i) => (
                  <button
                    key={photo.src}
                    onClick={() => {
                      setDirection(i > lightboxIndex ? 1 : i < lightboxIndex ? -1 : 0);
                      setLightboxIndex(i);
                    }}
                    className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      i === lightboxIndex
                        ? 'border-2 border-[#B78A42] opacity-100 scale-110 shadow-lg shadow-[#B78A42]/30'
                        : 'border-2 border-transparent opacity-40 hover:opacity-70 hover:border-white/20'
                    }`}
                  >
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Navigation hint for keyboard users */}
              <div className="hidden md:flex items-center justify-center pb-3 gap-4 text-white/20 text-xs">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">←</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">→</kbd>
                  {t('navigate')}
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Esc</kbd>
                  {t('close')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
