<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# BNI Ares Chapter Roster — Agent Brief

## What This Project Is
Chapter roster/marketing site for **BNI Ares** (a BNI business networking chapter — not to be confused with the sibling `ares-web` project, which is "ARES Business League 2026," an unrelated one-month BNI tournament site built by Gravity Media Marketing). This project has its own Supabase backend, its own repo, and no relation to `ares-web` beyond the coincidental "Ares" name.

Commissioned by Gaurav Mehta (manager) via WhatsApp brief on 2026-07-18, relayed by Aman Patel. Built in three phases (see Feature Backlog). **Phase 1 (public site) and Phase 2 (admin panel) are both built as of 2026-07-19.** Phase 3 (email notification on visitor registration) is still deferred by the requester.

## Stack
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.10 (App Router, Turbopack) | Same breaking-changes caveat as above — check `node_modules/next/dist/docs/` before assuming an API |
| UI | React 19 + Tailwind 4 + lucide-react | Manrope (headings) + Inter (body) fonts, white bg + BNI red (`--color-brand-500 #c8102e`) + ink black, glassmorphism (`.glass`/`.glass-dark` in `globals.css`) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll) | `<Reveal>` component wraps scroll-triggered fade-ins (`.sr`/`.sr-stagger` classes); `SmoothScroll.tsx` ported from `ares-web` including its WhatsApp-webview reveal fallback |
| Data | Supabase Postgres + Storage | See Database Schema below. RLS enforces public read (active rows only) + public insert (registrations/messages only); admin writes go through Server Actions using `service_role`, which bypasses RLS |
| Admin Auth | Custom, no library | Single shared login, `scrypt`-hashed password (`node:crypto`), HMAC-signed session cookie. See Admin Panel section below |
| Deploy | Vercel | Live at https://bni-ares-roster.vercel.app, auto-deploys on push to `main` (GitHub-connected) |

**Brand icons gotcha:** `lucide-react` v1.x dropped Instagram/Facebook/LinkedIn (trademarked logos). Custom SVGs live in `src/components/icons/BrandIcons.tsx` — use those, don't try to import brand icons from lucide-react.

## Credentials / Env Vars
`.env.local` (gitignored, never commit — **this repo is public on GitHub**, do not put real secrets in any committed file, AGENTS.md included):
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, safe for client and server code
- `SUPABASE_SERVICE_ROLE_KEY` — server-only (`src/lib/supabase/server.ts`, guarded by `server-only` package), bypasses RLS entirely, used by every admin Server Action
- `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` — the shared admin login. Password was generated 2026-07-19 and given to the requester via chat, not stored anywhere in the repo. To set a new password: `node scripts/hash-password.mjs "new password"`, paste the output into `ADMIN_PASSWORD_HASH` in both `.env.local` and Vercel (all 3 environments), tell the requester the new plaintext password out of band.
- `ADMIN_SESSION_SECRET` — HMAC key for signing the admin session cookie. Rotating it invalidates all active admin sessions (harmless, just re-login).

All four admin-related vars are also set in Vercel (Production/Preview/Development) via `vercel env add`.

Supabase project (`ijmyvtnyytehjxprpwdc`) is **not connected to this session's Supabase MCP tools** — it belongs to a different account than the ones visible via `list_projects` (`prihaan-spices`, `mehtatechteam@gmail.com's Project`, `Aman241104's Project`). Schema/seed changes go through hand-written SQL files that a human runs in the Supabase SQL Editor — see Deploy Commands.

## Architecture
```
Browser ──(anon key, RLS-gated)──> Supabase Postgres          [public site]
   │
   ├─ Server Components (page.tsx files) fetch data server-side via src/lib/supabase/client.ts
   └─ Client Components (forms) insert directly via the same anon client —
        RLS "public insert" policies on visitor_registrations / contact_messages
        allow this without any API route or service_role key

Browser ──(session cookie)──> proxy.ts guard ──> /admin/*      [admin panel]
   │
   ├─ Server Actions (actions.ts per resource) read/write via src/lib/supabase/server.ts
   │    (service_role, bypasses RLS entirely — every action is admin-only by definition
   │    since proxy.ts already blocked unauthenticated requests to the whole /admin tree)
   └─ Image/logo/QR uploads go through src/lib/admin/storage.ts to the Supabase
        Storage "media" bucket (public read, no public write policy — service_role only)
```
No custom backend server — everything server-side is Next.js Server Components, Server Actions, and one Route Handler (CSV export).

