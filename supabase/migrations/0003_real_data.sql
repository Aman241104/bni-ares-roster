-- BNI Ares Chapter Roster — Real chapter data (sourced from ARESCHAPTERROASTER-May-4.pdf)
-- Run in Supabase SQL Editor AFTER 0001_init.sql and 0002_storage.sql.
-- Safe to re-run: it truncates and re-inserts members, then updates settings.

-- ── Clear placeholder / stale data ───────────────────────────────────────────
truncate table members restart identity cascade;
truncate table coordinators restart identity cascade;

-- ── Real Members (33 members, May 2026 roster) ───────────────────────────────
insert into members (
  name, company, designation, business_category,
  description, referral_expectations,
  phone, whatsapp, email, website,
  display_order, status
) values

-- 1
(
  'Sujal Soni',
  'Destination Anywhere Travel Co.',
  'Travel Consultant',
  'International Tours & Travel',
  'Expert in crafting bespoke international travel experiences — from leisure holidays and honeymoons to corporate travel and destination weddings.',
  'Friends and family travelling abroad, honeymooners, corporates needing business travel, and wedding planners looking for destination wedding packages.',
  '+918511071506', '+918511071506', 'sujalsoni05.ss@gmail.com', null,
  1, 'active'
),

-- 2
(
  'Het Patel',
  'Konek Construction Chemicals',
  'Owner',
  'Construction Chemicals',
  'Supplies high-performance construction chemicals — waterproofing, adhesives, grouts, and specialty coatings for builders and construction professionals.',
  'Architects, structural consultants & PMC firms, builders and developers, bungalow owners, and tiles & marble showroom owners.',
  '+919427613168', '+919427613168', 'hetpatel4598@gmail.com', null,
  2, 'active'
),

-- 3
(
  'Dhaval Thakor',
  'Club MJ Events',
  'Event Planner',
  'Event Management',
  'End-to-end event planning and execution — corporate events, weddings, social gatherings, and venue arrangements across Ahmedabad and beyond.',
  'Corporates planning events, wedding planners, hotels and resorts, banquet halls, and educational institutions.',
  '+918140813333', '+918140813333', 'clubmjevents@gmail.com', 'https://www.clubmjevents.com',
  3, 'active'
),

-- 4
(
  'Vishnu Soni',
  'Silver Spoon',
  'Owner',
  'Corporate Gifting',
  'Curates premium corporate gifting solutions — personalised hampers, branded merchandise, and bulk gifting programmes for organisations of all sizes.',
  'Corporates, MNCs, and HR teams looking for memorable gifting solutions for their employees, clients, and events.',
  '+919998123479', '+919998123479', 'vnu444@gmail.com', 'https://www.silverspoonbyacj.com',
  4, 'active'
),

-- 5
(
  'Shruti Agarwal',
  'Arcedior International Pvt. Ltd.',
  'Director',
  'Furniture Manufacturing',
  'Premium furniture manufacturing for residential and commercial spaces — supplying interior designers, builders, and hospitality clients with bespoke furniture solutions.',
  'Interior designers, builders, home stylists, hoteliers, and corporates setting up new offices.',
  '+919909907405', '+919909907405', 'shruti@arcedior.com', 'https://www.arcedior.com',
  5, 'active'
),

-- 6
(
  'Priyank Vora',
  'Kinstugii Wealth',
  'Wealth Manager',
  'Wealth Management',
  'Holistic wealth management advisory — mutual funds, portfolio management, insurance planning, and long-term financial strategy for business owners and professionals.',
  'Business owners, HNIs, and salaried professionals looking to grow, protect, and manage their wealth effectively.',
  '+917043268807', '+917043268807', 'kinstugiiwealth@gmail.com', 'https://www.kinstugiiwealth.com',
  6, 'active'
),

-- 7
(
  'Gaurav Mehta',
  'Gravity Media Marketing',
  'Founder',
  'Web Development',
  'Full-stack web development studio delivering custom websites, CRM systems, ERP solutions, and digital marketing platforms for businesses ready to grow online.',
  'Business owners who don''t have a website, and those looking to build custom web applications, CRM, or ERP solutions.',
  '+918104933816', '+918104933816', 'gauravmehta.biz@gmail.com', null,
  7, 'active'
),

-- 8
(
  'Harsh Brahmbhatt',
  'Vaer HVAC Solutions',
  'HVAC Consultant',
  'HVAC',
  'Designs and installs heating, ventilation, and air conditioning systems for residential, commercial, and industrial projects — from private bungalows to large complexes.',
  'Interior designers, architects, private bungalow owners, and commercial property developers.',
  '+919824653242', '+919824653242', 'info@vaerhvac.com', 'https://www.vaerhvac.com',
  8, 'active'
),

