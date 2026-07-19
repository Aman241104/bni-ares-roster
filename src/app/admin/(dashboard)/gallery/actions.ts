"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/admin/storage";

export async function createAlbum(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "meetings");
  const description = String(formData.get("description") ?? "").trim() || null;
  const event_date = String(formData.get("event_date") ?? "") || null;
  if (!title) throw new Error("Title is required");

  const { count } = await supabaseAdmin.from("gallery_albums").select("id", { count: "exact", head: true });

  const { error } = await supabaseAdmin
    .from("gallery_albums")
    .insert({ title, category, description, event_date, display_order: count ?? 0 });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteAlbum(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { error } = await supabaseAdmin.from("gallery_albums").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleAlbumStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("status") ?? "active");
  const next = current === "active" ? "hidden" : "active";
  const { error } = await supabaseAdmin.from("gallery_albums").update({ status: next }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function addImages(formData: FormData) {
  const albumId = String(formData.get("album_id") ?? "");
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return;

  const { count } = await supabaseAdmin
    .from("gallery_images")
    .select("id", { count: "exact", head: true })
    .eq("album_id", albumId);

  let order = count ?? 0;
  for (const file of files) {
    const image_url = await uploadImage(file, `gallery/${albumId}`);
    await supabaseAdmin.from("gallery_images").insert({ album_id: albumId, image_url, display_order: order });
    order += 1;
  }

  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath("/gallery");
}

export async function deleteImage(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const albumId = String(formData.get("album_id") ?? "");
  const { error } = await supabaseAdmin.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/gallery/${albumId}`);
  revalidatePath("/gallery");
}

export async function deleteAlbumRedirect(formData: FormData) {
  await deleteAlbum(formData);
  redirect("/admin/gallery");
}
