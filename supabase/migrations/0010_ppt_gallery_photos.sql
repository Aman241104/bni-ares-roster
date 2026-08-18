-- 0010_ppt_gallery_photos.sql
-- Adds 6 genuine chapter photos sourced from the 15 July 2026 meeting deck,
-- after visually screening ~45 candidate images from that deck and rejecting
-- the rest as an unrelated promotional ad deck for another BNI chapter's
-- gala event (not real BNI Ares content). Already applied live via the
-- service_role key (2026-08-18) — this documents it for the repo history.
-- Files already uploaded to the "media" storage bucket under gallery/.

insert into gallery_images (album_id, image_url, caption, display_order)
select id, 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/coffee-with-business-1.jpeg',
  'Coffee with Business — informal member networking session', (select coalesce(max(display_order), 0) + 1 from gallery_images where album_id = gallery_albums.id)
from gallery_albums where category = 'socials';

insert into gallery_images (album_id, image_url, caption, display_order)
select id, 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/coffee-with-business-2.jpeg',
  'Coffee with Business — members catching up over coffee', (select coalesce(max(display_order), 0) + 1 from gallery_images where album_id = gallery_albums.id)
from gallery_albums where category = 'socials';

insert into gallery_images (album_id, image_url, caption, display_order)
select id, 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/coffee-with-business-3.jpeg',
  'Coffee with Business — networking in conversation', (select coalesce(max(display_order), 0) + 1 from gallery_images where album_id = gallery_albums.id)
from gallery_albums where category = 'socials';

insert into gallery_images (album_id, image_url, caption, display_order)
select id, 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/coffee-with-business-4.jpeg',
  'Coffee with Business — group discussion', (select coalesce(max(display_order), 0) + 1 from gallery_images where album_id = gallery_albums.id)
from gallery_albums where category = 'socials';

insert into gallery_images (album_id, image_url, caption, display_order)
select id, 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/kym-session-1.jpeg',
  'KYM session at a member''s workspace', (select coalesce(max(display_order), 0) + 1 from gallery_images where album_id = gallery_albums.id)
from gallery_albums where category = 'kym';

insert into gallery_images (album_id, image_url, caption, display_order)
select id, 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/kym-session-2.jpeg',
  'KYM one-on-one business understanding session', (select coalesce(max(display_order), 0) + 1 from gallery_images where album_id = gallery_albums.id)
from gallery_albums where category = 'kym';
