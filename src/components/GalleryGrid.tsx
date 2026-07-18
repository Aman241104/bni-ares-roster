"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { AlbumWithImages } from "@/app/gallery/page";
import type { GalleryCategory, GalleryImage } from "@/types/database";

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  meetings: "Meetings",
  business_events: "Business Networking & Events",
  visitor_days: "Visitor Day",
  socials: "Chapter Socials",
  fun_events: "Fun Events",
  kym: "KYM Sessions",
};

export default function GalleryGrid({ albums }: { albums: AlbumWithImages[] }) {
  const [category, setCategory] = useState<GalleryCategory | "">("");
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const usedCategories = useMemo(
    () => Array.from(new Set(albums.map((a) => a.category))),
    [albums]
  );

  const filtered = albums.filter((a) => {
    const matchesCategory = !category || a.category === category;
    const matchesQuery = !query.trim() || a.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function openLightbox(images: GalleryImage[], index: number) {
    setLightbox({ images: images.map((i) => i.image_url), index });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by event…"
          className="w-full rounded-full border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategory("")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === "" ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
          >
            All
          </button>
          {usedCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === category ? "" : c)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 py-16 text-center text-zinc-500">
          No albums yet — photos will appear here after the next event.
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {filtered.map((album) => (
            <div key={album.id}>
              <div className="flex items-baseline justify-between">
                <h2 className="font-heading text-xl font-bold text-ink">{album.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {CATEGORY_LABELS[album.category]}
                </span>
              </div>
              {album.gallery_images.length === 0 ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-400">
                  <ImageOff size={16} /> No photos uploaded yet
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {album.gallery_images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => openLightbox(album.gallery_images, i)}
                      className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100"
                    >
                      <Image
                        src={img.image_url}
                        alt={img.caption ?? album.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setLightbox(null)} className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close">
            <X size={28} />
          </button>
          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={() => setLightbox((l) => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length })}
                className="absolute left-4 text-white/80 hover:text-white sm:left-8"
                aria-label="Previous"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length })}
                className="absolute right-4 text-white/80 hover:text-white sm:right-8"
                aria-label="Next"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image src={lightbox.images[lightbox.index]} alt="" fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