-- 9
(
  'Simran Vatyani',
  'SV Space Designs',
  'Interior Designer',
  'Interior Design',
  'Creates beautiful, functional interior spaces for residential and commercial clients — turnkey project delivery from concept to execution.',
  'Builders, contractors, real estate developers, architects, and those looking for turnkey interior design solutions.',
  '+918140744331', '+918140744331', 'svspacedesigns@gmail.com', null,
  9, 'active'
),

-- 10
(
  'Jimil Shah',
  'Prio Technology',
  'Director',
  'Industrial Automation',
  'Provides cutting-edge industrial automation solutions — SCADA systems, PLCs, robotics integration, and process automation for manufacturing industries.',
  'Pharma equipment manufacturers, textile equipment suppliers, automobile dealers and manufacturers, and industrial traders.',
  '+919427705595', '+919427705595', 'jimil@prio.co.in', 'https://www.prio.co.in',
  10, 'active'
),

-- 11
(
  'Varun Bagaria',
  'Prestine',
  'Owner',
  'Men''s Clothing',
  'Premium men''s clothing and uniforms — bespoke suits, formal wear, and corporate uniform solutions for businesses, hotels, and institutions.',
  'Hotel owners, corporate offices, wedding planners, grooms, and government offices looking for quality uniforms.',
  '+917878894396', '+917878894396', 'varunbagaria.vb@gmail.com', null,
  11, 'active'
),

-- 12
(
  'Ashutosh Mehta',
  'ShyamRatna Projects',
  'MEP Contractor',
  'MEP Contracting',
  'Mechanical, electrical, and plumbing (MEP) contracting for residential and commercial construction projects — reliable execution from design to handover.',
  'Civil contractors, builders, real estate developers, architects, and RMC/PMC firms.',
  '+919925092593', '+919925092593', 'shyamratnaprojects@gmail.com', 'https://www.shyamratnaprojects.co.in',
  12, 'active'
),

-- 13
(
  'Manush Patel',
  'Babulal & Sons',
  'Owner',
  'Building Material Supplier',
  'Trusted supplier of quality building materials — serving construction professionals, interior designers, and architects with everything needed to bring projects to life.',
  'Interior designers, architects, purchase officers at construction companies, and civil & AMC contractors.',
  '+918980033292', '+918980033292', 'babulalandsons3292@gmail.com', null,
  13, 'active'
),

-- 14
(
  'Jigar Shah',
  'Jade Tours & Travels',
  'Travel Expert',
  'Air Ticket, Passport & Visa',
  'Full-service travel agency handling air tickets, passport processing, visa applications, and holiday packages — making international travel stress-free.',
  'Friends and families travelling abroad, honeymooners, and wedding planners.',
  '+919825438324', '+919825438324', 'jigar@jadetravels.co.in', null,
  14, 'active'
),

-- 15
(
  'Sunil Agrawal',
  'Krishna Ceramic',
  'Owner',
  'Ceramic Tiles',
  'Premium ceramic and vitrified tiles showroom — offering a wide range of floor and wall tiles for residential, commercial, and hospitality projects.',
  'Architects, interior designers, bungalow owners, PMC consultants, and civil engineers.',
  '+919825200290', '+919825200290', 'krishnaceramic2010@yahoo.in', 'https://www.krishnaceramic.co',
  15, 'active'
),

-- 16
(
  'Rohan Shah',
  'Preetam Poly Windows',
  'Director',
  'UPVC/Aluminium Doors & Windows',
  'Manufactures and installs high-quality UPVC and aluminium doors and windows — energy efficient, durable, and aesthetically superior solutions for every building type.',
  'Architects, interior designers, PMC consultants, contractors, and builders.',
  '+918238238866', '+918238238866', 'rohanppw@gmail.com', 'https://www.preetampolywindows.com',
  16, 'active'
),

-- 17
(
  'Devarsh Vyas',
  'Ramp Technomation',
  'Director',
  'Power Generator Solutions',
  'Business-critical power solutions — DG sets, AMF panels, and power backup systems for industries, MEP contractors, and infrastructure projects.',
  'Architects, MEP consultants and contractors, and industrial designers.',
  '+919662816088', '+919662816088', 'devarsh@ramptechnomation.com', 'https://www.ramptechnomation.com',
  17, 'active'
),

-- 18
(
  'Vishva Ambasana',
  'Hybrid StudioZ',
  'Founder',
  'AI Tool Development',
  'Builds custom AI-powered tools and software solutions to help businesses automate workflows, improve efficiency, and leverage cutting-edge technology.',
  'Business owners, manufacturers, IT companies, FMCG brands, and hospital chains looking to adopt AI in their operations.',
  '+918866833360', '+918866833360', 'vishgajjar15@gmail.com', 'https://www.veebran.com',
  18, 'active'
),

