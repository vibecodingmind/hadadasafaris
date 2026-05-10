'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
  Instagram, Facebook, Youtube, ArrowRight, Calendar,
  Users, Globe, CheckCircle2, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@hadadasafaris.com',
    href: 'mailto:info@hadadasafaris.com',
    color: 'bg-[#B78A42]/8 group-hover:bg-[#B78A42]',
    iconColor: 'text-[#B78A42] group-hover:text-white',
    desc: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+255 788 071 035',
    href: 'tel:+255788071035',
    color: 'bg-[#B78A42]/8 group-hover:bg-[#B78A42]',
    iconColor: 'text-[#B78A42] group-hover:text-white',
    desc: 'Mon-Sat 8AM-6PM EAT',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: 'Chat with us instantly',
    href: 'https://wa.me/255788071035',
    color: 'bg-[#25D366]/10 group-hover:bg-[#25D366]',
    iconColor: 'text-[#25D366] group-hover:text-white',
    desc: 'Quick responses guaranteed',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Arusha, Tanzania',
    href: null,
    color: 'bg-[#B78A42]/8',
    iconColor: 'text-[#B78A42]',
    desc: 'Safari Capital of Africa',
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/hadadasafaris', icon: Instagram, gradient: 'from-purple-500 to-pink-500' },
  { label: 'Facebook', href: 'https://facebook.com/hadadasafaris', icon: Facebook, gradient: 'from-blue-600 to-blue-500' },
  { label: 'YouTube', href: 'https://youtube.com/@hadadasafaris', icon: Youtube, gradient: 'from-red-600 to-red-500' },
  { label: 'WhatsApp', href: 'https://wa.me/255788071035', icon: MessageSquare, gradient: 'from-[#25D366] to-[#128C7E]' },
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
  const [submitted, setSubmitted] = useState(false);
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
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/ngorongoro-lunch.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1a1a1a]/65 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/60" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-32 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#D5BC92]" />
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Contact{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto mb-8">
                Start planning your dream safari — we&apos;d love to hear from you. Our team responds within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/booking">
                  <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                    <Calendar className="w-4 h-4 mr-2" /> BOOK A SAFARI
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/255788071035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/15 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" /> WHATSAPP US
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CONTACT METHODS ═══ */}
        <section className="py-20 bg-white" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
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
                      className="group block bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl p-6 hover:border-[#B78A42]/20 hover:shadow-lg transition-all duration-300 text-left h-full"
                    >
                      <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center transition-all duration-300 mb-4`}>
                        <Icon className={`w-5 h-5 ${method.iconColor} transition-colors duration-300`} />
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

        {/* ═══ MAIN FORM + INFO ═══ */}
        <section className="py-20 bg-[#FAFAF7]" ref={formRef}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
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
                    Whether you have a question, need advice, or are ready to book your dream safari, our team is here to help. Fill in the form or reach out directly.
                  </p>
                </div>

                {/* Office Hours */}
                <div className="bg-white border border-[#B78A42]/8 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#B78A42]/8 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#B78A42]" />
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

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-[#B78A42]/10 h-56 bg-[#FAFAF7] relative">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=36.65%2C-3.42%2C36.75%2C-3.34&layer=mapnik&marker=-3.3869%2C36.6830"
                    className="w-full h-full border-0"
                    loading="lazy"
                    title="Hadada Safaris Location — Arusha, Tanzania"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-xl border border-[#B78A42]/15 rounded-full">
                    <MapPin className="w-3 h-3 text-[#B78A42]" />
                    <span className="text-[10px] font-semibold text-[#333333]/60 tracking-wide">Arusha, Tanzania</span>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-xs font-semibold text-[#333333]/40 tracking-wider uppercase mb-3">Follow Us</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="group relative w-11 h-11 bg-white border border-[#B78A42]/10 rounded-xl flex items-center justify-center text-[#B78A42] hover:text-white hover:border-transparent transition-all duration-300 overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                          <Icon className="w-4.5 h-4.5 relative z-10" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Right — Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-white border border-[#B78A42]/8 rounded-2xl p-6 md:p-8 shadow-lg shadow-[#333333]/3">
                  {submitted ? (
                    <div className="text-center py-16">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 bg-[#B78A42]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-[#B78A42]" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#333333] mb-3">Thank You!</h3>
                      <p className="text-sm text-[#333333]/50 mb-2">Your inquiry has been received.</p>
                      <p className="text-sm text-[#333333]/50 mb-8">Our team will get back to you within 24 hours.</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                          className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full"
                          onClick={() => setSubmitted(false)}
                        >
                          SEND ANOTHER INQUIRY
                        </Button>
                        <Link href="/booking">
                          <Button
                            variant="outline"
                            className="border-[#B78A42]/20 text-[#B78A42] hover:bg-[#B78A42]/5 font-bold text-xs tracking-wider px-6 py-3 rounded-full group"
                          >
                            PROCEED TO BOOKING <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-[#333333] mb-1">Plan Your Safari</h3>
                          <p className="text-sm text-[#333333]/40">Fill in the details and we&apos;ll craft a personalized itinerary</p>
                        </div>
                        <Link href="/booking" className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#B78A42] hover:text-[#A67A35] tracking-wider group transition-colors">
                          READY TO BOOK? <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Full Name *</label>
                            <input
                              type="text"
                              required
                              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Email *</label>
                            <input
                              type="email"
                              required
                              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        {/* Row 2: Phone + Travel Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Phone</label>
                            <input
                              type="tel"
                              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                              placeholder="+1 234 567 890"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Travel Dates</label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                              placeholder="e.g. July 2025"
                            />
                          </div>
                        </div>

                        {/* Row 3: Group Size + Budget */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Group Size</label>
                            <select className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors">
                              <option>1-2 People</option>
                              <option>3-4 People</option>
                              <option>5-6 People</option>
                              <option>7+ People</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Budget Range</label>
                            <select className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors">
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
                          <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => (
                              <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                                  selectedInterests.includes(interest)
                                    ? 'bg-[#B78A42] text-white border border-[#B78A42] shadow-sm shadow-[#B78A42]/20'
                                    : 'bg-[#FAFAF7] text-[#333333]/50 border border-[#B78A42]/10 hover:border-[#B78A42]/25 hover:text-[#B78A42]'
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
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Message</label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors resize-none"
                            placeholder="Tell us about your dream safari..."
                          />
                        </div>

                        {/* Submit */}
                        <Button
                          type="submit"
                          className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group"
                        >
                          SEND INQUIRY <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <p className="text-center text-[10px] text-[#333333]/30 tracking-wide">
                          Or skip the form — <Link href="/booking" className="text-[#B78A42] hover:underline">book directly</Link> or <a href="https://wa.me/255788071035" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">WhatsApp us</a>
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ WHY CHOOSE US ═══ */}
        <section className="py-20 bg-white">
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
                    className="text-center p-6 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-2xl hover:border-[#B78A42]/15 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#B78A42]/8 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[#B78A42]" />
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

        {/* ═══ CTA TO BOOKING ═══ */}
        <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/serengeti-elephants.png" alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#B78A42]/8 blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center"
          >
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
                <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/30 group">
                  <Calendar className="w-4 h-4 mr-2" />
                  RESERVE YOUR SAFARI
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/255788071035"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/15 rounded-full text-white text-sm font-semibold tracking-wider hover:bg-white/15 transition-all duration-300"
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
