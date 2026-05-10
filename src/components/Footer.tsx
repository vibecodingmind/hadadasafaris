import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

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
      { label: 'Camp & Lodges', href: '/camps-lodges' },
      { label: 'Domestic Flights', href: '/domestic-flights' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/hadadasafaris', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com/hadadasafaris', icon: Facebook },
  { label: 'YouTube', href: 'https://youtube.com/@hadadasafaris', icon: Youtube },
  { label: 'WhatsApp', href: 'https://wa.me/255788071035', icon: Phone },
  { label: 'X / Twitter', href: 'https://x.com/hadadasafaris', icon: Mail },
];

const paymentMethods = [
  { name: 'Visa', icon: '💳' },
  { name: 'Mastercard', icon: '💳' },
  { name: 'PayPal', icon: '🅿️' },
  { name: 'M-Pesa', icon: '📱' },
  { name: 'Bank Transfer', icon: '🏦' },
];

const trustBadges = [
  { name: 'TALA Licensed', description: 'Tanzania Tourism' },
  { name: 'TANAPA Partner', description: 'National Parks' },
  { name: 'ATTA Member', description: 'Africa Travel Assoc.' },
  { name: 'SafariBookings', description: 'Verified Operator' },
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
            <div className="flex flex-col gap-2 text-sm mb-6">
              <a href="mailto:info@hadadasafaris.com" className="flex items-center gap-2 text-white/40 hover:text-[#B78A42] transition-colors">
                <Mail className="w-4 h-4" />
                info@hadadasafaris.com
              </a>
              <a href="tel:+255788071035" className="flex items-center gap-2 text-white/40 hover:text-[#B78A42] transition-colors">
                <Phone className="w-4 h-4" />
                +255 788 071 035
              </a>
              <span className="flex items-center gap-2 text-white/40">
                <MapPin className="w-4 h-4" />
                Arusha, Tanzania
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-[#B78A42] hover:border-[#B78A42] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
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

        {/* Trust badges + Payment methods */}
        <div className="mt-12 pt-10 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tour Operator Badges */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white/25 uppercase mb-4">
                Trusted &amp; Certified
              </h4>
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:border-[#B78A42]/20 transition-colors"
                  >
                    <div className="w-6 h-6 bg-[#B78A42]/15 rounded flex items-center justify-center">
                      <span className="text-[#B78A42] text-[10px] font-bold">&#10003;</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-white/60 block leading-tight">{badge.name}</span>
                      <span className="text-[9px] text-white/25 leading-tight">{badge.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white/25 uppercase mb-4">
                Payment Methods
              </h4>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg"
                  >
                    <span className="text-sm">{method.icon}</span>
                    <span className="text-[11px] font-medium text-white/50">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Hadada Safaris. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white/50 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
