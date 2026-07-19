"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/admin/storage";

function fieldsFromForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    position: String(formData.get("position") ?? "").trim() || null,
    team: String(formData.get("team") ?? "chapter_coordinator"),
    company: String(formData.get("company") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    linkedin: String(formData.get("linkedin") ?? "").trim() || null,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    facebook: String(formData.get("facebook") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    responsibilities: String(formData.get("responsibilities") ?? "").trim() || null,
  };
}

async function maybeUploadPhoto(formData: FormData): Promise<string | undefined> {
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) return uploadImage(file, "coordinators");
  return undefined;
}

export async function createCoordinator(formData: FormData) {
  const fields = fieldsFromForm(formData);
  if (!fields.name) throw new Error("Name is required");

  const photo_url = await maybeUploadPhoto(formData);
  const { count } = await supabaseAdmin.from("coordinators").select("id", { count: "exact", head: true }).eq("team", fields.team);

  const { error } = await supabaseAdmin.from("coordinators").insert({
    ...fields,
    photo_url: photo_url ?? null,
    display_order: count ?? 0,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/coordinators");
  revalidatePath("/coordinators");
  redirect("/admin/coordinators");
}

export async function updateCoordinator(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing coordinator id");
  const fields = fieldsFromForm(formData);
  if (!fields.name) throw new Error("Name is required");

  const photo_url = await maybeUploadPhoto(formData);

  const { error } = await supabaseAdmin
    .from("coordinators")
    .update({ ...fields, ...(photo_url ? { photo_url } : {}) })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/coordinators");
  revalidatePath("/coordinators");
  redirect("/admin/coordinators");
}

export async function deleteCoordinator(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { error } = await supabaseAdmin.from("coordinators").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/coordinators");
  revalidatePath("/coordinators");
}

export async function toggleCoordinatorStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("status") ?? "active");
  const next = current === "active" ? "hidden" : "active";
  const { error } = await supabaseAdmin.from("coordinators").update({ status: next }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/coordinators");
  revalidatePath("/coordinators");
}

export async function moveCoordinator(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const team = String(formData.get("team") ?? "");

  const { data: rows } = await supabaseAdmin
    .from("coordinators")
    .select("id, display_order")
    .eq("team", team)
    .order("display_order");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= rows.length) return;

  const a = rows[index];
  const b = rows[swapIndex];
  await Promise.all([
    supabaseAdmin.from("coordinators").update({ display_order: b.display_order }).eq("id", a.id),
    supabaseAdmin.from("coordinators").update({ display_order: a.display_order }).eq("id", b.id),
  ]);

  revalidatePath("/admin/coordinators");
  revalidatePath("/coordinators");
}
