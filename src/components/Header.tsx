'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'DESTINATIONS', href: '#destinations' },
  {
    label: 'ITINERARIES',
    href: '#itineraries',
    children: [
      'Amazing Departure in 2024/27',
      'Migration Safari Program',
      'Luxury Honeymoon Package',
      'Luxury Summer Zanzibar',
      'Dry Season Private Safari',
      'Immersive Culture Trips',
      'Custom and Traditional Trip',
    ],
  },
  {
    label: 'MT. KILIMANJARO',
    href: '#kilimanjaro',
    children: [
      'Machame Route',
      'Lemosho Route',
      'Marangu Route',
      'Umbwe Route',
      'Rongai Route',
      'Shira Route',
    ],
  },
  {
    label: 'OUR SUPPLIERS',
    href: '#suppliers',
    children: [
      'Camp & Lodges',
      'Domestic Flights',
      'Balloon Safaris',
      'Entara Camps and Lodges',
      'Nimali Africa',
    ],
  },
  { label: 'CONTACT', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only show sticky header after scrolling past the hero section (100vh)
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight - 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          ? 'bg-white/90 backdrop-blur-xl shadow-md shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <a href="#home" className="flex items-center group z-10">
            <div className="relative h-16 w-auto">
              <img
                src="/images/hadada-logo.png"
                alt="Hadada Safaris Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`px-3 py-3 text-[13px] font-semibold tracking-wider flex items-center gap-1.5 transition-all duration-300 rounded-md hover:text-[#B78A42] ${
                    isScrolled ? 'text-[#333333]' : 'text-white'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </a>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 min-w-[260px] bg-white/95 backdrop-blur-xl border border-[#B78A42]/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <a
                            key={child}
                            href="#"
                            className="block px-5 py-2.5 text-sm text-[#333333]/70 hover:text-[#B78A42] hover:bg-[#B78A42]/5 transition-all duration-200 tracking-wide"
                          >
                            {child}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Button className="ml-4 bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20">
              BOOK NOW
            </Button>
          </nav>

          {/* Mobile menu button */}
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#B78A42]/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-[#333333]/6 last:border-0">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className="flex-1 py-3 text-sm font-semibold tracking-wider text-[#333333]/80 hover:text-[#B78A42] transition-colors"
                      onClick={() => !item.children && setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
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
                            <a
                              key={child}
                              href="#"
                              className="block py-2 text-sm text-[#333333]/50 hover:text-[#B78A42] transition-colors tracking-wide"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4">
                <Button className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider py-3 rounded-full">
                  BOOK NOW
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
