"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/types/database";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function MembersDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [letter, setLetter] = useState("");

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
      const matchesLetter = !letter || m.name.toUpperCase().startsWith(letter);
      return matchesQuery && matchesCategory && matchesLetter;
    });
  }, [members, query, category, letter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or company…"
            className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm outline-none ring-brand-500 focus:ring-2"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-brand-500 focus:ring-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        <button
          onClick={() => setLetter("")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            letter === "" ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          All
        </button>
        {ALPHABET.map((l) => (
          <button
            key={l}
            onClick={() => setLetter(l === letter ? "" : l)}
            className={`h-8 w-8 rounded-full text-xs font-semibold ${
              letter === l ? "bg-brand-500 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        {filtered.length} member{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 py-16 text-center text-zinc-500">
          {members.length === 0 ? "No members yet — check back soon." : "No members match your search."}
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
