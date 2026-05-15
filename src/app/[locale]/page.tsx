import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

// Lazy-load below-fold sections for faster initial page load
const DestinationsSection = dynamic(() => import('@/components/DestinationsSection'));
const HowItWorksSection = dynamic(() => import('@/components/HowItWorksSection'));
const MemoriesSection = dynamic(() => import('@/components/MemoriesSection'));
const SafariCraftingSection = dynamic(() => import('@/components/SafariCraftingSection'));
const BestTimeToVisit = dynamic(() => import('@/components/BestTimeToVisit'));
const ItinerariesSection = dynamic(() => import('@/components/ItinerariesSection'));
const KilimanjaroSection = dynamic(() => import('@/components/KilimanjaroSection'));
const BalloonSection = dynamic(() => import('@/components/BalloonSection'));
const PhotoGallery = dynamic(() => import('@/components/PhotoGallery'));
const ValueSection = dynamic(() => import('@/components/ValueSection'));
const SustainabilitySection = dynamic(() => import('@/components/SustainabilitySection'));
const TripAdvisorSection = dynamic(() => import('@/components/TripAdvisorSection'));
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const PartnersStrip = dynamic(() => import('@/components/PartnersStrip'));
const NewsletterSection = dynamic(() => import('@/components/NewsletterSection'));
const CTABanner = dynamic(() => import('@/components/CTABanner'));
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'));
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'));
const CookieConsent = dynamic(() => import('@/components/CookieConsent'));
const LiveChat = dynamic(() => import('@/components/LiveChat'));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero - Immersive dark & blurred entry */}
        <HeroSection />

        {/* Destinations - Light cream, glass cards, scrollable */}
        <DestinationsSection />

        {/* How It Works - 3 simple steps */}
        <HowItWorksSection />

        {/* Memories - Clean white, editorial split */}
        <MemoriesSection />

        {/* Safari Crafting - Warm cream, editorial split */}
        <SafariCraftingSection />

        {/* Best Time to Visit - Seasonal guide */}
        <BestTimeToVisit />

        {/* Itineraries - Clean white, glass cards, scrollable */}
        <ItinerariesSection />

        {/* Kilimanjaro - Dark immersive call-to-action for treks */}
        <KilimanjaroSection />

        {/* Balloon Safari - Immersive dark section */}
        <BalloonSection />

        {/* Photo Gallery - Masonry grid with lightbox */}
        <PhotoGallery />

        {/* Value - Light cream, glass value cards */}
        <ValueSection />

        {/* Sustainability - Green accent, community & conservation */}
        <SustainabilitySection />

        {/* Reviews - Clean white, glass review cards */}
        <TripAdvisorSection />

        {/* FAQ - Accordion questions */}
        <FAQSection />

        {/* Partners Strip - Infinite scrolling logos */}
        <PartnersStrip />

        {/* Newsletter - Glass signup section */}
        <NewsletterSection />

        {/* CTA Banner - Dark immersive call-to-action */}
        <CTABanner />
      </main>
      <Footer />

      {/* Floating elements */}
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
      <LiveChat />
    </div>
  );
}
