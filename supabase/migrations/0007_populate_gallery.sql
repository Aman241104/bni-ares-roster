-- 0007_populate_gallery.sql
-- Updates existing gallery albums and populates gallery_images with real BNI Ares photos

-- 1. Update album titles and cover images
UPDATE gallery_albums SET
  title = 'Wednesday Chapter Meetings',
  description = 'Weekly chapter meetings at Pride Plaza, feature presentations, and referral passing.',
  cover_image_url = 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/chapter-meeting-session.jpg',
  status = 'active'
WHERE category = 'meetings';

UPDATE gallery_albums SET
  title = 'Business Conclaves & Regional Symposium',
  description = 'BNI Ares representing at regional business conclaves, 1-to-1 conclaves, and summits.',
  cover_image_url = 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/givers-gain-award.jpg',
  status = 'active'
WHERE category = 'business_events';

UPDATE gallery_albums SET
  title = 'Visitor Day & 115 CR Milestone Celebration',
  description = 'Welcoming prospective members and celebrating reaching 115 Crore in chapter business.',
  cover_image_url = 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/visitor-day-backdrop.jpg',
  status = 'active'
WHERE category = 'visitor_days';

UPDATE gallery_albums SET
  title = 'Chapter Socials & Gala Evenings',
  description = 'Building lifelong relationships through evening dinners, gala nights, and family gatherings.',
  cover_image_url = 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/hero-leadership-gala.jpg',
  status = 'active'
WHERE category = 'socials';

UPDATE gallery_albums SET
  title = 'Sports, Night Rides & Chapter Outings',
  description = 'Pickleball tournaments, electric bike night rides, resort picnics, and cricket matches.',
  cover_image_url = 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/sports-pickleball.jpg',
  status = 'active'
WHERE category = 'fun_events';

UPDATE gallery_albums SET
  title = 'KYM Business & Studio Visits',
  description = 'Visiting members'' workplaces, showrooms, and studios to deepen business understanding.',
  cover_image_url = 'https://ijmyvtnyytehjxprpwdc.supabase.co/storage/v1/object/public/media/gallery/kym-studio-visit.jpg',
  status = 'active'
WHERE category = 'kym';
