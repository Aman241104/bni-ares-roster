"use client";
import { useState } from "react";
import CoordinatorCard from "@/components/CoordinatorCard";
import type { Coordinator } from "@/types/database";
import Reveal from "@/components/Reveal";

export default function CoordinatorTabs({
  mcCommittee,
  extendedLeadership,
  visitorHosts,
}: {
  mcCommittee: Coordinator[];
  extendedLeadership: Coordinator[];
  visitorHosts: Coordinator[];
}) {
  const [activeTab, setActiveTab] = useState<"mc" | "elt" | "vh">("mc");

  const getActiveCoordinators = () => {
    if (activeTab === "mc") return mcCommittee;
    if (activeTab === "elt") return extendedLeadership;
    return visitorHosts;
  };

  const activeCoordinators = getActiveCoordinators();

  return (
    <div>
      <div role="tablist" className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <button
          role="tab"
          aria-selected={activeTab === "mc"}
          aria-controls="panel-mc"
          id="tab-mc"
          onClick={() => setActiveTab("mc")}
          className={`rounded-full px-6 py-3 text-sm font-bold transition-colors ${
            activeTab === "mc" ? "bg-brand-500 text-white shadow-lg" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          Membership Committee
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "elt"}
          aria-controls="panel-elt"
          id="tab-elt"
          onClick={() => setActiveTab("elt")}
          className={`rounded-full px-6 py-3 text-sm font-bold transition-colors ${
            activeTab === "elt" ? "bg-brand-500 text-white shadow-lg" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          Extended Leadership Team
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "vh"}
          aria-controls="panel-vh"
          id="tab-vh"
          onClick={() => setActiveTab("vh")}
          className={`rounded-full px-6 py-3 text-sm font-bold transition-colors ${
            activeTab === "vh" ? "bg-brand-500 text-white shadow-lg" : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          Visitor Host Team
        </button>
      </div>

      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {activeCoordinators.length > 0 ? (
          activeCoordinators.map((coordinator, idx) => (
            <Reveal key={coordinator.id} delay={idx * 0.1}>
              <CoordinatorCard coordinator={coordinator} />
            </Reveal>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-zinc-500 border border-dashed border-zinc-300 rounded-2xl">
            No coordinators assigned to this team yet.
          </div>
        )}
      </div>
    </div>
  );
}