## File Map
```
src/proxy.ts                — Next.js 16's renamed middleware.ts, guards /admin/*
src/lib/admin/auth.ts        — password hashing (scrypt) + session token sign/verify (HMAC)
src/lib/admin/storage.ts     — uploadImage() to the Supabase "media" bucket
src/app/(site)/              — route group: all public pages, wrapped in its own layout.tsx
                                (Navbar/Footer/SmoothScroll) so /admin doesn't inherit them
  page.tsx                   — Home (hero, Givers Gain, one-seat-one-business, stats, why-visit, sponsors, FAQ, closing CTA)
  members/page.tsx           — directory (server fetch + MembersDirectory client component)
  members/[id]/page.tsx      — member profile (mini landing page: about, referral asks, connect CTA)
  coordinators/page.tsx      — 4 team groups, role explainers, warm per-team empty states
  visitor/page.tsx           — visitor landing, meeting flow, is-this-for-you, multi-step registration form
  gallery/page.tsx           — album grid (server fetch + GalleryGrid client component)
  contact/page.tsx           — split hero, quick-nav, contact cards, FAQ, contact form, what's-next
  not-found.tsx              — 404
src/app/admin/
  login/page.tsx, login/actions.ts   — outside the (dashboard) group, no sidebar chrome
  (dashboard)/layout.tsx     — sidebar + logout, force-dynamic (see gotcha below)
  (dashboard)/page.tsx       — dashboard: live counts per resource + new-registration/message badges
  (dashboard)/members/, coordinators/, sponsors/, gallery/, settings/, registrations/, messages/
                             — one actions.ts (Server Functions) + page(s) per resource
  (dashboard)/registrations/export/route.ts — CSV download (Route Handler, not a Server Action)
src/components/              — MemberCard, CoordinatorCard, ContactButtons, Avatar (initials
                                fallback when no photo_url), Reveal, StatCounter, FaqAccordion,
                                VisitorRegistrationForm, ContactForm, GalleryGrid, Navbar, Footer
src/components/admin/        — AdminNav, FormField (TextField/TextAreaField/SelectField),
                                SubmitButton (useFormStatus pending state), RowActions
                                (Delete/ToggleStatus/MoveButton/MarkContacted — all client,
                                assume they're inside a <form action={serverAction}>),
                                MemberForm, CoordinatorForm, FaqEditor (client, serializes to
                                a hidden JSON input for the settings form to pick up)
src/components/icons/BrandIcons.tsx — Instagram/Facebook/LinkedIn (see gotcha below)
src/lib/supabase/            — client.ts (anon, public site), server.ts (service_role, admin only)
src/types/database.ts        — hand-written types mirroring the SQL schema (no generated types yet)
scripts/hash-password.mjs    — CLI to generate a new ADMIN_PASSWORD_HASH
supabase/migrations/0001_init.sql — core schema + RLS, run manually in SQL Editor
supabase/migrations/0002_storage.sql — "media" storage bucket + public-read policy
supabase/seed/seed.sql       — placeholder demo data, run manually after 0001
```

## Database Schema
See `supabase/migrations/0001_init.sql` (core schema) and `0002_storage.sql` (storage bucket) for the authoritative source. Tables: `members`, `coordinators` (team enum: lt_team/mc_committee/visitor_host/chapter_coordinator), `sponsors`, `gallery_albums` (category enum: meetings/business_events/visitor_days/socials/fun_events/kym) + `gallery_images`, `visitor_registrations`, `contact_messages`, `settings` (single row, id=1 — meeting details, stats, contact info, FAQs as jsonb). Storage: one public bucket `media`, admin-only write.

`contact_messages` isn't in the original brief's DB structure list (only `members`/`coordinators`/`sponsors`/`gallery`/`visitor_registrations` were specified) — added because the Contact page's brief explicitly asks for a "Contact Form" with no other storage mechanism given. Confirmed with the requester.

