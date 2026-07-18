# BNI Ares — Chapter Roster

Public-facing chapter site for BNI Ares — member directory, coordinators, visitor registration, gallery, and contact. Next.js 16 + Tailwind 4 + Supabase.

See `AGENTS.md` for the full project brief, database schema, build status, and deploy instructions.

## Setup

```bash
npm install
npm run dev
```

Requires `.env.local` with Supabase credentials (see `AGENTS.md` → Credentials / Env Vars).

## Database

Schema and seed data live in `supabase/migrations/` and `supabase/seed/` — run manually in the Supabase SQL Editor (see `AGENTS.md` → Deploy Commands).
