"use client";
import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !message) {
      setError("Name and message are required.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name,
      email: form.get("email") || null,
      phone: form.get("phone") || null,
      message,
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
        <CheckCircle2 className="mx-auto text-brand-500" size={36} />
        <h3 className="mt-4 font-heading text-base font-bold text-ink">Message Sent</h3>
        <p className="mt-2 text-sm text-zinc-600">We&apos;ll get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name <span className="text-brand-500">*</span>
          </label>
          <input id="name" name="name" type="text" required className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
            <input id="email" name="email" type="email" className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2" />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">Phone</label>
            <input id="phone" name="phone" type="tel" className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Message <span className="text-brand-500">*</span>
          </label>
          <textarea id="message" name="message" rows={4} required className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2" />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-brand-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-brand-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
