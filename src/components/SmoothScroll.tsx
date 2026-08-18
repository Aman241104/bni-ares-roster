"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // In-app browsers (WhatsApp/Instagram) can throttle rAF and drop
    // ScrollTrigger updates, leaving .sr/.sr-stagger elements stuck
    // invisible. Sweep periodically and force-reveal anything in view.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    const forceReveal = () => {
      document.querySelectorAll<HTMLElement>(".sr, .sr-stagger > *").forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 1 && el.getBoundingClientRect().top < window.innerHeight * 1.15) {
          gsap.set(el, { opacity: 1, y: 0, x: 0 });
        }
      });
    };
    const revealInterval = window.setInterval(forceReveal, 1200);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearInterval(revealInterval);
      gsap.ticker.remove(lenisRaf);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target) {
      lenisRef.current?.scrollTo(target as HTMLElement, { immediate: true });
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
