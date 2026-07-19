import { supabaseAdmin } from "@/lib/supabase/server";
import { TextField } from "@/components/admin/FormField";
import SubmitButton from "@/components/admin/SubmitButton";
import { DeleteButton, ToggleStatusButton, MoveButton } from "@/components/admin/RowActions";
import { createSponsor, deleteSponsor, toggleSponsorStatus, moveSponsor } from "./actions";
import type { Sponsor } from "@/types/database";

export default async function AdminSponsorsPage() {
  const { data } = await supabaseAdmin.from("sponsors").select("*").order("priority");
  const sponsors = (data as Sponsor[] | null) ?? [];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Sponsors</h1>
      <p className="mt-1 text-sm text-zinc-500">{sponsors.length} total</p>

      <div className="mt-6 max-w-lg rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="font-heading text-sm font-bold text-ink">Add Sponsor</h2>
        <form action={createSponsor} encType="multipart/form-data" className="mt-4 space-y-4">
          <TextField label="Name" name="name" required />
          <TextField label="Website" name="website_url" type="url" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Logo</label>
            <input type="file" name="logo" accept="image/*" className="text-sm" />
          </div>
          <SubmitButton>Add Sponsor</SubmitButton>
        </form>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {sponsors.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">No sponsors yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-100">
              {sponsors.map((s) => (
                <tr key={s.id} className={s.status === "hidden" ? "opacity-50" : ""}>
                  <td className="w-16 p-3">
                    {s.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.logo_url} alt="" className="h-10 w-10 rounded-lg object-contain" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-zinc-100" />
                    )}
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-ink">{s.name}</p>
                    <p className="text-xs text-zinc-500">{s.website_url}</p>
                  </td>
                  <td className="w-40 p-3">
                    <div className="flex items-center justify-end gap-1">
                      <form action={moveSponsor}>
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="direction" value="up" />
                        <MoveButton direction="up" />
                      </form>
                      <form action={moveSponsor}>
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="direction" value="down" />
                        <MoveButton direction="down" />
                      </form>
                      <form action={toggleSponsorStatus}>
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="status" value={s.status} />
                        <ToggleStatusButton status={s.status} />
                      </form>
                      <form action={deleteSponsor}>
                        <input type="hidden" name="id" value={s.id} />
                        <DeleteButton confirmLabel={`Delete ${s.name}? This can't be undone.`} />
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
