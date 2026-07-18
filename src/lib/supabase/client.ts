import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Safe for both server components and the browser — uses the anon key,
// so RLS policies (public read on active rows, public insert on
// registrations/messages) are what actually enforce access, not this client.
export const supabase = createClient(url, anonKey);
