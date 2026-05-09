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
        {/* Hero - Dark immersive */}
        <HeroSection />

        {/* Destinations - Warm cream, scrollable cards */}
        <DestinationsSection />

        {/* Memories - Dark cinematic full-bleed */}
        <MemoriesSection />

        {/* Safari Crafting - Light warm, editorial split (image left, content right) */}
        <SafariCraftingSection />

        {/* Itineraries - Dark, scrollable cards */}
        <ItinerariesSection />

        {/* Value - White, 2-column statement + cards */}
        <ValueSection />

        {/* Reviews - Dark, scrollable cards - strong close */}
        <TripAdvisorSection />
      </main>
      <Footer />
    </div>
  );
}
