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
  TreePine, Sun, Umbrella, Camera, Bird, ArrowRight, Phone, Mail,
  HelpCircle, Shield, Clock, Star, Loader2, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@hadadasafaris.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone: phone || 'Not provided',
          country: country || 'Not provided',
          destinations: selectedDestinations.join(', ') || 'None selected',
          tripType: tripType || 'Not selected',
          duration: duration || 'Not selected',
          travelDates: travelDates || 'Flexible',
          accommodation: accommodation || 'Not selected',
          budget: budget || 'Not selected',
          groupSize: groupSize || 'Not specified',
          specialRequests: specialRequests || 'None',
          _subject: 'New Booking Request - Hadada Safaris Website',
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
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

          {/* Decorative orbs */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#B78A42]/8 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#D5BC92]/6 blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-28 text-center" ref={heroRef}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-lg shadow-black/10">
                <Sparkles className="w-3.5 h-3.5 text-[#D5BC92]" />
                Reserve Your Safari
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Book Your{' '}
                <span className="bg-gradient-to-r from-[#D5BC92] to-[#B78A42] bg-clip-text text-transparent">
                  Dream Safari
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
                Complete the form below and our team will craft a personalized itinerary just for you. We respond within 24 hours.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#B78A42]" /> No payment required</span>
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#B78A42]" /> Free itinerary revision</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B78A42]" /> 48hr confirmation</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ MULTI-STEP FORM ═══ */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-[#FAFAF7] to-white relative overflow-hidden">
          {/* Animated bg elements */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#B78A42]/4 blur-[150px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#D5BC92]/3 blur-[120px]" />

          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
            {submitted ? (
              /* ─── SUCCESS SCREEN ─── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-8 md:p-16 text-center shadow-xl shadow-[#B78A42]/5 relative overflow-hidden"
              >
                {/* Glass sheen */}
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#B78A42]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-br from-[#B78A42] to-[#D5BC92] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#B78A42]/20 relative z-10"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-[#333333] mb-4 relative z-10">Booking Request Received!</h2>
                <p className="text-base text-[#333333]/50 mb-2 max-w-md mx-auto relative z-10">
                  Thank you, <span className="text-[#B78A42] font-semibold">{fullName || 'traveller'}</span>. Our safari experts will review your request and respond within 24 hours.
                </p>
                <p className="text-sm text-[#333333]/40 mb-10 relative z-10">A confirmation email has been sent to <span className="font-medium">{email || 'your inbox'}</span>.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                  <a
                    href="https://wa.me/255788071035"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 backdrop-blur-xl border border-[#25D366]/20 rounded-full text-[#25D366] text-sm font-semibold tracking-wider hover:bg-[#25D366]/15 transition-all duration-300 shadow-lg shadow-[#25D366]/5"
                  >
                    <MessageSquare className="w-4 h-4" /> WHATSAPP US
                  </a>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-[#B78A42]/20 text-[#B78A42] hover:bg-[#B78A42]/5 font-bold text-xs tracking-wider px-6 py-3 rounded-full bg-white/50 backdrop-blur-xl"
                    >
                      BACK TO CONTACT
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                {/* ─── Step Progress (Glass) ─── */}
                <div className="mb-12">
                  <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 md:p-6 shadow-lg shadow-[#B78A42]/5">
                    <div className="flex items-center justify-between">
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
                                    ? 'bg-gradient-to-br from-[#B78A42] to-[#D5BC92] text-white shadow-lg shadow-[#B78A42]/20'
                                    : isActive
                                    ? 'bg-[#B78A42]/10 border-2 border-[#B78A42] text-[#B78A42] shadow-md shadow-[#B78A42]/10'
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
                              <div className="flex-1 mx-2 md:mx-4">
                                <div className={`h-0.5 rounded-full transition-colors duration-500 ${
                                  currentStep > step.id ? 'bg-gradient-to-r from-[#B78A42] to-[#D5BC92]' : 'bg-[#333333]/8'
                                }`} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ─── Form Card (Glass) ─── */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-10 shadow-xl shadow-[#B78A42]/5 relative overflow-hidden">
                  {/* Subtle glass sheen */}
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#B78A42]/3 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

                  <AnimatePresence mode="wait">
                    {/* STEP 1: Trip Details */}
                    {currentStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-xl font-bold text-[#333333] mb-1">Trip Details</h3>
                            <p className="text-sm text-[#333333]/40">Where do you want to go and what type of experience are you looking for?</p>
                          </div>
                          <Link href="/contact" className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#B78A42] hover:text-[#A67A35] tracking-wider group transition-colors">
                            Prefer to inquire? <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                        {/* Destinations */}
                        <div className="mb-8">
                          <label className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">
                            Destinations * <span className="text-[#333333]/25">(select one or more)</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5" role="group" aria-label="Select destinations">
                            {destinations.map((dest) => (
                              <button
                                key={dest}
                                type="button"
                                onClick={() => toggleDestination(dest)}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                  selectedDestinations.includes(dest)
                                    ? 'bg-gradient-to-r from-[#B78A42] to-[#D5BC92] text-white border border-[#B78A42] shadow-md shadow-[#B78A42]/15'
                                    : 'bg-white/60 backdrop-blur-sm text-[#333333]/60 border border-white/50 hover:border-[#B78A42]/20 hover:text-[#333333] hover:bg-white/80'
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
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="Select trip type">
                            {tripTypes.map((type) => {
                              const Icon = type.icon;
                              return (
                                <button
                                  key={type.label}
                                  type="button"
                                  onClick={() => setTripType(type.label)}
                                  className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-300 ${
                                    tripType === type.label
                                      ? 'bg-gradient-to-br from-[#B78A42] to-[#D5BC92] text-white border border-[#B78A42] shadow-md shadow-[#B78A42]/15'
                                      : 'bg-white/60 backdrop-blur-sm border border-white/50 hover:border-[#B78A42]/20 hover:bg-white/80'
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
                            <label htmlFor="booking-duration" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Duration *</label>
                            <select
                              id="booking-duration"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
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
                            <label htmlFor="booking-dates" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Preferred Travel Dates</label>
                            <input
                              id="booking-dates"
                              type="text"
                              value={travelDates}
                              onChange={(e) => setTravelDates(e.target.value)}
                              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                              placeholder="e.g. July 2025, flexible"
                            />
                          </div>
                        </div>

                        {/* Mobile: Prefer to inquire link */}
                        <div className="md:hidden mt-6 text-center">
                          <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B78A42] hover:text-[#A67A35] tracking-wider group transition-colors">
                            Prefer to inquire? <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Preferences */}
                    {currentStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="relative z-10">
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Accommodation & Budget</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">Help us match you with the perfect lodges and experiences for your style and budget.</p>

                        {/* Accommodation */}
                        <div className="mb-8">
                          <label id="booking-accommodation-label" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">Accommodation Style *</label>
                          <div className="space-y-3" role="radiogroup" aria-labelledby="booking-accommodation-label">
                            {accommodationTypes.map((type) => (
                              <button
                                key={type.label}
                                type="button"
                                onClick={() => setAccommodation(type.label)}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${
                                  accommodation === type.label
                                    ? 'bg-gradient-to-r from-[#B78A42] to-[#D5BC92] text-white border border-[#B78A42] shadow-md shadow-[#B78A42]/15'
                                    : 'bg-white/60 backdrop-blur-sm border border-white/50 hover:border-[#B78A42]/20 hover:bg-white/80'
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
                          <label id="booking-budget-label" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-3">Budget Range *</label>
                          <div className="space-y-3" role="radiogroup" aria-labelledby="booking-budget-label">
                            {budgets.map((b) => (
                              <button
                                key={b.label}
                                type="button"
                                onClick={() => setBudget(b.label)}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 ${
                                  budget === b.label
                                    ? 'bg-gradient-to-r from-[#B78A42] to-[#D5BC92] text-white border border-[#B78A42] shadow-md shadow-[#B78A42]/15'
                                    : 'bg-white/60 backdrop-blur-sm border border-white/50 hover:border-[#B78A42]/20 hover:bg-white/80'
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
                          <label htmlFor="booking-group-size" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Group Size</label>
                          <select
                            id="booking-group-size"
                            value={groupSize}
                            onChange={(e) => setGroupSize(e.target.value)}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
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
                          <label htmlFor="booking-special-requests" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Special Requests</label>
                          <textarea
                            id="booking-special-requests"
                            rows={3}
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300 resize-none"
                            placeholder="Any dietary needs, accessibility requirements, celebrations, or special interests..."
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Personal Details */}
                    {currentStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="relative z-10">
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Your Details</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">So we can send you a personalized itinerary and get in touch.</p>

                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label htmlFor="booking-name" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Full Name *</label>
                              <input
                                id="booking-name"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label htmlFor="booking-email" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Email Address *</label>
                              <input
                                id="booking-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label htmlFor="booking-phone" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Phone Number</label>
                              <input
                                id="booking-phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                                placeholder="+1 234 567 890"
                              />
                            </div>
                            <div>
                              <label htmlFor="booking-country" className="block text-xs font-semibold text-[#333333]/50 tracking-wider uppercase mb-2">Country</label>
                              <input
                                id="booking-country"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-sm text-[#333333] placeholder:text-[#333333]/25 focus:outline-none focus:border-[#B78A42] focus:bg-white/80 focus:shadow-md focus:shadow-[#B78A42]/5 transition-all duration-300"
                                placeholder="United States"
                              />
                            </div>
                          </div>

                          <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-xl p-5">
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
                      <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="relative z-10">
                        <h3 className="text-xl font-bold text-[#333333] mb-1">Review Your Booking</h3>
                        <p className="text-sm text-[#333333]/40 mb-8">Please review the details below before submitting your booking request.</p>

                        <div className="space-y-5">
                          {/* Trip Summary */}
                          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-5">
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
                          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-5">
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
                          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-5">
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
                            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-5">
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
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/30 relative z-10">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-white/30 text-[#B78A42] hover:bg-[#B78A42]/5 font-semibold text-xs tracking-wider px-6 py-3 rounded-full bg-white/30 backdrop-blur-sm group"
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
                        className="bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] disabled:from-[#B78A42]/20 disabled:to-[#A67A35]/20 disabled:text-white/50 text-white font-bold text-sm tracking-wider px-8 py-3 rounded-full transition-all duration-300 group shadow-lg shadow-[#B78A42]/10 disabled:shadow-none"
                      >
                        NEXT <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] disabled:from-[#B78A42]/50 disabled:to-[#A67A35]/50 disabled:text-white/60 text-white font-bold text-sm tracking-wider px-8 py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/25 group shadow-lg shadow-[#B78A42]/10"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> SUBMITTING...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" /> SUBMIT BOOKING
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mt-4 relative z-10">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>

                {/* ─── Floating Help Bar ─── */}
                <div className="mt-8">
                  <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-lg shadow-[#B78A42]/5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#B78A42]" />
                        <span className="text-xs font-semibold text-[#333333]/50 tracking-wider uppercase">Need Help?</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                          href="https://wa.me/255788071035"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366]/10 backdrop-blur-sm border border-[#25D366]/20 rounded-full text-[#25D366] text-xs font-semibold tracking-wider hover:bg-[#25D366]/15 transition-all duration-300"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Chat
                        </a>
                        <a
                          href="tel:+255788071035"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/15 rounded-full text-[#B78A42] text-xs font-semibold tracking-wider hover:bg-[#B78A42]/12 transition-all duration-300"
                        >
                          <Phone className="w-3.5 h-3.5" /> +255 788 071 035
                        </a>
                        <a
                          href="mailto:info@hadadasafaris.com"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/15 rounded-full text-[#B78A42] text-xs font-semibold tracking-wider hover:bg-[#B78A42]/12 transition-all duration-300"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email Us
                        </a>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAFAF7]/80 backdrop-blur-sm border border-white/50 rounded-full text-[#333333]/60 text-xs font-semibold tracking-wider hover:text-[#B78A42] hover:border-[#B78A42]/15 transition-all duration-300"
                        >
                          <ArrowRight className="w-3.5 h-3.5" /> Contact Page
                        </Link>
                      </div>
                    </div>
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
