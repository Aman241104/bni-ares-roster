import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import SubmitButton from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/RowActions";
import { addImages, deleteImage, deleteAlbumRedirect } from "../actions";
import type { GalleryAlbum, GalleryImage } from "@/types/database";

export default async function AdminAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ data: album }, { data: images }] = await Promise.all([
    supabaseAdmin.from("gallery_albums").select("*").eq("id", id).maybeSingle(),
    supabaseAdmin.from("gallery_images").select("*").eq("album_id", id).order("display_order"),
  ]);
  if (!album) notFound();
  const albumData = album as GalleryAlbum;
  const imageList = (images as GalleryImage[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-ink">{albumData.title}</h1>
        <form action={deleteAlbumRedirect}>
          <input type="hidden" name="id" value={albumData.id} />
          <DeleteButton confirmLabel={`Delete album "${albumData.title}" and all its photos? This can't be undone.`} />
        </form>
      </div>

      <div className="mt-6 max-w-lg rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-heading text-sm font-bold text-ink">Upload Photos</h2>
        <form action={addImages} encType="multipart/form-data" className="mt-4 space-y-4">
          <input type="hidden" name="album_id" value={albumData.id} />
          <input type="file" name="images" accept="image/*" multiple className="text-sm" />
          <SubmitButton>Upload</SubmitButton>
        </form>
      </div>

      {imageList.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500">No photos uploaded yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {imageList.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.image_url} alt="" className="h-full w-full object-cover" />
              <form action={deleteImage} className="absolute right-1.5 top-1.5 rounded-lg bg-white/90 shadow-sm">
                <input type="hidden" name="id" value={img.id} />
                <input type="hidden" name="album_id" value={albumData.id} />
                <DeleteButton confirmLabel="Delete this photo?" />
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
