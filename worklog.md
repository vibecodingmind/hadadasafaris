---
Task ID: 1-7
Agent: Main Agent
Task: Redesign Contact Page, Create Booking Page, Fix Slideshow Bug, Connect Pages, Fix Language Switcher

Work Log:
- Completely redesigned /contact page with hero section, glassmorphism contact method cards, embedded OpenStreetMap iframe, office hours card, social links with gradient hover effects, interactive interest tags (toggleable), form with better UX, and CTA section linking to /booking
- Created new /booking page with 4-step booking wizard (Trip Details → Preferences → Your Details → Review), featuring selectable destination chips, trip type icon grid, accommodation style selector, budget range selector, step progress indicator with animated transitions, form validation per step, review summary, and success state with WhatsApp + Contact links
- Fixed image switcher/slideshow bug in both /camps-lodges and /domestic-flights pages: replaced `isTransitioning` useState with `isTransitioningRef` useRef to prevent interval recreation on every transition (the root cause was `isTransitioning` being a dependency of `goTo` callback, which was a dependency of the interval useEffect)
- Connected Contact ↔ Booking pages: Contact page has "BOOK A SAFARI" button in hero and "PROCEED TO BOOKING" in success state; Booking page has "Prefer to inquire?" link to Contact and "BACK TO CONTACT" in success state
- Updated Header BOOK NOW button to link to /booking instead of /contact (both desktop and mobile)
- Updated Footer Company section to include "Book a Safari" link
- Updated CTABanner to link START PLANNING to /booking and VIEW ITINERARIES to /itineraries
- Added /booking WhatsApp message to WhatsAppButton
- Fixed LanguageSwitcher to not use next-intl hooks (useLocale, useRouter from next-intl) which caused SSR build failures; instead reads locale from cookie and navigates via window.location with locale prefix

Stage Summary:
- Contact page: Fully redesigned with hero, contact methods grid, office hours, map, social links, form with interactive interests, CTA to booking
- Booking page: New 4-step wizard at /booking with destinations, trip types, accommodation, budget, personal details, review, and success state
- Slideshow fix: Used useRef instead of useState for transition flag to stabilize interval
- Navigation: All CTAs updated, BOOK NOW → /booking, Contact ↔ Booking linked
- Language switcher: Fixed build errors by removing next-intl hook dependencies
- Build passes successfully