## Build Status
- [x] Project scaffolded (Next.js 16 + Tailwind 4 + Supabase client)
- [x] DB schema + RLS policies + storage bucket written (`0001_init.sql`, `0002_storage.sql`) — **not yet applied to the live Supabase project**, needs a human to run both in the SQL Editor. This is the only thing standing between the current empty-state site and a fully working one.
- [x] Placeholder seed data written (`seed.sql`) — same caveat, not yet applied
- [x] All 6 public pages built, storytelling/copy pass done, `npm run build` / `npm run lint` pass clean
- [x] Visitor registration form (multi-step) — inserts directly to `visitor_registrations` via RLS, shows success screen. **No email notification** (Phase 3, deferred)
- [x] Contact form — inserts to `contact_messages` via RLS, shows success screen
- [x] **Admin panel (Phase 2) — built 2026-07-19.** Single shared login, CRUD + show/hide + reorder for members/coordinators/sponsors/gallery albums, photo/logo/QR upload to Supabase Storage, chapter settings editor with dynamic FAQ list, visitor-registration + contact-message inboxes with search/mark-contacted/delete, CSV export for registrations.
- [x] Manual browser QA pass (desktop + mobile, hamburger menu, scroll-reveal, full admin login/CRUD-page/logout flow) via Playwright, both locally and against the live production URL — see Handoff below
- [ ] Deliberately skipped in Phase 2: bulk CSV **import** for members (brief marks it optional), per-coordinator admin accounts (single shared login was the explicit call), drag-and-drop reorder (up/down buttons instead, no new dependency), image reorder within a gallery album (upload order only)
- [ ] Email notification on visitor registration (Phase 3 — deferred by requester, "badme")
- [ ] Real chapter content (members, coordinators, stats, logo, meeting details) — pending a PPT from the chapter, currently placeholder/empty. Now enterable through the admin panel once the migration runs — the requester no longer needs to wait for a PPT if they'd rather type it in directly.
- [ ] "Download Visiting Card" on member profile — brief marks this optional, not built
- [ ] Domain — requester said decide later ("Last mai dekh lenge")

