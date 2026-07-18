import Avatar from "@/components/Avatar";
import ContactButtons from "@/components/ContactButtons";
import type { Coordinator } from "@/types/database";

export default function CoordinatorCard({ coordinator }: { coordinator: Coordinator }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
        <Avatar name={coordinator.name} photoUrl={coordinator.photo_url} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div>
          <h3 className="font-heading text-base font-bold text-ink">{coordinator.name}</h3>
          {coordinator.position && <p className="text-sm font-medium text-brand-600">{coordinator.position}</p>}
          {coordinator.company && <p className="text-sm text-zinc-500">{coordinator.company}</p>}
        </div>
        {coordinator.responsibilities && (
          <p className="line-clamp-2 text-sm text-zinc-500">{coordinator.responsibilities}</p>
        )}
        <div className="mt-auto pt-2">
          <ContactButtons
            phone={coordinator.phone}
            email={coordinator.email}
            linkedin={coordinator.linkedin}
            instagram={coordinator.instagram}
            facebook={coordinator.facebook}
          />
        </div>
      </div>
    </div>
  );
}
