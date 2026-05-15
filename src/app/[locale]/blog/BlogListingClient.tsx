'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import NewsletterSection from '@/components/NewsletterSection';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'Safari Tips': 'bg-amber-100 text-amber-700 border-amber-200',
  'Wildlife': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Culture': 'bg-purple-100 text-purple-700 border-purple-200',
  'Adventure': 'bg-sky-100 text-sky-700 border-sky-200',
  'Conservation': 'bg-teal-100 text-teal-700 border-teal-200',
};

export default function BlogListingClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHero
        title="Safari"
        highlight="Journal"
        subtitle="Stories, guides, and inspiration from the heart of Tanzania's wilderness"
        image="/images/balloon-aerial.png"
      />

      <main className="flex-1">
        {/* Category Filter + Blog Grid */}
        <section className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden" ref={ref}>
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#D5BC92]/4 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            {/* Category Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-14"
            >
              {['All', ...blogCategories].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 border ${
                    activeCategory === category
                      ? 'bg-[#B78A42] text-white border-[#B78A42] shadow-lg shadow-[#B78A42]/20'
                      : 'bg-white/60 backdrop-blur-xl border-white/50 text-[#333333]/60 hover:text-[#B78A42] hover:border-[#B78A42]/30 hover:bg-white/90'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 + i * 0.08, duration: 0.5 }}
                  layout
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden hover:border-[#B78A42]/25 hover:shadow-xl hover:shadow-[#B78A42]/10 transition-all duration-500 h-full"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                      {/* Category badge */}
                      <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold rounded-full border backdrop-blur-xl ${categoryColors[post.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {post.category}
                      </span>
                      {/* Read time */}
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] font-semibold tracking-wide">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <h3 className="font-bold text-[#333333] text-lg mb-2 group-hover:text-[#B78A42] transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#333333]/50 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      {/* Author + Date */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#333333]/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B78A42] to-[#D5BC92] flex items-center justify-center">
                            <BookOpen className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#333333]/70">{post.author}</p>
                            <p className="text-[10px] text-[#333333]/35">{formatDate(post.date)}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[#B78A42] text-xs font-semibold group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-[#B78A42]/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#333333]/50 mb-2">No posts found</h3>
                <p className="text-sm text-[#333333]/35">No articles in this category yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
