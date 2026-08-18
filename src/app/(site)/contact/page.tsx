import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, Users, CalendarCheck, ImageIcon, Handshake } from "lucide-react";
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

const QUICK_LINKS = [
  { icon: CalendarCheck, question: "Want to visit a meeting?", label: "Visit Us", href: "/visitor" },
  { icon: Users, question: "Looking for a specific business?", label: "Members Directory", href: "/members" },
  { icon: ImageIcon, question: "Curious what a meeting looks like?", label: "Gallery", href: "/gallery" },
  { icon: Handshake, question: "Interested in serving the chapter?", label: "Meet the Team", href: "/coordinators" },
];

const WHY_REACH_OUT = [
  "Becoming a member",
  "Visiting a meeting",
  "Finding collaborations",
  "Sharing an opportunity",
  "Building relationships",
];

const NEXT_STEPS = [
  { step: "01", title: "We receive your message", copy: "It lands directly with the chapter — nothing gets lost in a queue." },
  { step: "02", title: "A coordinator reviews it", copy: "Someone who actually knows the chapter reads it, not a bot." },
  { step: "03", title: "We reach out", copy: "By whichever contact method you left us." },
  { step: "04", title: "We welcome you properly", copy: "Whether that's a meeting invite or an answer to your question." },
];

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
    <>
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="absolute inset-0">
          <Image src="/images/social-cafe-conversation.jpg" alt="BNI Ares Members Conversation" aria-hidden="true" fill priority className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-400">Get in Touch</p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let&apos;s Have a Conversation.
          </h1>
          <p className="mt-6 text-lg text-zinc-300">
            Curious about membership, referrals, visiting a meeting, or collaborating with us? We&apos;re happy to
            help.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#message"
              className="rounded-full bg-brand-500 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              Message Us
            </a>
            <Link
              href="/visitor"
              className="rounded-full border-2 border-white px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Register as Visitor
            </Link>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Not Sure Where to Start?" title="Jump Straight There" center />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((q) => (
              <Reveal key={q.label}>
                <Link
                  href={q.href}
                  className="flex h-full flex-col items-start gap-3 rounded-2xl border border-zinc-200 p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <q.icon size={18} />
                  </div>
                  <p className="text-sm text-zinc-500">{q.question}</p>
                  <p className="mt-auto font-heading text-sm font-bold text-brand-600">{q.label} →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
        <Container>
          <SectionHeading eyebrow="Reach Us Directly" title="Contact Details" center />
          {cards.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c) => (
                <Reveal key={c.label} className="rounded-2xl border border-zinc-200 bg-white p-6">
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
            <div className="mx-auto mt-12 max-w-md rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center">
              <p className="font-heading text-base font-bold text-ink">We&apos;re Still Growing</p>
              <p className="mt-2 text-sm text-zinc-500">
                Contact details are on their way. Until then, we&apos;re just one message away.
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl text-center">
          <Reveal>
            <SectionHeading eyebrow="Why People Reach Out" title="Whatever Brought You Here, We're Listening" center />
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {WHY_REACH_OUT.map((item) => (
                <li key={item} className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-zinc-50">
        <Container className="max-w-5xl">
          <Reveal>
            <SectionHeading eyebrow="What Happens Next" title="After You Hit Send" center />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-4">
            {NEXT_STEPS.map((item) => (
              <Reveal key={item.step} className="text-center">
                <span className="font-heading text-3xl font-extrabold text-brand-500">{item.step}</span>
                <h3 className="mt-3 font-heading text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
              <div className="mt-8">
                {s?.faqs && s.faqs.length > 0 ? (
                  <FaqAccordion faqs={s.faqs} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-12 text-center shadow-sm">
                    <p className="font-heading text-sm font-bold text-ink">We&apos;re Still Growing</p>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-zinc-500">
                      More FAQs and community resources are coming soon. Until then, we&apos;re just one message
                      away.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div id="message" className="scroll-mt-24">
              <SectionHeading eyebrow="Message Us" title="Send a Message" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <section className="bg-ink py-20 text-center text-white">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Your Next Business Connection Might Begin Here.
            </p>
            <p className="mt-4 text-zinc-300">
              One conversation. One introduction. One opportunity. That&apos;s how communities grow.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#message" className="rounded-full bg-brand-500 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600">
                Send Message
              </a>
              <Link href="/visitor" className="rounded-full border-2 border-white px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Register as Visitor
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
