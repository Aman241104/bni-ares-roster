"use client";
import { useRef, useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const STEP_1_FIELDS: { name: string; label: string; type: string; required?: boolean }[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "mobile", label: "Mobile", type: "tel", required: true },
  { name: "business_category", label: "Business Category", type: "text" },
  { name: "company", label: "Company", type: "text" },
];

const STEP_2_FIELDS: { name: string; label: string; type: string }[] = [
  { name: "invited_by", label: "Who Invited You", type: "text" },
  { name: "referral_interest", label: "Referral Interest", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "city", label: "City", type: "text" },
];

export default function VisitorRegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function goToStep2() {
    setError(null);
    const form = formRef.current;
    if (!form) return;
    const name = String(new FormData(form).get("name") ?? "").trim();
    const mobile = String(new FormData(form).get("mobile") ?? "").trim();
    if (!name || !mobile) {
      setError("Name and mobile number are required.");
      return;
    }
    setStep(2);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();

    if (!name || !mobile) {
      setStep(1);
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
        <p className="mt-2 text-sm text-zinc-600">We&apos;ll see you Wednesday — meeting details are on their way.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <span className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-brand-500" : "bg-zinc-200"}`} />
        <span className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-brand-500" : "bg-zinc-200"}`} />
      </div>

      <div className={step === 1 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        {STEP_1_FIELDS.map((field) => (
          <div key={field.name}>
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
      </div>

      <div className={step === 2 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        {STEP_2_FIELDS.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-ink">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Tell Us About Yourself
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

      {step === 1 ? (
        <button
          type="button"
          onClick={goToStep2}
          className="mt-6 w-full rounded-full bg-brand-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Next
        </button>
      ) : (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="rounded-full border border-zinc-200 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-zinc-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-full bg-brand-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Registration"}
          </button>
        </div>
      )}
    </form>
  );
}
