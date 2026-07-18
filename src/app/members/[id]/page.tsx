import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Container, Section } from "@/components/Section";
import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";
import { MapPin } from "lucide-react";
import type { Member } from "@/types/database";

async function getMember(id: string) {
  const { data } = await supabase.from("members").select("*").eq("id", id).eq("status", "active").maybeSingle();
  return data as Member | null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) return { title: "Member Not Found" };
  return {
    title: member.name,
    description: member.description ?? `${member.name} — ${member.company ?? ""} — BNI Ares member profile.`,
  };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
            <Avatar name={member.name} photoUrl={member.photo_url} />
          </div>
          <div className="flex-1">
            <h1 className="font-heading text-3xl font-bold text-ink">{member.name}</h1>
            {member.designation && <p className="mt-1 text-lg text-brand-600">{member.designation}</p>}
            {member.company && <p className="text-zinc-600">{member.company}</p>}
            {member.business_category && (
              <span className="mt-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {member.business_category}
              </span>
            )}
            <div className="mt-5">
              <ContactButtons
                phone={member.phone}
                whatsapp={member.whatsapp}
                email={member.email}
                website={member.website}
                linkedin={member.linkedin}
                instagram={member.instagram}
                facebook={member.facebook}
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-8">
            {member.description && (
              <div>
                <h2 className="font-heading text-lg font-bold text-ink">About</h2>
                <p className="mt-2 whitespace-pre-line text-zinc-600">{member.description}</p>
              </div>
            )}
            {member.referral_expectations && (
              <div>
                <h2 className="font-heading text-lg font-bold text-ink">Referral Expectations</h2>
                <p className="mt-2 whitespace-pre-line text-zinc-600">{member.referral_expectations}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {(member.address || member.google_maps_link) && (
              <div className="rounded-2xl border border-zinc-200 p-5">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-ink">
                  <MapPin size={16} className="text-brand-500" /> Address
                </h3>
                {member.address && <p className="mt-2 text-sm text-zinc-600">{member.address}</p>}
                {member.google_maps_link && (
                  <a
                    href={member.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
