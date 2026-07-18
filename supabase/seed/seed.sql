-- BNI Ares Chapter Roster — placeholder demo data
-- Run after 0001_init.sql. Safe to delete/replace once real chapter data
-- (from the PPT) is available — swap via the admin panel once Phase 2 ships,
-- or re-run inserts here.

insert into members (name, company, designation, business_category, description, referral_expectations, phone, whatsapp, email, website, display_order) values
  ('Rahul Mehta', 'Mehta Realty Group', 'Founder', 'Real Estate', 'Helping families find their first home across the city for over 12 years.', 'Anyone actively looking to buy, sell, or rent residential property.', '+919812345601', '+919812345601', 'rahul@mehtarealty.example', 'https://mehtarealty.example', 1),
  ('Priya Nair', 'Nair & Associates', 'Chartered Accountant', 'Accounting & Tax', 'Full-service CA firm handling tax filing, audits, and business compliance.', 'Small business owners who need a reliable CA relationship.', '+919812345602', '+919812345602', 'priya@nairca.example', 'https://nairca.example', 2),
  ('Aman Kapoor', 'BrightPixel Studio', 'Creative Director', 'Digital Marketing', 'Performance marketing and brand design for D2C and local businesses.', 'Businesses spending on ads but not seeing ROI.', '+919812345603', '+919812345603', 'aman@brightpixel.example', 'https://brightpixel.example', 3),
  ('Sneha Iyer', 'Iyer Interiors', 'Principal Designer', 'Interior Design', 'Residential and commercial interior design with an in-house execution team.', 'Anyone renovating a home or new office fit-out.', '+919812345604', '+919812345604', 'sneha@iyerinteriors.example', 'https://iyerinteriors.example', 4),
  ('Vikram Shah', 'Shah Legal Chambers', 'Advocate', 'Legal Services', 'Corporate and property law, contract drafting, and dispute resolution.', 'Business owners needing contract review or property due diligence.', '+919812345605', '+919812345605', 'vikram@shahlegal.example', null, 5),
  ('Ritu Malhotra', 'SecureLife Insurance', 'Agent', 'Insurance', 'Life, health, and business insurance advisory for families and SMEs.', 'Families without adequate health cover, business owners without key-person insurance.', '+919812345606', '+919812345606', 'ritu@securelife.example', null, 6),
  ('Karan Desai', 'Frame & Focus', 'Owner', 'Photography', 'Event, corporate, and product photography with a 3-person crew.', 'Companies needing product shoots or event coverage.', '+919812345607', '+919812345607', 'karan@frameandfocus.example', 'https://frameandfocus.example', 7),
  ('Ananya Rao', 'CloudStack IT Solutions', 'Founder', 'IT Services', 'Cloud infrastructure and IT support for growing businesses.', 'Businesses outgrowing ad-hoc IT support.', '+919812345608', '+919812345608', 'ananya@cloudstack.example', 'https://cloudstack.example', 8),
  ('Farhan Sheikh', 'Momentum Events', 'Founder', 'Event Management', 'Corporate events, conferences, and chapter celebrations end to end.', 'Anyone planning a corporate event or milestone celebration.', '+919812345609', '+919812345609', 'farhan@momentumevents.example', null, 9);

insert into coordinators (name, position, team, company, phone, email, responsibilities, display_order) values
  ('Suresh Bansal', 'President', 'lt_team', 'Bansal Textiles', '+919900000001', 'suresh@bansaltextiles.example', 'Chapter leadership, meeting facilitation, member accountability.', 1),
  ('Meera Choudhary', 'Secretary', 'lt_team', 'Choudhary & Co.', '+919900000002', 'meera@choudharyco.example', 'Chapter records, attendance, and communication.', 2),
  ('Deepak Oberoi', 'Treasurer', 'lt_team', 'Oberoi Finance', '+919900000003', 'deepak@oberoifinance.example', 'Chapter finances, dues collection, and budgeting.', 3),
  ('Nisha Verma', 'Membership Chair', 'mc_committee', 'Verma Consultancy', '+919900000004', 'nisha@vermaconsult.example', 'Recruiting and onboarding new members.', 4),
  ('Arjun Kohli', 'Education Coordinator', 'mc_committee', 'Kohli Training Labs', '+919900000005', 'arjun@kohlitraining.example', 'Weekly education slots and member training.', 5),
  ('Pooja Bhatia', 'Visitor Host Coordinator', 'visitor_host', 'Bhatia Hospitality', '+919900000006', 'pooja@bhatiahosp.example', 'Coordinating the visitor host team and visitor experience.', 6),
  ('Rohit Sharma', 'Greeter', 'visitor_host', 'Sharma Logistics', '+919900000007', 'rohit@sharmalogistics.example', 'Welcoming visitors at the door each week.', 7),
  ('Kavita Joshi', 'Chapter Coordinator', 'chapter_coordinator', 'Joshi Wellness', '+919900000008', 'kavita@joshiwellness.example', 'General chapter operations support.', 8);

insert into sponsors (name, website_url, priority) values
  ('Prime Business Bank', 'https://example.com/prime-bank', 1),
  ('Apex Print & Signage', 'https://example.com/apex-print', 2);

insert into gallery_albums (title, category, description, event_date, display_order) values
  ('Weekly Chapter Meeting', 'meetings', 'Our regular Tuesday morning meeting.', current_date - interval '7 days', 1),
  ('Q2 Business Networking Mixer', 'business_events', 'Cross-chapter networking evening.', current_date - interval '30 days', 2),
  ('Visitor Day Special', 'visitor_days', 'Open house for prospective members.', current_date - interval '45 days', 3),
  ('Chapter Anniversary Celebration', 'socials', 'Celebrating another year of Givers Gain.', current_date - interval '60 days', 4),
  ('Fun Friday Games Night', 'fun_events', 'Team games and casual networking.', current_date - interval '20 days', 5),
  ('KYM Spotlight Sessions', 'kym', 'Know-Your-Member deep-dive presentations.', current_date - interval '10 days', 6);

update settings set
  meeting_venue = 'Hotel Grand Regency, Conference Hall B, MG Road',
  meeting_time = 'Every Tuesday, 9:00 AM – 10:30 AM',
  dress_code = 'Business Formal',
  visitor_fee = '₹500 (includes breakfast)',
  stat_total_members = 9,
  stat_business_passed = '₹1.2 Cr+',
  stat_total_referrals = 340,
  stat_visitors_hosted = 120,
  stat_years_chapter = 3,
  contact_phone = '+919900000000',
  contact_email = 'hello@bniares.example',
  contact_whatsapp = '+919900000000',
  faqs = '[
    {"question": "Do I need to be invited to visit?", "answer": "It helps, but you can also register directly on our Visitor Invite page."},
    {"question": "Is there a fee to visit?", "answer": "Yes, a small visitor fee covers breakfast and materials — see the Meeting Details section."},
    {"question": "How do I become a member?", "answer": "Visit twice, then apply through your chapter contact — our Membership Chair will guide you."}
  ]'::jsonb
where id = 1;
