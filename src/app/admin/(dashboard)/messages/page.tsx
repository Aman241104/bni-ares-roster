import { supabaseAdmin } from "@/lib/supabase/server";
import { DeleteButton, MarkContactedButton } from "@/components/admin/RowActions";
import { toggleMessageStatus, deleteMessage } from "./actions";
import type { ContactMessage } from "@/types/database";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { data } = await supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false });
  let messages = (data as ContactMessage[] | null) ?? [];

  if (q?.trim()) {
    const query = q.trim().toLowerCase();
    messages = messages.filter(
      (m) => m.name.toLowerCase().includes(query) || (m.email ?? "").toLowerCase().includes(query)
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Messages</h1>
      <p className="mt-1 text-sm text-zinc-500">{messages.length} total</p>

      <form className="mt-6">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name or email…"
          className="w-full max-w-sm rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2"
        />
      </form>

      <div className="mt-6 space-y-3">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">
            No messages yet.
          </p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`rounded-2xl border border-zinc-200 bg-white p-5 ${m.status === "contacted" ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-ink">{m.name}</p>
                  <p className="text-xs text-zinc-500">
                    {[m.email, m.phone].filter(Boolean).join(" · ")} · {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <form action={toggleMessageStatus}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="status" value={m.status} />
                    <MarkContactedButton status={m.status} />
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <DeleteButton confirmLabel={`Delete ${m.name}'s message?`} />
                  </form>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-zinc-600">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
