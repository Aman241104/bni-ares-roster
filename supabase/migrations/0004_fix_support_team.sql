-- Fix "Support Team" data.
--
-- The `coordinators` rows with team = 'chapter_coordinator' were mistakenly
-- populated with actual chapter members (MC-committee-style entries like
-- "Vishva Ambasana — Edu-Slot Co.") instead of the real support team. This
-- team drives BOTH the "Support Team" section on the Members page and the
-- "Chapter Coordinators" section on the Chapter Excellence page, so clearing
-- and reseeding it fixes both at once.
--
-- Real support team (WhatsApp brief, 2026-07-29): experienced BNI leaders
-- from OTHER chapters who support and guide BNI Ares — not chapter members.
--
-- Photos sourced 2026-07-29 from "27TH MAY BNI ARES FINAL.pptx" (slides
-- 24-25, name badges visible in 2 of 3) and uploaded to the media/coordinators
-- storage folder. "Divyang Adawadkar" is the PPT spelling (WhatsApp brief said
-- "Diwyang"). Ankit Katharia isn't in that PPT — no photo found, ships with
-- the initials-avatar fallback until one is provided.

delete from coordinators where team = 'chapter_coordinator';

insert into coordinators (name, position, team, photo_url, display_order) values
  ('Dinesh Sitlani', 'Senior Support Director', 'chapter_coordinator', 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/coordinators/786566a1-2651-4b18-abc2-157049d012b4.png', 1),
  ('Alpesh Shah', 'Support Director', 'chapter_coordinator', 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/coordinators/3c389ae6-6343-4b70-97a7-8a637ef4e532.png', 2),
  ('Divyang Adawadkar', 'Support Ambassador', 'chapter_coordinator', 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/coordinators/c126d237-8abc-4074-907c-eb9cfd68324a.png', 3),
  ('Ankit Katharia', 'Support Ambassador', 'chapter_coordinator', null, 4);
