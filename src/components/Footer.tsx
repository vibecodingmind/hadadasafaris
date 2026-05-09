'use client';

import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  'Explore': [
    'Serengeti National Park',
    'Ngorongoro Crater',
    'Zanzibar Island',
    'Mount Kilimanjaro',
    'Tarangire National Park',
    'Lake Manyara',
  ],
  'Itineraries': [
    'Amazing Departure 2024/27',
    'Migration Safari Program',
    'Luxury Honeymoon Package',
    'Luxury Summer Zanzibar',
    'Dry Season Private Safari',
    'Immersive Culture Trips',
  ],
  'Kilimanjaro Routes': [
    'Machame Route',
    'Lemosho Route',
    'Marangu Route',
    'Umbwe Route',
    'Rongai Route',
    'Shira Route',
  ],
  'Company': [
    'About Us',
    'Our Team',
    'Blog',
    'Careers',
    'Partners',
    'Contact',
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-white relative overflow-hidden">
      {/* Newsletter bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Stay Updated</h3>
              <p className="text-white/40 text-sm">Subscribe to our newsletter for safari tips and exclusive offers</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-white/8 border border-white/10 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B78A42] transition-colors"
              />
              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 rounded-full group shrink-0">
                SUBSCRIBE
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="h-14 w-auto">
                <img
                  src="/images/hadada-logo.png"
                  alt="Hadada Safaris Logo"
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
              Creating exceptional safari experiences that connect you to Tanzania&apos;s
              breathtaking landscapes, vibrant cultures, and magnificent wildlife since 2009.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:info@hadadasafaris.com" className="flex items-center gap-2 text-white/40 hover:text-[#B78A42] transition-colors">
                <Mail className="w-4 h-4" />
                info@hadadasafaris.com
              </a>
              <a href="tel:+255123456789" className="flex items-center gap-2 text-white/40 hover:text-[#B78A42] transition-colors">
                <Phone className="w-4 h-4" />
                +255 123 456 789
              </a>
              <span className="flex items-center gap-2 text-white/40">
                <MapPin className="w-4 h-4" />
                Arusha, Tanzania
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold tracking-wider text-[#B78A42] mb-4 uppercase">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Hadada Safaris. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/50 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
