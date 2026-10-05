import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.bniares.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BNI Ares — Premium Business Networking in Ahmedabad & Gandhinagar",
    template: "%s | BNI Ares",
  },
  description:
    "BNI Ares Chapter — Ahmedabad West's Platinum business networking chapter. Grow your business through trusted referrals, exclusive networking, and the Givers Gain philosophy in Gujarat.",
  keywords: "BNI Ares, BNI chapter, business networking, Ahmedabad, Gandhinagar, Gujarat, referrals, member directory, business growth, networking events",
  openGraph: {
    title: "BNI Ares — Business Networking in Ahmedabad",
    description: "Business Growth. Trusted Referrals. Exclusive Networking. Leadership.",
    type: "website",
    url: SITE_URL,
    siteName: "BNI Ares",
    images: [
      {
        url: "/images/hero-chapter-celebration.jpg",
        width: 1200,
        height: 630,
        alt: "BNI Ares Chapter Celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BNI Ares — Business Networking in Ahmedabad",
    description: "Business Growth. Trusted Referrals. Exclusive Networking. Leadership.",
    images: ["/images/hero-chapter-celebration.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BNI Ares Chapter",
    "url": SITE_URL,
    "logo": `${SITE_URL}/favicon.ico`,
    "description": "Ahmedabad West's Platinum business networking chapter built on trusted referrals and business growth.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "areaServed": ["Ahmedabad", "Gandhinagar", "Gujarat"]
  };

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
