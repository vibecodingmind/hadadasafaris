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
  title: "Hadada Safaris - Explore Tanzania's Wonders",
  description:
    "At Hadada Safari, we specialize in creating exceptional safari experiences that connect you to Tanzania's breathtaking landscapes, vibrant cultures, and magnificent wildlife.",
  keywords: [
    "Hadada Safaris",
    "Tanzania Safari",
    "Serengeti",
    "Ngorongoro",
    "Kilimanjaro",
    "Zanzibar",
    "Wildlife Safari",
    "African Safari",
    "Luxury Safari",
  ],
  authors: [{ name: "Hadada Safaris" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/favicon.png", type: "image/png", sizes: "64x64" },
    ],
  },
  openGraph: {
    title: "Hadada Safaris - Explore Tanzania's Wonders",
    description:
      "Exceptional safari experiences connecting you to Tanzania's breathtaking landscapes, vibrant cultures, and magnificent wildlife.",
    siteName: "Hadada Safaris",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
