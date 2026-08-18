import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Container, Section } from "@/components/Section";
import CoordinatorCard from "@/components/CoordinatorCard";
import AchieverGrid from "@/components/AchieverGrid";
import Reveal from "@/components/Reveal";
import { Trophy, Star, Gem, IndianRupee, Users, Handshake } from "lucide-react";
import type { Coordinator, CoordinatorTeam, Member } from "@/types/database";

export const metadata: Metadata = {
  title: "Chapter Excellence — BNI Ares",
  description:
    "Recognising the members who go above and beyond — Green Club, One Plus Achievers, Gold Club, Crorepati Givers, and the chapter's leadership team.",
};

export const revalidate = 60;

// ── Achievement data (from May 2026 chapter roster PDF) ──────────────────────
const GREEN_CLUB = [
  "Ashutosh Mehta",
  "Ankit Patel",
  "Harsh Brahmbhatt",
  "Sunil Agrawal",
];

const ONE_PLUS_ACHIEVERS = [
  "Adv Jay Patel",
  "Vishva Ambasana",
  "Rohan Shah",
  "Yash Thakkar",
  "Minakshi Bhavsar",
  "Manush Patel",
  "Varun Bagaria",
  "Harsh Brahmbhatt",
  "Sunil Agrawal",
];

const GOLD_CLUB = ["Ashutosh Mehta"];

const CROREPATI_GIVERS = [
  "Sunil Agrawal",
  "Ashutosh Mehta",
  "Maunil Parikh",
  "Jigar Shah",
  "Harsh Brahmbhatt",
  "Shruti Agarwal",
  "Rohan Shah",
  "Het Patel",
  "Minakshi Bhavsar",
  "Ankit Patel",
  "Manush Patel",
];

