import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

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

const SITE_URL = "https://bni-ares-roster.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BNI Ares — Chapter Roster",
    template: "%s | BNI Ares",
  },
  description:
    "BNI Ares Chapter — a business networking chapter built on trusted referrals, business growth, and Givers Gain. Explore our member directory, meet the team, and join us as a visitor.",
  keywords: "BNI Ares, BNI chapter, business networking, referrals, member directory",
  openGraph: {
    title: "BNI Ares — Chapter Roster",
    description: "Business Growth. Trusted Referrals. Networking. Leadership.",
    type: "website",
    url: SITE_URL,
    siteName: "BNI Ares",
  },
  twitter: {
    card: "summary_large_image",
    title: "BNI Ares — Chapter Roster",
    description: "Business Growth. Trusted Referrals. Networking. Leadership.",
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
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-ink antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