-- 19
(
  'Ankit Patel',
  'Prihaan Financial Services',
  'Director',
  'Foreign Exchange',
  'Comprehensive foreign exchange and financial services — forex, overseas education financing, travel money, and related advisory for individuals and businesses.',
  'Overseas student consultants, international travel operators, and families and individuals travelling abroad.',
  '+919913413515', '+919913413515', 'ankit.patel@prihaanfin.com', 'https://www.prihaanfin.com',
  19, 'active'
),

-- 20
(
  'Love Patel',
  'Veer Elevator',
  'Owner',
  'Elevators',
  'Supplies, installs, and maintains elevators for residential and commercial buildings — reliable vertical mobility solutions for builders and developers.',
  'Architects, builders, and interior designers working on multi-storey residential and commercial projects.',
  '+919898294761', '+919898294761', 'info@veerelevator.com', 'https://www.veerelevator.com',
  20, 'active'
),

-- 21
(
  'Maunil Parikh',
  'Giriraj Ceramics',
  'Owner',
  'Bath Accessories & Wellness',
  'Premium bath accessories, sanitary ware, and wellness products — supplying interior designers, architects, and luxury residential and hospitality projects.',
  'Interior designers, architects, spa owners, private bungalow projects, and hotel projects.',
  '+917016808278', '+917016808278', 'girirajceramics18@gmail.com', 'https://www.girirajceramics.com',
  21, 'active'
),

-- 22
(
  'Minakshi Bhavsar',
  'Angel Marketing',
  'Fire & Safety Consultant',
  'Fire & Safety Solutions',
  'Provides comprehensive fire safety solutions, equipment supply, and NOC assistance for buildings — ensuring compliance and safety for all types of properties.',
  'Builders, architects, hospitals, and school administrations requiring fire safety NOC and equipment.',
  '+919558880036', '+919558880036', 'angelmarketing1@gmail.com', 'https://www.angelmarketing.com',
  22, 'active'
),

-- 23
(
  'Nitin Upadhyay',
  'Shree Krishna Developer',
  'Director',
  'Real Estate — Dholera SIR',
  'Specialises in residential plots in Dholera Special Investment Region (SIR) — an emerging smart city with strong NRI and investor interest.',
  'NRIs, HNIs, people looking to invest in land, builders, and architects interested in Dholera SIR.',
  '+919978742610', '+919978742610', 'infinitycreatorsdholera@gmail.com', null,
  23, 'active'
),

-- 24
(
  'Dhruv Jani',
  'Seven 11 Box Cricket & Cafe',
  'Founder',
  'Sports & Leisure',
  'Runs a premium box cricket facility and sports café — hosting tournaments, corporate events, and casual cricket games in a vibrant social setting.',
  'Tournament organisers, sports communities, university owners, and sports enthusiasts.',
  '+919662772889', '+919662772889', 'seven11sportscafe@gmail.com', null,
  24, 'active'
),

-- 25
(
  'Rushil Pandya',
  'Fitness Hustler',
  'Health Coach',
  'Health & Fitness Coaching',
  'Certified health coach helping busy professionals and business owners achieve their fitness goals through personalised training and nutrition guidance.',
  'Gym owners, Gujarati businessmen aged 25–40, and fitness enthusiasts looking to transform their health.',
  '+918866102211', '+918866102211', 'pandyarushil02@gmail.com', 'https://www.fitnesshustler.in',
  25, 'active'
),

-- 26
(
  'Samarth Sisodia',
  '7 Elements',
  'Creative Director',
  'Media Services',
  'Full-service media production company — brand films, corporate videos, photography, and content strategy for businesses looking to tell their story powerfully.',
  'Business owners, product-based companies, and marketing and branding agencies.',
  '+919726811419', '+919726811419', 'samsiso@gmail.com', 'https://www.7elements.co.in',
  26, 'active'
),

-- 27
(
  'Yash Thakkar',
  'Vee Decor',
  'Owner',
  'Plywood & Laminates',
  'Leading supplier of premium plywood, laminates, and wood-based panels — serving architects, interior designers, and furniture manufacturers with quality materials.',
  'Architects, interior designers, bungalow owners, PMC consultants, and civil engineers.',
  '+917069536694', '+917069536694', 'yash.thakkar8650@gmail.com', null,
  27, 'active'
),

-- 28
(
  'Mayursinh Chavda',
  'CSM & CO LLP',
  'CA & Tax Advisor',
  'Chartered Accountancy & Tax',
  'Chartered accountants providing audit, taxation, GST compliance, ITR filing, and business incorporation services for startups, MSMEs, and established businesses.',
  'Businesses needing audits and tax support, startups and MSMEs, GST/ITR filers, and those incorporating new businesses.',
  '+918209105955', '+918209105955', 'mayursinh@csmllp.in', 'https://www.csmllp.in',
  28, 'active'
),

