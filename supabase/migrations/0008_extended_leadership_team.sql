-- 0008_extended_leadership_team.sql
-- Adds a real "Extended Leadership Team" — members who hold an extra committee/
-- coordinator title beyond their core team (Events Co., BNI Connect Co., Power
-- Team Co., Feature Presentation Co., Go Green Co., KYM Co., Chapter Visibility
-- Co., One Plus Commit Co., Training Co., OMH Co.) — sourced from the 15 July
-- 2026 chapter meeting deck. Corrects an earlier session's mistaken guess that
-- "Extended Leadership Team" meant lt_team + chapter_coordinator combined; it's
-- actually its own distinct group. Safe to re-run (delete-then-insert by team).

alter table coordinators drop constraint if exists coordinators_team_check;
alter table coordinators add constraint coordinators_team_check
  check (team in ('lt_team', 'mc_committee', 'extended_leadership', 'visitor_host', 'chapter_coordinator'));

delete from coordinators where team = 'extended_leadership';

insert into coordinators (name, position, team, photo_url, display_order, status) values
  ('Rushil Pandya', 'Events Co.', 'extended_leadership',
    (select photo_url from members where name = 'Rushil Pandya'), 1, 'active'),
  ('Yash Thakkar', 'BNI Connect Co.', 'extended_leadership',
    (select photo_url from members where name = 'Yash Thakkar'), 2, 'active'),
  ('Ashutosh Mehta', 'Power Team Co. & One Plus Commit Co.', 'extended_leadership',
    (select photo_url from members where name = 'Ashutosh Mehta'), 3, 'active'),
  ('Sunil Agrawal', 'Feature Presentation Co.', 'extended_leadership',
    (select photo_url from members where name = 'Sunil Agrawal'), 4, 'active'),
  ('Shruti Agarwal', 'Go Green Co.', 'extended_leadership',
    (select photo_url from members where name = 'Shruti Agarwal'), 5, 'active'),
  ('Gaurav Mehta', 'KYM Co.', 'extended_leadership',
    (select photo_url from members where name = 'Gaurav Mehta'), 6, 'active'),
  ('Ankit Jani', 'Chapter Visibility Co.', 'extended_leadership',
    (select photo_url from members where name = 'Ankit Jani'), 7, 'active'),
  ('Priyank Vora', 'Training Co.', 'extended_leadership',
    (select photo_url from members where name = 'Priyank Vora'), 8, 'active'),
  ('Rohan Shah', 'OMH Co.', 'extended_leadership',
    (select photo_url from members where name = 'Rohan Shah'), 9, 'active'),
  ('Samarth Sisodia', 'OMH Co.', 'extended_leadership',
    (select photo_url from members where name = 'Samarth Sisodia'), 10, 'active');
