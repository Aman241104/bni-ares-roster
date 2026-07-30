-- Testimonials: previously hardcoded fabricated copy on the home page.
-- This table makes them admin-editable so real member quotes can replace
-- the placeholder ones (see AGENTS.md Storytelling/Copy Pass notes).

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  member_name text not null,
  company text,
  quote_text text not null,
  display_order integer not null default 0,
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "public read active testimonials" on testimonials for select using (status = 'active');
