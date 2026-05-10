export const dynamic = 'force-static';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import { Link } from '@/i18n/navigation';

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">Privacy Policy</h1>
            <p className="text-sm text-[#333333]/40 mb-4">Last updated: March 2025</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <Link href="/terms" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-[#B78A42] hover:bg-[#B78A42]/5 transition-colors">
                Terms of Service →
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-[#333333]/50 hover:bg-[#B78A42]/5 hover:text-[#B78A42] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-[#333333]/70 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">1. Introduction</h2>
              <p>Hadada Safaris (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website hadadasafaris.com, book our safari services, or interact with us in any capacity. This policy applies to all visitors, users, customers, and others who access or use our services.</p>
              <p className="mt-3">By accessing or using our website and services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access our website or provide us with your personal information.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">2. Information We Collect</h2>
              <h3 className="text-sm font-bold text-[#333333]/80 mb-2">2.1 Information You Provide Directly</h3>
              <p>We collect information you provide directly to us when you fill out a contact form, book a safari, subscribe to our newsletter, or communicate with us via email, phone, or WhatsApp. This may include:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Full name and title</li>
                <li>Email address and phone number</li>
                <li>Nationality and country of residence</li>
                <li>Travel dates, group size, and budget preferences</li>
                <li>Passport information (required for safari bookings and park permits)</li>
                <li>Dietary requirements, medical conditions, and accessibility needs</li>
                <li>Payment information processed securely through our payment providers</li>
                <li>Any other details you share to help us plan your safari experience</li>
              </ul>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">2.2 Information Collected Automatically</h3>
              <p>We automatically collect certain technical information when you visit our website, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>IP address and approximate geographic location</li>
                <li>Browser type, version, and language preferences</li>
                <li>Device information (type, operating system, screen resolution)</li>
                <li>Pages visited, time spent on pages, and navigation paths</li>
                <li>Referring URLs and search terms used to find our site</li>
                <li>Click patterns and interaction data</li>
              </ul>

              <h3 className="text-sm font-bold text-[#333333]/80 mb-2 mt-4">2.3 Information from Third Parties</h3>
              <p>We may receive information about you from third parties, including our lodge and airline partners, travel agents referring clients to us, social media platforms (if you interact with our social pages), and analytics providers. We combine this information with the data we already hold to improve our services and your experience.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Booking & Service Delivery:</strong> Processing your safari bookings, arranging accommodations, transportation, and activities, and providing all services included in your itinerary</li>
                <li><strong>Communication:</strong> Responding to your inquiries, sending itinerary proposals and travel documents, providing customer support, and sending important updates about your booking</li>
                <li><strong>Marketing:</strong> Informing you about special offers, new safari experiences, and seasonal promotions that may interest you (only with your consent, and you may opt out at any time)</li>
                <li><strong>Improvement:</strong> Analyzing website usage to improve our website, personalize your experience, and optimize our services</li>
                <li><strong>Legal Compliance:</strong> Complying with legal obligations, resolving disputes, and enforcing our agreements, including our <Link href="/terms" className="text-[#B78A42] hover:underline">Terms of Service</Link></li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">4. Legal Basis for Processing (GDPR)</h2>
              <p>We process your personal data under the following legal bases as defined by the General Data Protection Regulation (GDPR):</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Contractual necessity:</strong> Processing your booking and providing the safari services you have requested</li>
                <li><strong>Consent:</strong> Sending you marketing communications and newsletter updates (you may withdraw consent at any time)</li>
                <li><strong>Legitimate interest:</strong> Improving our services, preventing fraud, and ensuring the security of our website</li>
                <li><strong>Legal obligation:</strong> Complying with Tanzanian and international laws, including tax and travel regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">5. Cookies and Tracking Technologies</h2>
              <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences, understand site usage, and deliver personalized content.</p>

              <div className="mt-3 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4">
                <h4 className="text-xs font-bold text-[#B78A42] tracking-wider uppercase mb-2">Types of Cookies We Use</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-[#333333]">Essential cookies:</strong> Required for site functionality, security, and booking process. These cannot be disabled.</li>
                  <li><strong className="text-[#333333]">Analytics cookies:</strong> Help us understand traffic patterns and usage data to improve our website. We use anonymized data only.</li>
                  <li><strong className="text-[#333333]">Marketing cookies:</strong> Used to deliver relevant content and measure the effectiveness of our campaigns. These are optional.</li>
                </ul>
              </div>

              <p className="mt-3">You can control cookies through your browser settings and may choose to disable them, though this may affect certain features of our website. Our cookie consent banner allows you to accept or decline non-essential cookies at any time.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">6. Data Sharing</h2>
              <p>We will never sell your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Service providers:</strong> Trusted partners such as lodges, airlines, ground operators, and activity providers — solely for the purpose of fulfilling your safari booking</li>
                <li><strong>Payment processors:</strong> Secure payment partners who handle your financial transactions in compliance with PCI-DSS standards</li>
                <li><strong>Legal requirements:</strong> Law enforcement or regulatory authorities when required by law, court order, or governmental regulation</li>
                <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">7. International Data Transfers</h2>
              <p>As a Tanzania-based company serving international clients, your data may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place, including standard contractual clauses and adequacy decisions, to protect your data in accordance with applicable data protection laws, including the GDPR for European residents.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">8. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Encrypted data transmission (SSL/TLS) across our entire website</li>
                <li>Secure server infrastructure with firewalls and intrusion detection</li>
                <li>Restricted access to personal data on a need-to-know basis</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Staff training on data protection and privacy best practices</li>
              </ul>
              <p className="mt-3">While no system is completely secure, we are committed to protecting your information with industry-standard practices and continuously improving our security measures.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">9. Data Retention</h2>
              <p>We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law. Booking records and related personal data are typically retained for 7 years for tax and legal compliance. Marketing data is retained until you withdraw your consent or unsubscribe. You may request deletion of your data at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">10. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete personal data</li>
                <li><strong>Right to erasure:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                <li><strong>Right to restrict processing:</strong> Request that we limit how we use your data</li>
                <li><strong>Right to data portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Right to object:</strong> Object to our processing of your personal data for certain purposes</li>
                <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, please <Link href="/contact" className="text-[#B78A42] hover:underline">contact us</Link> or email privacy@hadadasafaris.com. We will respond to your request within 30 days. If you are not satisfied with our response, you have the right to lodge a complaint with a supervisory authority.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">11. Children&apos;s Privacy</h2>
              <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately and we will take steps to delete such information.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">12. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites, including those of our lodge partners, airlines, and travel associations. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit through links on our website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">13. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website with a revised &quot;Last updated&quot; date. Your continued use of our services after any such changes constitutes acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">14. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
              <div className="mt-2 bg-[#FAFAF7] border border-[#B78A42]/5 rounded-xl p-4">
                <p className="font-semibold text-[#333333]">Hadada Safaris</p>
                <p>Arusha, Tanzania</p>
                <p>Email: <a href="mailto:privacy@hadadasafaris.com" className="text-[#B78A42] hover:underline">privacy@hadadasafaris.com</a></p>
                <p>Phone: <a href="tel:+255788071035" className="text-[#B78A42] hover:underline">+255 788 071 035</a></p>
                <p className="mt-2 text-sm">For general inquiries, visit our <Link href="/contact" className="text-[#B78A42] hover:underline">Contact page</Link>.</p>
              </div>
            </section>
          </div>

          {/* Bottom navigation */}
          <div className="mt-16 pt-8 border-t border-[#B78A42]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/terms" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAFAF7] border border-[#B78A42]/10 rounded-full text-sm font-semibold text-[#333333]/60 hover:text-[#B78A42] hover:bg-[#B78A42]/5 transition-all duration-300">
              Terms of Service →
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
