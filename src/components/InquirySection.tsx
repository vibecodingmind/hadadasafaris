'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function InquirySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FDF6E3] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#C8A45C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-6">
              Start Planning Your <span className="text-[#C8A45C]">Dream Safari</span>
            </h2>
            <p className="text-[#588157]/70 leading-relaxed mb-10">
              Ready to embark on the adventure of a lifetime? Fill out the form and our
              safari experts will craft the perfect itinerary tailored just for you. We
              respond within 24 hours.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  detail: 'Arusha, Tanzania',
                  sub: 'Safari Capital of Africa',
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  detail: '+255 123 456 789',
                  sub: 'Mon-Sat 8AM-6PM',
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  detail: 'info@hadadasafaris.com',
                  sub: 'We reply within 24 hours',
                },
                {
                  icon: Clock,
                  title: 'Working Hours',
                  detail: 'Mon - Sat: 8:00 AM - 6:00 PM',
                  sub: 'Sunday: By appointment',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1B4332] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#C8A45C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1B4332]">{item.title}</h4>
                    <p className="text-sm text-[#588157]">{item.detail}</p>
                    <p className="text-xs text-[#588157]/50">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="border-[#1B4332]/10 focus:border-[#C8A45C] focus:ring-[#C8A45C]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="border-[#1B4332]/10 focus:border-[#C8A45C] focus:ring-[#C8A45C]/20"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="border-[#1B4332]/10 focus:border-[#C8A45C] focus:ring-[#C8A45C]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                    Travel Date
                  </label>
                  <Input
                    type="date"
                    className="border-[#1B4332]/10 focus:border-[#C8A45C] focus:ring-[#C8A45C]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                    Group Size
                  </label>
                  <Input
                    type="number"
                    placeholder="2"
                    min="1"
                    className="border-[#1B4332]/10 focus:border-[#C8A45C] focus:ring-[#C8A45C]/20"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
                  Tell Us About Your Dream Safari
                </label>
                <Textarea
                  placeholder="I'm interested in a 7-day safari covering Serengeti and Ngorongoro Crater..."
                  rows={5}
                  className="border-[#1B4332]/10 focus:border-[#C8A45C] focus:ring-[#C8A45C]/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                className={`w-full font-bold text-sm tracking-wider py-6 rounded-full transition-all duration-300 group ${
                  submitted
                    ? 'bg-green-600 hover:bg-green-600 text-white'
                    : 'bg-[#C8A45C] hover:bg-[#B8943F] text-[#1B4332] hover:shadow-xl hover:shadow-[#C8A45C]/20'
                }`}
              >
                {submitted ? (
                  'INQUIRY SENT!'
                ) : (
                  <>
                    SEND INQUIRY
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
