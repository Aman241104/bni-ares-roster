import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import type { Settings } from "@/types/database";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Get in touch with BNI Ares — phone, email, meeting address, and support.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
  const s = settings as Settings | null;

  const cards = [
    s?.contact_phone && { icon: Phone, label: "Phone", value: s.contact_phone, href: `tel:${s.contact_phone}` },
    s?.contact_email && { icon: Mail, label: "Email", value: s.contact_email, href: `mailto:${s.contact_email}` },
    s?.contact_whatsapp && { icon: MessageCircle, label: "WhatsApp", value: s.contact_whatsapp, href: `https://wa.me/${s.contact_whatsapp.replace(/\D/g, "")}` },
    s?.meeting_venue && { icon: MapPin, label: "Meeting Address", value: s.meeting_venue, href: s.meeting_maps_link ?? undefined },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Get in Touch" title="Contact & Support" description="Questions about the chapter, meetings, or membership? Reach out." />

        {cards.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <Reveal key={c.label} className="rounded-2xl border border-zinc-200 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <c.icon size={20} />
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{c.label}</p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-1 block text-sm text-brand-600 hover:underline">
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-zinc-600">{c.value}</p>
                )}
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-zinc-300 py-12 text-center text-zinc-500">
            Contact details coming soon.
          </div>
        )}

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
            <div className="mt-8">
              {s?.faqs && s.faqs.length > 0 ? (
                <FaqAccordion faqs={s.faqs} />
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-500">
                  FAQs coming soon.
                </div>
              )}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Message Us" title="Send a Message" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
