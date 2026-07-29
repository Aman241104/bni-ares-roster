import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Container, Section } from "@/components/Section";
import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";
import { MapPin, Phone, Mail } from "lucide-react";
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
            <div className="mt-3 flex flex-wrap gap-2">
              {member.business_category && (
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {member.business_category}
                </span>
              )}
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                Member since {new Date(member.created_at).getFullYear()}
              </span>
            </div>
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
          {member.company_logo_url && (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-2xl border border-zinc-200 bg-white p-3 sm:h-28 sm:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={member.company_logo_url} alt={member.company ?? ""} className="max-h-full max-w-full object-contain" />
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-8">
            {member.description && (
              <div>
                <h2 className="font-heading text-lg font-bold text-ink">About the company</h2>
                <p className="mt-2 whitespace-pre-line text-zinc-600">{member.description}</p>
              </div>
            )}
            {member.referral_expectations && (
              <div>
                <h2 className="font-heading text-lg font-bold text-ink">What Makes a Great Referral</h2>
                <p className="mt-2 whitespace-pre-line text-zinc-600">{member.referral_expectations}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <h3 className="font-heading text-sm font-bold text-ink">Looking to Connect?</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Reach out directly, or meet {member.name.split(" ")[0]} in person at a Wednesday meeting.
              </p>
              <a
                href="/visitor"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Register as Visitor
              </a>
            </div>
            {(member.address || member.phone || member.email) && (
              <div className="rounded-2xl border border-zinc-200 p-5">
                <h3 className="font-heading text-sm font-bold text-ink">Contact</h3>
                <div className="mt-3 space-y-3">
                  {member.address && (
                    <div className="flex items-start gap-2 text-sm text-zinc-600">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
                      <div>
                        <span>{member.address}</span>
                        {member.google_maps_link && (
                          <a
                            href={member.google_maps_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block text-sm font-semibold text-brand-600 hover:underline"
                          >
                            View on Google Maps →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Phone size={16} className="shrink-0 text-brand-500" />
                      <a href={`tel:${member.phone}`} className="hover:underline">{member.phone}</a>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Mail size={16} className="shrink-0 text-brand-500" />
                      <a href={`mailto:${member.email}`} className="hover:underline">{member.email}</a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
