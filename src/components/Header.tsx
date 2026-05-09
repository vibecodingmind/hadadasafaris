'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'HOME', href: '#home' },
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
  { label: 'BLOG', href: '#blog' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <>
      {/* Top bar */}
      <div className="bg-[#1B4332] text-white/80 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+255123456789" className="flex items-center gap-1.5 hover:text-[#C8A45C] transition-colors">
              <Phone className="w-3 h-3" />
              <span>+255 123 456 789</span>
            </a>
            <a href="mailto:info@hadadasafaris.com" className="flex items-center gap-1.5 hover:text-[#C8A45C] transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@hadadasafaris.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Follow us:</span>
            <a href="#" className="hover:text-[#C8A45C] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#C8A45C] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#C8A45C] transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1B4332]/95 backdrop-blur-md shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative h-14 w-auto overflow-hidden">
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
                    className={`px-3 py-2 text-[13px] font-semibold tracking-wider flex items-center gap-1 transition-all duration-300 rounded-md ${
                      isScrolled
                        ? 'text-white/90 hover:text-[#C8A45C]'
                        : 'text-white/90 hover:text-[#C8A45C]'
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
                        className="absolute top-full left-0 min-w-[260px] bg-[#1B4332] border border-[#C8A45C]/20 rounded-lg shadow-2xl shadow-black/30 overflow-hidden"
                      >
                        <div className="py-2">
                          {item.children.map((child) => (
                            <a
                              key={child}
                              href="#"
                              className="block px-5 py-2.5 text-sm text-white/80 hover:text-[#C8A45C] hover:bg-white/5 transition-all duration-200 tracking-wide"
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
              <Button className="ml-4 bg-[#C8A45C] hover:bg-[#B8943F] text-[#1B4332] font-bold text-xs tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C8A45C]/20">
                BOOK NOW
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#1B4332] border-t border-[#C8A45C]/20 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-white/10 last:border-0">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        className="flex-1 py-3 text-sm font-semibold tracking-wider text-white/90 hover:text-[#C8A45C] transition-colors"
                        onClick={() => !item.children && setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                      {item.children && (
                        <button
                          onClick={() =>
                            setMobileDropdown(mobileDropdown === item.label ? null : item.label)
                          }
                          className="p-2 text-white/60 hover:text-[#C8A45C]"
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
                                className="block py-2 text-sm text-white/60 hover:text-[#C8A45C] transition-colors tracking-wide"
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
                  <Button className="w-full bg-[#C8A45C] hover:bg-[#B8943F] text-[#1B4332] font-bold text-sm tracking-wider py-3 rounded-full">
                    BOOK NOW
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
