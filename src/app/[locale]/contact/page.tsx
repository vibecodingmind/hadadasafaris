'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
  Instagram, Facebook, Youtube, ArrowRight, Calendar,
  Users, Globe, CheckCircle2, Sparkles, Heart, Loader2, AlertCircle
} from 'lucide-react';

// Custom SVG icons for social platforms
function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@hadadasafaris.com',
    href: 'mailto:info@hadadasafaris.com',
    color: 'from-amber-400 to-orange-500',
    desc: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+255 788 071 035',
    href: 'tel:+255788071035',
    color: 'from-emerald-400 to-teal-500',
    desc: 'Mon-Sat 8AM-6PM EAT',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: 'Chat with us instantly',
    href: 'https://wa.me/255788071035',
    color: 'from-green-400 to-green-600',
    desc: 'Quick responses guaranteed',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Arusha, Tanzania',
    href: null,
    color: 'from-rose-400 to-pink-500',
    desc: 'Safari Capital of Africa',
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/hadadasafaris', icon: Instagram, gradient: 'from-purple-600 via-pink-500 to-orange-400' },
  { label: 'Facebook', href: 'https://facebook.com/hadadasafaris', icon: Facebook, gradient: 'from-blue-600 to-blue-700' },
  { label: 'YouTube', href: 'https://youtube.com/@hadadasafaris', icon: Youtube, gradient: 'from-red-600 to-red-700' },
  { label: 'WhatsApp', href: 'https://wa.me/255788071035', icon: WhatsAppIcon, gradient: 'from-green-500 to-green-600' },
  { label: 'X / Twitter', href: 'https://x.com/hadadasafaris', icon: XTwitterIcon, gradient: 'from-gray-700 to-gray-900' },
];

