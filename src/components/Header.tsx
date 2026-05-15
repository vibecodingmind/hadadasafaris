'use client';

import { useState, useEffect } from 'react';
import { usePathname, Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

interface NavChild {
  labelKey: string;
  href: string;
  description?: string;
}

interface NavItem {
  labelKey: string;
  href: string;
  children?: NavChild[];
  noClick?: boolean;
}

const navItems: NavItem[] = [
  { labelKey: 'destinations', href: '/destinations' },
  {
    labelKey: 'itineraries',
    href: '/itineraries',
    children: [
      { labelKey: 'amazingDeparture', href: '/itineraries' },
      { labelKey: 'migrationSafari', href: '/itineraries' },
      { labelKey: 'luxuryHoneymoon', href: '/itineraries' },
      { labelKey: 'luxuryZanzibar', href: '/itineraries' },
      { labelKey: 'drySeasonSafari', href: '/itineraries' },
      { labelKey: 'cultureTrips', href: '/itineraries' },
      { labelKey: 'customTrip', href: '/itineraries' },
    ],
  },
  { labelKey: 'blog', href: '/blog' },
  {
    labelKey: 'kilimanjaro',
    href: '#',
    noClick: true,
    children: [
      { labelKey: 'machameRoute', href: '/kilimanjaro/machame' },
      { labelKey: 'lemoshoRoute', href: '/kilimanjaro/lemosho' },
      { labelKey: 'maranguRoute', href: '/kilimanjaro/marangu' },
      { labelKey: 'umbweRoute', href: '/kilimanjaro/umbwe' },
      { labelKey: 'rongaiRoute', href: '/kilimanjaro/rongai' },
      { labelKey: 'shiraRoute', href: '/kilimanjaro/shira' },
    ],
  },
  {
    labelKey: 'suppliers',
    href: '#',
    noClick: true,
    children: [
      { labelKey: 'campLodges', href: '/camps-lodges' },
      { labelKey: 'domesticFlights', href: '/domestic-flights' },
      { labelKey: 'balloonSafaris', href: '/destinations/balloon-safari' },
    ],
  },
  { labelKey: 'contact', href: '/contact' },
];

export default function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        const heroHeight = window.innerHeight;
        setIsScrolled(window.scrollY > heroHeight - 60);
      } else {
        setIsScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on mount / route change
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-sm shadow-[#333333]/5 border-b border-[#B78A42]/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="flex items-center group z-10">
            <div className="relative h-16 w-auto">
              <img
                src="/images/hadada-logo.png"
                alt="Hadada Safaris Logo"
                className={`h-full w-auto object-contain transition-all duration-500 ${
                  isScrolled ? 'brightness-0 sepia-[.8] saturate-[.6] hue-rotate-[5deg]' : ''
                }`}
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.labelKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.noClick ? (
                  <button
                    className={`px-3 py-3 text-[13px] font-semibold tracking-wider flex items-center gap-1.5 transition-all duration-300 rounded-md hover:text-[#B78A42] ${
                      isScrolled ? 'text-[#333333]' : 'text-white'
                    }`}
                    aria-expanded={openDropdown === item.labelKey}
                    aria-haspopup="true"
                    aria-label={`${t(item.labelKey)} menu`}
                  >
                    {t(item.labelKey)}
                    <ChevronDown className="w-3 h-3" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-3 text-[13px] font-semibold tracking-wider flex items-center gap-1.5 transition-all duration-300 rounded-md hover:text-[#B78A42] focus:outline-none focus:ring-2 focus:ring-[#B78A42]/40 focus:ring-offset-2 ${
                      isScrolled ? 'text-[#333333]' : 'text-white'
                    } ${pathname === item.href ? 'text-[#B78A42]' : ''}`}
                    aria-expanded={item.children ? openDropdown === item.labelKey : undefined}
                    aria-haspopup={item.children ? 'true' : undefined}
                  >
                    {t(item.labelKey)}
                    {item.children && <ChevronDown className="w-3 h-3" aria-hidden="true" />}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && openDropdown === item.labelKey && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[1001]"
                    >
                      <div className={`bg-white/95 backdrop-blur-2xl shadow-2xl shadow-[#333333]/15 border border-[#B78A42]/10 rounded-2xl overflow-hidden ${
                        item.labelKey === 'destinations' ? 'w-[340px]' : item.labelKey === 'kilimanjaro' ? 'w-[320px]' : item.labelKey === 'suppliers' ? 'w-[240px]' : 'w-[280px]'
                      }`}>
                        {/* Top accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#B78A42] to-transparent" />
                        
                        {/* Column header */}
                        <div className="px-5 pt-4 pb-2">
                          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B78A42]">{t(item.labelKey)}</span>
                        </div>

                        {/* Items */}
                        <div className="px-2 pb-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
                          {item.children.map((child) => (
                            <Link
                              key={child.labelKey}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="group/item flex items-center gap-3 px-3 py-2.5 hover:bg-[#B78A42]/5 transition-all duration-200"
                            >
                              <div className="w-1 h-1 bg-[#B78A42]/30 group-hover/item:bg-[#B78A42] rounded-full transition-all duration-200 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <span className="block text-[13px] font-medium text-[#333333]/80 group-hover/item:text-[#B78A42] transition-colors duration-200 tracking-wide truncate">
                                  {t(child.labelKey)}
                                </span>
                                {child.description && (
                                  <span className="block text-[10px] text-[#333333]/35 mt-0.5 tracking-wide">{child.description}</span>
                                )}
                              </div>
                              <ArrowRight className="w-3 h-3 text-[#B78A42]/0 group-hover/item:text-[#B78A42] -translate-x-1 group-hover/item:translate-x-0 transition-all duration-200 flex-shrink-0" />
                            </Link>
                          ))}
                        </div>

                        {/* Bottom link */}
                        {!item.noClick && (
                          <Link
                            href={item.href}
                            className="group/view flex items-center justify-between px-5 py-3 border-t border-[#B78A42]/5 hover:bg-[#B78A42]/5 transition-all duration-200"
                          >
                            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#B78A42]">{t('viewAll')}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#B78A42] group-hover/view:translate-x-1 transition-transform duration-200" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
            <Link href="/booking" aria-label="Book a safari now">
              <Button className="ml-3 bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 focus:outline-none focus:ring-2 focus:ring-[#B78A42]/50 focus:ring-offset-2">
                {t('bookNow')}
              </Button>
            </Link>
          </nav>

          <button
            className={`lg:hidden p-2 z-10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#B78A42]/50 focus:ring-offset-2 rounded-md ${
              isScrolled ? 'text-[#333333]' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-[#B78A42]/8 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.labelKey} className="border-b border-[#333333]/6 last:border-0">
                  <div className="flex items-center justify-between">
                    {item.noClick ? (
                      <span className="flex-1 py-3 text-sm font-semibold tracking-wider text-[#333333]/80">
                        {t(item.labelKey)}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-sm font-semibold tracking-wider text-[#333333]/80 hover:text-[#B78A42] transition-colors"
                        onClick={() => !item.children && setMobileMenuOpen(false)}
                      >
                        {t(item.labelKey)}
                      </Link>
                    )}
                    {item.children && (
                      <button
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === item.labelKey ? null : item.labelKey)
                        }
                        className="p-2 text-[#333333]/40 hover:text-[#B78A42]"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileDropdown === item.labelKey ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.children && mobileDropdown === item.labelKey && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.labelKey}
                              href={child.href}
                              className="block py-2 text-sm text-[#333333]/50 hover:text-[#B78A42] transition-colors tracking-wide"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {t(child.labelKey)}
                              {child.description && (
                                <span className="block text-[10px] text-[#333333]/30 mt-0.5">{child.description}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-center">
                  <LanguageSwitcher isScrolled={true} />
                </div>
                <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider py-3 rounded-full">
                    {t('bookNow')}
                  </Button>
                </Link>
                <div className="flex gap-3">
                  <a
                    href="tel:+255123456789"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FAFAF7] border border-[#B78A42]/15 rounded-full text-[#333333] text-xs font-semibold tracking-wider hover:bg-[#B78A42]/5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B78A42]" />
                    {t('callUs')}
                  </a>
                  <a
                    href="https://wa.me/255123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-[#25D366] text-xs font-semibold tracking-wider hover:bg-[#25D366]/15 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {t('whatsapp')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
