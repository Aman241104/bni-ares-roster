"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
