import { supabase } from "@/lib/supabase/client";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

export default async function WhatsAppFloat() {
  const { data: settings } = await supabase
    .from("settings")
    .select("contact_whatsapp")
    .eq("id", 1)
    .maybeSingle();

  const whatsapp = settings?.contact_whatsapp;
  if (!whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
