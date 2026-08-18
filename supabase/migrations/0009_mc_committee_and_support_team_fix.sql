-- 0009_mc_committee_and_support_team_fix.sql
-- Two data-correctness fixes surfaced by cross-referencing the 15 July 2026
-- chapter meeting deck against the live coordinators table. Already applied
-- live via the service_role key (2026-08-18); this file documents both for
-- the repo history and is safe to re-run.

-- 1. MC Committee "TYFCB Co." was seeded as "Love Patel" — a data-entry
--    error from whenever the table was first populated. Slide 9 of the deck
--    shows this seat is actually held by Jigar Shah (confirmed via his
--    reused headshot cutout, which also appears on his other solo slides,
--    and cross-referenced against slide 23's "Mentors" lineup to rule out
--    ambiguity in photo-to-name ordering).
update coordinators
set name = 'Jigar Shah',
    photo_url = (select photo_url from members where name = 'Jigar Shah')
where name = 'Love Patel' and team = 'mc_committee';

-- 2. Divyang Adawadkar (Support Ambassador) was present in migration 0004
--    but is missing from the live table — his row was likely deleted via
--    the admin panel at some point. The 15 July deck (slides 24-25)
--    reconfirms he's still real/active in this role, so restore him with
--    the same photo URL from 0004 (verified still live in storage).
insert into coordinators (name, position, team, photo_url, display_order, status)
select 'Divyang Adawadkar', 'Support Ambassador', 'chapter_coordinator',
  'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/coordinators/c126d237-8abc-4074-907c-eb9cfd68324a.png',
  3, 'active'
where not exists (select 1 from coordinators where name = 'Divyang Adawadkar');
