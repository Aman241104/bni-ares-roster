"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types/database";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-ink">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && <p className="px-6 pb-5 text-sm text-zinc-600">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
