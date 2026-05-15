'use client';

import { useParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import NewsletterSection from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import {
  Clock,
  ArrowRight,
  BookOpen,
  Calendar,
  Share2,
  Twitter,
  Facebook,
  LinkIcon,
  Check,
  ChevronRight,
  Home,
  Sparkles,
} from 'lucide-react';

const categoryColors: Record<string, string> = {
  'Safari Tips': 'bg-amber-100 text-amber-700 border-amber-200',
  'Wildlife': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Culture': 'bg-purple-100 text-purple-700 border-purple-200',
  'Adventure': 'bg-sky-100 text-sky-700 border-sky-200',
  'Conservation': 'bg-teal-100 text-teal-700 border-teal-200',
};

export default function BlogPostClient() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const contentInView = useInView(contentRef, { once: true, margin: '-80px' });
  const relatedInView = useInView(relatedRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback - do nothing
    }
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || '');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-[#B78A42]/30 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#333333] mb-4">Post Not Found</h1>
            <p className="text-[#333333]/50 mb-6">The blog post you are looking for does not exist.</p>
            <Link href="/blog">
              <Button className="bg-[#B78A42] hover:bg-[#A67A35] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-full">
                BACK TO BLOG
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
        <CookieConsent />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <main className="flex-1">
        {/* ═══ BREADCRUMB ═══ */}
        <div className="bg-white/60 backdrop-blur-xl border-b border-white/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <nav className="flex items-center gap-2 text-xs text-[#333333]/40" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#B78A42] transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-[#B78A42] transition-colors">Safari Journal</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#333333]/70 font-medium truncate max-w-[200px] md:max-w-none">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* ═══ HERO SECTION ═══ */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden" ref={heroRef}>
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/50 via-[#1a1a1a]/40 to-[#1a1a1a]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/30" />
          </div>

          {/* Decorative orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#B78A42]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full bg-[#D5BC92]/8 blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 w-full pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Category badge */}
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold rounded-full border backdrop-blur-xl mb-6 ${categoryColors[post.category] || 'bg-gray-100 text-gray-600 border-gray-200'} bg-white/20`}>
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author info bar */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B78A42] to-[#D5BC92] flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{post.author}</p>
                    <p className="text-[10px] text-white/40 tracking-wide">{post.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/40">
                  <span className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ ARTICLE CONTENT ═══ */}
        <section className="py-16 lg:py-24 relative overflow-hidden" ref={contentRef}>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#B78A42]/3 blur-[150px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#D5BC92]/3 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Excerpt highlight */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#B78A42] to-[#D5BC92]" />
                <p className="text-base md:text-lg text-[#333333]/70 leading-relaxed italic pl-4">
                  {post.excerpt}
                </p>
              </div>

              {/* Article body with prose-like styling */}
              <article
                className="prose-custom max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share buttons */}
              <div className="mt-12 pt-8 border-t border-[#333333]/8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#B78A42]" />
                    <span className="text-sm font-semibold text-[#333333]/60 tracking-wide uppercase">Share this article</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={shareOnTwitter}
                      className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-[#333333]/50 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/5 transition-all duration-300"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={shareOnFacebook}
                      className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-[#333333]/50 hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 transition-all duration-300"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button
                      onClick={shareOnWhatsApp}
                      className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-[#333333]/50 hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all duration-300"
                      aria-label="Share on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-[#333333]/50 hover:text-[#B78A42] hover:border-[#B78A42]/30 hover:bg-[#B78A42]/5 transition-all duration-300"
                      aria-label="Copy link"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ RELATED POSTS ═══ */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden" ref={relatedRef}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B78A42]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={relatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> You Might Also Like
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333]">
                Related <span className="text-[#B78A42]">Articles</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group block bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden hover:border-[#B78A42]/25 hover:shadow-xl hover:shadow-[#B78A42]/10 transition-all duration-500 h-full"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/60 via-transparent to-transparent" />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold rounded-full border backdrop-blur-xl ${categoryColors[related.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {related.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#333333] text-sm mb-2 group-hover:text-[#B78A42] transition-colors leading-tight line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#333333]/35">{formatDate(related.date)}</span>
                        <span className="inline-flex items-center gap-1 text-[#B78A42] text-[10px] font-semibold group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="py-20 lg:py-28 bg-[#FAFAF7] relative overflow-hidden" ref={ctaRef}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B78A42]/4 blur-[150px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              {/* Glass sheen */}
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#B78A42]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 backdrop-blur-sm border border-[#B78A42]/10 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                  <Sparkles className="w-3.5 h-3.5" /> Ready for Your Adventure?
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4 leading-tight">
                  Turn Inspiration Into <span className="text-[#B78A42]">Reality</span>
                </h2>
                <p className="text-base text-[#333333]/50 max-w-xl mx-auto mb-8 leading-relaxed">
                  Inspired by what you&apos;ve read? Let us craft a personalized safari experience that brings these stories to life. Every journey is tailor-made just for you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/booking">
                    <Button className="bg-gradient-to-r from-[#B78A42] to-[#A67A35] hover:from-[#A67A35] hover:to-[#967030] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#B78A42]/20 hover:shadow-xl hover:shadow-[#B78A42]/30 transition-all duration-300 group">
                      PLAN YOUR SAFARI <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="bg-white/70 backdrop-blur-xl border-[#B78A42]/20 text-[#B78A42] hover:bg-[#B78A42] hover:text-white hover:border-[#B78A42] font-bold text-sm tracking-wider px-8 py-4 rounded-full transition-all duration-300">
                      CONTACT US
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
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
