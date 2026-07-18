"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/types/database";

export default function MembersDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(members.map((m) => m.business_category).filter(Boolean))) as string[],
    [members]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const matchesQuery =
        !q || m.name.toLowerCase().includes(q) || (m.company ?? "").toLowerCase().includes(q);
      const matchesCategory = !category || m.business_category === category;
      return matchesQuery && matchesCategory;
    });
  }, [members, query, category]);

  return (
    <div>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or company…"
          className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm outline-none ring-brand-500 focus:ring-2"
        />
      </div>

      {categories.length > 0 && (
        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Who Are You Looking For?
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category === "" ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c === category ? "" : c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  category === c ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-sm text-zinc-500">
        {filtered.length} member{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
          <p className="font-heading text-lg font-bold text-ink">No Members Found</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
            {members.length === 0
              ? "Didn't find what you were looking for? Visit our next meeting and meet our members personally."
              : "No one matches that search. Try a different name, company, or category — or come meet everyone in person."}
          </p>
          <Link
            href="/visitor"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Register As Visitor
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
