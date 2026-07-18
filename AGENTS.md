<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# BNI Ares Chapter Roster — Agent Brief

## What This Project Is
Chapter roster/marketing site for **BNI Ares** (a BNI business networking chapter — not to be confused with the sibling `ares-web` project, which is "ARES Business League 2026," an unrelated one-month BNI tournament site built by Gravity Media Marketing). This project has its own Supabase backend, its own repo, and no relation to `ares-web` beyond the coincidental "Ares" name.

Commissioned by Gaurav Mehta (manager) via WhatsApp brief on 2026-07-18, relayed by Aman Patel. Built in three phases (see Feature Backlog) — **this build covers Phase 1 only: the public-facing site + DB schema.** No admin panel and no email-on-registration yet.

## Stack
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.10 (App Router, Turbopack) | Same breaking-changes caveat as above — check `node_modules/next/dist/docs/` before assuming an API |
| UI | React 19 + Tailwind 4 + lucide-react | Manrope (headings) + Inter (body) fonts, white bg + BNI red (`--color-brand-500 #c8102e`) + ink black, glassmorphism (`.glass`/`.glass-dark` in `globals.css`) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll) | `<Reveal>` component wraps scroll-triggered fade-ins (`.sr`/`.sr-stagger` classes); `SmoothScroll.tsx` ported from `ares-web` including its WhatsApp-webview reveal fallback |
| Data | Supabase Postgres | See Database Schema below. RLS enforces public read (active rows only) + public insert (registrations/messages only) — no admin write path built yet |
| Deploy | Vercel | Not yet deployed as of this writing — see Deploy Commands |

**Brand icons gotcha:** `lucide-react` v1.x dropped Instagram/Facebook/LinkedIn (trademarked logos). Custom SVGs live in `src/components/icons/BrandIcons.tsx` — use those, don't try to import brand icons from lucide-react.

## Credentials / Env Vars
`.env.local` (gitignored, never commit):
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, safe for client and server code
- `SUPABASE_SERVICE_ROLE_KEY` — server-only (`src/lib/supabase/server.ts`, guarded by `server-only` package), bypasses RLS entirely, **reserved for Phase 2 admin panel, unused so far**
- `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` — placeholders for Phase 2, not wired to anything yet

Supabase project (`ijmyvtnyytehjxprpwdc`) is **not connected to this session's Supabase MCP tools** — it belongs to a different account than the ones visible via `list_projects` (`prihaan-spices`, `mehtatechteam@gmail.com's Project`, `Aman241104's Project`). Schema/seed changes go through hand-written SQL files that a human runs in the Supabase SQL Editor — see Deploy Commands.

## Architecture
```
Browser ──(anon key, RLS-gated)──> Supabase Postgres
   │
   ├─ Server Components (page.tsx files) fetch data server-side via src/lib/supabase/client.ts
   ├─ Client Components (forms) insert directly via the same anon client —
   │    RLS "public insert" policies on visitor_registrations / contact_messages
   │    allow this without any API route or service_role key
   └─ src/lib/supabase/server.ts (service_role) exists but is UNUSED until
        Phase 2's admin panel needs to bypass RLS for writes/moderation
```
No custom backend server — everything server-side is Next.js Server Components + (future) Route Handlers.

## File Map
```
src/app/
  layout.tsx              — root layout, fonts, Navbar/Footer/SmoothScroll wiring
  page.tsx                — Home (hero, about, stats, why-visit, sponsors, FAQ)
  sitemap.ts / robots.ts  — SEO
  members/page.tsx        — directory (server fetch + MembersDirectory client component)
  members/[id]/page.tsx   — member profile
  coordinators/page.tsx   — 4 team groups (lt_team/mc_committee/visitor_host/chapter_coordinator)
  visitor/page.tsx        — visitor landing + meeting details + registration form
  gallery/page.tsx        — album grid (server fetch + GalleryGrid client component)
  contact/page.tsx        — contact cards + FAQ + contact form
src/components/           — MemberCard, CoordinatorCard, ContactButtons, Avatar (initials
                             fallback when no photo_url), Reveal, StatCounter, FaqAccordion,
                             VisitorRegistrationForm, ContactForm, GalleryGrid, Navbar, Footer
src/components/icons/BrandIcons.tsx — Instagram/Facebook/LinkedIn (see gotcha above)
src/lib/supabase/         — client.ts (anon, browser+server-safe), server.ts (service_role, unused)
src/types/database.ts     — hand-written types mirroring the SQL schema (no generated types yet)
supabase/migrations/0001_init.sql — full schema + RLS, run manually in SQL Editor
supabase/seed/seed.sql    — placeholder demo data, run manually after the migration
```

## Database Schema
See `supabase/migrations/0001_init.sql` for the authoritative source. Tables: `members`, `coordinators` (team enum: lt_team/mc_committee/visitor_host/chapter_coordinator), `sponsors`, `gallery_albums` (category enum: meetings/business_events/visitor_days/socials/fun_events/kym) + `gallery_images`, `visitor_registrations`, `contact_messages`, `settings` (single row, id=1 — meeting details, stats, contact info, FAQs as jsonb).

`contact_messages` isn't in the original brief's DB structure list (only `members`/`coordinators`/`sponsors`/`gallery`/`visitor_registrations` were specified) — added because the Contact page's brief explicitly asks for a "Contact Form" with no other storage mechanism given. Confirmed with the requester.

