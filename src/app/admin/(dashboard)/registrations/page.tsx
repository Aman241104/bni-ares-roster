import { Download } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import { DeleteButton, MarkContactedButton } from "@/components/admin/RowActions";
import { toggleRegistrationStatus, deleteRegistration } from "./actions";
import type { VisitorRegistration } from "@/types/database";

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { data } = await supabaseAdmin.from("visitor_registrations").select("*").order("created_at", { ascending: false });
  let registrations = (data as VisitorRegistration[] | null) ?? [];

  if (q?.trim()) {
    const query = q.trim().toLowerCase();
    registrations = registrations.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        (r.company ?? "").toLowerCase().includes(query) ||
        r.mobile.includes(query)
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Visitor Registrations</h1>
          <p className="mt-1 text-sm text-zinc-500">{registrations.length} total</p>
        </div>
        <a
          href="/admin/registrations/export"
          className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-zinc-50"
        >
          <Download size={15} /> Export CSV
        </a>
      </div>

      <form className="mt-6">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name, company, or mobile…"
          className="w-full max-w-sm rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2"
        />
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
        {registrations.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">No registrations yet.</p>
        ) : (
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-left text-xs uppercase tracking-wide text-zinc-400">
                <th className="p-3">Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Invited By</th>
                <th className="p-3">Date</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {registrations.map((r) => (
                <tr key={r.id} className={r.status === "contacted" ? "opacity-60" : ""}>
                  <td className="p-3">
                    <p className="font-medium text-ink">{r.name}</p>
                    <p className="text-xs text-zinc-500">{r.business_category}</p>
                  </td>
                  <td className="p-3 text-zinc-600">{r.company}</td>
                  <td className="p-3 text-zinc-600">{r.mobile}</td>
                  <td className="p-3 text-zinc-600">{r.invited_by}</td>
                  <td className="p-3 text-zinc-500">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <form action={toggleRegistrationStatus}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="status" value={r.status} />
                        <MarkContactedButton status={r.status} />
                      </form>
                      <form action={deleteRegistration}>
                        <input type="hidden" name="id" value={r.id} />
                        <DeleteButton confirmLabel={`Delete ${r.name}'s registration?`} />
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
