import { Link } from '@/i18n/navigation';
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
      { label: 'Book a Safari', href: '/booking' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

// X/Twitter custom SVG icon component
function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// WhatsApp custom SVG icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/hadadasafaris', icon: Instagram, color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500' },
  { label: 'Facebook', href: 'https://facebook.com/hadadasafaris', icon: Facebook, color: 'hover:bg-[#1877F2]' },
  { label: 'YouTube', href: 'https://youtube.com/@hadadasafaris', icon: Youtube, color: 'hover:bg-[#FF0000]' },
  { label: 'WhatsApp', href: 'https://wa.me/255788071035', icon: WhatsAppIcon, color: 'hover:bg-[#25D366]' },
  { label: 'X / Twitter', href: 'https://x.com/hadadasafaris', icon: XTwitterIcon, color: 'hover:bg-[#14171A]' },
];

const paymentMethods = [
  {
    name: 'Visa',
    svg: (
      <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="none">
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <path d="M19.5 21h-3l1.9-10h3l-1.9 10zm12.7-9.8c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3.1 1.2.6 1.6.9 1.6 1.4 0 .8-.9 1.1-1.8 1.1-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2.1.6 3.5.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.2-2.5-3-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.3-2.4zm7.9-.2h-2.3c-.7 0-1.3.2-1.6.9L32 21h3.2l.6-1.7h3.9l.4 1.7H43l-2.4-10h-2.5zm-3 6.5l1.2-3.3.4-1.2.3 1.1.7 3.4h-2.6zM16.6 11l-2.8 6.8-.3-1.4c-.5-1.7-2.1-3.6-3.9-4.5l2.6 9.1h3.2l4.7-10h-3.5z" fill="#fff" />
        <path d="M11.2 11H6.3l0 .2c3.8.9 6.3 3.2 7.3 5.9l-1.1-5.2c-.2-.7-.7-.9-1.3-.9z" fill="#F9A533" />
      </svg>
    ),
  },
  {
    name: 'Mastercard',
    svg: (
      <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="none">
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="8" fill="#EB001B" />
        <circle cx="29" cy="16" r="8" fill="#F79E1B" />
        <path d="M24 10.3a8 8 0 010 11.4 8 8 0 000-11.4z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    name: 'PayPal',
    svg: (
      <svg viewBox="0 0 48 32" className="h-5 w-auto" fill="none">
        <rect width="48" height="32" rx="4" fill="#003087" />
        <path d="M18.5 22h-2.8a.5.5 0 01-.5-.6l2.3-12.3a.6.6 0 01.6-.4h4.8c2 0 3.4 1 3 3.2-.5 2.4-2.2 3.5-4.4 3.5h-2c-.3 0-.5.2-.6.5l-.6 3.5a.5.5 0 01-.5.4l.7 2.2zm3.2-8.5h1.6c.9 0 1.4-.5 1.6-1.4.1-.7-.2-1.2-1-1.2h-1.7c-.2 0-.3.1-.4.3l-.5 2c0 .2.1.3.4.3z" fill="#fff" />
        <path d="M24.8 25.2h-2.8a.5.5 0 01-.5-.6l2.3-12.3a.6.6 0 01.6-.4h4.8c2 0 3.4 1 3 3.2-.5 2.4-2.2 3.5-4.4 3.5h-2c-.3 0-.5.2-.6.5l-.6 3.5a.5.5 0 01-.5.4l.7 2.2zm3.2-8.5h1.6c.9 0 1.4-.5 1.6-1.4.1-.7-.2-1.2-1-1.2h-1.7c-.2 0-.3.1-.4.3l-.5 2c0 .2.1.3.4.3z" fill="#00457C" opacity="0" />
        <path d="M29 8.7h-4.8a.6.6 0 00-.6.4L21.3 21.4a.5.5 0 00.5.6h2.8a.5.5 0 00.5-.4l.6-3.5c.1-.3.3-.5.6-.5h2c2.2 0 3.9-1.1 4.4-3.5.4-2.2-1-3.2-3-3.2l-.7-.2zm1.6 3.2c-.2.9-.7 1.4-1.6 1.4h-1.6c-.3 0-.4-.1-.4-.3l.5-2c.1-.2.2-.3.4-.3h1.7c.8 0 1.1.5 1 1.2z" fill="#0079C1" />
      </svg>
    ),
  },
  {
    name: 'M-Pesa',
    svg: null,
  },
  {
    name: 'Bank Transfer',
    svg: null,
  },
];

const trustBadges = [
  { name: 'TALA Licensed', description: 'Tanzania Tourism', icon: '🛡️' },
  { name: 'TANAPA Partner', description: 'National Parks', icon: '🏞️' },
  { name: 'ATTA Member', description: 'Africa Travel Assoc.', icon: '🌍' },
  { name: 'SafariBookings', description: 'Verified Operator', icon: '✓' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#B78A42]/40 to-transparent" />

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
            <div className="flex flex-col gap-2.5 text-sm mb-8">
              <a href="mailto:info@hadadasafaris.com" className="flex items-center gap-2.5 text-white/40 hover:text-[#B78A42] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#B78A42]/15 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                info@hadadasafaris.com
              </a>
              <a href="tel:+255788071035" className="flex items-center gap-2.5 text-white/40 hover:text-[#B78A42] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#B78A42]/15 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +255 788 071 035
              </a>
              <span className="flex items-center gap-2.5 text-white/40">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                Arusha, Tanzania
              </span>
            </div>

            {/* Follow Us — Social links */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-[#B78A42] uppercase mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className={`group/icon w-11 h-11 bg-white/[0.06] border border-white/[0.08] rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:border-[#B78A42]/40 transition-all duration-300 ${social.color}`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold tracking-[0.15em] text-[#B78A42] mb-5 uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white hover:pl-1 transition-all duration-200 inline-block"
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
        <div className="mt-14 pt-10 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tour Operator Badges */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-5">
                Trusted &amp; Certified
              </h4>
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-[#B78A42]/10 rounded-xl hover:border-[#B78A42]/25 hover:bg-white/[0.05] transition-all duration-300 group/badge"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#B78A42]/20 to-[#D5BC92]/10 rounded-lg flex items-center justify-center border border-[#B78A42]/15 group-hover/badge:border-[#B78A42]/30 transition-colors">
                      <span className="text-[#B78A42] text-xs">{badge.icon}</span>
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
              <h4 className="text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-5">
                Payment Methods
              </h4>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-300"
                  >
                    {method.svg ? (
                      method.svg
                    ) : (
                      <div className="h-5 px-2 bg-white/[0.08] rounded flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase">{method.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Hadada Safaris. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white/40 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
