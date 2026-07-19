import Link from "next/link";
import { Plus } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import Avatar from "@/components/Avatar";
import { DeleteButton, ToggleStatusButton, MoveButton } from "@/components/admin/RowActions";
import { deleteMember, toggleMemberStatus, moveMember } from "./actions";
import type { Member } from "@/types/database";

export default async function AdminMembersPage() {
  const { data } = await supabaseAdmin.from("members").select("*").order("display_order");
  const members = (data as Member[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Members</h1>
          <p className="mt-1 text-sm text-zinc-500">{members.length} total</p>
        </div>
        <Link
          href="/admin/members/new"
          className="flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          <Plus size={16} /> Add Member
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {members.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">No members yet — add the first one.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-100">
              {members.map((m) => (
                <tr key={m.id} className={m.status === "hidden" ? "opacity-50" : ""}>
                  <td className="w-14 p-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-100">
                      <Avatar name={m.name} photoUrl={m.photo_url} />
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-ink">{m.name}</p>
                    <p className="text-xs text-zinc-500">{m.company}</p>
                  </td>
                  <td className="p-3 text-zinc-500">{m.business_category}</td>
                  <td className="w-40 p-3">
                    <div className="flex items-center justify-end gap-1">
                      <form action={moveMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="direction" value="up" />
                        <MoveButton direction="up" />
                      </form>
                      <form action={moveMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="direction" value="down" />
                        <MoveButton direction="down" />
                      </form>
                      <form action={toggleMemberStatus}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="status" value={m.status} />
                        <ToggleStatusButton status={m.status} />
                      </form>
                      <Link
                        href={`/admin/members/${m.id}`}
                        className="flex h-8 items-center rounded-lg px-2 text-xs font-semibold text-brand-600 hover:bg-brand-50"
                      >
                        Edit
                      </Link>
                      <form action={deleteMember}>
                        <input type="hidden" name="id" value={m.id} />
                        <DeleteButton confirmLabel={`Delete ${m.name}? This can't be undone.`} />
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
