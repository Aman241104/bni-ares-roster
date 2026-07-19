import { supabaseAdmin } from "@/lib/supabase/server";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import FaqEditor from "@/components/admin/FaqEditor";
import { updateSettings } from "./actions";
import type { Settings } from "@/types/database";

export default async function AdminSettingsPage() {
  const { data } = await supabaseAdmin.from("settings").select("*").eq("id", 1).maybeSingle();
  const s = (data as Settings | null) ?? null;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-ink">Chapter Settings</h1>
      <p className="mt-1 text-sm text-zinc-500">Meeting details, stats, contact info, and FAQs shown across the site.</p>

      <form action={updateSettings} encType="multipart/form-data" className="mt-8 space-y-10">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="font-heading text-sm font-bold text-ink">Meeting Details</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <TextField label="Venue" name="meeting_venue" defaultValue={s?.meeting_venue} />
            <TextField label="Google Maps Link" name="meeting_maps_link" type="url" defaultValue={s?.meeting_maps_link} />
            <TextField label="Meeting Time" name="meeting_time" defaultValue={s?.meeting_time} />
            <TextField label="Dress Code" name="dress_code" defaultValue={s?.dress_code} />
            <TextField label="Visitor Fee" name="visitor_fee" defaultValue={s?.visitor_fee} />
            <TextField label="UPI ID" name="upi_id" defaultValue={s?.upi_id} />
          </div>
          <div className="mt-5">
            <TextAreaField label="Bank Details" name="bank_details" defaultValue={s?.bank_details} rows={2} />
          </div>
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-ink">Payment QR Code</label>
            {s?.qr_code_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.qr_code_url} alt="" className="mb-2 h-24 w-24 rounded-lg border border-zinc-200 object-contain" />
            )}
            <input type="file" name="qr_code" accept="image/*" className="text-sm" />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="font-heading text-sm font-bold text-ink">Chapter Stats</h2>
          <p className="mt-1 text-xs text-zinc-500">Shown on the homepage once any of these are non-zero.</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <TextField label="Total Members" name="stat_total_members" type="number" defaultValue={String(s?.stat_total_members ?? "")} />
            <TextField label="Business Passed (e.g. ₹1.2 Cr+)" name="stat_business_passed" defaultValue={s?.stat_business_passed} />
            <TextField label="Total Referrals" name="stat_total_referrals" type="number" defaultValue={String(s?.stat_total_referrals ?? "")} />
            <TextField label="Visitors Hosted" name="stat_visitors_hosted" type="number" defaultValue={String(s?.stat_visitors_hosted ?? "")} />
            <TextField label="Years of Chapter" name="stat_years_chapter" type="number" defaultValue={String(s?.stat_years_chapter ?? "")} />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="font-heading text-sm font-bold text-ink">Contact & Social</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <TextField label="Phone" name="contact_phone" type="tel" defaultValue={s?.contact_phone} />
            <TextField label="Email" name="contact_email" type="email" defaultValue={s?.contact_email} />
            <TextField label="WhatsApp" name="contact_whatsapp" type="tel" defaultValue={s?.contact_whatsapp} />
            <TextField label="Instagram" name="social_instagram" type="url" defaultValue={s?.social_instagram} />
            <TextField label="Facebook" name="social_facebook" type="url" defaultValue={s?.social_facebook} />
            <TextField label="LinkedIn" name="social_linkedin" type="url" defaultValue={s?.social_linkedin} />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="font-heading text-sm font-bold text-ink">FAQs</h2>
          <p className="mt-1 text-xs text-zinc-500">Shown on the Home and Contact pages.</p>
          <div className="mt-4">
            <FaqEditor initialFaqs={s?.faqs ?? []} />
          </div>
        </section>

        <SubmitButton>Save Settings</SubmitButton>
      </form>
    </div>
  );
}
