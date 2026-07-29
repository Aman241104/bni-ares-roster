"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/admin/storage";

function fieldsFromForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim() || null,
    designation: String(formData.get("designation") ?? "").trim() || null,
    business_category: String(formData.get("business_category") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    referral_expectations: String(formData.get("referral_expectations") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    whatsapp: String(formData.get("whatsapp") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    website: String(formData.get("website") ?? "").trim() || null,
    linkedin: String(formData.get("linkedin") ?? "").trim() || null,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    facebook: String(formData.get("facebook") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim() || null,
    google_maps_link: String(formData.get("google_maps_link") ?? "").trim() || null,
  };
}

async function maybeUploadPhoto(formData: FormData): Promise<string | undefined> {
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    return uploadImage(file, "members");
  }
  return undefined;
}

async function maybeUploadCompanyLogo(formData: FormData): Promise<string | undefined> {
  const file = formData.get("company_logo");
  if (file instanceof File && file.size > 0) {
    return uploadImage(file, "members/logos");
  }
  return undefined;
}

export async function createMember(formData: FormData) {
  const fields = fieldsFromForm(formData);
  if (!fields.name) throw new Error("Name is required");

  const photo_url = await maybeUploadPhoto(formData);
  const company_logo_url = await maybeUploadCompanyLogo(formData);

  const { count } = await supabaseAdmin.from("members").select("id", { count: "exact", head: true });

  const { error } = await supabaseAdmin.from("members").insert({
    ...fields,
    photo_url: photo_url ?? null,
    company_logo_url: company_logo_url ?? null,
    display_order: count ?? 0,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/members");
  revalidatePath("/members");
  revalidatePath("/");
  redirect("/admin/members");
}

export async function updateMember(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing member id");
  const fields = fieldsFromForm(formData);
  if (!fields.name) throw new Error("Name is required");

  const photo_url = await maybeUploadPhoto(formData);
  const company_logo_url = await maybeUploadCompanyLogo(formData);

  const { error } = await supabaseAdmin
    .from("members")
    .update({ ...fields, ...(photo_url ? { photo_url } : {}), ...(company_logo_url ? { company_logo_url } : {}) })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/members");
  revalidatePath("/members");
  revalidatePath(`/members/${id}`);
  revalidatePath("/");
  redirect("/admin/members");
}

export async function deleteMember(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { error } = await supabaseAdmin.from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/members");
  revalidatePath("/members");
  revalidatePath("/");
}

export async function toggleMemberStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("status") ?? "active");
  const next = current === "active" ? "hidden" : "active";
  const { error } = await supabaseAdmin.from("members").update({ status: next }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/members");
  revalidatePath("/members");
  revalidatePath("/");
}

export async function moveMember(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  const { data: rows } = await supabaseAdmin.from("members").select("id, display_order").order("display_order");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= rows.length) return;

  const a = rows[index];
  const b = rows[swapIndex];
  await Promise.all([
    supabaseAdmin.from("members").update({ display_order: b.display_order }).eq("id", a.id),
    supabaseAdmin.from("members").update({ display_order: a.display_order }).eq("id", b.id),
  ]);

  revalidatePath("/admin/members");
  revalidatePath("/members");
  revalidatePath("/");
}