## Build Status
- [x] Project scaffolded (Next.js 16 + Tailwind 4 + Supabase client)
- [x] DB schema + RLS policies written (`0001_init.sql`) — **not yet applied to the live Supabase project**, needs a human to run it in the SQL Editor
- [x] Placeholder seed data written (`seed.sql`) — same caveat, not yet applied
- [x] Home, Members Directory, Member Profile, Coordinators, Visitor Invite (landing + working registration form), Gallery, Contact — all built and passing `npm run build` / `npm run lint`
- [x] Visitor registration form — inserts directly to `visitor_registrations` via RLS, shows success screen. **No email notification** (that needs an email service decision, deferred)
- [x] Contact form — inserts to `contact_messages` via RLS, shows success screen
- [x] Manual browser QA pass (desktop + mobile, hamburger menu, scroll-reveal) via Playwright — see Handoff below
- [ ] Admin panel (Phase 2 — not started: auth, CRUD for members/coordinators/sponsors/gallery/settings, visitor registration management)
- [ ] Email notification on visitor registration (Phase 3 — deferred by requester, "badme")
- [ ] Real chapter content (members, coordinators, stats, logo, meeting details) — pending a PPT from the chapter, currently placeholder/empty
- [ ] "Download Visiting Card" on member profile — brief marks this optional, not built
- [ ] Domain — requester said decide later ("Last mai dekh lenge")

## Critical Gotchas
- **Scroll-reveal elements start at `opacity: 0`** (`.sr`/`.sr-stagger` in `globals.css`, animated by `<Reveal>`). A full-page Playwright screenshot taken without scrolling first will show blank sections below the fold — this is expected animate-on-scroll behavior, not a bug. Scroll the page (or wait) before screenshotting for QA.
- **lucide-react v1 has no brand icons** — see Stack section above.
- **DB schema doesn't exist on the live Supabase project yet.** All pages defensively treat Supabase errors as empty data (`(data as X | null) ?? []`), so the site builds and renders empty-state UI fine either way — but nothing will show real content until the migration + seed SQL are run.
- **`service_role` key is in `.env.local` in plaintext** (came from the requester via chat). Never import `src/lib/supabase/server.ts` into client code. Consider rotating the key in the Supabase dashboard once this project is stable, since it passed through a chat transcript.
- **Gallery/sponsor/coordinator/member photos are all placeholder-free right now** — `Avatar.tsx` renders colored initials when `photo_url` is null instead of a fake stock photo, per the no-placeholder-content design rule. Real photo upload lands in Phase 2's admin panel.

## Known Issues / Bugs
None currently open — `npm run build` and `npm run lint` both pass clean as of this writing.

## Feature Backlog
**Phase 2 — Admin Panel** (next up): single shared admin login (per requester — no per-coordinator accounts), CRUD + show/hide + reorder for members/coordinators/sponsors/gallery, settings editor (meeting details, stats, FAQs, QR code/UPI), visitor registration + contact message inbox (search, mark contacted, export CSV, delete).

**Phase 3 — Registration wiring** (deferred by requester): email notification to admin on new visitor registration — needs an email service decision (Resend/Google Workspace/etc.) not yet made.

**Content backlog** (blocked on a PPT from the chapter, not yet received): real member list + photos, coordinator lists (LT Team ×3, MC Committee ×12, Visitor Host ×10, Chapter Coordinators ×12), real chapter stats, sponsor logos, gallery photos, logo/brand colors (requester said "no brand guideline, BNI logo photo from google" — currently using generic BNI red `#c8102e` + black, no actual logo file), meeting venue/fee/QR/UPI/bank details, contact info, FAQs, visitor testimonials, domain name.

## Design System
- Colors: `--color-brand-500 #c8102e` (BNI red) + `--color-ink #0a0a0a` (near-black) + white background + zinc neutrals. Defined in `src/app/globals.css` `@theme inline`.
- Fonts: Manrope (`--font-heading`, headings/bold UI) + Inter (`--font-sans`, body).
- `.glass` / `.glass-dark` utility classes for the sticky navbar and dark-background CTAs.
- No dark mode — brief explicitly asks for a white-background site.

## Available Skills
Standard global skill set applies (see `~/.claude/CLAUDE.md`). Nothing project-specific installed beyond what's globally available.

## Cross-Agent Collaboration Rules
Standard rules from `~/.claude/CLAUDE.md` Section 7 apply. This file is the source of truth — read Build Status before rebuilding anything, and update it after each significant step.

## Deploy Commands
```bash
npm run dev      # local dev server
npm run build    # production build (also used for lint/type-check gating)
npm run lint     # eslint
```
**To apply the DB schema:** open the Supabase dashboard for project `ijmyvtnyytehjxprpwdc` → SQL Editor → paste and run `supabase/migrations/0001_init.sql`, then `supabase/seed/seed.sql`.

**To deploy:** see the Handoff block below for current status — Vercel deploy was requested and is being set up.

## Memory Protocol
Standard protocol from `~/.claude/CLAUDE.md` Section 2 applies — update this file and the Claude Code memory files after each significant step, not just at session end.

<!-- HANDOFF BLOCKS BELOW -->
