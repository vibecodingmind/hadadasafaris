'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DestinationsSection from '@/components/DestinationsSection';
import MemoriesSection from '@/components/MemoriesSection';
import SafariCraftingSection from '@/components/SafariCraftingSection';
import ValueSection from '@/components/ValueSection';
import ItinerariesSection from '@/components/ItinerariesSection';
import KilimanjaroSection from '@/components/KilimanjaroSection';
import BalloonSection from '@/components/BalloonSection';
import TripAdvisorSection from '@/components/TripAdvisorSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DestinationsSection />
        <MemoriesSection />
        <SafariCraftingSection />
        <ItinerariesSection />
        <KilimanjaroSection />
        <BalloonSection />
        <ValueSection />
        <TripAdvisorSection />
      </main>
      <Footer />
    </div>
  );
}
