import type { Metadata } from "next";
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

const GROUPS: { team: CoordinatorTeam; title: string; description: string }[] = [
  { team: "lt_team", title: "Leadership Team", description: "The 3 members steering the chapter this term." },
  { team: "mc_committee", title: "MC Committee", description: "The membership committee driving chapter operations." },
  { team: "visitor_host", title: "Visitor Host Team", description: "The team that welcomes and hosts every visitor." },
  { team: "chapter_coordinator", title: "Chapter Coordinators", description: "Coordinators keeping every chapter function running." },
];

export default async function CoordinatorsPage() {
  const { data } = await supabase
    .from("coordinators")
    .select("*")
    .eq("status", "active")
    .order("display_order");

  const coordinators = (data as Coordinator[] | null) ?? [];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Leadership" title="Coordinators" description="The people who run BNI Ares, term after term." />

        <div className="mt-14 space-y-16">
          {GROUPS.map((group) => {
            const members = coordinators.filter((c) => c.team === group.team);
            return (
              <div key={group.team}>
                <h2 className="font-heading text-2xl font-bold text-ink">{group.title}</h2>
                <p className="mt-1 text-zinc-500">{group.description}</p>
                {members.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 py-10 text-center text-sm text-zinc-500">
                    No {group.title.toLowerCase()} added yet.
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
  );
}
