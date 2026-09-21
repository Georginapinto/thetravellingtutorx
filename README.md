# The Travelling Tutor X

Website for [thetravellingtutorx.co.uk](https://thetravellingtutorx.co.uk): AQA Sociology tutoring, free resources and the Tutor Partner programme.

Everything deploys to Netlify from this repo:

- **Site**: React (Create React App + craco + Tailwind) in `frontend/`.
- **API**: TypeScript Netlify Functions in `frontend/netlify/functions/`, served at `/api/*` on the same domain.
- **Database**: Neon Postgres. The schema lives in `db/`.
- **Email**: Resend.
- **Payments**: the Stripe Payment Link on the Tutor Partner page. No server code is involved.

## API

| Route | Form | Saves to | Emails |
| --- | --- | --- | --- |
| `POST /api/contact` | Contact page | `contacts` | Notification to you |
| `POST /api/newsletter` | Footer | `newsletter_subscribers` | Notification to you (new signups only) |
| `POST /api/lead-magnet` | Free resources | `lead_magnets` | Download link to the visitor, notification to you |
| `POST /api/tutor-application` | Tutor Partner deposit | `tutor_applications` | Notification to you |

Every form includes a hidden `website` field. If a bot fills it in, the API responds as if the submission worked but saves nothing and sends no email.

## Free resource downloads

Downloadable files live in `frontend/public/resources/`. Each one is listed in `frontend/netlify/functions/_shared/magnets.ts`, keyed by the `magnet` prop that `<LeadMagnetForm>` receives.

A signup for a pack with `ready: false` is saved and you're notified, but the visitor isn't emailed. To switch on the Parent Guide or Teacher Resources pack:

1. Add `parent-guide.pdf` or `teacher-resources.pdf` to `frontend/public/resources/`.
2. Set `ready: true` for that pack in `magnets.ts`.
3. Optionally, pass `downloadUrl` to its `<LeadMagnetForm>` (in `FreeResources.jsx`, `Parents.jsx` or `Teachers.jsx`) so the file also opens straight away, as the student essay guide does.

## Setup

### Environment variables

Set these in Netlify under **Site configuration → Environment variables**, scoped to Functions, for Production and Deploy Previews:

| Variable | What it's for |
| --- | --- |
| `DATABASE_URL` | Neon **pooled** connection string |
| `RESEND_API_KEY` | Resend API key. If it's missing, emails are skipped and a warning is logged |
| `SENDER_EMAIL` | From address. It must be on the domain verified in Resend, e.g. `hello@thetravellingtutorx.co.uk` |
| `NOTIFICATION_EMAIL` | Where notifications are sent |

Until `thetravellingtutorx.co.uk` is verified in Resend, emails only reach the Resend account owner.

### Database

Run `db/001_init.sql` once in the Neon SQL editor. Put later schema changes in new numbered files (`002_…sql`) and run them the same way.

### Local development

```sh
cd frontend
yarn install
npx netlify link          # once: connects this folder to the Netlify site
yarn dev:netlify          # site + functions on http://localhost:8888, env vars pulled from Netlify
```

`yarn start` still runs the site on its own on port 3000, but forms won't work without the functions.

### Checks

```sh
cd frontend
yarn test:functions       # vitest: function handlers with the DB and Resend mocked
yarn typecheck:functions  # tsc against frontend/netlify/tsconfig.json
yarn build                # production build of the site
```

## Deploying

Pushing to `main` deploys to production. Pull requests get a deploy preview that includes the functions. Preview submissions write to the same database unless you give previews their own `DATABASE_URL`, such as a Neon branch.

## History

The site was first generated with Emergent, with a FastAPI + MongoDB backend. In September 2026 that backend was replaced by the Netlify Functions above, and the Emergent tooling was removed. Submissions made before the switch are still in Emergent's MongoDB and haven't been migrated.
