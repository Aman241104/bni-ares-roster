import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import MemberForm from "@/components/admin/MemberForm";
import { updateMember } from "../actions";
import type { Member } from "@/types/database";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin.from("members").select("*").eq("id", id).maybeSingle();
  const member = data as Member | null;
  if (!member) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-ink">Edit {member.name}</h1>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
        <MemberForm member={member} action={updateMember} />
      </div>
    </div>
  );
}
