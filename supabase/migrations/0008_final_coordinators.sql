-- Migration 0008: Add extended_leadership team + populate final coordinator list
-- Run in Supabase SQL Editor

-- 1. Expand the team check constraint to include extended_leadership
ALTER TABLE coordinators DROP CONSTRAINT coordinators_team_check;
ALTER TABLE coordinators ADD CONSTRAINT coordinators_team_check
  CHECK (team IN ('lt_team', 'mc_committee', 'visitor_host', 'chapter_coordinator', 'extended_leadership'));

-- 2. Wipe existing mc_committee, extended_leadership, visitor_host rows
--    (lt_team and chapter_coordinator are kept — those were set correctly before)
DELETE FROM coordinators WHERE team IN ('mc_committee', 'extended_leadership', 'visitor_host');

-- 3. Insert MC Committee (under Priyank Vora)
INSERT INTO coordinators (name, position, team, display_order, status) VALUES
  ('Mayursinh Chavda',  'Chapter Growth Coordinator',        'mc_committee', 1,  'active'),
  ('Rohan Shah',        'Application Review Coordinator',    'mc_committee', 2,  'active'),
  ('Jay Patel',         'Referral Check Coordinator',        'mc_committee', 3,  'active'),
  ('Yash Thakkar',      'TYFCB Coordinator',                 'mc_committee', 4,  'active'),
  ('Hemin Trivedi',     'Attendance Coordinator',            'mc_committee', 5,  'active'),
  ('Manush Patel',      'Policy & Procedure Coordinator',    'mc_committee', 6,  'active'),
  ('Sunil Agrawal',     'Retention Coordinator',             'mc_committee', 7,  'active'),
  ('Ashutosh Mehta',    'First Year Retention Coordinator',  'mc_committee', 8,  'active');

-- 4. Insert Extended Leadership Team (under Ankit Patel)
INSERT INTO coordinators (name, position, team, display_order, status) VALUES
  ('Shruti Agrawal',   'Mentor Coordinator',         'extended_leadership', 1,  'active'),
  ('Dr. Chahana Shah', 'Education Coordinator',      'extended_leadership', 2,  'active'),
  ('Jigar Shah',       'Go Green Coordinator',       'extended_leadership', 3,  'active'),
  ('Het Patel',        'Power Team Coordinator',     'extended_leadership', 4,  'active'),
  ('Varun Bagaria',    'Training Coordinator',       'extended_leadership', 5,  'active'),
  ('Sujal Soni',       '1-2-1 Coordinator',          'extended_leadership', 6,  'active'),
  ('Jimil Shah',       'BNI Connect Coordinator',    'extended_leadership', 7,  'active'),
  ('Dhaval Thakor',    'One Plus Commit Coordinator','extended_leadership', 8,  'active'),
  ('Devarsh Vyas',     'Specific Ask Coordinator',   'extended_leadership', 9,  'active'),
  ('Simran Vatyani',   'KYM Coordinator',            'extended_leadership', 10, 'active'),
  ('Harsh Brahmbhatt', 'Mentor',                     'extended_leadership', 11, 'active'),
  ('Varun Bagaria',    'Mentor',                     'extended_leadership', 12, 'active'),
  ('Ashutosh Mehta',   'Mentor',                     'extended_leadership', 13, 'active');

-- 5. Insert Visitor Host Team (under Rushil Pandya)
INSERT INTO coordinators (name, position, team, display_order, status) VALUES
  ('Rajvi Prajapati',   'Lead Visitor Host',                  'visitor_host', 1,  'active'),
  ('Devarsh Vyas',      'Visitor Host',                       'visitor_host', 2,  'active'),
  ('Ankit Jani',        'Visitor Host',                       'visitor_host', 3,  'active'),
  ('Hemin Trivedi',     'Visitor Host',                       'visitor_host', 4,  'active'),
  ('Sarthak Patel',     'Visitor Host',                       'visitor_host', 5,  'active'),
  ('Samarth Sisodiya',  'Visitor Host',                       'visitor_host', 6,  'active'),
  ('Jimil Shah',        'Visitor Host',                       'visitor_host', 7,  'active'),
  ('Simran Vatyani',    'Feature Presentation Coordinator',   'visitor_host', 8,  'active'),
  ('Vishnu Soni',       'Chapter Visibility Coordinator',     'visitor_host', 9,  'active'),
  ('Gaurav Mehta',      'Events Coordinator',                 'visitor_host', 10, 'active'),
  ('Ankit Jani',        'OMH',                                'visitor_host', 11, 'active'),
  ('Jigar Shah',        'OMH',                                'visitor_host', 12, 'active');
