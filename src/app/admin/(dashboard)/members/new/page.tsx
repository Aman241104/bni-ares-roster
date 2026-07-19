import MemberForm from "@/components/admin/MemberForm";
import { createMember } from "../actions";

export default function NewMemberPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-ink">Add Member</h1>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
        <MemberForm action={createMember} />
      </div>
    </div>
  );
}
