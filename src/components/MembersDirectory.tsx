"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, RotateCcw, ChevronDown } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/types/database";

export default function MembersDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [designation, setDesignation] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = useMemo(
    () => Array.from(new Set(members.map((m) => m.business_category).filter(Boolean))) as string[],
    [members]
  );

  const designations = useMemo(
    () => Array.from(new Set(members.map((m) => m.designation).filter(Boolean))) as string[],
    [members]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const matchesQuery =
        !q || m.name.toLowerCase().includes(q) || (m.company ?? "").toLowerCase().includes(q);
      const matchesCategory = !category || m.business_category === category;
      const matchesDesignation = !designation || m.designation === designation;
      return matchesQuery && matchesCategory && matchesDesignation;
    });
  }, [members, query, category, designation]);

  const visibleMembers = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setDesignation("");
    setVisibleCount(8);
  };

  return (
    <div id="directory" className="w-full scroll-mt-24">
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              aria-label="Search members"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisibleCount(8); }}
              placeholder="Search members..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-11 pr-4 text-sm outline-none ring-brand-500 focus:ring-2 transition-shadow"
            />
          </div>
          
          <div className="relative">
            <select
              aria-label="Filter by category"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setVisibleCount(8); }}
              className="appearance-none w-full md:w-auto min-w-48 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-4 pr-10 text-sm outline-none ring-brand-500 focus:ring-2 transition-shadow text-zinc-700 font-medium cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>

          <div className="relative">
            <select
              aria-label="Filter by designation"
              value={designation}
              onChange={(e) => { setDesignation(e.target.value); setVisibleCount(8); }}
              className="appearance-none w-full md:w-auto min-w-48 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-4 pr-10 text-sm outline-none ring-brand-500 focus:ring-2 transition-shadow text-zinc-700 font-medium cursor-pointer"
            >
              <option value="">All Designations</option>
              {designations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-brand-500 transition-colors px-4 py-2 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
        >
          <RotateCcw size={16} /> Reset Filters
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
          <p className="font-heading text-lg font-bold text-ink">No Members Found</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
            {members.length === 0
              ? "Didn't find what you were looking for? Visit our next meeting and meet our members personally."
              : "No one matches that search. Try adjusting your filters."}
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-500 text-brand-500 px-8 py-3 text-sm font-bold transition-colors hover:bg-brand-500 hover:text-white"
              >
                Load More Members
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
