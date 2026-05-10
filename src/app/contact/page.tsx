'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero title="Contact" highlight="Us" subtitle="Start planning your dream safari — we'd love to hear from you" image="/images/ngorongoro-lunch.png" />

      <main className="flex-1">
        <section className="py-24 bg-white" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="lg:col-span-2">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-5">Get In Touch</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6 leading-tight">Let&apos;s Start Your <span className="text-[#B78A42]">Journey</span></h2>
                <p className="text-base text-[#333333]/55 leading-relaxed mb-8">
                  Whether you have a question, need advice, or are ready to book your dream safari, our team is here to help. Reach out through any of the channels below or fill in the form.
                </p>

                <div className="space-y-5 mb-10">
                  <a href="mailto:info@hadadasafaris.com" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#333333] block">Email Us</span>
                      <span className="text-sm text-[#333333]/45">info@hadadasafaris.com</span>
                    </div>
                  </a>
                  <a href="tel:+255123456789" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-[#B78A42]/8 group-hover:bg-[#B78A42] rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#B78A42] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#333333] block">Call Us</span>
                      <span className="text-sm text-[#333333]/45">+255 123 456 789</span>
                    </div>
                  </a>
                  <a href="https://wa.me/255123456789" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-[#25D366]/10 group-hover:bg-[#25D366] rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#333333] block">WhatsApp</span>
                      <span className="text-sm text-[#333333]/45">Chat with us instantly</span>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[#B78A42]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#B78A42]" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#333333] block">Visit Us</span>
                      <span className="text-sm text-[#333333]/45">Arusha, Tanzania</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[#B78A42]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#B78A42]" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#333333] block">Office Hours</span>
                      <span className="text-sm text-[#333333]/45">Mon–Sat: 8:00 AM – 6:00 PM (EAT)</span>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden border border-[#B78A42]/10 h-48 bg-[#FAFAF7] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[#B78A42]/30 mx-auto mb-2" />
                    <span className="text-xs text-[#333333]/30">Arusha, Tanzania</span>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-3">
                <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-2xl p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#B78A42]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-7 h-7 text-[#B78A42]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#333333] mb-2">Thank You!</h3>
                      <p className="text-sm text-[#333333]/50">Your inquiry has been received. Our team will get back to you within 24 hours.</p>
                      <Button className="mt-6 bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full" onClick={() => setSubmitted(false)}>
                        SEND ANOTHER INQUIRY
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-[#333333] mb-1">Plan Your Safari</h3>
                      <p className="text-sm text-[#333333]/40 mb-6">Fill in the details and we&apos;ll craft a personalized itinerary for you</p>
                      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Full Name *</label>
                            <input type="text" required className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors" placeholder="John Doe" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Email *</label>
                            <input type="email" required className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors" placeholder="john@example.com" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Phone</label>
                            <input type="tel" className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors" placeholder="+1 234 567 890" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Travel Dates</label>
                            <input type="text" className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors" placeholder="e.g. July 2025" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Group Size</label>
                            <select className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors">
                              <option>1-2 People</option>
                              <option>3-4 People</option>
                              <option>5-6 People</option>
                              <option>7+ People</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Budget Range</label>
                            <select className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors">
                              <option>$1,000 – $3,000</option>
                              <option>$3,000 – $5,000</option>
                              <option>$5,000 – $10,000</option>
                              <option>$10,000+</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Interests</label>
                          <div className="flex flex-wrap gap-2">
                            {['Wildlife Safari', 'Beach Holiday', 'Cultural Tour', 'Kilimanjaro Trek', 'Balloon Safari', 'Photography'].map((interest) => (
                              <label key={interest} className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#B78A42]/10 rounded-lg text-xs text-[#333333]/50 cursor-pointer hover:border-[#B78A42]/30 transition-colors has-[:checked]:bg-[#B78A42]/5 has-[:checked]:border-[#B78A42]/30 has-[:checked]:text-[#B78A42]">
                                <input type="checkbox" className="sr-only" />
                                {interest}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Message</label>
                          <textarea rows={4} className="w-full px-4 py-3 bg-white border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] transition-colors resize-none" placeholder="Tell us about your dream safari..." />
                        </div>
                        <Button type="submit" className="w-full bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group">
                          SEND INQUIRY <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
