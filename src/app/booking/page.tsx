'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import {
  MapPin, Calendar, Users, Heart, ChevronRight, ChevronLeft,
  Send, CheckCircle2, MessageSquare, Sparkles, Mountain,
  TreePine, Sun, Umbrella, Camera, Bird, ArrowRight, Phone, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/* ─── Step Config ─── */
const steps = [
  { id: 1, title: 'Trip Details', icon: MapPin, description: 'Where & When' },
  { id: 2, title: 'Preferences', icon: Heart, description: 'Style & Comfort' },
  { id: 3, title: 'Your Details', icon: Users, description: 'Contact Info' },
  { id: 4, title: 'Review', icon: CheckCircle2, description: 'Confirm & Send' },
];

const destinations = [
  'Serengeti National Park', 'Ngorongoro Crater', 'Zanzibar Island',
  'Tarangire National Park', 'Lake Manyara', 'Selous Game Reserve',
  'Ruaha National Park', 'Mount Kilimanjaro', 'Multiple Destinations',
];

const tripTypes = [
  { icon: TreePine, label: 'Wildlife Safari', desc: 'Big 5 & game drives' },
  { icon: Mountain, label: 'Kilimanjaro Trek', desc: 'Summit adventure' },
  { icon: Umbrella, label: 'Beach Holiday', desc: 'Zanzibar & coast' },
  { icon: Camera, label: 'Photography', desc: 'Capture the wild' },
  { icon: Bird, label: 'Bird Watching', desc: 'Rare species' },
  { icon: Heart, label: 'Honeymoon', desc: 'Romantic getaway' },
  { icon: Users, label: 'Family Safari', desc: 'All ages welcome' },
  { icon: Sun, label: 'Balloon Safari', desc: 'Fly over the plains' },
];

const accommodationTypes = [
  { label: 'Luxury Lodges', desc: 'Five-star comfort in the wild', price: '$$$' },
  { label: 'Tented Camps', desc: 'Authentic bush experience', price: '$$' },
  { label: 'Mid-Range', desc: 'Comfort & value combined', price: '$$' },
  { label: 'Budget Camping', desc: 'Adventure under the stars', price: '$' },
  { label: 'Mix of Styles', desc: 'Variety across the trip', price: '$$-$$$' },
];