const interests = [
  'Wildlife Safari', 'Beach Holiday', 'Cultural Tour',
  'Kilimanjaro Trek', 'Balloon Safari', 'Photography',
  'Honeymoon', 'Family Safari', 'Bird Watching',
];

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-100px' });
  const socialRef = useRef(null);
  const socialInView = useInView(socialRef, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/ngorongoro-lunch.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 via-transparent to-[#1a1a1a]/70" />
          </div>

          {/* Decorative floating orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#B78A42]/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full bg-[#D5BC92]/8 blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-32 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-lg shadow-black/10">
                <Sparkles className="w-3.5 h-3.5 text-[#D5BC92]" />
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Contact{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                Start planning your dream safari — we&apos;d love to hear from you. Our team responds within 24 hours.
              </p>

              {/* Glass CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/booking">
                  <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group shadow-lg shadow-[#B78A42]/20">
                    <Calendar className="w-4 h-4 mr-2" /> BOOK A SAFARI
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/255788071035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/20 hover:border-white/25 transition-all duration-300 shadow-lg shadow-black/10"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" /> WHATSAPP US
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CONTACT METHODS — Glass Cards ═══ */}
        <section className="py-20 bg-gradient-to-b from-[#FAFAF7] to-white relative" ref={ref}>
          {/* Subtle bg orbs */}
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#B78A42]/5 blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#D5BC92]/4 blur-[120px]" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">
                How to Reach <span className="text-[#B78A42]">Us</span>
              </h2>
              <p className="text-base text-[#333333]/50 max-w-xl mx-auto">
                Multiple ways to connect — choose whichever feels right for you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                const Wrapper = method.href ? 'a' : 'div';
                const wrapperProps = method.href
                  ? { href: method.href, target: method.href.startsWith('http') ? '_blank' : undefined, rel: method.href.startsWith('http') ? 'noopener noreferrer' : undefined }
                  : {};
                return (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <Wrapper
                      {...wrapperProps}
                      className="group block bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 hover:bg-white/90 hover:border-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/8 transition-all duration-500 text-left h-full"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-[#333333] mb-1">{method.label}</h3>
                      <p className="text-sm text-[#B78A42] font-semibold mb-1">{method.value}</p>
                      <p className="text-xs text-[#333333]/40">{method.desc}</p>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ MAIN FORM + INFO — Glass Layout ═══ */}
        <section className="py-20 bg-[#FAFAF7] relative overflow-hidden" ref={formRef}>
          {/* Animated bg elements */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#B78A42]/5 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#D5BC92]/4 blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left — Info + Map + Socials */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2 space-y-8"
              >
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                    Let&apos;s Talk
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4 leading-tight">
                    Let&apos;s Start Your <span className="text-[#B78A42]">Journey</span>
                  </h2>
                  <p className="text-base text-[#333333]/55 leading-relaxed">
                    Whether you have a question, need advice, or are ready to book your dream safari, our team is here to help.
                  </p>
                </div>

                {/* Office Hours — Glass card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg shadow-[#B78A42]/5 hover:shadow-xl hover:shadow-[#B78A42]/8 transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/15">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#333333]">Office Hours</h4>
                      <p className="text-xs text-[#333333]/40">East Africa Time (EAT)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
                      { day: 'Saturday', time: '8:00 AM – 4:00 PM' },
                      { day: 'Sunday', time: 'By Appointment' },
                    ].map((row) => (
                      <div key={row.day} className="flex items-center justify-between py-1.5 border-b border-[#B78A42]/5 last:border-0">
                        <span className="text-xs text-[#333333]/60">{row.day}</span>
                        <span className="text-xs font-semibold text-[#333333]/80">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map — Glass overlay */}
                <div className="rounded-2xl overflow-hidden border border-white/50 shadow-lg shadow-[#B78A42]/5 relative h-56 bg-[#FAFAF7]">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=36.65%2C-3.42%2C36.75%2C-3.34&layer=mapnik&marker=-3.3869%2C36.6830"
                    className="w-full h-full border-0"
                    loading="lazy"
                    title="Hadada Safaris Location — Arusha, Tanzania"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-xl border border-[#B78A42]/15 rounded-full shadow-lg shadow-black/5">
                    <MapPin className="w-3 h-3 text-[#B78A42]" />
                    <span className="text-[10px] font-semibold text-[#333333]/60 tracking-wide">Arusha, Tanzania</span>
                  </div>
                </div>

                {/* Quick contact pills */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+255788071035"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full text-xs font-semibold text-[#333333] hover:bg-white/90 hover:border-[#B78A42]/20 hover:shadow-md transition-all duration-300"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B78A42]" /> +255 788 071 035
                  </a>
                  <a
                    href="mailto:info@hadadasafaris.com"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full text-xs font-semibold text-[#333333] hover:bg-white/90 hover:border-[#B78A42]/20 hover:shadow-md transition-all duration-300"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B78A42]" /> info@hadadasafaris.com
                  </a>
                </div>
              </motion.div>

              {/* Right — Contact Form (Glass) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-[#B78A42]/5 relative overflow-hidden">
                  {/* Subtle glass sheen */}
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#B78A42]/3 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                  {submitted ? (
                    <div className="text-center py-16 relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 bg-gradient-to-br from-[#B78A42] to-[#D5BC92] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#B78A42]/20"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#333333] mb-3">Thank You!</h3>
                      <p className="text-sm text-[#333333]/50 mb-2">Your inquiry has been received.</p>
                      <p className="text-sm text-[#333333]/50 mb-8">Our team will get back to you within 24 hours.</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                          className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full shadow-lg shadow-[#B78A42]/20"
                          onClick={() => setSubmitted(false)}
                        >
                          SEND ANOTHER INQUIRY
                        </Button>
                        <Link href="/booking">
                          <Button
                            variant="outline"
                            className="border-[#B78A42]/20 text-[#B78A42] hover:bg-[#B78A42]/5 font-bold text-xs tracking-wider px-6 py-3 rounded-full group bg-white/50 backdrop-blur-xl"
                          >
                            PROCEED TO BOOKING <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-[#333333] mb-1">Plan Your Safari</h3>
                          <p className="text-sm text-[#333333]/40">Fill in the details and we&apos;ll craft a personalized itinerary</p>
                        </div>
                        <Link href="/booking" className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#B78A42] hover:text-[#A67A35] tracking-wider group transition-colors">
                          READY TO BOOK? <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        setErrorMessage('');
                        setIsLoading(true);
                        try {
                          const form = e.currentTarget;
                          const formData = new FormData(form);
                          const data = Object.fromEntries(formData.entries());

                          const response = await fetch('https://formsubmit.co/ajax/info@hadadasafaris.com', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              Accept: 'application/json',
                            },
                            body: JSON.stringify({
                              name: data['contact-name'] || '',
                              email: data['contact-email'] || '',
                              phone: data['contact-phone'] || '',
                              travelDates: data['contact-dates'] || '',
                              groupSize: data['contact-group-size'] || '',
                              budget: data['contact-budget'] || '',
                              interests: selectedInterests.join(', ') || 'None selected',
                              message: data['contact-message'] || '',
                              _subject: 'New Safari Inquiry - Hadada Safaris Website',
                              _captcha: 'false',
                              _template: 'table',
                            }),
                          });

                          if (!response.ok) {
                            throw new Error('Failed to send inquiry. Please try again.');
                          }

                          setSubmitted(true);
                        } catch (err) {
                          setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact us directly.');
                        } finally {
                          setIsLoading(false);
                        }
                      }} className="space-y-5">
                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-name" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Full Name *</label>
                            <input
                              id="contact-name"
                              type="text"
                              required
                              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Email *</label>
                            <input
                              id="contact-email"
                              type="email"
                              required
                              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        {/* Row 2: Phone + Travel Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Phone</label>
                            <input
                              id="contact-phone"
                              type="tel"
                              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                              placeholder="+1 234 567 890"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-dates" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Travel Dates</label>
                            <input
                              id="contact-dates"
                              type="text"
                              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                              placeholder="e.g. July 2025"
                            />
                          </div>
                        </div>

                        {/* Row 3: Group Size + Budget */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-group-size" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Group Size</label>
                            <select id="contact-group-size" className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300">
                              <option>1-2 People</option>
                              <option>3-4 People</option>
                              <option>5-6 People</option>
                              <option>7+ People</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="contact-budget" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Budget Range</label>
                            <select id="contact-budget" className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300">
                              <option>$1,000 - $3,000</option>
                              <option>$3,000 - $5,000</option>
                              <option>$5,000 - $10,000</option>
                              <option>$10,000+</option>
                            </select>
                          </div>
                        </div>

                        {/* Interests */}
                        <div>
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">Interests</label>
                          <div className="flex flex-wrap gap-2" role="group" aria-label="Select your interests">
                            {interests.map((interest) => (
                              <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                                  selectedInterests.includes(interest)
                                    ? 'bg-gradient-to-r from-[#B78A42] to-[#D5BC92] text-white border border-[#B78A42] shadow-md shadow-[#B78A42]/15'
                                    : 'bg-white/60 backdrop-blur-sm text-[#333333]/50 border border-white/50 hover:border-[#B78A42]/25 hover:text-[#B78A42] hover:bg-white/80'
                                }`}
                              >
                                {selectedInterests.includes(interest) && <CheckCircle2 className="w-3 h-3" />}
                                {interest}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="contact-message" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Message</label>
                          <textarea
                            id="contact-message"
                            rows={4}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300 resize-none"
                            placeholder="Tell us about your dream safari..."
                          />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{errorMessage}</span>
                          </div>
                        )}

                        {/* Submit */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] disabled:from-[#B78A42]/50 disabled:to-[#A67A35]/50 disabled:text-white/60 text-white font-bold text-sm tracking-wider py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/25 group shadow-lg shadow-[#B78A42]/10"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> SENDING...
                            </>
                          ) : (
                            <>
                              SEND INQUIRY <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>

                        <p className="text-center text-[10px] text-[#333333]/30 tracking-wide">
                          Or skip the form — <Link href="/booking" className="text-[#B78A42] hover:underline">book directly</Link> or <a href="https://wa.me/255788071035" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">WhatsApp us</a>
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ CONNECT WITH US — Social Media ═══ */}
        <section className="py-20 bg-white relative overflow-hidden" ref={socialRef}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B78A42]/3 blur-[150px]" />

          <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Heart className="w-3.5 h-3.5" /> Stay Connected
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">
                Connect With <span className="text-[#B78A42]">Us</span>
              </h2>
              <p className="text-base text-[#333333]/50 max-w-xl mx-auto">
                Follow our safari adventures, get travel inspiration, and stay up to date with the latest offers
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={socialInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className={`group relative flex flex-col items-center gap-3 p-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl hover:bg-white/90 hover:border-[#B78A42]/15 hover:shadow-xl hover:shadow-[#B78A42]/8 transition-all duration-500 overflow-hidden`}
                  >
                    {/* Gradient hover bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className={`w-14 h-14 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-[#333333] tracking-wider uppercase relative z-10">{social.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ WHY CHOOSE US ═══ */}
        <section className="py-20 bg-gradient-to-b from-[#FAFAF7] to-white relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">
                Why <span className="text-[#B78A42]">Hadada Safaris</span>?
              </h2>
              <p className="text-base text-[#333333]/50 max-w-xl mx-auto">
                Trusted by thousands of travellers from around the world
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Globe, value: '15+', label: 'Years of Experience', desc: 'Crafting unforgettable safaris since 2009' },
                { icon: Users, value: '5,000+', label: 'Happy Travellers', desc: 'Guests from over 50 countries worldwide' },
                { icon: MapPin, value: '17+', label: 'Destinations', desc: 'Across Tanzania and East Africa' },
                { icon: CheckCircle2, value: '100%', label: 'Tailor-Made', desc: 'Every itinerary crafted just for you' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="text-center p-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl hover:border-[#B78A42]/15 hover:shadow-xl hover:shadow-[#B78A42]/8 transition-all duration-500"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B78A42] to-[#D5BC92] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#B78A42]/10">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-[#B78A42] mb-1">{stat.value}</p>
                    <p className="text-sm font-semibold text-[#333333] mb-1">{stat.label}</p>
                    <p className="text-xs text-[#333333]/40">{stat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ READY TO BOOK CTA ═══ */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/serengeti-elephants.png" alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/8 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D5BC92]/5 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Ready?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Book Your{' '}
              <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                Safari
              </span>
              ?
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Skip the inquiry and book directly. Our reservation team will confirm your dream safari within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group shadow-lg shadow-[#B78A42]/20">
                  <Calendar className="w-4 h-4 mr-2" />
                  RESERVE YOUR SAFARI
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/255788071035"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/20 hover:border-white/25 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" /> WHATSAPP US
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
