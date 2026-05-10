import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="pt-32 lg:pt-36" />
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 lg:py-24">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">Terms of Service</h1>
          <p className="text-sm text-[#333333]/40 mb-10">Last updated: January 2025</p>

          <div className="prose prose-sm max-w-none text-[#333333]/70 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">1. Agreement to Terms</h2>
              <p>By accessing and using the Hadada Safaris website and booking our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services. These terms apply to all visitors, users, and clients of Hadada Safaris. We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">2. Booking & Payments</h2>
              <p>All safari bookings require a deposit of 30% of the total trip cost to confirm your reservation. The remaining balance is due 45 days before your departure date. Bookings made within 45 days of departure require full payment at the time of booking. We accept payment via bank transfer, credit card (Visa and Mastercard), PayPal, and M-Pesa. All prices are quoted in USD unless otherwise specified and are subject to change without prior notice until a booking is confirmed.</p>
              <p className="mt-3">Hadada Safaris reserves the right to adjust pricing due to significant changes in park fees, government taxes, fuel costs, or accommodation rates beyond our control. Any such changes will be communicated promptly, and you will have the option to accept the revised price or receive a full refund.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">3. Cancellation Policy</h2>
              <p>Cancellations received more than 60 days before departure receive a full refund minus the deposit. Cancellations between 30 and 59 days before departure incur a 50% charge. Cancellations less than 30 days before departure are non-refundable. We strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical emergencies, and evacuation.</p>
              <p className="mt-3">In the rare event that Hadada Safaris must cancel a trip due to circumstances beyond our control (such as natural disasters, political unrest, or pandemic restrictions), we will offer a full credit toward a future safari or a refund minus any non-recoverable costs already incurred on your behalf.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">4. Travel Insurance</h2>
              <p>Comprehensive travel insurance is mandatory for all Hadada Safaris trips. Your insurance must cover medical expenses, emergency evacuation (including air ambulance), trip cancellation, curtailment, personal liability, and baggage loss. We reserve the right to request proof of insurance before your safari commences. Hadada Safaris accepts no liability for any loss, damage, injury, or expense arising from lack of adequate insurance coverage.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">5. Health & Safety</h2>
              <p>It is your responsibility to ensure you are in adequate health and fitness for the safari activities you have booked. Certain activities — including Kilimanjaro treks, walking safaris, and balloon flights — carry inherent risks that you must be prepared for. We recommend consulting your physician before travel and obtaining all necessary vaccinations and medications for Tanzania. Hadada Safaris provides safety briefings before all activities and our guides are trained in first aid, but we cannot eliminate all risks associated with wildlife encounters and wilderness travel.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">6. Liability</h2>
              <p>Hadada Safaris acts as an intermediary between you and various service providers including lodges, airlines, ground operators, and activity providers. While we carefully select and vet all partners, we cannot accept liability for the acts, omissions, or defaults of these third-party providers. Our total liability for any claim arising from our services shall not exceed the amount you paid for the specific service in question.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">7. Intellectual Property</h2>
              <p>All content on this website — including text, images, logos, graphics, and design — is the property of Hadada Safaris or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, modify, or use any content from this website without prior written permission. Sharing our content on social media with proper attribution is welcomed and encouraged.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">8. Contact</h2>
              <p>For questions about these Terms of Service, please contact us:</p>
              <p className="mt-2">Hadada Safaris<br />Arusha, Tanzania<br />Email: info@hadadasafaris.com<br />Phone: +255 788 071 035</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