const budgets = [
  { label: '$1,000 - $3,000', desc: 'Per person, value-focused' },
  { label: '$3,000 - $5,000', desc: 'Per person, premium comfort' },
  { label: '$5,000 - $10,000', desc: 'Per person, luxury escape' },
  { label: '$10,000+', desc: 'Per person, ultra-luxury' },
  { label: 'Not Sure', desc: 'Let us recommend the best fit' },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [tripType, setTripType] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [duration, setDuration] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [budget, setBudget] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });

  const toggleDestination = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedDestinations.length > 0 && tripType && duration;
      case 2: return accommodation && budget;
      case 3: return fullName && email;
      default: return true;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/hero-safari.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1a1a1a]/65 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/30 via-transparent to-[#1a1a1a]/60" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-28 text-center" ref={heroRef}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#D5BC92]" />
                Reserve Your Safari
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Book Your{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                  Dream Safari
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto mb-8">
                Complete the form below and our team will craft a personalized itinerary just for you. We respond within 24 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B78A42]" /> No payment required</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B78A42]" /> Free itinerary revision</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#B78A42]" /> 48hr confirmation</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ MULTI-STEP FORM ═══ */}
        <section className="py-16 lg:py-24 bg-[#FAFAF7]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            {submitted ? (
              /* ─── SUCCESS ─── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-[#B78A42]/10 rounded-2xl p-8 md:p-16 text-center shadow-lg shadow-[#333333]/3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-24 h-24 bg-[#B78A42]/10 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#B78A42]" />
                </motion.div>
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Booking Request Received!</h2>
                <p className="text-base text-[#333333]/50 mb-2 max-w-md mx-auto">
                  Thank you, <span className="text-[#B78A42] font-semibold">{fullName || 'traveller'}</span>. Our safari experts will review your request and respond within 24 hours.
                </p>
                <p className="text-sm text-[#333333]/40 mb-10">A confirmation email has been sent to <span className="font-medium">{email || 'your inbox'}</span>.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://wa.me/255788071035"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full text-[#25D366] text-sm font-semibold tracking-wider hover:bg-[#25D366]/15 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> WHATSAPP US
                  </a>
                  <Link href="/contact">
                    <Button variant="outline" className="border-[#B78A42]/20 text-[#B78A42] hover:bg-[#B78A42]/5 font-bold text-xs tracking-wider px-6 py-3 rounded-full">
                      BACK TO CONTACT
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                {/* ─── Step Progress ─── */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, i) => {
                      const Icon = step.icon;
                      const isActive = currentStep === step.id;
                      const isCompleted = currentStep > step.id;
                      return (
                        <div key={step.id} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                                isCompleted
                                  ? 'bg-[#B78A42] text-white shadow-lg shadow-[#B78A42]/20'
                                  : isActive
                                  ? 'bg-[#B78A42]/10 border-2 border-[#B78A42] text-[#B78A42]'
                                  : 'bg-[#333333]/5 text-[#333333]/25'
                              }`}
                            >
                              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4 md:w-5 md:h-5" />}
                            </div>
                            <span className={`hidden sm:block text-[10px] font-semibold tracking-wider uppercase mt-2 ${
                              isActive || isCompleted ? 'text-[#B78A42]' : 'text-[#333333]/25'
                            }`}>
                              {step.title}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 md:mx-4 rounded-full transition-colors duration-500 ${
                              currentStep > step.id ? 'bg-[#B78A42]' : 'bg-[#333333]/8'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ─── Form Card ─── */}
                <div className="bg-white border border-[#B78A42]/8 rounded-2xl p-6 md:p-10 shadow-lg shadow-[#333333]/3">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: Trip Details */}
                    {currentStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Trip Details</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">Where do you want to go and what type of experience are you looking for?</p>

                        {/* Destinations */}
                        <div className="mb-8">
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">
                            Destinations * <span className="text-[#333333]/25">(select one or more)</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {destinations.map((dest) => (
                              <button
                                key={dest}
                                type="button"
                                onClick={() => toggleDestination(dest)}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                  selectedDestinations.includes(dest)
                                    ? 'bg-[#B78A42] text-white border border-[#B78A42] shadow-sm shadow-[#B78A42]/20'
                                    : 'bg-[#FAFAF7] text-[#333333]/60 border border-[#B78A42]/8 hover:border-[#B78A42]/20 hover:text-[#333333]'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {selectedDestinations.includes(dest) && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                                  {dest}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Trip Type */}
                        <div className="mb-8">
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">Trip Type *</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {tripTypes.map((type) => {
                              const Icon = type.icon;
                              return (
                                <button
                                  key={type.label}
                                  type="button"
                                  onClick={() => setTripType(type.label)}
                                  className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-300 ${
                                    tripType === type.label
                                      ? 'bg-[#B78A42] text-white border border-[#B78A42] shadow-sm shadow-[#B78A42]/20'
                                      : 'bg-[#FAFAF7] border border-[#B78A42]/8 hover:border-[#B78A42]/20'
                                  }`}
                                >
                                  <Icon className={`w-5 h-5 ${tripType === type.label ? 'text-white' : 'text-[#B78A42]'}`} />
                                  <span className="text-xs font-semibold">{type.label}</span>
                                  <span className={`text-[10px] ${tripType === type.label ? 'text-white/70' : 'text-[#333333]/30'}`}>{type.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Duration + Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Duration *</label>
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                            >
                              <option value="">Select duration</option>
                              <option>3-4 Days</option>
                              <option>5-6 Days</option>
                              <option>7-8 Days</option>
                              <option>9-10 Days</option>
                              <option>11-14 Days</option>
                              <option>15+ Days</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Preferred Travel Dates</label>
                            <input
                              type="text"
                              value={travelDates}
                              onChange={(e) => setTravelDates(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                              placeholder="e.g. July 2025, flexible"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Preferences */}
                    {currentStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Accommodation & Budget</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">Help us match you with the perfect lodges and experiences for your style and budget.</p>

                        {/* Accommodation */}
                        <div className="mb-8">
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">Accommodation Style *</label>
                          <div className="space-y-3">
                            {accommodationTypes.map((type) => (
                              <button
                                key={type.label}
                                type="button"
                                onClick={() => setAccommodation(type.label)}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${
                                  accommodation === type.label
                                    ? 'bg-[#B78A42] text-white border border-[#B78A42] shadow-sm shadow-[#B78A42]/20'
                                    : 'bg-[#FAFAF7] border border-[#B78A42]/8 hover:border-[#B78A42]/20'
                                }`}
                              >
                                <div className="text-left">
                                  <span className="text-sm font-semibold block">{type.label}</span>
                                  <span className={`text-xs ${accommodation === type.label ? 'text-white/70' : 'text-[#333333]/35'}`}>{type.desc}</span>
                                </div>
                                <span className={`text-xs font-bold tracking-wider ${accommodation === type.label ? 'text-white/80' : 'text-[#B78A42]/50'}`}>{type.price}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="mb-8">
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">Budget Range *</label>
                          <div className="space-y-3">
                            {budgets.map((b) => (
                              <button
                                key={b.label}
                                type="button"
                                onClick={() => setBudget(b.label)}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${
                                  budget === b.label
                                    ? 'bg-[#B78A42] text-white border border-[#B78A42] shadow-sm shadow-[#B78A42]/20'
                                    : 'bg-[#FAFAF7] border border-[#B78A42]/8 hover:border-[#B78A42]/20'
                                }`}
                              >
                                <span className="text-sm font-semibold">{b.label}</span>
                                <span className={`text-xs ${budget === b.label ? 'text-white/70' : 'text-[#333333]/35'}`}>{b.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Group Size */}
                        <div>
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Group Size</label>
                          <select
                            value={groupSize}
                            onChange={(e) => setGroupSize(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                          >
                            <option value="">Select group size</option>
                            <option>Solo Traveller</option>
                            <option>Couple (2)</option>
                            <option>Small Group (3-4)</option>
                            <option>Family (5-6)</option>
                            <option>Large Group (7+)</option>
                          </select>
                        </div>

                        {/* Special Requests */}
                        <div className="mt-5">
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Special Requests</label>
                          <textarea
                            rows={3}
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors resize-none"
                            placeholder="Any dietary needs, accessibility requirements, celebrations, or special interests..."
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Personal Details */}
                    {currentStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Your Details</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">So we can send you a personalized itinerary and get in touch.</p>

                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Full Name *</label>
                              <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Email Address *</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Phone Number</label>
                              <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                                placeholder="+1 234 567 890"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Country</label>
                              <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white transition-colors"
                                placeholder="United States"
                              />
                            </div>
                          </div>

                          <div className="bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-5">
                            <p className="text-xs text-[#333333]/40 leading-relaxed">
                              By submitting this form, you agree to our{' '}
                              <Link href="/privacy" className="text-[#B78A42] hover:underline">Privacy Policy</Link>.
                              We will never share your information with third parties. Your booking inquiry is free with no obligation.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Review */}
                    {currentStep === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Review Your Booking</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">Please review the details below before submitting your booking request.</p>

                        <div className="space-y-6">
                          {/* Trip Summary */}
                          <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-xl p-5">
                            <h4 className="text-xs font-bold text-[#B78A42] tracking-wider uppercase mb-4 flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5" /> Trip Details
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Destinations</span>
                                <span className="text-xs font-semibold text-[#333333] text-right max-w-[60%]">{selectedDestinations.join(', ')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Trip Type</span>
                                <span className="text-xs font-semibold text-[#333333]">{tripType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Duration</span>
                                <span className="text-xs font-semibold text-[#333333]">{duration}</span>
                              </div>
                              {travelDates && (
                                <div className="flex justify-between">
                                  <span className="text-xs text-[#333333]/40">Dates</span>
                                  <span className="text-xs font-semibold text-[#333333]">{travelDates}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Preferences */}
                          <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-xl p-5">
                            <h4 className="text-xs font-bold text-[#B78A42] tracking-wider uppercase mb-4 flex items-center gap-2">
                              <Heart className="w-3.5 h-3.5" /> Preferences
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Accommodation</span>
                                <span className="text-xs font-semibold text-[#333333]">{accommodation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Budget</span>
                                <span className="text-xs font-semibold text-[#333333]">{budget}</span>
                              </div>
                              {groupSize && (
                                <div className="flex justify-between">
                                  <span className="text-xs text-[#333333]/40">Group Size</span>
                                  <span className="text-xs font-semibold text-[#333333]">{groupSize}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Personal */}
                          <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-xl p-5">
                            <h4 className="text-xs font-bold text-[#B78A42] tracking-wider uppercase mb-4 flex items-center gap-2">
                              <Users className="w-3.5 h-3.5" /> Contact Information
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Name</span>
                                <span className="text-xs font-semibold text-[#333333]">{fullName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-[#333333]/40">Email</span>
                                <span className="text-xs font-semibold text-[#333333]">{email}</span>
                              </div>
                              {phone && (
                                <div className="flex justify-between">
                                  <span className="text-xs text-[#333333]/40">Phone</span>
                                  <span className="text-xs font-semibold text-[#333333]">{phone}</span>
                                </div>
                              )}
                              {country && (
                                <div className="flex justify-between">
                                  <span className="text-xs text-[#333333]/40">Country</span>
                                  <span className="text-xs font-semibold text-[#333333]">{country}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {specialRequests && (
                            <div className="bg-[#FAFAF7] border border-[#B78A42]/8 rounded-xl p-5">
                              <h4 className="text-xs font-bold text-[#B78A42] tracking-wider uppercase mb-2 flex items-center gap-2">
                                Special Requests
                              </h4>
                              <p className="text-xs text-[#333333]/50 leading-relaxed">{specialRequests}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ─── Navigation Buttons ─── */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#B78A42]/5">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-[#B78A42]/15 text-[#B78A42] hover:bg-[#B78A42]/5 font-semibold text-xs tracking-wider px-6 py-3 rounded-full group"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> BACK
                      </Button>
                    ) : (
                      <Link href="/contact">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-[#333333]/40 hover:text-[#B78A42] font-semibold text-xs tracking-wider"
                        >
                          Prefer to inquire? <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    )}

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="bg-[#B78A42] hover:bg-[#A67A35] disabled:bg-[#B78A42]/20 disabled:text-white/50 text-white font-bold text-sm tracking-wider px-8 py-3 rounded-full transition-all duration-300 group"
                      >
                        NEXT <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-sm tracking-wider px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#B78A42]/20 group"
                      >
                        <Send className="w-4 h-4 mr-2" /> SUBMIT BOOKING
                      </Button>
                    )}
                  </div>
                </div>

                {/* Help bar */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#333333]/30">
                  <span>Need help?</span>
                  <div className="flex items-center gap-4">
                    <a href="https://wa.me/255788071035" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#25D366] hover:underline">
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Chat
                    </a>
                    <a href="tel:+255788071035" className="flex items-center gap-1.5 text-[#B78A42] hover:underline">
                      <Phone className="w-3.5 h-3.5" /> +255 788 071 035
                    </a>
                    <a href="mailto:info@hadadasafaris.com" className="flex items-center gap-1.5 text-[#B78A42] hover:underline">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                  </div>
                </div>
              </>
            )}
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
