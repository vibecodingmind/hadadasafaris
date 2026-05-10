import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="pt-32 lg:pt-36" />
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 lg:py-24">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[#333333]/40 mb-10">Last updated: January 2025</p>

          <div className="prose prose-sm max-w-none text-[#333333]/70 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">1. Information We Collect</h2>
              <p>At Hadada Safaris, we collect information you provide directly to us when you fill out a contact form, book a safari, subscribe to our newsletter, or communicate with us via email, phone, or WhatsApp. This may include your name, email address, phone number, travel dates, group size, budget preferences, and any other details you share to help us plan your safari experience.</p>
              <p className="mt-3">We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, pages visited, time spent on pages, and referring URLs. This data helps us understand how visitors use our site so we can improve the experience for everyone.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to process your safari bookings and inquiries, communicate with you about your trip, send you itinerary proposals and travel documents, provide customer support, and inform you about special offers or new safari experiences that may interest you. We may also use your information to improve our website, personalize your experience, and comply with legal obligations.</p>
              <p className="mt-3">We will never sell your personal information to third parties. We may share your information with our trusted partners — such as lodges, airlines, and ground operators — solely for the purpose of fulfilling your safari booking and ensuring your trip runs smoothly.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">3. Cookies</h2>
              <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences, understand site usage, and deliver personalized content. You can control cookies through your browser settings and may choose to disable them, though this may affect certain features of our website.</p>
              <p className="mt-3">We use essential cookies for site functionality, analytics cookies to understand traffic patterns, and marketing cookies to deliver relevant content. Our cookie consent banner allows you to accept or decline non-essential cookies at any time.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission (SSL/TLS), secure server infrastructure, restricted access to personal data, and regular security assessments. While no system is completely secure, we are committed to protecting your information with industry-standard practices.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">5. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your personal information. You may also have the right to data portability and to object to certain processing activities. To exercise any of these rights, please contact us at privacy@hadadasafaris.com. We will respond to your request within 30 days.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">6. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites, including those of our lodge partners, airlines, and travel associations. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit through links on our website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#333333] mb-3">7. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
              <p className="mt-2">Hadada Safaris<br />Arusha, Tanzania<br />Email: privacy@hadadasafaris.com<br />Phone: +255 788 071 035</p>
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
