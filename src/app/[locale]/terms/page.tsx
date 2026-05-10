import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Link } from '@/i18n/navigation';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="pt-32 lg:pt-36" />
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 lg:py-24">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B78A42]/8 rounded-full text-[#B78A42] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Legal
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">Terms of Service</h1>
            <p className="text-sm text-[#333333]/40 mb-4">Last updated: March 2025</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <Link href="/privacy" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-[#B78A42] hover:bg-[#B78A42]/5 transition-colors">
                Privacy Policy →
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-[#333333]/50 hover:bg-[#B78A42]/5 hover:text-[#B78A42] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-[#333333]/70 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">1. Agreement to Terms</h2>
              <p>By accessing and using the Hadada Safaris website and booking our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services. These terms apply to all visitors, users, and clients of Hadada Safaris.</p>
              <p className="mt-3">We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes. We will make reasonable efforts to notify you of material changes via email or a notice on our website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">2. Definitions</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;</strong> refers to Hadada Safaris, a registered tour operator based in Arusha, Tanzania.</li>
                <li><strong>&quot;Client,&quot; &quot;you,&quot; &quot;your&quot;</strong> refers to the person or persons booking or participating in our safari services.</li>
                <li><strong>&quot;Services&quot;</strong> refers to all safari tours, Kilimanjaro treks, beach holidays, cultural tours, and related travel services offered by Hadada Safaris.</li>
                <li><strong>&quot;Itinerary&quot;</strong> refers to the detailed travel plan provided to you after booking confirmation.</li>
                <li><strong>&quot;Third-party providers&quot;</strong> refers to lodges, airlines, ground operators, and other service partners we work with.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">3. Booking & Payments</h2>
              <h3 className="text-sm font-bold text-[#333333]/80 mb-2">3.1 Booking Confirmation</h3>
              <p>A booking is confirmed only upon receipt of the required deposit and our written confirmation. A booking request alone does not constitute a confirmed reservation. We will send you a confirmation email with your itinerary and booking reference upon successful processing of your deposit.</p>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">3.2 Pricing & Deposits</h3>
              <p>All safari bookings require a deposit of 30% of the total trip cost to confirm your reservation. The remaining balance is due 45 days before your departure date. Bookings made within 45 days of departure require full payment at the time of booking. All prices are quoted in USD unless otherwise specified and are subject to change without prior notice until a booking is confirmed.</p>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">3.3 Payment Methods</h3>
              <p>We accept payment via bank transfer, credit card (Visa and Mastercard), PayPal, and M-Pesa. Credit card payments may incur a processing surcharge of up to 3.5%. Bank transfer fees are the responsibility of the sender. All payments must be made in full before the start of your safari.</p>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">3.4 Price Adjustments</h3>
              <p>Hadada Safaris reserves the right to adjust pricing due to significant changes in park fees, government taxes, fuel costs, or accommodation rates beyond our control. Any such changes will be communicated promptly, and you will have the option to accept the revised price or receive a full refund of amounts paid.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">4. Cancellation & Refund Policy</h2>
              <h3 className="text-sm font-bold text-[#333333]/80 mb-2">4.1 Client Cancellations</h3>
              <div className="mt-2 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#B78A42]/10">
                      <th className="text-left py-2 text-xs font-bold text-[#B78A42] tracking-wider uppercase">Notice Period</th>
                      <th className="text-right py-2 text-xs font-bold text-[#B78A42] tracking-wider uppercase">Cancellation Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#B78A42]/5">
                      <td className="py-2">More than 60 days before departure</td>
                      <td className="text-right font-semibold">Deposit only</td>
                    </tr>
                    <tr className="border-b border-[#B78A42]/5">
                      <td className="py-2">30–59 days before departure</td>
                      <td className="text-right font-semibold">50% of total cost</td>
                    </tr>
                    <tr>
                      <td className="py-2">Less than 30 days before departure</td>
                      <td className="text-right font-semibold">100% (non-refundable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">4.2 Company Cancellations</h3>
              <p>In the rare event that Hadada Safaris must cancel a trip due to circumstances beyond our control (such as natural disasters, political unrest, or pandemic restrictions), we will offer a full credit toward a future safari or a refund minus any non-recoverable costs already incurred on your behalf.</p>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">4.3 No-Shows</h3>
              <p>If you fail to arrive for your scheduled safari without prior cancellation, no refund will be provided. This includes missed flights, visa issues, or other travel disruptions not caused by Hadada Safaris.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">5. Travel Insurance</h2>
              <p>Comprehensive travel insurance is <strong className="text-[#333333]">mandatory</strong> for all Hadada Safaris trips. Your insurance must cover:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Medical expenses and emergency medical treatment</li>
                <li>Emergency evacuation (including air ambulance and helicopter rescue on Kilimanjaro)</li>
                <li>Trip cancellation, curtailment, and interruption</li>
                <li>Personal liability and legal expenses</li>
                <li>Baggage loss, theft, and delay</li>
                <li>Adventure activities (including high-altitude trekking and wildlife safaris)</li>
              </ul>
              <p className="mt-3">We reserve the right to request proof of insurance before your safari commences. Hadada Safaris accepts no liability for any loss, damage, injury, or expense arising from lack of adequate insurance coverage.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">6. Health & Safety</h2>
              <p>It is your responsibility to ensure you are in adequate health and fitness for the safari activities you have booked. Certain activities — including Kilimanjaro treks, walking safaris, and balloon flights — carry inherent risks that you must be prepared for.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Consult your physician before travel and obtain all necessary vaccinations and medications for Tanzania</li>
                <li>Inform us of any medical conditions, allergies, or disabilities that may affect your participation</li>
                <li>Follow all safety briefings and instructions provided by our guides and camp staff</li>
                <li>Never approach or feed wild animals — maintain a safe distance at all times</li>
                <li>Do not participate in activities if you are under the influence of alcohol or drugs</li>
              </ul>
              <p className="mt-3">Hadada Safaris provides safety briefings before all activities and our guides are trained in first aid, but we cannot eliminate all risks associated with wildlife encounters and wilderness travel.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">7. Liability</h2>
              <p>Hadada Safaris acts as an intermediary between you and various service providers including lodges, airlines, ground operators, and activity providers. While we carefully select and vet all partners, we cannot accept liability for the acts, omissions, or defaults of these third-party providers.</p>
              <p className="mt-3">Our total liability for any claim arising from our services shall not exceed the amount you paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages, including but not limited to loss of enjoyment, disappointment, or emotional distress.</p>
              <p className="mt-3">For full details on how we handle your personal information, please see our <Link href="/privacy" className="text-[#B78A42] hover:underline">Privacy Policy</Link>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">8. Kilimanjaro-Specific Terms</h2>
              <p>Climbing Mount Kilimanjaro carries additional risks and requirements:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>All climbers must complete a medical questionnaire before the trek</li>
                <li>The minimum age for Kilimanjaro climbs is 10 years old</li>
                <li>We reserve the right to turn back any climber showing signs of altitude sickness or who is unable to continue safely</li>
                <li>Porter welfare is important to us — we adhere to the Kilimanjaro Porters Assistance Project (KPAP) guidelines</li>
                <li>Tip guidelines for the mountain crew will be provided in your pre-departure pack</li>
                <li>Successful summit attempts cannot be guaranteed — weather and health conditions may prevent reaching the summit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">9. Intellectual Property</h2>
              <p>All content on this website — including text, images, logos, graphics, design, and software — is the property of Hadada Safaris or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>You may not reproduce, distribute, modify, or use any content from this website without prior written permission</li>
                <li>Sharing our content on social media with proper attribution to Hadada Safaris is welcomed and encouraged</li>
                <li>The Hadada Safaris name, logo, and brand identity are registered trademarks and may not be used without authorization</li>
                <li>Photographs taken during your safari are yours to use personally; however, images featuring other guests require their consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">10. Complaints & Disputes</h2>
              <p>If you have a complaint about any aspect of your safari, please raise it with your guide or camp manager immediately so we can address it during your trip. If the issue remains unresolved, please <Link href="/contact" className="text-[#B78A42] hover:underline">contact our office</Link> in writing within 28 days of the end of your trip.</p>
              <p className="mt-3">Any disputes arising from these terms or your booking shall be governed by the laws of the United Republic of Tanzania and subject to the exclusive jurisdiction of the courts of Tanzania. We will always attempt to resolve disputes amicably through mediation before pursuing legal action.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">11. Force Majeure</h2>
              <p>Neither party shall be liable for any failure or delay in performing obligations caused by events beyond their reasonable control, including but not limited to natural disasters, pandemics, acts of terrorism, war, civil unrest, government actions, strikes, or severe weather conditions. In the event of force majeure, we will make reasonable efforts to provide alternative arrangements or a credit for future travel.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">12. Severability</h2>
              <p>If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the intent of the original provision.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">13. Contact</h2>
              <p>For questions about these Terms of Service, please contact us:</p>
              <div className="mt-2 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4">
                <p className="font-semibold text-[#333333]">Hadada Safaris</p>
                <p>Arusha, Tanzania</p>
                <p>Email: <a href="mailto:info@hadadasafaris.com" className="text-[#B78A42] hover:underline">info@hadadasafaris.com</a></p>
                <p>Phone: <a href="tel:+255788071035" className="text-[#B78A42] hover:underline">+255 788 071 035</a></p>
                <p className="mt-2 text-sm">For privacy-related inquiries, see our <Link href="/privacy" className="text-[#B78A42] hover:underline">Privacy Policy</Link>. For general questions, visit our <Link href="/contact" className="text-[#B78A42] hover:underline">Contact page</Link>.</p>
              </div>
            </section>
          </div>

          {/* Bottom navigation */}
          <div className="mt-16 pt-8 border-t border-[#B78A42]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/privacy" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-sm font-semibold text-[#333333]/60 hover:text-[#B78A42] hover:bg-[#B78A42]/5 transition-all duration-300">
              Privacy Policy →
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B78A42] hover:bg-[#A67A35] text-white text-sm font-bold tracking-wider rounded-full transition-all duration-300 shadow-md shadow-[#B78A42]/10">
              Contact Us
            </Link>
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
