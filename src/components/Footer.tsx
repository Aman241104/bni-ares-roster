import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { supabase } from "@/lib/supabase/client";

export default async function Footer() {
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();

  return (
    <footer className="border-t border-black/5 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                BNI <span className="text-red-400">Ares</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                Givers Gain®
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-zinc-400">
              Business Growth. Trusted Referrals. A chapter built on Givers Gain.
            </p>
            <div className="mt-6 flex gap-3">
              {settings?.social_instagram && (
                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-500 transition-colors">
                  <InstagramIcon size={16} />
                </a>
              )}
              {settings?.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-500 transition-colors">
                  <FacebookIcon size={16} />
                </a>
              )}
              {settings?.social_linkedin && (
                <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-2 hover:bg-brand-500 transition-colors">
                  <LinkedinIcon size={16} />
                </a>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-300">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-red-400 transition-colors">About Ares</Link></li>
              <li><Link href="/members" className="hover:text-red-400 transition-colors">Members</Link></li>
              <li><Link href="/coordinators" className="hover:text-red-400 transition-colors">Chapter Excellence</Link></li>
              <li><Link href="/visitor" className="hover:text-red-400 transition-colors">Visit Ares</Link></li>
              <li><Link href="/gallery" className="hover:text-red-400 transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-300">Resources</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-red-400 transition-colors">About BNI</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">How It Works</Link></li>
              <li><Link href="/visitor" className="hover:text-red-400 transition-colors">Visitor Information</Link></li>
              <li><Link href="/#faq" className="hover:text-red-400 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-red-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-semibold text-zinc-300">Contact Info</p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                {settings?.contact_phone && (
                  <li className="flex items-center gap-3"><Phone size={16} className="text-brand-500" /> {settings.contact_phone}</li>
                )}
                {settings?.contact_email && (
                  <li className="flex items-center gap-3"><Mail size={16} className="text-brand-500" /> {settings.contact_email}</li>
                )}
                {settings?.meeting_venue && (
                  <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 shrink-0 text-brand-500" /> {settings.meeting_venue}</li>
                )}
                {!settings?.contact_phone && !settings?.contact_email && !settings?.meeting_venue && (
                  <li className="text-zinc-500">Details coming soon</li>
                )}
              </ul>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-zinc-300">Meeting Details</p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li className="flex items-center gap-3">
                  <Clock size={16} className="text-brand-500" />
                  {settings?.meeting_time || "Coming soon"}
                </li>
                {settings?.meeting_maps_link && (
                  <li>
                    <a
                      href={settings.meeting_maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-500 mt-2"
                    >
                      Get Directions
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} BNI Ares Chapter. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with ❤️ for BNI Ares</p>
        </div>
      </div>
    </footer>
  );
}
