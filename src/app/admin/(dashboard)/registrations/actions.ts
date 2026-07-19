"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function toggleRegistrationStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("status") ?? "new");
  const next = current === "new" ? "contacted" : "new";
  const { error } = await supabaseAdmin.from("visitor_registrations").update({ status: next }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/registrations");
}

export async function deleteRegistration(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { error } = await supabaseAdmin.from("visitor_registrations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/registrations");
}