const COORDINATOR_GROUPS: { team: CoordinatorTeam; title: string; role: string }[] = [
  {
    team: "lt_team",
    title: "Leadership Team",
    role: "They set the chapter's direction — driving vision, tracking growth, and keeping every meeting on track.",
  },
  {
    team: "mc_committee",
    title: "MC Committee",
    role: "They keep the chapter running week to week — membership, education, and day-to-day operations.",
  },
  {
    team: "visitor_host",
    title: "Visitor Host Team",
    role: "Your first friendly face at BNI — they make sure every guest feels welcome before the meeting even starts.",
  },
  {
    team: "chapter_coordinator",
    title: "Support Team",
    role: "The people handling the details that keep every chapter function running smoothly.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

type AchieverMember = Pick<
  Member,
  "id" | "name" | "photo_url" | "company" | "business_category" | "phone" | "whatsapp" | "email" | "website"
>;

function AchievementSection({
  title,
  description,
  names,
  members,
  icon: Icon,
  accentClass,
  bgClass,
  borderClass,
}: {
  title: string;
  description: string;
  names: string[];
  members: AchieverMember[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentClass: string;
  bgClass: string;
  borderClass: string;
}) {
  return (
    <Reveal>
      <div className={`rounded-3xl border ${borderClass} ${bgClass} p-8 sm:p-10`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accentClass}`}>
            <Icon size={28} className="text-white" />
          </div>
          <div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-zinc-500 max-w-lg">{description}</p>
          </div>
          <div className="sm:ml-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-200 px-4 py-1.5 text-sm font-bold text-zinc-600 shadow-sm">
              <Users size={14} /> {names.length} Members
            </span>
          </div>
        </div>

        {/* Members grid */}
        <AchieverGrid names={names} members={members} />
      </div>
    </Reveal>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ChapterExcellencePage() {
  const [{ data: coordinatorsData }, { data: membersData }] = await Promise.all([
    supabase.from("coordinators").select("*").eq("status", "active").order("display_order"),
    supabase
      .from("members")
      .select("id, name, photo_url, company, business_category, phone, whatsapp, email, website")
      .eq("status", "active"),
  ]);

  const coordinators = (coordinatorsData as Coordinator[] | null) ?? [];
  const achieverMembers = (membersData as AchieverMember[] | null) ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-white sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-500/15 via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10 max-w-3xl text-center">
          <span className="inline-block px-4 py-1.5 bg-brand-500/20 text-brand-400 font-bold tracking-wider text-xs uppercase rounded-full mb-6 border border-brand-500/30">
            Chapter Excellence
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-6xl">
            Recognising Those Who{" "}
            <span className="text-red-400">Go Above &amp; Beyond.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto">
            BNI Ares celebrates members who consistently give referrals, bring
            visitors, and live the Givers Gain® philosophy every single week.
          </p>
        </Container>
      </section>

      {/* ── Achievement Sections ─────────────────────────────────────────── */}
      <Section className="bg-zinc-50">
        <Container>
          <Reveal className="text-center mb-12">
            <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
              BNI Recognition Programme
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-ink">
              Our Achievers
            </h2>
            <p className="mt-3 text-zinc-500 max-w-xl mx-auto">
              Four pillars of excellence — each representing a different level of commitment to giving, growing, and leading.
            </p>
          </Reveal>

          <div className="space-y-6">
            {/* 1. Green Club */}
            <AchievementSection
              title="Green Club Members"
              description="Members who consistently score 70–100 points on the Traffic Light system — the benchmark of a great BNI member."
              names={GREEN_CLUB}
              members={achieverMembers}
              icon={Star}
              accentClass="bg-emerald-500"
              bgClass="bg-emerald-50/50"
              borderClass="border-emerald-200"
            />

            {/* 2. One Plus Achievers */}
            <AchievementSection
              title="One Plus Achievers"
              description="Members who go one step further — consistently giving more than the baseline, week after week."
              names={ONE_PLUS_ACHIEVERS}
              members={achieverMembers}
              icon={Trophy}
              accentClass="bg-amber-500"
              bgClass="bg-amber-50/50"
              borderClass="border-amber-200"
            />

            {/* 3. Gold Club */}
            <AchievementSection
              title="Gold Club Members"
              description="An elite recognition for members who have demonstrated exceptional, sustained performance across referrals, attendance, and 1-2-1s."
              names={GOLD_CLUB}
              members={achieverMembers}
              icon={Gem}
              accentClass="bg-yellow-500"
              bgClass="bg-yellow-50/60"
              borderClass="border-yellow-300"
            />

            {/* 4. Crorepati Givers */}
            <AchievementSection
              title="Crorepati Givers"
              description="Members who have passed ₹1 Crore or more in closed business through referrals within BNI Ares. The pinnacle of Givers Gain®."
              names={CROREPATI_GIVERS}
              members={achieverMembers}
              icon={IndianRupee}
              accentClass="bg-brand-500"
              bgClass="bg-red-50/50"
              borderClass="border-red-200"
            />
          </div>
        </Container>
      </Section>

      {/* ── Coordinators ─────────────────────────────────────────────────── */}
      <Section className="bg-white">
        <Container>
          <Reveal className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                  Chapter Leadership
                </span>
                <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-ink">
                  The People Behind the Chapter
                </h2>
                <p className="mt-3 text-zinc-500 max-w-xl">
                  Every referral shared, every visitor welcomed, every opportunity
                  created — made possible by members who volunteer to serve.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-14">
            {COORDINATOR_GROUPS.map((group) => {
              const members = coordinators.filter((c) => c.team === group.team);
              return (
                <div key={group.team}>
                  <div className="mb-6 border-b border-zinc-100 pb-4">
                    <h3 className="font-heading text-xl font-bold text-ink">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 max-w-xl">
                      {group.role}
                    </p>
                  </div>

                  {members.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
                      <p className="font-heading text-base font-bold text-ink">
                        Our next {group.title} will be announced soon.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {members.map((c) => (
                        <Reveal key={c.id}>
                          <CoordinatorCard coordinator={c} />
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-center text-white">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Your Name Could Be On This List.
            </p>
            <p className="mt-4 text-zinc-300">
              Every Crorepati Giver started with their first referral. Come see
              what Givers Gain® looks like in action.
            </p>
            <Link
              href="/visitor"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-bold text-white hover:bg-brand-600 transition-colors"
            >
              Visit a Meeting →
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
