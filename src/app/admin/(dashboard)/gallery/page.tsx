import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import { TextField, TextAreaField, SelectField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import { ToggleStatusButton } from "@/components/admin/RowActions";
import { createAlbum, toggleAlbumStatus } from "./actions";
import type { GalleryAlbum } from "@/types/database";

const CATEGORY_OPTIONS = [
  { value: "meetings", label: "Meetings" },
  { value: "business_events", label: "Business Networking & Events" },
  { value: "visitor_days", label: "Visitor Day" },
  { value: "socials", label: "Chapter Socials" },
  { value: "fun_events", label: "Fun Events" },
  { value: "kym", label: "KYM Sessions" },
];

export default async function AdminGalleryPage() {
  const { data } = await supabaseAdmin
    .from("gallery_albums")
    .select("*, gallery_images(count)")
    .order("display_order");
  const albums = (data as (GalleryAlbum & { gallery_images: { count: number }[] })[] | null) ?? [];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Gallery</h1>
      <p className="mt-1 text-sm text-zinc-500">{albums.length} albums</p>

      <div className="mt-6 max-w-lg rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-heading text-sm font-bold text-ink">New Album</h2>
        <form action={createAlbum} className="mt-4 space-y-4">
          <TextField label="Title" name="title" required />
          <SelectField label="Category" name="category" required options={CATEGORY_OPTIONS} />
          <TextField label="Event Date" name="event_date" type="date" />
          <TextAreaField label="Description" name="description" rows={2} />
          <SubmitButton>Create Album</SubmitButton>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <div key={album.id} className={`rounded-2xl border border-zinc-200 bg-white p-5 ${album.status === "hidden" ? "opacity-50" : ""}`}>
            <p className="font-heading text-sm font-bold text-ink">{album.title}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {CATEGORY_OPTIONS.find((c) => c.value === album.category)?.label} · {album.gallery_images[0]?.count ?? 0} photos
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/admin/gallery/${album.id}`}
                className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-semibold text-ink hover:bg-zinc-50"
              >
                Manage Photos
              </Link>
              <form action={toggleAlbumStatus}>
                <input type="hidden" name="id" value={album.id} />
                <input type="hidden" name="status" value={album.status} />
                <ToggleStatusButton status={album.status} />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
