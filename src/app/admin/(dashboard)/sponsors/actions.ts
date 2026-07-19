"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/admin/storage";

export async function createSponsor(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const website_url = String(formData.get("website_url") ?? "").trim() || null;
  if (!name) throw new Error("Name is required");

  let logo_url: string | null = null;
  const file = formData.get("logo");
  if (file instanceof File && file.size > 0) logo_url = await uploadImage(file, "sponsors");

  const { count } = await supabaseAdmin.from("sponsors").select("id", { count: "exact", head: true });

  const { error } = await supabaseAdmin.from("sponsors").insert({ name, website_url, logo_url, priority: count ?? 0 });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}

export async function deleteSponsor(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { error } = await supabaseAdmin.from("sponsors").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}

export async function toggleSponsorStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("status") ?? "active");
  const next = current === "active" ? "hidden" : "active";
  const { error } = await supabaseAdmin.from("sponsors").update({ status: next }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}

export async function moveSponsor(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  const { data: rows } = await supabaseAdmin.from("sponsors").select("id, priority").order("priority");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= rows.length) return;

  const a = rows[index];
  const b = rows[swapIndex];
  await Promise.all([
    supabaseAdmin.from("sponsors").update({ priority: b.priority }).eq("id", a.id),
    supabaseAdmin.from("sponsors").update({ priority: a.priority }).eq("id", b.id),
  ]);

  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}
