"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Faq } from "@/types/database";

export default function FaqEditor({ initialFaqs }: { initialFaqs: Faq[] }) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs.length > 0 ? initialFaqs : [{ question: "", answer: "" }]);

  function update(index: number, key: keyof Faq, value: string) {
    setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, [key]: value } : f)));
  }

  function remove(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  function add() {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  }

  return (
    <div>
      <input type="hidden" name="faqs_json" value={JSON.stringify(faqs)} />
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => update(i, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => update(i, "answer", e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-red-50 hover:text-brand-600"
                aria-label="Remove FAQ"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-ink hover:bg-zinc-50"
      >
        <Plus size={14} /> Add Question
      </button>
    </div>
  );
}
