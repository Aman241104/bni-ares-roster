-- Adds a per-member company logo, shown on the member profile page and member cards.
alter table members add column if not exists company_logo_url text;