## Critical Gotchas
- **Scroll-reveal elements start at `opacity: 0`** (`.sr`/`.sr-stagger` in `globals.css`, animated by `<Reveal>`). A full-page Playwright screenshot taken without scrolling first will show blank sections below the fold — this is expected animate-on-scroll behavior, not a bug. Scroll the page (or wait) before screenshotting for QA.
- **lucide-react v1 has no brand icons** — see Stack section above.
- **DB schema doesn't exist on the live Supabase project yet.** All pages (public and admin) defensively treat Supabase errors as empty data (`(data as X | null) ?? []`), so everything builds and renders empty-state UI fine either way — but no reads OR writes will work for real until `0001_init.sql` and `0002_storage.sql` are run. Admin create/edit forms will throw a visible "relation does not exist" error on submit until then — confirmed this is the only issue, not a code bug (see 2026-07-19 handoff).
- **`service_role` key is in `.env.local` in plaintext** (came from the requester via chat). Never import `src/lib/supabase/server.ts` into client code — it's already guarded by `server-only`, which will throw a build error if you try. Consider rotating the key in the Supabase dashboard once this project is stable, since it passed through a chat transcript.
- **Gallery/sponsor/coordinator/member photos are placeholder-free by default** — `Avatar.tsx` renders colored initials when `photo_url` is null instead of a fake stock photo, per the no-placeholder-content design rule. Real photos now upload through the admin panel to the Supabase `media` bucket.
- **`src/proxy.ts` is this Next.js version's `middleware.ts`** — the file convention was renamed in v16 (deprecated, not removed yet, but don't create a `middleware.ts` file, it won't be picked up the same way going forward). Runs on Node.js runtime by default, which is why `node:crypto` works directly in `src/lib/admin/auth.ts` without any Edge-runtime workarounds.
- **Public pages and `/admin` are split into separate route groups** — `src/app/(site)/` has its own `layout.tsx` with the Navbar/Footer/SmoothScroll chrome; `src/app/admin/` does not inherit it (that's the whole point — `/admin/login` would otherwise render with the public nav/footer around it, which happened once during development and was fixed by this split). If you add a new top-level route that shouldn't have the public site chrome, keep it outside `(site)`.
- **`(dashboard)/layout.tsx` sets `export const dynamic = "force-dynamic"`** — without it, Next.js prerenders admin pages as static HTML at build time (since none of them call `cookies()`/`headers()` directly, only `proxy.ts` does), which would freeze admin data at whatever it was during the last deploy. This bit us once during development; don't remove it.
- **Admin mutations use React Server Functions (`"use server"` actions), not API routes** — except the CSV export, which needs to return a file with custom headers, so it's a Route Handler at `(dashboard)/registrations/export/route.ts`. Both patterns are already covered by the `/admin/:path*` proxy matcher.

## Known Issues / Bugs
None currently open — `npm run build` and `npm run lint` both pass clean as of this writing.

## Storytelling / Copy Pass (2026-07-19)
A page-by-page copywriting review (external, delivered as 6 documents — one per public page) pushed for much stronger narrative: sell opportunities/access/leadership/belonging instead of describing features ("members directory" → "the people behind the referrals", etc.). Implemented across all 6 public pages: Home (Givers Gain philosophy, "One Seat One Business One Opportunity", closing CTA), Members (hero + live stats computed from real data, "why our members matter", member profile as a mini landing page), Coordinators (full rewrite — role explainers, warm per-team empty states), Visitor (multi-step registration form, "is this for you", meeting-flow walkthrough), Gallery (belonging-focused hero, warm empty state), Contact (split hero, quick-nav, "what happens next", topic selector on the form).

**Deliberately NOT implemented from that review**: fabricated specific stats ("150+ meetings hosted", "1000+ connections"), fake testimonials/quotes, invented operational facts (visitor fee amount, response times, meeting length as hardcoded FAQ answers) — the review's mockups included these as if real. All stat displays instead read from `settings`/live table counts and stay hidden until non-zero (see `hasRealStats` pattern in `src/app/page.tsx`, mirrored in `members/page.tsx` and `visitor/page.tsx`). FAQs stay fully data-driven from `settings.faqs`. Testimonials sections keep an honest "coming soon" empty state. Don't add fabricated content here even if a future review asks for it the same way — wire it to real data or leave the empty state.

## Feature Backlog
**Phase 3 — Registration wiring** (deferred by requester): email notification to admin on new visitor registration — needs an email service decision (Resend/Google Workspace/etc.) not yet made.

**Possible later additions**: bulk CSV import for members, drag-and-drop reorder (currently up/down buttons), image reorder within a gallery album, a `featured` flag on `members` if "member of the month" (from the 2026-07-19 copy review) gets built — no mechanism to curate it honestly without real admin input, so it wasn't added speculatively.

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
**To apply the DB schema (do this first — nothing works without it):** open the Supabase dashboard for project `ijmyvtnyytehjxprpwdc` → SQL Editor → paste and run, in order: `supabase/migrations/0001_init.sql`, then `supabase/migrations/0002_storage.sql`, then optionally `supabase/seed/seed.sql` for placeholder demo data.

**To change the admin password:** `node scripts/hash-password.mjs "new password"` → copy the output into `ADMIN_PASSWORD_HASH` in `.env.local` and in Vercel (`vercel env add ADMIN_PASSWORD_HASH <environment>`, once per environment) → tell whoever needs it the new plaintext password directly, never commit it anywhere.

**To deploy:** `git push origin main` — Vercel auto-deploys on push (GitHub integration connected, see handoff below). Manual deploy: `npx vercel --prod`.

## Memory Protocol
Standard protocol from `~/.claude/CLAUDE.md` Section 2 applies — update this file and the Claude Code memory files after each significant step, not just at session end.

<!-- HANDOFF BLOCKS BELOW -->

---
## Handoff — Claude Code — 2026-07-18

### Completed This Session
- [x] Brainstormed and scoped the project into 3 phases with the requester (Aman Patel, relaying Gaurav Mehta's brief)
- [x] Scaffolded Next.js 16 + Tailwind 4 + Supabase project at `/home/whoever/work/bni-ares-roster`
- [x] Wrote full DB schema + RLS (`supabase/migrations/0001_init.sql`) and placeholder seed data (`supabase/seed/seed.sql`)
- [x] Built all Phase 1 public pages (Home, Members Directory, Member Profile, Coordinators, Visitor Invite, Gallery, Contact) with GSAP/Lenis scroll animations, BNI red/black branding, glassmorphism nav
- [x] `npm run build` and `npm run lint` pass clean; manual Playwright QA pass (desktop + mobile, hamburger menu, scroll-reveal, empty states) confirmed everything renders correctly
- [x] Created GitHub repo `Aman241104/bni-ares-roster` (public, confirmed with user) and pushed
- [x] Linked Vercel project `aman241104s-projects/bni-ares-roster`, connected to the GitHub repo for auto-deploy on push to `main`
- [x] Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` in Vercel across Production/Preview/Development
- [x] Deployed to production — live at **https://bni-ares-roster.vercel.app**
- [x] Wrote cross-session memory (`project_bni-ares-roster.md`, `project_supabase_mcp_gap.md`)

### State Left In
Site is live but shows empty states everywhere (no members, no coordinators, no sponsors, no gallery, stats all zero) because **the DB schema has not been applied to the live Supabase project yet** — that step requires the Supabase dashboard SQL Editor (no MCP access to this project, no DB password for direct `psql`). Everything else is done and working.

### Next Steps
1. **Apply the DB schema**: Supabase dashboard → project `ijmyvtnyytehjxprpwdc` → SQL Editor → run `supabase/migrations/0001_init.sql`, then `supabase/seed/seed.sql` (or skip seed and wait for real data). Site will immediately start showing content once this is done — no redeploy needed, it's all server-fetched.
2. **Get the PPT** from the manager with real chapter data (members, coordinators, stats, meeting details) and either swap the seed data or wait for Phase 2's admin panel to enter it through a UI.
3. **Phase 2**: build the admin panel (single shared login, CRUD for all content types, settings editor, registration/message inbox).
4. **Phase 3**: wire up email notifications on visitor registration once an email service is chosen.
5. Sort out the real domain (requester said "decide later") and swap `SITE_URL` in `layout.tsx`, `sitemap.ts`, `robots.ts` off the Vercel URL once it's connected — same gotcha `ares-web`'s AGENTS.md documents for its own domain switch.

### New Gotchas Discovered
- `lucide-react` v1.x removed all trademarked brand icons (Instagram/Facebook/LinkedIn) — see Critical Gotchas above, custom SVGs in `src/components/icons/BrandIcons.tsx`.
- `react-hooks/set-state-in-effect` (new-ish ESLint rule) flags `useEffect(() => setState(...), [dep])` patterns — closing the mobile nav menu on route change had to move to an `onClick` handler on each link instead of a pathname-watching effect.
- Full-page Playwright screenshots taken without scrolling first will show blank sections — the `<Reveal>` scroll-animation starts elements at `opacity: 0` and only reveals on actual scroll-triggered intersection. Scroll programmatically before screenshotting.
---

## Handoff — Claude Code — 2026-07-19

### Completed This Session
- [x] Storytelling/copy pass across all 6 public pages (see section above) — landed as several small commits, ends with `ab8b2d8`
- [x] Built the full Phase 2 admin panel: auth (login/logout, HMAC session cookie, scrypt password hash), CRUD for members/coordinators/sponsors/gallery albums+images, chapter settings editor with dynamic FAQ list, visitor-registration and contact-message inboxes with search/mark-contacted/delete, CSV export for registrations
- [x] Added Supabase Storage bucket migration (`0002_storage.sql`) and an upload helper for photos/logos/QR codes
- [x] Restructured the app into `(site)` and `admin` route groups so `/admin/login` doesn't inherit the public Navbar/Footer (caught this as a real bug during QA, fixed it)
- [x] Generated real admin credentials (username `admin`, a random password given to the requester via chat — not committed anywhere) and pushed the corresponding env vars to Vercel across all 3 environments
- [x] Full manual QA: local dev server (login → dashboard → every list page → logout → session actually invalidated) and the same flow again against the live production URL — both clean, zero console errors
- [x] Verified the only remaining blocker is the unapplied DB migration — confirmed via a direct REST call to the Supabase project that `public.members` doesn't exist yet, and via the admin panel itself (create-member throws "relation does not exist" in dev, which would be a generic error page in production, not a crash)

### State Left In
Code is 100% done and deployed for both Phase 1 and Phase 2. The site and admin panel are both live and fully clickable, but **empty** — no tables exist yet on the Supabase project, so every list is a "nothing yet" empty state and every admin write will fail until the migration runs.

### Next Steps
1. **Run the migration** (see Deploy Commands above) — this alone unblocks everything else.
2. Requester can then either enter real chapter content directly through the admin panel, or the PPT (if it ever arrives) can be used to write a real seed SQL file instead of the placeholder one.
3. Phase 3 whenever an email service gets picked.
4. Consider rotating `SUPABASE_SERVICE_ROLE_KEY` in the Supabase dashboard at some point, since it passed through this chat transcript — not urgent, just hygiene.

### New Gotchas Discovered
- Next.js 16 renamed `middleware.ts` → `proxy.ts` (deprecated old name, not removed yet, but don't use it going forward) — defaults to Node.js runtime, which is why `node:crypto` works without an Edge-runtime workaround.
- A layout with no `cookies()`/`headers()` call doesn't automatically opt a route into dynamic rendering — admin pages were getting statically prerendered at build time until `export const dynamic = "force-dynamic"` was added to `(dashboard)/layout.tsx`. Easy to miss since the build succeeds either way; only shows up as "stale data" in production.
- File inputs in a Server Action form need `encType="multipart/form-data"` explicitly on the `<form>` — the browser does not infer it from the presence of an `<input type="file">`.
- `react-hooks/set-state-in-effect` also flaged a `useFormStatus`-adjacent pattern initially; resolved the same way as the earlier Navbar fix (move the state change to an event handler instead of an effect).
---
