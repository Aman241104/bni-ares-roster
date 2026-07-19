import CoordinatorForm from "@/components/admin/CoordinatorForm";
import { createCoordinator } from "../actions";

export default function NewCoordinatorPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-ink">Add Coordinator</h1>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
        <CoordinatorForm action={createCoordinator} />
      </div>
    </div>
  );
}
