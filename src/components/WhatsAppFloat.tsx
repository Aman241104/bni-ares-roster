import { supabase } from "@/lib/supabase/client";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

export default async function WhatsAppFloat() {
  const { data: settings } = await supabase
    .from("settings")
    .select("contact_whatsapp")
    .eq("id", 1)
    .maybeSingle();

  const whatsapp = settings?.contact_whatsapp;
  if (!whatsapp) return null;

  return <WhatsAppFloatButton whatsapp={whatsapp} />;
}
