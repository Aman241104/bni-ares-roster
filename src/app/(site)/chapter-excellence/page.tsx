import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import CoordinatorTabs from "@/components/CoordinatorTabs";
import type { Coordinator } from "@/types/database";

export const metadata: Metadata = {
  title: "Chapter Excellence",
  description: "Recognizing outstanding achievements and the driving force behind BNI Ares.",
};

export const revalidate = 60;

export default async function ChapterExcellencePage() {
  const { data: coordinators } = await supabase
    .from("coordinators")
    .select("*")
    .eq("status", "active")
    .order("display_order");

  const coords = (coordinators as Coordinator[] | null) ?? [];

  const mcCommittee = coords.filter((c) => c.team === "mc_committee");
  const extendedLeadership = coords.filter((c) => c.team === "chapter_coordinator" || c.team === "lt_team");
  const visitorHosts = coords.filter((c) => c.team === "visitor_host");

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-ink text-white pt-24 sm:pt-32 pb-32 sm:pb-48">
        <div className="absolute inset-0">
          <Image
            src="/images/givers-gain-award.jpg"
            alt="BNI Ares Awards & Recognition"
            aria-hidden="true"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <Reveal>
            <h1 className="font-heading text-5xl font-extrabold leading-tight sm:text-7xl text-white">
              Chapter Excellence
            </h1>
            <p className="mt-2 text-xl font-bold tracking-widest text-red-400 uppercase">
              Celebrating Impact. Inspiring Growth.
            </p>
            <p className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Recognizing the outstanding achievements of our members who go above and beyond, and the dedicated teams that make our success possible.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. Hall of Fame & Achievements */}
      <Section className="bg-white">
        <Container>
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
              HALL OF FAME
            </span>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
              Celebrating Our Achievers
            </h2>
            <p className="mt-4 text-zinc-600 text-lg">
              Honoring standout performers, award recipients, and the monumental milestones of BNI Ares.
            </p>
          </Reveal>

          {/* Real Milestone & Award Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1} className="flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50 shadow-md transition-shadow hover:shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
                <Image
                  src="/images/givers-gain-award.jpg"
                  alt="Givers Gain Award - Highest Visitors"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
                  BNI Symposium Award
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                  Givers Gain Award &mdash; Highest Visitors
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Awarded to Ashutosh Mehta on the main stage at BNI Symposium for outstanding chapter contribution and visitor sponsorship.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50 shadow-md transition-shadow hover:shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
                <Image
                  src="/images/visitor-day-backdrop.jpg"
                  alt="₹115 Crore Business Passed Milestone"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Business Milestone
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                  ₹115 Cr+ Business Passed
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  A milestone celebration marking over ₹115 Crore worth of closed business passed between BNI Ares members and trusted partners.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50 shadow-md transition-shadow hover:shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200">
                <Image
                  src="/images/anniversary-7-years.jpg"
                  alt="Celebrating 7 Years of BNI Ares"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                  Chapter Anniversary
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                  Celebrating 7 Years of Excellence
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Seven years of continuous growth, weekly camaraderie, and building Ahmedabad&apos;s foremost premier business network.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. Coordinators Section */}
      <Section className="bg-zinc-50">
        <Container>
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
              COORDINATORS
            </span>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
              The Driving Force Behind Our Success
            </h2>
            <p className="mt-4 text-zinc-600 text-lg">
              Our dedicated teams working tirelessly to support, guide and grow our chapter.
            </p>
          </Reveal>

          <CoordinatorTabs 
            mcCommittee={mcCommittee}
            extendedLeadership={extendedLeadership}
            visitorHosts={visitorHosts}
          />
        </Container>
      </Section>

      {/* 4. Bottom Call to Action */}
      <Section className="bg-ink text-center text-white">
        <Container className="max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Want to Experience the Power of BNI Ares?
            </h2>
            <p className="mt-4 text-zinc-300">
              Join us as a visitor and see how our members build meaningful relationships and grow together.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/visitor"
                className="flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-600"
              >
                REGISTER AS A VISITOR <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
