-- The Travelling Tutor X: initial schema.
-- Run once in the Neon SQL editor. Later changes go in 002_*.sql, 003_*.sql, ...

create table if not exists contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  role        text not null check (role in ('student', 'parent', 'teacher', 'other')),
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text not null default 'footer',
  created_at  timestamptz not null default now()
);

create table if not exists lead_magnets (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  email       text not null,
  audience    text not null check (audience in ('student', 'parent', 'teacher')),
  magnet      text not null,
  created_at  timestamptz not null default now()
);

create table if not exists tutor_applications (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  phone           text,
  qualifications  text not null,
  experience      text not null,
  why_join        text not null,
  created_at      timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on contacts (created_at desc);
create index if not exists lead_magnets_created_at_idx on lead_magnets (created_at desc);
create index if not exists tutor_applications_created_at_idx on tutor_applications (created_at desc);
