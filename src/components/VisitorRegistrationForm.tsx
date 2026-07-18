"use client";
import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const FIELDS: { name: string; label: string; type: string; required?: boolean }[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "company", label: "Company", type: "text" },
  { name: "business_category", label: "Business Category", type: "text" },
  { name: "mobile", label: "Mobile", type: "tel", required: true },
  { name: "email", label: "Email", type: "email" },
  { name: "city", label: "City", type: "text" },
  { name: "invited_by", label: "Who Invited You", type: "text" },
  { name: "referral_interest", label: "Referral Interest", type: "text" },
];

export default function VisitorRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();

    if (!name || !mobile) {
      setError("Name and mobile number are required.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("visitor_registrations").insert({
      name,
      company: form.get("company") || null,
      business_category: form.get("business_category") || null,
      mobile,
      email: form.get("email") || null,
      city: form.get("city") || null,
      invited_by: form.get("invited_by") || null,
      referral_interest: form.get("referral_interest") || null,
      message: form.get("message") || null,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong — please try again.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto text-brand-500" size={40} />
        <h3 className="mt-4 font-heading text-lg font-bold text-ink">You&apos;re Registered!</h3>
        <p className="mt-2 text-sm text-zinc-600">
          Thanks for registering as a visitor — we&apos;ll be in touch with the meeting details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.name === "referral_interest" ? "sm:col-span-2" : ""}>
            <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-ink">
              {field.label}
              {field.required && <span className="text-brand-500"> *</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-brand-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-brand-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit Registration"}
      </button>
    </form>
  );
}
