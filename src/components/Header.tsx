'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  noClick?: boolean;
}

const navItems: NavItem[] = [
  { label: 'ABOUT', href: '/about' },
  {
    label: 'DESTINATIONS',
    href: '/destinations',
    children: [
      { label: 'Serengeti National Park', href: '/destinations/serengeti', description: 'The Great Migration' },
      { label: 'Ngorongoro Crater', href: '/destinations/ngorongoro', description: "World's Largest Caldera" },
      { label: 'Tarangire National Park', href: '/destinations/tarangire', description: 'Land of Giants' },
      { label: 'Lake Manyara', href: '/destinations/lake-manyara', description: 'Tree-Climbing Lions' },
      { label: 'Zanzibar Island', href: '/destinations/zanzibar', description: 'Paradise Island' },
      { label: 'Mafia Island', href: '/destinations/mafia', description: 'Marine Paradise' },
      { label: 'Selous Game Reserve', href: '/destinations/selous', description: "Africa's Largest Reserve" },
      { label: 'Ruaha National Park', href: '/destinations/ruaha', description: 'Untamed Wilderness' },
      { label: 'Mount Kilimanjaro', href: '/destinations/kilimanjaro', description: "Africa's Highest Peak" },
      { label: 'Gombe Stream', href: '/destinations/gombe', description: 'Chimpanzee Sanctuary' },
      { label: 'Katavi National Park', href: '/destinations/katavi', description: 'Remote Frontier' },
      { label: 'Mahale Mountains', href: '/destinations/mahale', description: 'Primate Paradise' },
      { label: 'Arusha National Park', href: '/destinations/arusha', description: 'The Overlooked Gem' },
      { label: 'Saadani National Park', href: '/destinations/saadani', description: 'Where Bush Meets Beach' },
      { label: 'Mikumi National Park', href: '/destinations/mikumi', description: 'Accessible Wilderness' },
      { label: 'Rubondo Island', href: '/destinations/rubondo', description: 'Island Refuge' },
    ],
  },
  {
    label: 'ITINERARIES',
    href: '/itineraries',
    children: [
      { label: 'Amazing Departure in 2024/27', href: '/itineraries' },
      { label: 'Migration Safari Program', href: '/itineraries' },
      { label: 'Luxury Honeymoon Package', href: '/itineraries' },
      { label: 'Luxury Summer Zanzibar', href: '/itineraries' },
      { label: 'Dry Season Private Safari', href: '/itineraries' },
      { label: 'Immersive Culture Trips', href: '/itineraries' },
      { label: 'Custom and Traditional Trip', href: '/itineraries' },
    ],
  },
  {
    label: 'MT. KILIMANJARO',
    href: '#',
    noClick: true,
    children: [
      { label: 'Machame Route', href: '/kilimanjaro/machame', description: '6-7 Days · Moderate · 95%' },
      { label: 'Lemosho Route', href: '/kilimanjaro/lemosho', description: '7-8 Days · Moderate · 96%' },
      { label: 'Marangu Route', href: '/kilimanjaro/marangu', description: '5-6 Days · Easy-Moderate · 85%' },
      { label: 'Umbwe Route', href: '/kilimanjaro/umbwe', description: '6-7 Days · Challenging · 88%' },
      { label: 'Rongai Route', href: '/kilimanjaro/rongai', description: '6-7 Days · Moderate · 90%' },
      { label: 'Shira Route', href: '/kilimanjaro/shira', description: '7-8 Days · Moderate-Hard · 91%' },
    ],
  },
  {
    label: 'OUR SUPPLIERS',
    href: '/suppliers',
    children: [
      { label: 'Camp & Lodges', href: '/suppliers' },
      { label: 'Domestic Flights', href: '/suppliers' },
      { label: 'Balloon Safaris', href: '/suppliers' },
      { label: 'Entara Camps and Lodges', href: '/suppliers' },
      { label: 'Nimali Africa', href: '/suppliers' },
    ],
  },
  { label: 'CONTACT', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    setIsScrolled(!isHome);
    window.addEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.noClick ? (
                  <button
                    className={`px-3 py-3 text-[13px] font-semibold tracking-wider flex items-center gap-1.5 transition-all duration-300 rounded-md hover:text-[#B78A42] ${
                      isScrolled ? 'text-[#333333]' : 'text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-3 text-[13px] font-semibold tracking-wider flex items-center gap-1.5 transition-all duration-300 rounded-md hover:text-[#B78A42] ${
                      isScrolled ? 'text-[#333333]' : 'text-white'
                    } ${pathname === item.href ? 'text-[#B78A42]' : ''}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3" />}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div className={`bg-white shadow-2xl shadow-[#333333]/10 border border-[#B78A42]/8 overflow-hidden ${
                        item.label === 'DESTINATIONS' ? 'w-[340px]' : item.label === 'MT. KILIMANJARO' ? 'w-[320px]' : 'w-[280px]'
                      }`}>
                        {/* Top accent line */}
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#B78A42] to-transparent" />
                        
                        {/* Column header */}
                        <div className="px-5 pt-4 pb-2">
                          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B78A42]">{item.label}</span>
                        </div>

                        {/* Items */}
                        <div className="px-2 pb-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="group/item flex items-center gap-3 px-3 py-2.5 hover:bg-[#B78A42]/5 transition-all duration-200"
                            >
                              <div className="w-1 h-1 bg-[#B78A42]/30 group-hover/item:bg-[#B78A42] rounded-full transition-all duration-200 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <span className="block text-[13px] font-medium text-[#333333]/80 group-hover/item:text-[#B78A42] transition-colors duration-200 tracking-wide truncate">
                                  {child.label}
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
                            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#B78A42]">View All</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#B78A42] group-hover/view:translate-x-1 transition-transform duration-200" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link href="/contact">
              <Button className="ml-4 bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20">
                BOOK NOW
              </Button>
            </Link>
          </nav>

          <button
            className={`lg:hidden p-2 z-10 transition-colors duration-300 ${
              isScrolled ? 'text-[#333333]' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
                <div key={item.label} className="border-b border-[#333333]/6 last:border-0">
                  <div className="flex items-center justify-between">
                    {item.noClick ? (
                      <span className="flex-1 py-3 text-sm font-semibold tracking-wider text-[#333333]/80">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-sm font-semibold tracking-wider text-[#333333]/80 hover:text-[#B78A42] transition-colors"
                        onClick={() => !item.children && setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.children && (
                      <button
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === item.label ? null : item.label)
                        }
                        className="p-2 text-[#333333]/40 hover:text-[#B78A42]"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.children && mobileDropdown === item.label && (
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
                              key={child.label}
                              href={child.href}
                              className="block py-2 text-sm text-[#333333]/50 hover:text-[#B78A42] transition-colors tracking-wide"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
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
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider py-3 rounded-full">
                    BOOK NOW
                  </Button>
                </Link>
                <div className="flex gap-3">
                  <a
                    href="tel:+255123456789"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FAFAF7] border border-[#B78A42]/15 rounded-full text-[#333333] text-xs font-semibold tracking-wider hover:bg-[#B78A42]/5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B78A42]" />
                    CALL US
                  </a>
                  <a
                    href="https://wa.me/255123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-[#25D366] text-xs font-semibold tracking-wider hover:bg-[#25D366]/15 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WHATSAPP
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
