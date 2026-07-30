import type { Metadata } from "next";
import Link from "next/link";
import { User, IndianRupee, Handshake, PieChart, Users, HeartHandshake, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import MembersDirectory from "@/components/MembersDirectory";
import StatCounter from "@/components/StatCounter";
import CoordinatorCard from "@/components/CoordinatorCard";
import type { Member, Coordinator, Settings } from "@/types/database";

export const metadata: Metadata = {
  title: "Members Directory",
  description: "Search and browse every member of the BNI Ares chapter by name, company, or business category.",
};

export const revalidate = 60;

export default async function MembersPage() {
  const [
    { data: members },
    { data: coordinators },
    { data: settings }
  ] = await Promise.all([
    supabase.from("members").select("*").eq("status", "active").order("display_order").order("name"),
    supabase.from("coordinators").select("*").eq("status", "active").order("display_order"),
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  const list = (members as Member[] | null) ?? [];
  const coords = (coordinators as Coordinator[] | null) ?? [];
  const s = settings as Settings | null;

  const supportTeam = coords.filter((c) => c.team === "chapter_coordinator");

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
      <section className="relative overflow-hidden bg-ink text-white pt-24 sm:pt-32 pb-32">
        <div className="absolute inset-0">
          <img
            src="/images/group-photo.png"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center max-w-3xl">
          <Reveal>
            <h1 className="font-heading text-5xl font-extrabold leading-tight sm:text-7xl text-white">
              Members Directory
            </h1>
            <p className="mt-2 text-xl font-bold tracking-widest text-brand-500 uppercase">
              BNI Ares Chapter
            </p>
            <p className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              A community of trusted business professionals committed to building relationships and helping each other grow through quality referrals.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. Stats Banner */}
      {hasRealStats && s && (
        <section className="bg-gradient-to-r from-brand-900 to-ink py-12 text-white border-y border-white/10">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Reveal delay={0} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><User size={32} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_total_members ?? 0} label="Members" colorClass="text-white text-3xl sm:text-4xl" labelClass="text-white/80" suffix="+" />
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><PieChart size={32} strokeWidth={1.5} /></div>
                <StatCounter value={uniqueCategories} label="Business Categories" colorClass="text-white text-3xl sm:text-4xl" labelClass="text-white/80" suffix="+" />
              </Reveal>
              <Reveal delay={0.2} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><IndianRupee size={32} strokeWidth={1.5} /></div>
                {s.stat_business_passed ? (
                  <div className="text-center">
                    <span className="font-heading text-4xl font-extrabold sm:text-5xl text-white text-3xl sm:text-4xl whitespace-nowrap">{s.stat_business_passed}</span>
                    <p className="mt-2 text-sm font-medium text-white/80">Business Passed</p>
                  </div>
                ) : (
                  <StatCounter value={0} label="Business Passed" colorClass="text-white text-3xl sm:text-4xl" labelClass="text-white/80" />
                )}
              </Reveal>
              <Reveal delay={0.3} className="flex flex-col items-center justify-center space-y-2">
                <div className="text-white"><Handshake size={32} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_total_referrals ?? 0} label="Referrals Passed" colorClass="text-white text-3xl sm:text-4xl" labelClass="text-white/80" suffix="+" compact />
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {/* Chapter Members Section with Filter Bar */}
      <Section className="bg-zinc-50 pt-16">
        <Container>
          <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-500 border border-zinc-100 shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink">
                  Chapter Members
                </h2>
                <p className="mt-1 text-zinc-600">
                  Meet our amazing members and connect with them.
                </p>
              </div>
            </div>
            <Link
              href="#directory"
              className="inline-flex items-center justify-center rounded-full border-2 border-ink px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white shrink-0"
            >
              View by Category
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <MembersDirectory members={list} />
          </Reveal>
        </Container>
      </Section>

      {/* Support Team Section */}
      {supportTeam.length > 0 && (
        <Section className="bg-zinc-50 border-t border-zinc-100">
          <Container>
            <Reveal className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-500 border border-zinc-100 shrink-0">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-ink">
                  Support Team
                </h2>
                <p className="mt-1 text-zinc-600">
                  Experienced BNI leaders from other chapters who support and guide BNI Ares.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {supportTeam.map((coordinator, idx) => (
                <Reveal key={coordinator.id} delay={idx * 0.1}>
                  <CoordinatorCard coordinator={coordinator} topAccent />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. Bottom Call to Action */}
      <section className="bg-ink py-16 text-center text-white">
        <Container className="max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Ready to grow your network with BNI Ares?
            </h2>
            <p className="mt-4 text-zinc-300">
              Visit our meeting as a guest and experience the difference.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/visitor"
                className="flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-600"
              >
                REGISTER AS VISITOR <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
