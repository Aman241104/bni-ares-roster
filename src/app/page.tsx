import Link from "next/link";
import { TrendingUp, ShieldCheck, Users, GraduationCap, Crown } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import FaqAccordion from "@/components/FaqAccordion";
import type { Settings, Sponsor } from "@/types/database";

const WHY_VISIT = [
  { icon: TrendingUp, title: "Business Growth", copy: "Tap into a room of business owners actively looking to send you work, not just swap cards." },
  { icon: ShieldCheck, title: "Trusted Referrals", copy: "Every referral comes with a relationship behind it — vetted by people who know your business." },
  { icon: Users, title: "Networking", copy: "Meet 40+ business owners across categories, every single week, without cold outreach." },
  { icon: GraduationCap, title: "Learning", copy: "Weekly education slots sharpen how you pitch, follow up, and close the referrals you get." },
  { icon: Crown, title: "Leadership", copy: "Take on chapter roles that build your visibility and leadership track record in the room." },
];

export default async function HomePage() {
  const [{ data: settings }, { data: sponsors }] = await Promise.all([
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("sponsors").select("*").eq("status", "active").order("priority"),
  ]);

  const s = settings as Settings | null;
  const activeSponsors = (sponsors as Sponsor[] | null) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,16,46,0.25),_transparent_60%)]" />
        <Container className="relative py-28 sm:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-500">
              BNI Ares Chapter
            </p>
            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Business Grows Where Trust Is Built
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-300">
              A chapter of business owners referring real work to each other, every week — powered by Givers Gain.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/members"
                className="rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-600"
              >
                Meet Members
              </Link>
              <Link
                href="/visitor"
                className="glass-dark rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Register as Visitor
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="About Us"
              title="Who We Are"
              description="BNI Ares is a chapter of committed business professionals who meet weekly to grow each other's businesses through structured, trusted referrals."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Reveal className="rounded-2xl border border-zinc-200 p-8">
              <h3 className="font-heading text-lg font-bold text-ink">Our Vision</h3>
              <p className="mt-3 text-zinc-600">
                To be the most trusted business referral community in the region, where every member&apos;s growth is a shared responsibility.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl border border-zinc-200 p-8">
              <h3 className="font-heading text-lg font-bold text-ink">Our Mission</h3>
              <p className="mt-3 text-zinc-600">
                To help members increase their business through a structured, positive, and professional word-of-mouth referral program.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Stats strip */}
      <section className="bg-ink py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
            <StatCounter value={s?.stat_total_members ?? 0} label="Total Members" />
            {s?.stat_business_passed ? (
              <div className="text-center">
                <span className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
                  {s.stat_business_passed}
                </span>
                <p className="mt-2 text-sm font-medium text-zinc-400">Business Passed</p>
              </div>
            ) : (
              <StatCounter value={0} label="Business Passed" />
            )}
            <StatCounter value={s?.stat_total_referrals ?? 0} label="Total Referrals" />
            <StatCounter value={s?.stat_visitors_hosted ?? 0} label="Visitors Hosted" />
            <StatCounter value={s?.stat_years_chapter ?? 0} label="Years of Chapter" />
          </div>
        </Container>
      </section>

      {/* Why Visit */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why Visit" title="Why Visit Ares" center />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_VISIT.map(({ icon: Icon, title, copy }) => (
              <Reveal key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sponsors */}
      {activeSponsors.length > 0 && (
        <Section className="bg-zinc-50">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Partners" title="Chapter Sponsors" center />
            </Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
              {activeSponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.website_url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-40 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-500 transition-shadow hover:shadow-md"
                >
                  {sponsor.name}
                </a>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      {s?.faqs && s.faqs.length > 0 && (
        <Section>
          <Container className="max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow="FAQ" title="Common Questions" center />
            </Reveal>
            <div className="mt-10">
              <FaqAccordion faqs={s.faqs} />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
