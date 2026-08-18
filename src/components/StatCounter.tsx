"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParsedStat {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
}

// Parses free-text admin-entered stats like "₹1.2 Cr+" or "₹120Cr+" into an
// animatable {prefix, value, suffix} so they can count up like the other
// stats instead of appearing as static text.
function parseStatValue(raw: string): ParsedStat | null {
  const match = raw.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const cleaned = numStr.replace(/,/g, "");
  const value = parseFloat(cleaned);
  if (Number.isNaN(value)) return null;
  const decimals = cleaned.includes(".") ? cleaned.split(".")[1]?.length ?? 0 : 0;
  return { prefix, value, suffix, decimals };
}

function formatStatValue(val: number, parsed: ParsedStat) {
  const num = parsed.decimals > 0 ? val.toFixed(parsed.decimals) : Math.round(val).toLocaleString("en-IN");
  return `${parsed.prefix}${num}${parsed.suffix}`;
}

// Drop-in replacement for a static stat <span> that animates free-text
// values (e.g. "₹120Cr+") the same way StatCounter animates plain numbers.
// Falls back to rendering the raw string unanimated if it can't be parsed.
export function AnimatedStatText({ raw, className }: { raw: string; className?: string }) {
  const parsed = parseStatValue(raw);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => (parsed ? formatStatValue(0, parsed) : raw));

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: parsed.value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => setDisplay(formatStatValue(obj.val, parsed)),
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  return (
    <span ref={ref} className={className}>
      {parsed ? display : raw}
    </span>
  );
}

export default function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  colorClass = "text-white",
  labelClass = "text-zinc-400",
  compact = false,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  colorClass?: string;
  labelClass?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => setDisplay(Math.round(obj.val)),
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="text-center">
      <span ref={ref} className={`font-heading text-4xl font-extrabold sm:text-5xl ${colorClass}`}>
        {prefix}
        {compact
          ? new Intl.NumberFormat("en", { notation: "compact" }).format(display).toLowerCase()
          : display.toLocaleString("en-IN")}
        {suffix}
      </span>
      <p className={`mt-2 text-sm font-medium ${labelClass}`}>{label}</p>
    </div>
  );
}
