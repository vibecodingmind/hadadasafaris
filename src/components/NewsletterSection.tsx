'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#1a1a1a]" />
      
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#B78A42]/8 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#D5BC92]/6 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B78A42]/4 blur-[200px]" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full text-[#D5BC92] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {t('label')}
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t('title')}
          </h2>

          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            {t('description')}
          </p>

          {/* Glass form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg mx-auto relative overflow-hidden"
          >
            {/* Glass sheen */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#B78A42]/8 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-center py-4 relative z-10"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#B78A42] to-[#D5BC92] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#B78A42]/20">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t('successTitle')}</h3>
                <p className="text-sm text-white/40">{t('successMessage')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('placeholder')}
                      className="w-full pl-11 pr-4 py-3.5 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#B78A42]/50 focus:bg-white/[0.08] focus:shadow-md focus:shadow-[#B78A42]/10 transition-all duration-300"
                      aria-label="Email address for newsletter"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] text-white font-bold text-sm tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#B78A42]/25 group shadow-lg shadow-[#B78A42]/10 focus:outline-none focus:ring-2 focus:ring-[#B78A42]/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                  >
                    {t('subscribe')}
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <span className="text-[10px] text-white/25 tracking-wide">{t('socialProof')}</span>
                  <span className="hidden sm:inline text-white/10">·</span>
                  <span className="text-[10px] text-white/25 tracking-wide">{t('privacyNote')}</span>
                </div>

                <p className="mt-3 text-[10px] text-white/15 text-center">
                  {t('agreement')}{' '}
                  <Link href="/privacy" className="text-[#B78A42]/40 hover:text-[#B78A42]/60 hover:underline underline-offset-2 transition-colors">
                    {t('privacyPolicy')}
                  </Link>
                  {' '}{t('and')}{' '}
                  <Link href="/terms" className="text-[#B78A42]/40 hover:text-[#B78A42]/60 hover:underline underline-offset-2 transition-colors">
                    {t('termsOfService')}
                  </Link>
                  .
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
