import Link from "next/link";
import Image from "next/image";
import {
  User,
  IndianRupee,
  Handshake,
  Users,
  Calendar,
  PieChart,
  ArrowRight,
  MapPin,
  Quote,
  ShieldCheck,
  TrendingUp,
  Award,
  Lock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Container, Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import StatCounter, { AnimatedStatText } from "@/components/StatCounter";
import MemberCard from "@/components/MemberCard";
import SponsorTicker from "@/components/SponsorTicker";
import { supabase } from "@/lib/supabase/client";
import type { Settings, Sponsor, Member, Testimonial } from "@/types/database";

export const revalidate = 60;

const WHY_JOIN = [
  { icon: Handshake, title: "Qualified Referrals", text: "Get quality business referrals from trusted professionals." },
  { icon: ShieldCheck, title: "Trusted Network", text: "Build meaningful relationships with vetted business owners." },
  { icon: TrendingUp, title: "Business Growth", text: "Expand your reach and significantly increase your revenue." },
  { icon: Award, title: "Leadership", text: "Develop your leadership skills by taking up chapter roles." },
  { icon: Lock, title: "Exclusive Access", text: "Only one member per business category — no internal competition, ever." },
];

export default async function HomePage() {
  const [
    { data: settings },
    { data: sponsors },
    { data: members },
    { data: allCategories },
    { data: gallery },
    { data: testimonials },
  ] = await Promise.all([
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("sponsors").select("*").eq("status", "active").order("priority"),
    supabase.from("members").select("*").eq("status", "active").order("display_order").limit(8),
    supabase.from("members").select("business_category").eq("status", "active"),
    supabase.from("gallery_images").select("*, gallery_albums!inner(*)").eq("gallery_albums.status", "active").order("created_at", { ascending: false }).limit(4),
    supabase.from("testimonials").select("*").eq("status", "active").order("display_order"),
  ]);

  const s = settings as Settings | null;
  const activeSponsors = (sponsors as Sponsor[] | null) ?? [];
  const activeMembers = (members as Member[] | null) ?? [];
  const activeTestimonials = (testimonials as Testimonial[] | null) ?? [];
  const categoriesList = allCategories || [];
  const uniqueCategories = Math.max(30, new Set(categoriesList.map((m) => m.business_category).filter(Boolean)).size);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentGallery = (gallery as any[] | null) ?? [];

  const displaySponsors = activeSponsors.length > 0 ? activeSponsors : [
    { id: 'demo1', name: 'Sharma Logistics', logo_url: null, website_url: '#' },
    { id: 'demo2', name: 'Desai Architects', logo_url: null, website_url: '#' },
    { id: 'demo3', name: 'Patel Financials', logo_url: null, website_url: '#' },
    { id: 'demo4', name: 'Creative Minds', logo_url: null, website_url: '#' }
  ] as Sponsor[];

  const displayGallery = recentGallery.length > 0 ? recentGallery : [
    { id: 'g1', image_url: '/images/visitor-day-backdrop.jpg', caption: '115 CR Milestone & Visitor Day' },
    { id: 'g2', image_url: '/images/givers-gain-award.jpg', caption: 'BNI Symposium Givers Gain Award' },
    { id: 'g3', image_url: '/images/chapter-meeting-session.jpg', caption: 'Wednesday Chapter Meeting' },
    { id: 'g4', image_url: '/images/kym-studio-visit.jpg', caption: 'KYM Business Studio Visit' }
  ];

  const hasRealStats = !!(
    s?.stat_total_members ||
    s?.stat_business_passed ||
    s?.stat_total_referrals ||
    s?.stat_visitors_hosted ||
    s?.stat_years_chapter
  );

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-ink text-white pt-20 pb-32 sm:pt-28 sm:pb-40">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-leadership-gala.jpg"
            alt="BNI Ares Chapter Leadership & Members"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-brand-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider mb-6 rounded-sm">
              AHMEDABAD WEST&apos;S FIRST PLATINUM CHAPTER
            </span>
            <h1 className="font-heading text-5xl font-extrabold leading-tight sm:text-7xl">
              Where Ahmedabad&apos;s Most Trusted Businesses <span className="text-red-400">Grow Together.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-zinc-300">
              30+ verified business leaders. Thousands of quality referrals. One chapter focused on helping members grow through meaningful business relationships.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/visitor"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:w-auto"
              >
                VISIT A MEETING <ArrowRight size={16} />
              </Link>
              <Link
                href="/members"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:w-auto"
              >
                MEET OUR MEMBERS <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Stats Banner (Floating) */}
      {hasRealStats && (
        <div className="relative z-20 px-5 sm:px-8 max-w-7xl mx-auto -mt-16 sm:-mt-24">
          <Reveal className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-6 sm:p-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><User size={28} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_total_members ?? 0} label="Total Members" colorClass="text-ink" labelClass="text-zinc-500" suffix="+" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><IndianRupee size={28} strokeWidth={1.5} /></div>
                {s.stat_business_passed ? (
                  <div className="text-center">
                    <AnimatedStatText raw={s.stat_business_passed} className="font-heading text-4xl font-extrabold text-ink sm:text-5xl whitespace-nowrap" />
                    <p className="mt-2 text-sm font-medium text-zinc-500">Business Passed</p>
                  </div>
                ) : (
                  <StatCounter value={0} label="Business Passed" colorClass="text-ink" labelClass="text-zinc-500" />
                )}
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><Handshake size={28} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_total_referrals ?? 0} label="Referrals Passed" colorClass="text-ink" labelClass="text-zinc-500" suffix="+" compact />
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><Users size={28} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_visitors_hosted ?? 0} label="Visitors Hosted" colorClass="text-ink" labelClass="text-zinc-500" suffix="+" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><Calendar size={28} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_years_chapter ?? 0} label="Years of Excellence" colorClass="text-ink" labelClass="text-zinc-500" suffix="+" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><PieChart size={28} strokeWidth={1.5} /></div>
                <StatCounter value={uniqueCategories} label="Business Categories" colorClass="text-ink" labelClass="text-zinc-500" suffix="+" />
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* 3. Why Join BNI Ares */}
      <Section className="bg-zinc-50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                  WHY JOIN BNI ARES?
                </span>
                <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
                  More Than Networking, It&apos;s About <span className="text-brand-500">Growing Together.</span>
                </h2>
              </div>
              <div className="lg:mt-10">
                <p className="text-zinc-600 text-lg leading-relaxed">
                  At BNI Ares, we believe in Givers Gain®. When you give quality referrals, build relationships, and support others, business growth is a natural outcome.
                </p>
              </div>
            </div>
          </Reveal>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {WHY_JOIN.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 0.1} className="bg-white p-5 lg:p-6 rounded-2xl shadow-md border border-zinc-100 flex flex-col">
                <div className="text-brand-500 mb-4">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-bold text-ink text-lg mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Meet our Members */}
      {activeMembers.length > 0 && (
        <Section className="bg-white">
          <Container>
            <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
              <div>
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                  MEET OUR MEMBERS
                </span>
                <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold text-ink">
                  A Community of Trusted Professionals
                </h2>
              </div>
              <Link
                href="/members"
                className="inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                View All Members
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeMembers.map((member, idx) => (
                <Reveal key={member.id} delay={idx * 0.08}>
                  <MemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. Weekly Meeting */}
      <section className="bg-ink text-white py-24 relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                WEEKLY MEETING
              </span>
              <h2 className="mt-4 font-heading text-4xl sm:text-5xl font-extrabold leading-tight">
                Join Us Every Week,<br />
                <span className="text-red-400">Be Our Guest!</span>
              </h2>
              <p className="mt-6 text-lg text-zinc-300 max-w-md">
                Experience the power of networking, collaboration and referral marketing at our weekly meeting.
              </p>
              <Link
                href="/visitor"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                REGISTER AS VISITOR <ArrowRight size={16} />
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="relative">
              <div className="absolute inset-0 -mx-4 sm:mx-0 sm:-right-10 sm:-top-10 sm:-bottom-10 bg-[url('/images/chapter-meeting-session.jpg')] bg-cover bg-center rounded-3xl opacity-40"></div>
              
              <div className="relative glass-dark p-8 sm:p-10 rounded-3xl shadow-2xl">
                <h3 className="font-bold text-2xl mb-8">Meeting Details</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-brand-500/20 text-white rounded-xl shrink-0">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm font-semibold">Time</p>
                      <p className="font-bold text-lg mt-1">{s?.meeting_time || "Every Wednesday 7:00 AM - 8:30 AM"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-brand-500/20 text-white rounded-xl shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm font-semibold">Location</p>
                      <p className="font-bold text-lg mt-1">Shared on WhatsApp closer to the meeting</p>
                      <p className="text-zinc-400 text-sm mt-1">Venue rotates weekly &mdash; register and we&apos;ll send it to you</p>
                    </div>
                  </div>
                </div>

                {s?.contact_whatsapp && (
                  <a href={`https://wa.me/${s.contact_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="mt-8 flex w-full justify-center items-center gap-2 rounded-full bg-white text-ink px-7 py-3.5 text-sm font-bold transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    Message Us on WhatsApp <WhatsAppIcon size={16} />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6. Member Testimonials */}
      {activeTestimonials.length > 0 && (
        <Section className="bg-zinc-50 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-200 opacity-50 pointer-events-none">
            <Quote size={400} strokeWidth={0.5} />
          </div>
          <Container className="relative z-10">
            <Reveal className="text-center mb-16">
              <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                MEMBER TESTIMONIALS
              </span>
              <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold text-ink">
                Hear From Our Members
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTestimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.1} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-zinc-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div>
                    <Quote size={24} className="text-brand-500 mb-4 opacity-50" />
                    <p className="text-zinc-600 italic">&ldquo;{t.quote_text}&rdquo;</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-zinc-100">
                    <p className="font-bold text-ink">{t.member_name}</p>
                    {t.company && <p className="text-sm font-medium text-brand-500">{t.company}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. Our Chapter Sponsors */}
      {displaySponsors.length > 0 && (
        <Section className="bg-white py-24 relative overflow-hidden border-t border-zinc-100">
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <Container className="mb-12 relative z-20">
            <Reveal className="text-center">
              <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">OUR PARTNERS</span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-extrabold text-ink">Chapter Sponsors</h2>
            </Reveal>
          </Container>
          
          <SponsorTicker sponsors={displaySponsors} />
        </Section>
      )}

      {/* 8. Moments that Define Us */}
      {displayGallery.length > 0 && (
        <Section className="bg-zinc-50 py-16 sm:py-24">
          <Container>
            <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
              <div>
                <span className="text-brand-500 font-bold tracking-wider text-sm uppercase">
                  MOMENTS THAT DEFINE US
                </span>
                <h2 className="mt-2 font-heading text-4xl sm:text-5xl font-extrabold text-ink">
                  Glimpses from Our Chapter
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                View Full Gallery
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
              {displayGallery.map((img, idx) => {
                const isLarge = idx === 0;
                return (
                  <Reveal key={img.id} delay={idx * 0.1} className={`relative group rounded-3xl overflow-hidden bg-zinc-200 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}>
                    <Image
                      src={img.image_url}
                      alt={img.caption || "Gallery image"}
                      fill
                      sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-bold text-lg">{img.caption || "Chapter Event"}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
