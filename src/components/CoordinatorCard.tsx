"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";
import ProfilePopup from "@/components/ProfilePopup";
import type { Coordinator } from "@/types/database";

export default function CoordinatorCard({ coordinator, topAccent }: { coordinator: Coordinator; topAccent?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        className={`flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
          topAccent ? "border-zinc-200 border-t-4 border-t-brand-500" : "border-zinc-200"
        }`}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          <Avatar name={coordinator.name} photoUrl={coordinator.photo_url} />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div>
            <h3 className="font-heading text-base font-bold text-ink">{coordinator.name}</h3>
            {coordinator.position && <p className="text-sm font-medium text-brand-600">{coordinator.position}</p>}
            {coordinator.company && <p className="text-sm text-zinc-500">{coordinator.company}</p>}
          </div>
          {coordinator.responsibilities && (
            <p className="line-clamp-2 text-sm text-zinc-500">{coordinator.responsibilities}</p>
          )}
          <div className="mt-auto pt-2">
            <ContactButtons
              phone={coordinator.phone}
              email={coordinator.email}
              linkedin={coordinator.linkedin}
              instagram={coordinator.instagram}
              facebook={coordinator.facebook}
            />
          </div>
        </div>
      </div>

      {open && (
        <ProfilePopup
          onClose={() => setOpen(false)}
          person={{
            name: coordinator.name,
            photoUrl: coordinator.photo_url,
            subtitle: coordinator.company,
            tag: coordinator.position,
            description: coordinator.responsibilities,
            phone: coordinator.phone,
            email: coordinator.email,
            linkedin: coordinator.linkedin,
            instagram: coordinator.instagram,
            facebook: coordinator.facebook,
          }}
        />
      )}
    </>
  );
}
