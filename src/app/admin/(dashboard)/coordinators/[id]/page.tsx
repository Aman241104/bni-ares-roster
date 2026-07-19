import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import CoordinatorForm from "@/components/admin/CoordinatorForm";
import { updateCoordinator } from "../actions";
import type { Coordinator } from "@/types/database";

export default async function EditCoordinatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin.from("coordinators").select("*").eq("id", id).maybeSingle();
  const coordinator = data as Coordinator | null;
  if (!coordinator) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-ink">Edit {coordinator.name}</h1>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
        <CoordinatorForm coordinator={coordinator} action={updateCoordinator} />
      </div>
    </div>
  );
}
