import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { supabase } from "@/lib/supabase/client";

export default async function Footer() {
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();

  return (
    <footer className="border-t border-black/5 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold">
              BNI <span className="text-brand-500">Ares</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              Business Growth. Trusted Referrals. A chapter built on Givers Gain.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-300">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li><Link href="/members" className="hover:text-brand-500">Members Directory</Link></li>
              <li><Link href="/coordinators" className="hover:text-brand-500">Coordinators</Link></li>
              <li><Link href="/gallery" className="hover:text-brand-500">Gallery</Link></li>
              <li><Link href="/visitor" className="hover:text-brand-500">Visit Us</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-300">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {settings?.contact_phone && (
                <li className="flex items-center gap-2"><Phone size={14} /> {settings.contact_phone}</li>
              )}
              {settings?.contact_email && (
                <li className="flex items-center gap-2"><Mail size={14} /> {settings.contact_email}</li>
              )}
              {settings?.meeting_venue && (
                <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {settings.meeting_venue}</li>
              )}
              {!settings?.contact_phone && !settings?.contact_email && !settings?.meeting_venue && (
                <li className="text-zinc-500">Details coming soon</li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-300">Follow</p>
            <div className="mt-3 flex gap-3">
              {settings?.social_instagram && (
                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-500">
                  <InstagramIcon size={16} />
                </a>
              )}
              {settings?.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-500">
                  <FacebookIcon size={16} />
                </a>
              )}
              {settings?.social_linkedin && (
                <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-500">
                  <LinkedinIcon size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} BNI Ares Chapter. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
