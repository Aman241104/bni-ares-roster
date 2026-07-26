import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
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
          <img
            src="https://placehold.co/1920x1080/1a1a1a/333333?text=Golden+Trophy"
            alt="Excellence Trophy"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <Reveal>
            <h1 className="font-heading text-5xl font-extrabold leading-tight sm:text-7xl text-white">
              Chapter Excellence
            </h1>
            <p className="mt-2 text-xl font-bold tracking-widest text-brand-500 uppercase">
              Celebrating Impact. Inspiring Growth.
            </p>
            <p className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Recognizing the outstanding achievements of our members who go above and beyond, and the dedicated teams that make our success possible.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. Hall of Fame & Achievements */}
      <Section className="bg-white pt-24 pb-16">
        <Container>
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
              HALL OF FAME
            </span>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
              Celebrating Our Achievers
            </h2>
            <p className="mt-4 text-zinc-600 text-lg">
              Honoring the Green Club, Gold Club, Crorepati Givers, and the monumental milestones of our chapter.
            </p>
          </Reveal>

          {/* Coming Soon State */}
          <Reveal>
            <div className="rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-24 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm text-brand-500 mb-6">
                <Trophy size={40} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-ink">Awards & Milestones</h3>
              <p className="mt-3 text-zinc-500 max-w-sm mx-auto">
                We are currently compiling our chapter's greatest achievements. Check back soon for our Hall of Fame!
              </p>
            </div>
          </Reveal>
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
      <section className="bg-ink py-16 text-center text-white">
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
                REGISTER AS A VISITOR <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
