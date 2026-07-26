"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { AlbumWithImages } from "@/app/(site)/gallery/page";
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
  const [lightbox, setLightbox] = useState<{ images: { url: string, alt: string }[]; index: number } | null>(null);
  
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const usedCategories = useMemo(
    () => Array.from(new Set(albums.map((a) => a.category))).sort(),
    [albums]
  );

  const isLightboxOpen = !!lightbox;

  useEffect(() => {
    if (!isLightboxOpen) {
      if (triggerRef.current) {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
      return;
    }

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") {
        setLightbox((l) => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length });
      }
      if (e.key === "ArrowRight") {
        setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length });
      }
      if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (document.activeElement && !dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const filtered = albums.filter((a) => {
    const matchesCategory = !category || a.category === category;
    const matchesQuery = !query.trim() || a.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function openLightbox(images: GalleryImage[], index: number, albumTitle: string, e: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = e.currentTarget;
    setLightbox({
      images: images.map((i) => ({ url: i.image_url, alt: i.caption ?? albumTitle })),
      index
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          aria-label="Search by event"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by event…"
          className="w-full rounded-full border border-zinc-200 px-4 py-2.5 text-sm text-ink outline-none ring-brand-500 focus:ring-2 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            aria-pressed={category === ""}
            className={`rounded-full border border-transparent px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${category === "" ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
          >
            All
          </button>
          {usedCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === category ? "" : c)}
              aria-pressed={category === c}
              className={`rounded-full border border-transparent px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${category === c ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
          <p className="font-heading text-lg font-bold text-ink">Our Story Is Just Beginning.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
            The next photograph on this page could be yours. Join us this Wednesday.
          </p>
          <Link
            href="/visitor"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
          >
            Register as Visitor
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {filtered.map((album) => (
            <div key={album.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-xl font-bold text-ink">{album.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {CATEGORY_LABELS[album.category]}
                </span>
              </div>
              {album.gallery_images.length === 0 ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-500">
                  <ImageOff size={16} /> No photos uploaded yet
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {album.gallery_images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={(e) => openLightbox(album.gallery_images, i, album.title, e)}
                      className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <Image
                        src={img.image_url}
                        alt={img.caption ?? album.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
        <div 
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
        >
          <button 
            ref={closeBtnRef}
            onClick={() => setLightbox(null)} 
            className="absolute right-5 top-5 z-10 p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" 
            aria-label="Close"
          >
            <X size={28} />
          </button>
          
          <div className="pointer-events-none relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col justify-center">
            <div className="relative flex-1 w-full">
              {lightbox.images.length > 1 && (
                <>
                  <button
                    onClick={() => setLightbox((l) => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length })}
                    className="pointer-events-auto absolute -left-2 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-left-12"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={() => setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length })}
                    className="pointer-events-auto absolute -right-2 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-right-12"
                    aria-label="Next"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
              <Image 
                src={lightbox.images[lightbox.index].url} 
                alt={lightbox.images[lightbox.index].alt} 
                fill 
                sizes="(max-width: 896px) 100vw, 896px"
                className="pointer-events-auto cursor-pointer object-contain"
                onClick={() => setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length })}
              />
            </div>
            <div aria-live="polite" className="pointer-events-auto mt-4 shrink-0 text-center text-white">
              <p className="text-sm font-semibold">{lightbox.images[lightbox.index].alt}</p>
              <p className="mt-1 text-xs text-white/70">
                {lightbox.index + 1} / {lightbox.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
