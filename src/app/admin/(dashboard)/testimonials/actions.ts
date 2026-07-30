"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function createTestimonial(formData: FormData) {
  const member_name = String(formData.get("member_name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim() || null;
  const quote_text = String(formData.get("quote_text") ?? "").trim();
  if (!member_name) throw new Error("Member name is required");
  if (!quote_text) throw new Error("Quote is required");

  const { count } = await supabaseAdmin.from("testimonials").select("id", { count: "exact", head: true });

  const { error } = await supabaseAdmin
    .from("testimonials")
    .insert({ member_name, company, quote_text, display_order: count ?? 0 });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function toggleTestimonialStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("status") ?? "active");
  const next = current === "active" ? "hidden" : "active";
  const { error } = await supabaseAdmin.from("testimonials").update({ status: next }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function moveTestimonial(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  const { data: rows } = await supabaseAdmin.from("testimonials").select("id, display_order").order("display_order");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= rows.length) return;

  const a = rows[index];
  const b = rows[swapIndex];
  await Promise.all([
    supabaseAdmin.from("testimonials").update({ display_order: b.display_order }).eq("id", a.id),
    supabaseAdmin.from("testimonials").update({ display_order: a.display_order }).eq("id", b.id),
  ]);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
