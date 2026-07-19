import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import CoordinatorCard from "@/components/CoordinatorCard";
import Reveal from "@/components/Reveal";
import type { Coordinator, CoordinatorTeam } from "@/types/database";

export const metadata: Metadata = {
  title: "Coordinators",
  description: "Meet the leadership team, MC committee, visitor host team, and chapter coordinators of BNI Ares.",
};

export const revalidate = 60;

const GROUPS: { team: CoordinatorTeam; title: string; role: string }[] = [
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
    title: "Chapter Coordinators",
    role: "The people handling the details that keep every chapter function running smoothly.",
  },
];

export default async function CoordinatorsPage() {
  const { data } = await supabase
    .from("coordinators")
    .select("*")
    .eq("status", "active")
    .order("display_order");

  const coordinators = (data as Coordinator[] | null) ?? [];

  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-28">
        <Container className="max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-500">The Team</p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            The People Behind The Community.
          </h1>
          <p className="mt-6 text-lg text-zinc-300">
            Every referral shared, every visitor welcomed, every opportunity created — made possible by people who
            volunteer their time to help other businesses grow.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2 text-sm">
            {GROUPS.map((g) => (
              <span key={g.team} className="rounded-full border border-white/15 px-4 py-1.5 text-zinc-300">
                {g.title}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container className="max-w-2xl text-center">
          <Reveal>
            <SectionHeading eyebrow="Our Philosophy" title="Leadership Isn't a Position. It's a Responsibility." center />
            <p className="mt-4 text-zinc-600">
              We don&apos;t just manage weekly meetings — we create an environment where businesses grow through
              trust and service. Every role on this page is a volunteer commitment, made because we believe in
              Givers Gain.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
        <Container>
          <div className="space-y-16">
            {GROUPS.map((group) => {
              const members = coordinators.filter((c) => c.team === group.team);
              return (
                <div key={group.team}>
                  <h2 className="font-heading text-2xl font-bold text-ink">{group.title}</h2>
                  <p className="mt-1 max-w-xl text-zinc-500">{group.role}</p>
                  {members.length === 0 ? (
                    <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
                      <p className="font-heading text-base font-bold text-ink">
                        Our next {group.title} will be announced soon.
                      </p>
                      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
                        Interested in serving your chapter?{" "}
                        <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
                          Speak with our current leadership team
                        </Link>
                        .
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </>
  );
}
