import { supabaseAdmin } from "@/lib/supabase/server";
import type { VisitorRegistration } from "@/types/database";

function csvEscape(value: string | number | null) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function GET() {
  const { data } = await supabaseAdmin
    .from("visitor_registrations")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data as VisitorRegistration[] | null) ?? [];

  const headers = [
    "Name",
    "Company",
    "Business Category",
    "Mobile",
    "Email",
    "City",
    "Invited By",
    "Referral Interest",
    "Message",
    "Status",
    "Registered At",
  ];

  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.name,
        r.company,
        r.business_category,
        r.mobile,
        r.email,
        r.city,
        r.invited_by,
        r.referral_interest,
        r.message,
        r.status,
        r.created_at,
      ]
        .map(csvEscape)
        .join(",")
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="visitor-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
