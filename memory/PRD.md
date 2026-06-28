# The Travelling Tutor — PRD

## Original problem statement
Premium Sociology education brand website (Apple/Canva/Duolingo level). Brand colours: Bold Pink, Soft Pastel Pink, Soft Sage Green, Warm White. Founder positioned as Experienced Teacher, AQA Sociology Examiner, Director of Sixth Form, Course Creator, Workshop Leader, Founder. 12-page site that builds a complete Sociology education ecosystem for Students → Parents → Teachers. Lead magnets, booking, partner programme apply, newsletter, testimonials.

## Architecture
- **Frontend** React 19 + React Router + Tailwind + shadcn-ui + sonner. Fonts: Outfit (heading), Plus Jakarta Sans (body), Caveat (handwritten accent).
- **Backend** FastAPI + Motor + MongoDB. All routes under `/api`.
- **Routes** `/api/contact`, `/api/lead-magnet`, `/api/newsletter` (idempotent on email), `/api/booking`, `/api/tutor-application`, `/api/testimonials`.
- **Data** uuid id + ISO `created_at` on every document.

## User personas
- **Students** (GCSE/A-Level Sociology) → 1:1, Academy, Online course, Workshops, free starter pack.
- **Parents** → calm support, GCSE/A-Level pathways, parent guide, consultation.
- **Teachers / Tutors** → CPD, resources, Tutor Partner Programme.

## Static core requirements
- Brand-only palette (no purple/dark corporate).
- Premium feel, lots of whitespace, rounded-3xl cards, soft shadows.
- Signature handwritten "the travelling tutor X" with plane + heart accent across logo, footer, hero, signoff.
- Founder portrait (uploaded avatar asset) featured on hero + about.

## Implemented (2025-12)
- Backend with 7 endpoints + curated testimonials.
- 12 pages: Home, About, Students, Parents, Teachers, Tutor Partner, Testimonials, Contact (core 8) + Courses, Resource Shop, Free Resources, Blog (stub).
- Sticky navbar with mobile menu + booking CTA modal.
- Booking dialog, lead-magnet capture (3 audiences), newsletter footer, contact form, tutor partner application form.
- Testimonials filterable by audience.
- Footer with newsletter + social links.
- 100% backend, 100% frontend test pass (iteration_1).

## Backlog (next phases)
- **P1** Live Calendly embed in booking modal; admin dashboard to view captured leads/bookings.
- **P1** Stripe Checkout wired for Courses + Resource Shop products.
- **P1** Real CMS / blog posts (MDX or DB-driven).
- **P2** Membership area + Student Dashboard.
- **P2** AI "Ask the Tutor" Sociology assistant (LLM, deferred).
- **P2** Auth + Tutor Partner portal for accepted partners.
- **P2** Mobile app + podcast feed integration.

## Test credentials
N/A — no auth in this MVP.
