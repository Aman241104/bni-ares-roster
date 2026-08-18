"use client";

import { useState } from "react";
import ProfilePopup from "@/components/ProfilePopup";
import type { Member } from "@/types/database";

type AchieverMember = Pick<
  Member,
  "id" | "name" | "photo_url" | "company" | "business_category" | "phone" | "whatsapp" | "email" | "website"
>;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AchieverGrid({ names, members }: { names: string[]; members: AchieverMember[] }) {
  const [selected, setSelected] = useState<AchieverMember | null>(null);

  const byName = new Map(members.map((m) => [m.name.trim().toLowerCase(), m]));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {names.map((name) => {
          const match = byName.get(name.trim().toLowerCase());
          return (
            <button
              key={name}
              type="button"
              disabled={!match}
              onClick={() => match && setSelected(match)}
              className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-brand-200 disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-sm disabled:opacity-70"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                {initials(name)}
              </div>
              <span className="font-semibold text-ink text-sm">{name}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <ProfilePopup
          onClose={() => setSelected(null)}
          person={{
            name: selected.name,
            photoUrl: selected.photo_url,
            subtitle: selected.company,
            tag: selected.business_category,
            phone: selected.phone,
            whatsapp: selected.whatsapp,
            email: selected.email,
            website: selected.website,
            profileHref: `/members/${selected.id}`,
          }}
        />
      )}
    </>
  );
}
