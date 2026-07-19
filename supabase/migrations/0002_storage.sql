-- BNI Ares Chapter Roster — storage bucket for member/coordinator/sponsor/gallery images
-- Run once in Supabase SQL Editor, after 0001_init.sql

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Public can read (site displays images to anonymous visitors).
-- Only service_role (used by admin Server Actions) can write — no public
-- upload policy, so this doesn't need a client-side auth check.
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
