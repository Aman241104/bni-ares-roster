import type { Metadata } from "next";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import MembersDirectory from "@/components/MembersDirectory";
import type { Member } from "@/types/database";

export const metadata: Metadata = {
  title: "Members Directory",
  description: "Search and browse every member of the BNI Ares chapter by name, company, or business category.",
};

export const revalidate = 60;

export default async function MembersPage() {
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("status", "active")
    .order("display_order")
    .order("name");

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Directory"
          title="Members Directory"
          description="Browse every member of BNI Ares — search by name, company, or category, or jump straight to a letter."
        />
        <div className="mt-10">
          <MembersDirectory members={(members as Member[] | null) ?? []} />
        </div>
      </Container>
    </Section>
  );
}
