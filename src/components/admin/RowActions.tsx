"use client";
import { useFormStatus } from "react-dom";
import { Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Check, RotateCcw } from "lucide-react";

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-40";

export function DeleteButton({ confirmLabel = "Delete this? This can't be undone." }: { confirmLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(confirmLabel)) e.preventDefault();
      }}
      className={`${iconBtn} hover:bg-red-50 hover:text-brand-600`}
      aria-label="Delete"
      title="Delete"
    >
      <Trash2 size={15} />
    </button>
  );
}

export function ToggleStatusButton({ status }: { status: "active" | "hidden" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={iconBtn}
      aria-label={status === "active" ? "Hide" : "Show"}
      title={status === "active" ? "Hide from site" : "Show on site"}
    >
      {status === "active" ? <Eye size={15} /> : <EyeOff size={15} className="text-zinc-300" />}
    </button>
  );
}

export function MarkContactedButton({ status }: { status: "new" | "contacted" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        status === "new" ? "bg-brand-50 text-brand-700 hover:bg-brand-100" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
      }`}
    >
      {status === "new" ? <Check size={13} /> : <RotateCcw size={13} />}
      {status === "new" ? "Mark Contacted" : "Mark New"}
    </button>
  );
}

export function MoveButton({ direction }: { direction: "up" | "down" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={iconBtn} aria-label={`Move ${direction}`} title={`Move ${direction}`}>
      {direction === "up" ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
    </button>
  );
}
