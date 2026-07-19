import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
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

  const list = (members as Member[] | null) ?? [];
  const categoryCount = new Set(list.map((m) => m.business_category).filter(Boolean)).size;

  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-28">
        <Container className="max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-500">The Directory</p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            The People Behind The Referrals.
          </h1>
          <p className="mt-6 text-lg text-zinc-300">
            Every business inside BNI Ares holds an exclusive seat within its category. No competitors — only
            collaboration.
          </p>
          {list.length > 0 && (
            <div className="mt-10 flex justify-center gap-10">
              <div>
                <p className="font-heading text-3xl font-extrabold sm:text-4xl">{list.length}+</p>
                <p className="mt-1 text-sm text-zinc-400">Business Leaders</p>
              </div>
              {categoryCount > 0 && (
                <div>
                  <p className="font-heading text-3xl font-extrabold sm:text-4xl">{categoryCount}+</p>
                  <p className="mt-1 text-sm text-zinc-400">Industries</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Explore"
            title="Meet The Community"
            description="Search by name or company, or explore by the industries our members cover."
          />
          <div className="mt-10">
            <MembersDirectory members={list} />
          </div>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <ShieldCheck size={22} />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-ink sm:text-3xl">Why Our Members Matter</h2>
            <p className="mt-4 text-zinc-600">
              Every member here holds an exclusive seat in their category — no one else in the chapter can send
              referrals to a competitor. So when you need a service, you&apos;re always being introduced to a
              trusted professional, not shopping around blind.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
