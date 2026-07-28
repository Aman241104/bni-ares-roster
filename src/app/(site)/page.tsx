import Link from "next/link";
import {
  User,
  IndianRupee,
  Handshake,
  Users,
  Calendar,
  PieChart,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Quote,
  ShieldCheck,
  TrendingUp,
  Award,
} from "lucide-react";
import { LinkedinIcon } from "@/components/icons/BrandIcons";
import { Container, Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import { supabase } from "@/lib/supabase/client";
import type { Settings, Sponsor, Member } from "@/types/database";

const WHY_JOIN = [
  { icon: Handshake, title: "Qualified Referrals", text: "Get quality business referrals from trusted professionals." },
  { icon: ShieldCheck, title: "Trusted Network", text: "Build meaningful relationships with vetted business owners." },
  { icon: TrendingUp, title: "Business Growth", text: "Expand your reach and significantly increase your revenue." },
  { icon: Award, title: "Leadership", text: "Develop your leadership skills by taking up chapter roles." },
];

export default async function HomePage() {
  const [
    { data: settings },
    { data: sponsors },
    { data: members },
    { data: allCategories },
    { data: gallery }
  ] = await Promise.all([
    supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("sponsors").select("*").eq("status", "active").order("priority"),
    supabase.from("members").select("*").eq("status", "active").order("display_order").limit(5),
    supabase.from("members").select("business_category").eq("status", "active"),
    supabase.from("gallery_images").select("*, gallery_albums!inner(*)").eq("gallery_albums.status", "active").order("created_at", { ascending: false }).limit(4),
  ]);

  const s = settings as Settings | null;
  const activeSponsors = (sponsors as Sponsor[] | null) ?? [];
  const activeMembers = (members as Member[] | null) ?? [];
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
    { id: 'g1', image_url: '/images/group-photo.png', caption: 'Chapter Meeting' },
    { id: 'g2', image_url: '/images/group-photo.png', caption: 'Networking Event' },
    { id: 'g3', image_url: '/images/group-photo.png', caption: 'Awards Night' },
    { id: 'g4', image_url: '/images/group-photo.png', caption: 'Training Session' }
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
          <img
            src="/images/group-photo.png"
            alt="BNI Ares Network"
            className="h-full w-full object-cover"
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
                    <span className="font-heading text-4xl font-extrabold text-ink sm:text-5xl whitespace-nowrap">{s.stat_business_passed}</span>
                    <p className="mt-2 text-sm font-medium text-zinc-500">Business Passed</p>
                  </div>
                ) : (
                  <StatCounter value={0} label="Business Passed" colorClass="text-ink" labelClass="text-zinc-500" />
                )}
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-brand-500"><Handshake size={28} strokeWidth={1.5} /></div>
                <StatCounter value={s.stat_total_referrals ?? 0} label="Referrals Passed" colorClass="text-ink" labelClass="text-zinc-500" suffix="+" />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {activeMembers.map((member, idx) => (
                <Reveal key={member.id} delay={idx * 0.1} className="group rounded-2xl border border-zinc-200 overflow-hidden bg-white hover:shadow-xl transition-all flex flex-col">
                  <div className="aspect-square bg-zinc-100 relative shrink-0">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-ink text-3xl font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-center flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-ink text-lg line-clamp-1" title={member.name}>{member.name}</h3>
                      <p className="text-brand-500 text-sm font-semibold mt-1 line-clamp-1" title={member.business_category ?? undefined}>{member.business_category}</p>
                      <p className="text-zinc-500 text-xs mt-1 line-clamp-1" title={member.company ?? undefined}>{member.company}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-center gap-2">
                      {member.phone && (
                        <a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition-colors hover:bg-brand-50 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><Phone size={16} /></a>
                      )}
                      {member.whatsapp && (
                        <a href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${member.name}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition-colors hover:bg-brand-50 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><MessageCircle size={16} /></a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition-colors hover:bg-brand-50 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><Mail size={16} /></a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${member.name}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition-colors hover:bg-brand-50 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><LinkedinIcon size={16} /></a>
                      )}
                    </div>
                  </div>
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
              <div className="absolute inset-0 -mx-4 sm:mx-0 sm:-right-10 sm:-top-10 sm:-bottom-10 bg-[url('/images/group-photo.png')] bg-cover bg-center rounded-3xl opacity-40"></div>
              
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
                      <p className="font-bold text-lg mt-1">{s?.meeting_venue || "Details coming soon"}</p>
                    </div>
                  </div>
                </div>

                {s?.meeting_maps_link && (
                  <a href={s.meeting_maps_link} target="_blank" rel="noopener noreferrer" className="mt-8 flex w-full justify-center items-center gap-2 rounded-full bg-white text-ink px-7 py-3.5 text-sm font-bold transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    Get Directions <MapPin size={16} />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6. Member Testimonials */}
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
          
          {/* Empty State */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", company: "Sharma Logistics", text: "BNI Ares has completely transformed how I generate leads. The structured approach to networking is unparalleled." },
              { name: "Priya Desai", company: "Desai Architects", text: "The quality of referrals I receive from this chapter is exceptional. It's like having a team of 30+ sales professionals working for you." },
              { name: "Amit Patel", company: "Patel Financials", text: "I've seen a 40% growth in my business since joining BNI Ares. The Givers Gain philosophy truly works." },
              { name: "Sneha Mehta", company: "Creative Minds Agency", text: "Beyond just business, the learning and leadership opportunities here have helped me grow personally as well." },
              { name: "Vikram Singh", company: "Singh Enterprises", text: "The trust and camaraderie in this chapter make every meeting something I look forward to. Highly recommended." },
              { name: "Neha Gupta", company: "Gupta Associates", text: "Being part of BNI Ares has given me access to a diverse network of professionals that I couldn't have reached otherwise." }
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-zinc-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <Quote size={24} className="text-brand-500 mb-4 opacity-50" />
                  <p className="text-zinc-600 italic">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-100">
                  <p className="font-bold text-ink">{t.name}</p>
                  <p className="text-sm font-medium text-brand-500">{t.company}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

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
          
          <div className="flex overflow-hidden group whitespace-nowrap">
            <div className="flex animate-marquee pause-marquee items-center gap-6 sm:gap-8 pr-6 sm:pr-8 w-max">
              {[...displaySponsors, ...displaySponsors, ...displaySponsors, ...displaySponsors].map((sponsor, idx) => (
                <div key={`s1-${sponsor.id}-${idx}`} className="flex shrink-0 h-28 sm:h-32 w-56 sm:w-64 items-center justify-center rounded-2xl bg-zinc-50 p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-brand-200 transition-all cursor-pointer">
                  <a href={sponsor.website_url ?? "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full focus-visible:outline-none">
                    {sponsor.logo_url ? (
                      <img src={sponsor.logo_url} alt={sponsor.name} className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                    ) : (
                      <span className="text-zinc-400 font-bold text-sm sm:text-base uppercase tracking-widest hover:text-brand-500 transition-colors text-center whitespace-normal">{sponsor.name}</span>
                    )}
                  </a>
                </div>
              ))}
            </div>
            <div className="flex animate-marquee pause-marquee items-center gap-6 sm:gap-8 pr-6 sm:pr-8 w-max" aria-hidden="true">
              {[...displaySponsors, ...displaySponsors, ...displaySponsors, ...displaySponsors].map((sponsor, idx) => (
                <div key={`s2-${sponsor.id}-${idx}`} className="flex shrink-0 h-28 sm:h-32 w-56 sm:w-64 items-center justify-center rounded-2xl bg-zinc-50 p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-brand-200 transition-all cursor-pointer">
                  <a href={sponsor.website_url ?? "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full focus-visible:outline-none">
                    {sponsor.logo_url ? (
                      <img src={sponsor.logo_url} alt={sponsor.name} className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                    ) : (
                      <span className="text-zinc-400 font-bold text-sm sm:text-base uppercase tracking-widest hover:text-brand-500 transition-colors text-center whitespace-normal">{sponsor.name}</span>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
              {displayGallery.map((img, idx) => {
                const isLarge = idx === 0;
                return (
                  <Reveal key={img.id} delay={idx * 0.1} className={`relative group rounded-3xl overflow-hidden bg-zinc-200 ${isLarge ? 'md:col-span-2 md:row-span-2 h-[300px] md:h-full' : 'h-[250px] md:h-full'}`}>
                    <img
                      src={img.image_url}
                      alt={img.caption || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
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
