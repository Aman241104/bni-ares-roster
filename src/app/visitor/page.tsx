import type { Metadata } from "next";
import { Clock, MapPin, Shirt, IndianRupee } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import VisitorRegistrationForm from "@/components/VisitorRegistrationForm";
import type { Settings } from "@/types/database";

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

const BRING_LIST = ["Business Cards", "Your Story", "An Open Mind"];

export default async function VisitorPage() {
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
  const s = settings as Settings | null;

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
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Why Visit BNI Ares</h1>
          <p className="mt-6 text-lg text-zinc-300">
            One meeting is enough to see how a referral network actually works — no pressure, just an open seat at our weekly gathering.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Benefits" title="What You'll Get as a Visitor" center />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              { title: "Real Introductions", copy: "Meet 40+ business owners who can become clients, vendors, or referral partners." },
              { title: "See the System", copy: "Watch a structured referral meeting run in under 90 minutes." },
              { title: "No Obligation", copy: "Come once, ask questions, decide if it's right for you." },
            ].map((item) => (
              <Reveal key={item.title} className="rounded-2xl border border-zinc-200 p-6 text-center">
                <h3 className="font-heading text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
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
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Testimonials" title="Success Stories" center />
          </Reveal>
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white py-14 text-center text-zinc-500">
            Visitor success stories coming soon.
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
