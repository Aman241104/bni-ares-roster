import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  IndianRupee,
  Handshake,
  Users,
  Calendar,
  PieChart,
  Target,
  Heart,
  Globe,
  Award,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Eye,
  Star
} from "lucide-react";
import { Container, Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import StatCounter, { AnimatedStatText } from "@/components/StatCounter";
import { supabase } from "@/lib/supabase/client";
import type { Settings } from "@/types/database";

export const metadata: Metadata = {
  title: "About Ares",
  description: "The story, philosophy, and people behind BNI Ares — Ahmedabad West's Platinum chapter built on Givers Gain.",
};

export const revalidate = 60;

const TIMELINE = [
  { icon: MessageCircle, title: "Build Relationships", desc: "Connect with like-minded business professionals." },
  { icon: Handshake, title: "Give Referrals", desc: "Pass qualified business opportunities to members." },
  { icon: IndianRupee, title: "Receive Business", desc: "Get referrals that convert into real revenue." },
  { icon: TrendingUp, title: "Grow Together", desc: "Scale your business with continuous support." },
];

const ACHIEVEMENTS = [
  { icon: Award, title: "Platinum Performance Chapter" },
  { icon: IndianRupee, title: "100 Cr+ Business Passed" },
  { icon: Target, title: "Strong Leadership Team" },
  { icon: Globe, title: "Trusted by Businesses" },
];

export default async function AboutPage() {
  const [settingsRes, membersRes] = await Promise.all([
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("members").select("business_category").eq("status", "active"),
  ]);

  const s = settingsRes.data as Settings | null;
  const list = membersRes.data || [];
  const uniqueCategories = Math.max(30, new Set(list.map((m) => m.business_category).filter(Boolean)).size);

  const hasRealStats = !!(
    s?.stat_total_members ||
    s?.stat_business_passed ||
    s?.stat_total_referrals ||
    s?.stat_visitors_hosted ||
    s?.stat_years_chapter
  );

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative bg-ink text-white pt-24 sm:pt-32 pb-32 sm:pb-48">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/social-lawn-picnic.jpg"
            alt="BNI Ares Members"
            aria-hidden="true"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 max-w-3xl">
            <h1 className="font-heading text-5xl font-extrabold leading-tight sm:text-7xl text-white">
              About <span className="text-brand-500">BNI Ares</span>
            </h1>
            <p className="mt-6 text-2xl sm:text-3xl font-semibold text-zinc-200 leading-snug">
              Building meaningful relationships.<br />
              Creating unlimited opportunities.
            </p>
            <p className="mt-6 max-w-2xl text-lg text-zinc-300 leading-relaxed">
              BNI Ares is Ahmedabad&apos;s leading business networking chapter, where trusted relationships and quality referrals help businesses grow together. We are a community of like-minded professionals committed to Givers Gain® and collective success.
            </p>
          </div>
          
          <div className="w-full lg:w-[400px] shrink-0 -mb-12 lg:-mb-24">
            <Reveal className="bg-brand-500 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <Eye size={160} aria-hidden="true" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Eye className="text-white" size={24} aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold font-heading">Our Vision</h2>
                </div>
                <p className="text-white/90 leading-relaxed font-medium">
                  To be the most impactful and respected business networking chapter, recognized for transforming businesses and lives through meaningful connections.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. "Our Story" & Core Values Section */}
      <Section className="bg-white pt-32 sm:pt-40 lg:pt-48 pb-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <Reveal>
              <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                OUR STORY
              </span>
              <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
                The Journey of BNI Ares
              </h2>
              <div className="mt-6 space-y-6 text-zinc-600 text-lg leading-relaxed">
                <p>
                  BNI Ares was formed with a vision to create a strong platform for Ahmedabad&apos;s business owners. What started as a small group of ambitious professionals has now grown into one of the most dynamic and high-performing networking chapters in the region.
                </p>
                <p>
                  Over the years, we have broken records, fostered unbreakable bonds, and generated hundreds of crores in closed business. But beyond the numbers, it&apos;s the culture of unwavering support and mutual respect that truly defines us.
                </p>
              </div>
              <Link
                href="/visitor"
                className="inline-flex mt-10 items-center justify-center rounded-full border-2 border-brand-500 px-8 py-3.5 text-sm font-bold text-brand-500 transition-colors hover:bg-brand-500 hover:text-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
              >
                JOIN US AS A VISITOR
              </Link>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.1} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-50 text-brand-500 rounded-xl shrink-0">
                    <Target size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-brand-500">Our Mission</h3>
                    <p className="mt-6 text-zinc-600 leading-relaxed">
                      To help members increase their business through a structured, positive, and professional word-of-mouth referral program that enables them to develop long-term, meaningful relationships.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-50 text-brand-500 rounded-xl shrink-0">
                    <Star size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-brand-500">Our Values</h3>
                    <ul className="mt-6 space-y-2 text-zinc-600 font-medium">
                      <li className="flex items-center gap-2"><ChevronRight size={16} aria-hidden="true" className="text-brand-500" /> Givers Gain®</li>
                      <li className="flex items-center gap-2"><ChevronRight size={16} aria-hidden="true" className="text-brand-500" /> Building Relationships</li>
                      <li className="flex items-center gap-2"><ChevronRight size={16} aria-hidden="true" className="text-brand-500" /> Lifelong Learning</li>
                      <li className="flex items-center gap-2"><ChevronRight size={16} aria-hidden="true" className="text-brand-500" /> Traditions + Innovation</li>
                      <li className="flex items-center gap-2"><ChevronRight size={16} aria-hidden="true" className="text-brand-500" /> Positive Attitude</li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-50 text-brand-500 rounded-xl shrink-0">
                    <Heart size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-brand-500">Our Culture</h3>
                    <p className="mt-6 text-zinc-600 leading-relaxed">
                      We celebrate each other&apos;s successes as our own. BNI Ares is built on a foundation of trust, accountability, and a genuine desire to see fellow members thrive in their respective industries.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Stats Banner */}
      {s && hasRealStats && (
        <section className="bg-gradient-to-r from-brand-900 to-ink py-16 text-white border-y border-white/10">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              <Reveal delay={0} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><User size={36} strokeWidth={1.5} aria-hidden="true" /></div>
                <StatCounter value={s.stat_total_members ?? 0} label="Total Members" colorClass="text-white text-2xl sm:text-3xl" labelClass="text-white/80" suffix="+" />
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><IndianRupee size={36} strokeWidth={1.5} aria-hidden="true" /></div>
                {s.stat_business_passed ? (
                  <div className="text-center">
                    <AnimatedStatText raw={s.stat_business_passed} className="font-heading text-4xl font-extrabold sm:text-5xl text-white text-2xl sm:text-3xl whitespace-nowrap" />
                    <p className="mt-2 text-sm font-medium text-white/80">Business Passed</p>
                  </div>
                ) : (
                  <StatCounter value={0} label="Business Passed" colorClass="text-white text-2xl sm:text-3xl" labelClass="text-white/80" />
                )}
              </Reveal>
              <Reveal delay={0.2} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><Handshake size={36} strokeWidth={1.5} aria-hidden="true" /></div>
                <StatCounter value={s.stat_total_referrals ?? 0} label="Referrals Passed" colorClass="text-white text-2xl sm:text-3xl" labelClass="text-white/80" suffix="+" compact />
              </Reveal>
              <Reveal delay={0.3} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><Users size={36} strokeWidth={1.5} aria-hidden="true" /></div>
                <StatCounter value={s.stat_visitors_hosted ?? 0} label="Visitors Hosted" colorClass="text-white text-2xl sm:text-3xl" labelClass="text-white/80" suffix="+" />
              </Reveal>
              <Reveal delay={0.4} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><Calendar size={36} strokeWidth={1.5} aria-hidden="true" /></div>
                <StatCounter value={s.stat_years_chapter ?? 0} label="Years of Excellence" colorClass="text-white text-2xl sm:text-3xl" labelClass="text-white/80" suffix="+" />
              </Reveal>
              <Reveal delay={0.5} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><PieChart size={36} strokeWidth={1.5} aria-hidden="true" /></div>
                <StatCounter value={uniqueCategories} label="Business Categories" colorClass="text-white text-2xl sm:text-3xl" labelClass="text-white/80" suffix="+" />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* 4. "How BNI Works" Timeline */}
      <Section className="bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                  HOW BNI WORKS
                </span>
                <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
                  A Proven System That Works
                </h2>
                <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
                  BNI provides a structured and positive environment for you to develop personal relationships with dozens of qualified business professionals.
                </p>
                <Link
                  href="/visitor"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
                >
                  LEARN MORE ABOUT BNI
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pl-12">
              <div className="grid sm:grid-cols-2 gap-6">
                {TIMELINE.map((step, idx) => (
                  <Reveal key={idx} delay={idx * 0.1} className="bg-zinc-50 border border-zinc-100 p-8 rounded-2xl relative overflow-hidden">
                    <div className="text-brand-500 mb-6 bg-brand-50 w-14 h-14 rounded-xl flex items-center justify-center">
                      <step.icon size={28} aria-hidden="true" />
                    </div>
                    <div className="absolute top-8 right-8 text-6xl font-extrabold text-zinc-100 pointer-events-none z-0" aria-hidden="true">
                      0{idx + 1}
                    </div>
                    <h3 className="font-bold text-ink text-xl mb-3 relative z-10">{step.title}</h3>
                    <p className="text-zinc-600 relative z-10">{step.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. "Our Achievements" Section */}
      <Section className="bg-zinc-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                OUR ACHIEVEMENTS
              </span>
              <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight mb-12">
                Milestones That Inspire Us
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-500 border border-zinc-100">
                      <ach.icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-ink text-lg max-w-[200px]">{ach.title}</h3>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/givers-gain-award.jpg"
                alt="BNI Ares Award Ceremony at BNI Symposium"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 6. FAQ Section */}
      {s?.faqs && s.faqs.length > 0 && (
        <Section id="faq" className="scroll-mt-24 bg-white">
          <Container>
            <Reveal className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                  Everything You Need to Know About BNI Ares
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-ink px-8 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white shrink-0 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
              >
                CONTACT US
              </Link>
            </Reveal>

            <div className="max-w-4xl mx-auto lg:mx-0">
              <FaqAccordion faqs={s.faqs} />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
