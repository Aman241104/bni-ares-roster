import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// service_role bypasses RLS entirely — never import this into a client
// component or an API route that isn't behind the admin auth check.
// Reserved for the Phase 2 admin panel; unused until then.
export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});
