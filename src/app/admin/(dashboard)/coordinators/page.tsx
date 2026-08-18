import Link from "next/link";
import { Plus } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import Avatar from "@/components/Avatar";
import { DeleteButton, ToggleStatusButton, MoveButton } from "@/components/admin/RowActions";
import { deleteCoordinator, toggleCoordinatorStatus, moveCoordinator } from "./actions";
import type { Coordinator, CoordinatorTeam } from "@/types/database";

const TEAM_LABELS: Record<CoordinatorTeam, string> = {
  lt_team: "Leadership Team",
  mc_committee: "MC Committee",
  extended_leadership: "Extended Leadership Team",
  visitor_host: "Visitor Host Team",
  chapter_coordinator: "Chapter Coordinators",
};

export default async function AdminCoordinatorsPage() {
  const { data } = await supabaseAdmin.from("coordinators").select("*").order("display_order");
  const coordinators = (data as Coordinator[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Coordinators</h1>
          <p className="mt-1 text-sm text-zinc-500">{coordinators.length} total</p>
        </div>
        <Link
          href="/admin/coordinators/new"
          className="flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          <Plus size={16} /> Add Coordinator
        </Link>
      </div>

      <div className="mt-8 space-y-10">
        {(Object.keys(TEAM_LABELS) as CoordinatorTeam[]).map((team) => {
          const rows = coordinators.filter((c) => c.team === team);
          return (
            <div key={team}>
              <h2 className="font-heading text-base font-bold text-ink">{TEAM_LABELS[team]}</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                {rows.length === 0 ? (
                  <p className="p-6 text-center text-sm text-zinc-500">No one added yet.</p>
                ) : (
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-zinc-100">
                      {rows.map((c) => (
                        <tr key={c.id} className={c.status === "hidden" ? "opacity-50" : ""}>
                          <td className="w-14 p-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-100">
                              <Avatar name={c.name} photoUrl={c.photo_url} />
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="font-medium text-ink">{c.name}</p>
                            <p className="text-xs text-zinc-500">{c.position}</p>
                          </td>
                          <td className="w-40 p-3">
                            <div className="flex items-center justify-end gap-1">
                              <form action={moveCoordinator}>
                                <input type="hidden" name="id" value={c.id} />
                                <input type="hidden" name="team" value={c.team} />
                                <input type="hidden" name="direction" value="up" />
                                <MoveButton direction="up" />
                              </form>
                              <form action={moveCoordinator}>
                                <input type="hidden" name="id" value={c.id} />
                                <input type="hidden" name="team" value={c.team} />
                                <input type="hidden" name="direction" value="down" />
                                <MoveButton direction="down" />
                              </form>
                              <form action={toggleCoordinatorStatus}>
                                <input type="hidden" name="id" value={c.id} />
                                <input type="hidden" name="status" value={c.status} />
                                <ToggleStatusButton status={c.status} />
                              </form>
                              <Link
                                href={`/admin/coordinators/${c.id}`}
                                className="flex h-8 items-center rounded-lg px-2 text-xs font-semibold text-brand-600 hover:bg-brand-50"
                              >
                                Edit
                              </Link>
                              <form action={deleteCoordinator}>
                                <input type="hidden" name="id" value={c.id} />
                                <DeleteButton confirmLabel={`Delete ${c.name}? This can't be undone.`} />
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
        })}
      </div>
    </div>
  );
}
