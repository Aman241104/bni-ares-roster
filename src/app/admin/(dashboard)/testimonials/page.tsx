import { supabaseAdmin } from "@/lib/supabase/server";
import { TextField, TextAreaField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import { DeleteButton, ToggleStatusButton, MoveButton } from "@/components/admin/RowActions";
import { createTestimonial, deleteTestimonial, toggleTestimonialStatus, moveTestimonial } from "./actions";
import type { Testimonial } from "@/types/database";

export default async function AdminTestimonialsPage() {
  const { data } = await supabaseAdmin.from("testimonials").select("*").order("display_order");
  const testimonials = (data as Testimonial[] | null) ?? [];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Testimonials</h1>
      <p className="mt-1 text-sm text-zinc-500">{testimonials.length} total — shown in the &quot;Hear From Our Members&quot; section on the home page.</p>

      <div className="mt-6 max-w-lg rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-heading text-sm font-bold text-ink">Add Testimonial</h2>
        <form action={createTestimonial} className="mt-4 space-y-4">
          <TextField label="Member Name" name="member_name" required />
          <TextField label="Company" name="company" />
          <TextAreaField label="Quote" name="quote_text" required rows={3} />
          <SubmitButton>Add Testimonial</SubmitButton>
        </form>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {testimonials.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">No testimonials yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-100">
              {testimonials.map((t) => (
                <tr key={t.id} className={t.status === "hidden" ? "opacity-50" : ""}>
                  <td className="p-3">
                    <p className="font-medium text-ink">{t.member_name}</p>
                    {t.company && <p className="text-xs text-zinc-500">{t.company}</p>}
                    <p className="mt-1 max-w-md text-xs italic text-zinc-500">&ldquo;{t.quote_text}&rdquo;</p>
                  </td>
                  <td className="w-40 p-3">
                    <div className="flex items-center justify-end gap-1">
                      <form action={moveTestimonial}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="direction" value="up" />
                        <MoveButton direction="up" />
                      </form>
                      <form action={moveTestimonial}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="direction" value="down" />
                        <MoveButton direction="down" />
                      </form>
                      <form action={toggleTestimonialStatus}>
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="status" value={t.status} />
                        <ToggleStatusButton status={t.status} />
                      </form>
                      <form action={deleteTestimonial}>
                        <input type="hidden" name="id" value={t.id} />
                        <DeleteButton confirmLabel={`Delete this testimonial from ${t.member_name}? This can't be undone.`} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
