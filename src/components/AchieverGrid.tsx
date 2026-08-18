"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";
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
              className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-left shadow-sm transition-shadow hover:shadow-md disabled:cursor-default"
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-600 shadow hover:bg-white"
            >
              <X size={16} />
            </button>
            <div className="relative aspect-[4/3] w-full bg-zinc-100">
              <Avatar name={selected.name} photoUrl={selected.photo_url} />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-ink">{selected.name}</h3>
              {selected.company && <p className="text-sm text-zinc-600">{selected.company}</p>}
              {selected.business_category && (
                <span className="mt-2 inline-block rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                  {selected.business_category}
                </span>
              )}
              <div className="mt-4">
                <ContactButtons
                  phone={selected.phone}
                  whatsapp={selected.whatsapp}
                  email={selected.email}
                  website={selected.website}
                />
              </div>
              <Link
                href={`/members/${selected.id}`}
                className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
              >
                View Full Profile →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