-- 29
(
  'Sarthak Patel',
  'Umiya Travel Hub',
  'Travel Consultant',
  'Domestic Travel',
  'Specialist in curating memorable domestic travel experiences — holiday packages, honeymoon itineraries, corporate retreats, and group getaways across India.',
  'Families planning trips, honeymooners, corporates, and friends planning group getaways.',
  '+919924186088', '+919924186088', 'umiyatravelhub@gmail.com', null,
  29, 'active'
),

-- 30
(
  'Adv Jay Patel',
  'Jay G Patel — Advocate',
  'Advocate',
  'Legal Services',
  'Practising advocate handling money recovery, cheque bounce matters, family and matrimonial disputes, land and property cases, and legal documentation.',
  'Those with money recovery or cheque bounce issues, family and matrimonial disputes, land disputes, legal documentation needs, and builders.',
  '+919998714891', '+919998714891', 'jay1802@gmail.com', null,
  30, 'active'
),

-- 31
(
  'Rajvi Prajapati',
  'SAS Power Semiconductor',
  'Director',
  'Power Semiconductor Manufacturing',
  'Manufactures power semiconductor components — serving furnace manufacturers, generator manufacturers, and AC/DC drive manufacturers across the industrial sector.',
  'Furnace manufacturers, generator manufacturers, and AC/DC drive manufacturers.',
  '+919726811419', '+919726811419', 'info@saspowersemi.com', 'https://www.saspowersemi.com',
  31, 'active'
),

-- 32
(
  'Dr Chahana Shah',
  'Chahana Dental Studio',
  'Dentist',
  'Dentistry',
  'Provides comprehensive dental care — from routine check-ups and cleanings to cosmetic dentistry and restorative treatments in a warm, modern studio.',
  'Families, corporates, and anyone looking to improve their oral health.',
  '+918898846253', '+918898846253', 'chahanadentalstudio@gmail.com', null,
  32, 'active'
),

-- 33
(
  'Ankit Jani',
  'Jukebox Media Pvt Ltd',
  'Digital Marketing Expert',
  'Digital Marketing',
  'Performance-driven digital marketing agency — SEO, paid ads, social media, and lead generation strategies that directly impact sales for growing businesses.',
  'Businesses looking to fix their digital marketing strategy, and businesses looking to increase their sales through digital channels.',
  '+919925432613', '+919925432613', 'ankit@jukeboxmedia.in', 'https://www.jukeboxmedia.in',
  33, 'active'
);


-- ── Update Chapter Settings with Real Stats ───────────────────────────────────
update settings set
  -- Live chapter stats from the May 2026 roster
  stat_total_members    = 33,
  stat_business_passed  = '₹115 Cr+',
  stat_total_referrals  = 13326,
  stat_visitors_hosted  = 630,

  -- Contact (Gaurav Mehta — chapter web contact)
  contact_phone         = '+918104933816',
  contact_email         = 'gauravmehta.biz@gmail.com',
  contact_whatsapp      = '+918104933816',

  -- Meeting details (update these once confirmed by the chapter)
  meeting_time          = 'Every Tuesday, 7:00 AM – 9:00 AM',
  dress_code            = 'Business Formal',

  -- FAQs seeded from BNI standard + chapter context
  faqs = '[
    {"question": "Do I need to be invited to visit?", "answer": "It helps to come with a member, but you can also register directly on our Visitor Invite page and we will connect you with a host."},
    {"question": "Is there a fee to attend as a visitor?", "answer": "Yes, a small visitor fee is charged to cover breakfast and materials. Exact details are shared when your visit is confirmed."},
    {"question": "What time does the meeting start?", "answer": "Meetings begin at 7:00 AM sharp every Tuesday. We recommend arriving by 6:45 AM to network before the formal programme."},
    {"question": "What is the dress code?", "answer": "Business formal. First impressions matter — dress the part and make the most of the introductions."},
    {"question": "How do I become a member?", "answer": "Visit at least once, experience the chapter energy, then speak with any member or contact us. One seat per business category is available."},
    {"question": "What is the ''One Seat One Business'' rule?", "answer": "BNI allows only one member per business category in a chapter — so your seat is exclusively yours, with no competition from within the chapter."},
    {"question": "What is TYFCB?", "answer": "Thank You For Closed Business — the amount of business you''ve closed thanks to referrals from chapter members. It is the core metric of value in BNI."}
  ]'::jsonb,

  updated_at = now()
where id = 1;
