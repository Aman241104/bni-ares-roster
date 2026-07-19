import type { Metadata } from "next";
import { Clock, MapPin, Shirt, IndianRupee } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import VisitorRegistrationForm from "@/components/VisitorRegistrationForm";
import type { Member, Settings } from "@/types/database";

export const metadata: Metadata = {
  title: "Visit BNI Ares",
  description: "Register as a visitor at BNI Ares — meeting details, venue, fees, and everything you need to attend.",
};

export const revalidate = 60;

const MEETING_FLOW = [
  { step: "01", title: "Open Networking", copy: "Arrive, grab a coffee, and meet the room before the meeting starts." },
  { step: "02", title: "Weekly Meeting", copy: "A structured, fast-moving agenda — no wasted time, no small talk filler." },
  { step: "03", title: "Business Presentations", copy: "Members present who they're looking to meet, so the room knows who to refer." },
  { step: "04", title: "Referrals Shared", copy: "Real, structured referrals handed from one member to another, in the open." },
  { step: "05", title: "Visitors Connect", copy: "You're introduced around the room — no observing from the back." },
];

const TAKE_HOME = [
  "New Relationships",
  "Business Opportunities",
  "Fresh Perspectives",
  "Weekly Learning",
  "Trusted Connections",
  "Possibly Your Next Client",
];

const WELCOMED_BY = ["Visitor Hosts", "Leadership Team", "Business Owners"];

const GOOD_FIT = [
  "Business owners and founders",
  "Consultants and freelancers",
  "Professionals looking to grow",
  "People ready to build real relationships",
];

const NOT_A_FIT = [
  "Looking to sell aggressively, once",
  "Not interested in giving referrals back",
  "Just here to collect business cards",
];

const BRING_LIST = ["Business Cards", "Your Story", "An Open Mind"];

export default async function VisitorPage() {
  const [{ data: settings }, { data: members }] = await Promise.all([
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("members").select("business_category").eq("status", "active"),
  ]);
  const s = settings as Settings | null;
  const memberList = (members as Pick<Member, "business_category">[] | null) ?? [];
  const memberCount = memberList.length;
  const categoryCount = new Set(memberList.map((m) => m.business_category).filter(Boolean)).size;

  const details = [
    s?.meeting_venue && { icon: MapPin, label: "Venue", value: s.meeting_venue, href: s.meeting_maps_link ?? undefined },
    s?.meeting_time && { icon: Clock, label: "Meeting Time", value: s.meeting_time },
    s?.dress_code && { icon: Shirt, label: "Dress Code", value: s.dress_code },
    s?.visitor_fee && { icon: IndianRupee, label: "Visitor Fee", value: s.visitor_fee },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; href?: string }[];

  return (
    <>
      <section className="bg-ink py-24 text-white sm:py-32">
        <Container className="max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-500">Come See Us</p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your Next Client Might Be Waiting At Our Table.
          </h1>
          <p className="mt-6 text-lg text-zinc-300">
            No pressure. No obligations. Just one seat waiting for you at our next weekly meeting.
          </p>
          {memberCount > 0 && (
            <div className="mt-10 flex justify-center gap-10">
              <div>
                <p className="font-heading text-3xl font-extrabold sm:text-4xl">{memberCount}+</p>
                <p className="mt-1 text-sm text-zinc-400">Business Owners</p>
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
          <Reveal>
            <SectionHeading eyebrow="What You'll Get" title="What You'll Take Home With You" center />
          </Reveal>
          <Reveal className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
            {TAKE_HOME.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {item}
              </span>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="No Pressure" title="Is This For You?" center />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Yes, If You&apos;re</p>
              <ul className="mt-4 space-y-2.5">
                {GOOD_FIT.map((item) => (
                  <li key={item} className="text-sm text-zinc-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Maybe Not, If You&apos;re</p>
              <ul className="mt-4 space-y-2.5">
                {NOT_A_FIT.map((item) => (
                  <li key={item} className="text-sm text-zinc-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What To Expect" title="What Happens At A Meeting" center />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-5">
            {MEETING_FLOW.map((item) => (
              <Reveal key={item.step} className="text-center">
                <span className="font-heading text-3xl font-extrabold text-brand-500">{item.step}</span>
                <h3 className="mt-3 font-heading text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-xs text-zinc-500">{item.copy}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">You&apos;ll Be Welcomed By</p>
            <p className="mt-3 text-lg text-zinc-600">
              {WELCOMED_BY.join(" · ")}
              {memberCount > 0 && ` · ${memberCount}+ Friendly Faces`}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Testimonials" title="Success Stories" center />
          </Reveal>
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white py-14 text-center text-zinc-500">
            Our first visitor stories land after our next meeting — yours could be one of them.
          </div>
        </Container>
      </Section>

      {details.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Details" title="Meeting Details" center />
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-zinc-200 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <d.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-600">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
              {(s?.qr_code_url || s?.upi_id) && (
                <div className="rounded-2xl border border-zinc-200 p-5 sm:col-span-2">
                  <p className="text-sm font-semibold text-ink">Payment</p>
                  <div className="mt-3 flex flex-wrap items-center gap-6">
                    {s?.qr_code_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.qr_code_url} alt="Payment QR code" className="h-32 w-32 rounded-lg border border-zinc-200 object-contain" />
                    )}
                    {s?.upi_id && <p className="text-sm text-zinc-600">UPI ID: <span className="font-medium text-ink">{s.upi_id}</span></p>}
                  </div>
                  {s?.bank_details && <p className="mt-3 whitespace-pre-line text-sm text-zinc-600">{s.bank_details}</p>}
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      <section className="bg-ink py-20 text-center text-white">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              This Week, Your Story Might Change.
            </p>
            <p className="mt-4 text-zinc-300">One meeting. One introduction. One opportunity. That&apos;s all it takes.</p>
            {details.length > 0 && (
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-500">
                {details.map((d) => d.value).join(" · ")}
              </p>
            )}
          </Reveal>
        </Container>
      </section>

      <Section className="bg-zinc-50">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading eyebrow="Register" title="Join Us This Week" center />
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {BRING_LIST.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {item}
              </span>
            ))}
          </Reveal>
          <p className="mt-4 text-center text-sm text-zinc-500">We&apos;ll handle the coffee.</p>
          <div className="mt-10">
            <VisitorRegistrationForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
