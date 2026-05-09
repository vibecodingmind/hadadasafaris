'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DestinationsSection from '@/components/DestinationsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import MemoriesSection from '@/components/MemoriesSection';
import SafariCraftingSection from '@/components/SafariCraftingSection';
import BestTimeToVisit from '@/components/BestTimeToVisit';
import ItinerariesSection from '@/components/ItinerariesSection';
import PhotoGallery from '@/components/PhotoGallery';
import ValueSection from '@/components/ValueSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import TripAdvisorSection from '@/components/TripAdvisorSection';
import FAQSection from '@/components/FAQSection';
import PartnersStrip from '@/components/PartnersStrip';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import Preloader from '@/components/Preloader';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Preloader />
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

        {/* CTA Banner - Dark immersive call-to-action */}
        <CTABanner />
      </main>
      <Footer />

      {/* Floating elements */}
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
