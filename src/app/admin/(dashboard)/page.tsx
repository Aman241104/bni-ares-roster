import Link from "next/link";
import { Users, Handshake, Award, Images, CalendarCheck, MessageSquare, Quote } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";

async function getCounts() {
  const [members, coordinators, sponsors, testimonials, albums, newRegistrations, newMessages] = await Promise.all([
    supabaseAdmin.from("members").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("coordinators").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("sponsors").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("testimonials").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("gallery_albums").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("visitor_registrations").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabaseAdmin.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  return {
    members: members.count ?? 0,
    coordinators: coordinators.count ?? 0,
    sponsors: sponsors.count ?? 0,
    testimonials: testimonials.count ?? 0,
    albums: albums.count ?? 0,
    newRegistrations: newRegistrations.count ?? 0,
    newMessages: newMessages.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/members", icon: Users, label: "Members", value: counts.members },
    { href: "/admin/coordinators", icon: Handshake, label: "Coordinators", value: counts.coordinators },
    { href: "/admin/sponsors", icon: Award, label: "Sponsors", value: counts.sponsors },
    { href: "/admin/testimonials", icon: Quote, label: "Testimonials", value: counts.testimonials },
    { href: "/admin/gallery", icon: Images, label: "Gallery Albums", value: counts.albums },
    { href: "/admin/registrations", icon: CalendarCheck, label: "New Visitor Registrations", value: counts.newRegistrations, highlight: counts.newRegistrations > 0 },
    { href: "/admin/messages", icon: MessageSquare, label: "New Messages", value: counts.newMessages, highlight: counts.newMessages > 0 },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">Manage the BNI Ares public site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md ${
              c.highlight ? "border-brand-300" : "border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.highlight ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600"}`}>
                <c.icon size={18} />
              </div>
              <span className="font-heading text-2xl font-bold text-ink">{c.value}</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">{c.label}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/settings"
        className="mt-6 inline-block rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-zinc-50"
      >
        Edit Chapter Settings →
      </Link>
    </div>
  );
}
