import { supabase } from "@/lib/supabase/client";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

export default async function CreditStrip() {
  const { data: settings } = await supabase
    .from("settings")
    .select("contact_whatsapp")
    .eq("id", 1)
    .maybeSingle();

  const whatsapp = settings?.contact_whatsapp;

  return (
    <div className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 py-2.5 text-xs text-zinc-500 sm:px-8">
        <span>Designed and developed by Gravity Media Marketing</span>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Gravity Media Marketing on WhatsApp"
            title="Chat on WhatsApp"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366]/90 text-white transition-colors hover:bg-[#25D366]"
          >
            <WhatsAppIcon size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
