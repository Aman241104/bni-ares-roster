import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Container, Section, SectionHeading } from "@/components/Section";
import CoordinatorCard from "@/components/CoordinatorCard";
import Reveal from "@/components/Reveal";
import { Award, Users, Handshake } from "lucide-react";
import type { Coordinator, CoordinatorTeam, Sponsor } from "@/types/database";

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
  const [
    { data: coordinatorsData },
    { data: sponsorsData },
    { data: galleryData }
  ] = await Promise.all([
    supabase.from("coordinators").select("*").eq("status", "active").order("display_order"),
    supabase.from("sponsors").select("*").eq("status", "active").order("priority"),
    supabase.from("gallery_images").select("*, gallery_albums!inner(*)").eq("gallery_albums.status", "active").order("created_at", { ascending: false }).limit(4),
  ]);

  const coordinators = (coordinatorsData as Coordinator[] | null) ?? [];
  const activeSponsors = (sponsorsData as Sponsor[] | null) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentGallery = (galleryData as any[] | null) ?? [];

  const displaySponsors = activeSponsors.length > 0 ? activeSponsors : [
    { id: 'demo1', name: 'Sharma Logistics', logo_url: null, website_url: '#' },
    { id: 'demo2', name: 'Desai Architects', logo_url: null, website_url: '#' },
    { id: 'demo3', name: 'Patel Financials', logo_url: null, website_url: '#' },
    { id: 'demo4', name: 'Creative Minds', logo_url: null, website_url: '#' }
  ] as Sponsor[];

  const displayGallery = recentGallery.length > 0 ? recentGallery : [
    { id: 'g1', image_url: '/images/group-photo.png', caption: 'Chapter Meeting' },
    { id: 'g2', image_url: '/images/group-photo.png', caption: 'Networking Event' },
    { id: 'g3', image_url: '/images/group-photo.png', caption: 'Awards Night' },
    { id: 'g4', image_url: '/images/group-photo.png', caption: 'Training Session' }
  ];

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

      {/* Hall of Fame - Premium Design */}
      <Section className="bg-ink py-20 sm:py-28 relative overflow-hidden text-white">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent pointer-events-none"></div>
        
        <Container className="relative z-10">
          <Reveal className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-400 font-bold tracking-wider text-sm uppercase rounded-full mb-4 border border-brand-500/30">
              HALL OF FAME
            </span>
            <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold">Celebrating Excellence</h2>
            <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg">Honoring our most distinguished members who have consistently gone above and beyond in their commitment to Givers Gain.</p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", title: "Member of the Year", desc: "For outstanding contribution to chapter growth and passing record-breaking referrals.", icon: Award, color: "text-yellow-400", bg: "bg-yellow-400/10" },
              { name: "Priya Desai", title: "Maximum Visitors", desc: "Recognized for bringing the highest number of qualified visitors in a single term.", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
              { name: "Amit Patel", title: "Givers Gain Award", desc: "For exemplifying the core BNI philosophy and unconditionally supporting fellow members.", icon: Handshake, color: "text-emerald-400", bg: "bg-emerald-400/10" }
            ].map((inductee, idx) => (
              <Reveal key={idx} delay={idx * 0.15} className="group relative rounded-3xl bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10 ${inductee.bg}`}>
                  <inductee.icon className={inductee.color} size={40} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white relative z-10">{inductee.name}</h3>
                <p className={`text-sm font-bold mt-2 uppercase tracking-wider relative z-10 ${inductee.color}`}>{inductee.title}</p>
                <div className="w-12 h-1 bg-white/20 mx-auto my-5 rounded-full relative z-10"></div>
                <p className="text-zinc-400 leading-relaxed relative z-10">{inductee.desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sponsors - Elegant Grid */}
      {displaySponsors.length > 0 && (
        <Section className="bg-zinc-50 py-24 relative overflow-hidden">
          <Container>
            <Reveal className="text-center mb-16">
              <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">OUR PARTNERS</span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-ink">Chapter Sponsors</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {displaySponsors.map((sponsor, idx) => (
                <Reveal key={sponsor.id} delay={idx * 0.1} className="flex h-32 items-center justify-center rounded-2xl bg-white p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-brand-100 transition-all group">
                  <a href={sponsor.website_url ?? "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full focus-visible:outline-none">
                    {sponsor.logo_url ? (
                      <img src={sponsor.logo_url} alt={sponsor.name} className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                    ) : (
                      <span className="text-zinc-400 font-bold text-sm sm:text-base uppercase tracking-widest group-hover:text-brand-500 transition-colors text-center">{sponsor.name}</span>
                    )}
                  </a>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      {displayGallery.length > 0 && (
        <Section className="bg-white py-16">
          <Container>
            <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
              <div>
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">MOMENTS THAT DEFINE US</span>
                <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-ink">Glimpses from Our Chapter</h2>
              </div>
              <Link href="/gallery" className="inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                View Full Gallery
              </Link>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayGallery.map((img) => (
                <Reveal key={img.id} className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 relative group">
                  <img src={img.image_url} alt={img.caption || "Gallery image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
