"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";

export interface PopupPerson {
  id?: string;
  name: string;
  photoUrl?: string | null;
  subtitle?: string | null;
  tag?: string | null;
  description?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  website?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  profileHref?: string | null;
}

export default function ProfilePopup({ person, onClose }: { person: PopupPerson; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-black/5 animate-[popIn_0.2s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-zinc-600 shadow-md backdrop-blur transition-transform hover:scale-105 hover:text-ink"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          <Avatar name={person.name} photoUrl={person.photoUrl} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-heading text-2xl font-extrabold leading-tight text-white drop-shadow">
              {person.name}
            </h3>
            {person.subtitle && <p className="mt-0.5 text-sm font-medium text-white/90 drop-shadow">{person.subtitle}</p>}
          </div>
        </div>

        <div className="p-6">
          {person.tag && (
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
              {person.tag}
            </span>
          )}

          {person.description && (
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">{person.description}</p>
          )}

          {(person.phone || person.whatsapp || person.email || person.website || person.linkedin || person.instagram || person.facebook) && (
            <div className="mt-5">
              <ContactButtons
                phone={person.phone}
                whatsapp={person.whatsapp}
                email={person.email}
                website={person.website}
                linkedin={person.linkedin}
                instagram={person.instagram}
                facebook={person.facebook}
                size="md"
              />
            </div>
          )}

          {person.profileHref && (
            <Link
              href={person.profileHref}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
            >
              View Full Profile →
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
