"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/admin/storage";

export async function updateSettings(formData: FormData) {
  const get = (name: string) => String(formData.get(name) ?? "").trim() || null;
  const getInt = (name: string) => {
    const v = String(formData.get(name) ?? "").trim();
    return v ? parseInt(v, 10) : 0;
  };

  let faqs: { question: string; answer: string }[] = [];
  try {
    faqs = JSON.parse(String(formData.get("faqs_json") ?? "[]"));
  } catch {
    faqs = [];
  }
  faqs = faqs.filter((f) => f.question?.trim() && f.answer?.trim());

  let qr_code_url: string | undefined;
  const qrFile = formData.get("qr_code");
  if (qrFile instanceof File && qrFile.size > 0) {
    qr_code_url = await uploadImage(qrFile, "settings");
  }

  const { error } = await supabaseAdmin
    .from("settings")
    .update({
      meeting_venue: get("meeting_venue"),
      meeting_maps_link: get("meeting_maps_link"),
      meeting_time: get("meeting_time"),
      dress_code: get("dress_code"),
      visitor_fee: get("visitor_fee"),
      upi_id: get("upi_id"),
      bank_details: get("bank_details"),
      stat_total_members: getInt("stat_total_members"),
      stat_business_passed: get("stat_business_passed"),
      stat_total_referrals: getInt("stat_total_referrals"),
      stat_visitors_hosted: getInt("stat_visitors_hosted"),
      stat_years_chapter: getInt("stat_years_chapter"),
      contact_phone: get("contact_phone"),
      contact_email: get("contact_email"),
      contact_whatsapp: get("contact_whatsapp"),
      social_instagram: get("social_instagram"),
      social_facebook: get("social_facebook"),
      social_linkedin: get("social_linkedin"),
      faqs,
      updated_at: new Date().toISOString(),
      ...(qr_code_url ? { qr_code_url } : {}),
    })
    .eq("id", 1);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/visitor");
  revalidatePath("/contact");
  revalidatePath("/members");
}
