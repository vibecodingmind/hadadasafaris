import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Serengeti National Park', href: '/destinations/serengeti' },
      { label: 'Ngorongoro Crater', href: '/destinations/ngorongoro' },
      { label: 'Zanzibar Island', href: '/destinations/zanzibar' },
      { label: 'Mount Kilimanjaro', href: '/destinations/kilimanjaro' },
      { label: 'Tarangire National Park', href: '/destinations/tarangire' },
      { label: 'Lake Manyara', href: '/destinations/lake-manyara' },
      { label: 'Balloon Safari', href: '/destinations/balloon-safari' },
    ],
  },
  {
    title: 'Itineraries',
    links: [
      { label: 'Amazing Departure 2024/27', href: '/itineraries' },
      { label: 'Migration Safari Program', href: '/itineraries' },
      { label: 'Luxury Honeymoon Package', href: '/itineraries' },
      { label: 'Luxury Summer Zanzibar', href: '/itineraries' },
      { label: 'Dry Season Private Safari', href: '/itineraries' },
      { label: 'Immersive Culture Trips', href: '/itineraries' },
    ],
  },
  {
    title: 'Kilimanjaro Routes',
    links: [
      { label: 'Machame Route', href: '/kilimanjaro/machame' },
      { label: 'Lemosho Route', href: '/kilimanjaro/lemosho' },
      { label: 'Marangu Route', href: '/kilimanjaro/marangu' },
      { label: 'Umbwe Route', href: '/kilimanjaro/umbwe' },
      { label: 'Rongai Route', href: '/kilimanjaro/rongai' },
      { label: 'Shira Route', href: '/kilimanjaro/shira' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about' },
      { label: 'Blog', href: '/about' },
      { label: 'Careers', href: '/about' },
      { label: 'Partners', href: '/camps-lodges' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-white relative overflow-hidden">
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
                +255 788 071 035
              </a>
              <span className="flex items-center gap-2 text-white/40">
                <MapPin className="w-4 h-4" />
                Arusha, Tanzania
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold tracking-wider text-[#B78A42] mb-4 uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
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
