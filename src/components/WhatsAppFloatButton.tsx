"use client";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

// Hidden for the first screenful so it never sits on top of a hero CTA
// (every hero section is roughly one viewport tall) — fades in once the
// visitor has actually started scrolling the page.
export default function WhatsAppFloatButton({ whatsapp }: { whatsapp: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
