"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Globe } from "lucide-react";
import type { Sponsor } from "@/types/database";

function SponsorPopup({ sponsor, onClose }: { sponsor: Sponsor; onClose: () => void }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[28px] bg-white p-8 text-center shadow-2xl ring-1 ring-black/5 animate-[popIn_0.2s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-600 transition-transform hover:scale-105 hover:text-ink"
        >
          <X size={18} />
        </button>

        <div className="relative mx-auto flex h-28 w-full items-center justify-center rounded-2xl bg-zinc-50 p-4">
          {sponsor.logo_url ? (
            <Image src={sponsor.logo_url} alt={sponsor.name} fill sizes="384px" className="object-contain p-4" />
          ) : (
            <span className="font-heading text-xl font-bold text-ink">{sponsor.name}</span>
          )}
        </div>

        <h3 className="mt-6 font-heading text-xl font-bold text-ink">{sponsor.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">Proud Chapter Sponsor of BNI Ares</p>

        {sponsor.website_url && (
          <a
            href={sponsor.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
          >
            <Globe size={16} /> Visit Website
          </a>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function SponsorTicker({ sponsors }: { sponsors: Sponsor[] }) {
  const [selected, setSelected] = useState<Sponsor | null>(null);
  const doubled = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  const renderRow = (rowKey: string, ariaHidden?: boolean) => (
    <div
      className="flex animate-marquee pause-marquee items-center gap-6 sm:gap-8 pr-6 sm:pr-8 w-max"
      aria-hidden={ariaHidden}
    >
      {doubled.map((sponsor, idx) => (
        <button
          type="button"
          key={`${rowKey}-${sponsor.id}-${idx}`}
          onClick={() => setSelected(sponsor)}
          className="flex shrink-0 h-28 sm:h-32 w-56 sm:w-64 items-center justify-center rounded-2xl bg-zinc-50 p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-brand-200 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          {sponsor.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sponsor.logo_url}
              alt={sponsor.name}
              className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ) : (
            <span className="text-zinc-400 font-bold text-sm sm:text-base uppercase tracking-widest hover:text-brand-500 transition-colors text-center whitespace-normal">
              {sponsor.name}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex overflow-hidden group whitespace-nowrap">
        {renderRow("s1")}
        {renderRow("s2", true)}
      </div>

      {selected && <SponsorPopup sponsor={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
