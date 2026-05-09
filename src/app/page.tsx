'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DestinationsSection from '@/components/DestinationsSection';
import MemoriesSection from '@/components/MemoriesSection';
import SafariCraftingSection from '@/components/SafariCraftingSection';
import ItinerariesSection from '@/components/ItinerariesSection';
import ValueSection from '@/components/ValueSection';
import TripAdvisorSection from '@/components/TripAdvisorSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero - Immersive glass entry */}
        <HeroSection />

        {/* Destinations - Light cream, glass cards, scrollable */}
        <DestinationsSection />

        {/* Memories - Clean white, editorial split */}
        <MemoriesSection />

        {/* Safari Crafting - Warm cream, glass stats, editorial split */}
        <SafariCraftingSection />

        {/* Itineraries - Clean white, glass cards, scrollable */}
        <ItinerariesSection />

        {/* Value - Light cream, glass value cards */}
        <ValueSection />

        {/* Reviews - Clean white, glass review cards */}
        <TripAdvisorSection />
      </main>
      <Footer />
    </div>
  );
}
