import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hadada Safaris — Luxury Tanzania Safari Experiences",
    template: "%s | Hadada Safaris",
  },
  description:
    "Discover Tanzania with Hadada Safaris — luxury Serengeti safaris, Ngorongoro Crater tours, Kilimanjaro treks, Zanzibar beach holidays, and balloon safaris. Handcrafted itineraries since 2009.",
  keywords: [
    "Tanzania safari",
    "Serengeti safari",
    "Ngorongoro Crater",
    "Kilimanjaro climbing",
    "Zanzibar holiday",
    "luxury safari Tanzania",
    "balloon safari Serengeti",
    "Hadada Safaris",
    "African safari",
    "wildlife safari",
    "safari tour operator",
    "Tanzania travel",
    "Serengeti migration",
    "Kilimanjaro trekking",
    "Arusha safari",
  ],
  authors: [{ name: "Hadada Safaris" }],
  creator: "Hadada Safaris",
  publisher: "Hadada Safaris",
  metadataBase: new URL("https://hadadasafaris.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "ar": "/ar",
      "zh-CN": "/zh",
      "nl": "/nl",
      "fr": "/fr",
      "de": "/de",
      "it": "/it",
      "pt": "/pt",
      "ru": "/ru",
      "es": "/es",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/favicon.png", type: "image/png", sizes: "64x64" },
    ],
  },
  openGraph: {
    title: "Hadada Safaris — Luxury Tanzania Safari Experiences",
    description:
      "Discover Tanzania with Hadada Safaris — luxury Serengeti safaris, Ngorongoro Crater tours, Kilimanjaro treks, Zanzibar beach holidays, and balloon safaris.",
    siteName: "Hadada Safaris",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-safari.png",
        width: 1344,
        height: 768,
        alt: "Hadada Safaris — Luxury Tanzania Safari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hadada Safaris — Luxury Tanzania Safari Experiences",
    description:
      "Discover Tanzania with Hadada Safaris — luxury Serengeti safaris, Kilimanjaro treks, and Zanzibar beach holidays.",
    images: ["/images/hero-safari.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Hadada Safaris",
  description: "Luxury Tanzania safari tour operator offering Serengeti safaris, Ngorongoro Crater tours, Kilimanjaro treks, Zanzibar beach holidays, and balloon safaris.",
  url: "https://hadadasafaris.com",
  logo: "https://hadadasafaris.com/images/hadada-logo.png",
  image: "https://hadadasafaris.com/images/hero-safari.png",
  telephone: "+255788071035",
  email: "info@hadadasafaris.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arusha",
    addressCountry: "TZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -3.3869,
    longitude: 36.6830,
  },
  foundingDate: "2009",
  priceRange: "$$$",
  areaServed: {
    "@type": "Country",
    name: "Tanzania",
  },
  sameAs: [
    "https://instagram.com/hadadasafaris",
    "https://facebook.com/hadadasafaris",
    "https://youtube.com/@hadadasafaris",
    "https://x.com/hadadasafaris",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Safari Experiences",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Serengeti Safari" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ngorongoro Crater Tour" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kilimanjaro Trekking" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zanzibar Beach Holiday" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Balloon Safari" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
