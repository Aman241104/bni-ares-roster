-- BNI Ares Chapter Roster — initial schema
-- Run once in Supabase SQL Editor (dashboard → SQL Editor → paste → run)

create extension if not exists "pgcrypto";

-- ── members ──────────────────────────────────────────────
create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  company text,
  designation text,
  business_category text,
  description text,
  referral_expectations text,
  phone text,
  whatsapp text,
  email text,
  website text,
  linkedin text,
  instagram text,
  facebook text,
  address text,
  google_maps_link text,
  status text not null default 'active' check (status in ('active', 'hidden')),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index members_status_idx on members (status);
create index members_business_category_idx on members (business_category);
create index members_name_idx on members (name);

-- ── coordinators ─────────────────────────────────────────
create table coordinators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  position text,
  team text not null check (team in ('lt_team', 'mc_committee', 'visitor_host', 'chapter_coordinator')),
  company text,
  phone text,
  email text,
  linkedin text,
  instagram text,
  facebook text,
  description text,
  responsibilities text,
  display_order integer not null default 0,
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now()
);
create index coordinators_team_idx on coordinators (team);

-- ── sponsors ─────────────────────────────────────────────
create table sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  priority integer not null default 0,
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now()
);

-- ── gallery ──────────────────────────────────────────────
create table gallery_albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('meetings', 'business_events', 'visitor_days', 'socials', 'fun_events', 'kym')),
  description text,
  event_date date,
  cover_image_url text,
  display_order integer not null default 0,
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now()
);
create index gallery_albums_category_idx on gallery_albums (category);

create table gallery_images (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references gallery_albums (id) on delete cascade,
  image_url text not null,
  caption text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index gallery_images_album_id_idx on gallery_images (album_id);

-- ── visitor registrations ────────────────────────────────
create table visitor_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  business_category text,
  mobile text not null,
  email text,
  city text,
  invited_by text,
  referral_interest text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamptz not null default now()
);

-- ── contact messages ─────────────────────────────────────
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted')),
  created_at timestamptz not null default now()
);

-- ── settings (single row) ────────────────────────────────
create table settings (
  id integer primary key default 1 check (id = 1),
  meeting_venue text,
  meeting_maps_link text,
  meeting_time text,
  dress_code text,
  visitor_fee text,
  qr_code_url text,
  upi_id text,
  bank_details text,
  stat_total_members integer default 0,
  stat_business_passed text,
  stat_total_referrals integer default 0,
  stat_visitors_hosted integer default 0,
  stat_years_chapter integer default 0,
  contact_phone text,
  contact_email text,
  contact_whatsapp text,
  social_instagram text,
  social_facebook text,
  social_linkedin text,
  faqs jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
insert into settings (id) values (1);

-- ── row level security ───────────────────────────────────
alter table members enable row level security;
alter table coordinators enable row level security;
alter table sponsors enable row level security;
alter table gallery_albums enable row level security;
alter table gallery_images enable row level security;
alter table visitor_registrations enable row level security;
alter table contact_messages enable row level security;
alter table settings enable row level security;

-- Public (anon) can only read active/published content
create policy "public read active members" on members for select using (status = 'active');
create policy "public read active coordinators" on coordinators for select using (status = 'active');
create policy "public read active sponsors" on sponsors for select using (status = 'active');
create policy "public read active gallery_albums" on gallery_albums for select using (status = 'active');
create policy "public read gallery_images" on gallery_images for select using (
  exists (select 1 from gallery_albums a where a.id = gallery_images.album_id and a.status = 'active')
);
create policy "public read settings" on settings for select using (true);

-- Public (anon) can submit registrations/messages but never read them back
create policy "public insert visitor_registrations" on visitor_registrations for insert with check (true);
create policy "public insert contact_messages" on contact_messages for insert with check (true);

-- No public policies for update/delete or for reading registrations/messages —
-- those go through server-side API routes using the service_role key, which
-- bypasses RLS entirely (that's the admin path, built in Phase 2).
