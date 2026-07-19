"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Handshake, Award, Images, CalendarCheck, MessageSquare, Settings } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/coordinators", label: "Coordinators", icon: Handshake },
  { href: "/admin/sponsors", label: "Sponsors", icon: Award },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/registrations", label: "Registrations", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-zinc-200 bg-white sm:block">
      <div className="p-6">
        <p className="font-heading text-lg font-bold text-ink">
          BNI <span className="text-brand-500">Ares</span>
        </p>
        <p className="text-xs text-zinc-400">Admin</p>
      </div>
      <nav className="space-y-1 px-3">
        {LINKS.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                active ? "bg-brand-50 text-brand-700" : "text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
