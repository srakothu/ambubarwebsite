# Ambu Bar LLC

The Ambu Bar website is a Next.js App Router site for a retired ambulance transformed into a mobile beverage bar serving Pennsylvania events. The website presents booking information, services, pricing guidance, Online Store previews, partnership opportunities, and public event updates.

## Requirements

- Node.js 20 or later
- npm 10 or later

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run test
npm run build
npm run start
```

`npm run test` covers inquiry validation, email formatting, and inquiry-route safeguards. `npm run build` performs the production TypeScript and route validation. `npm run start` serves the production build locally.

## Routes

- `/` - Main marketing and booking overview
- `/contact` - Inquiry form with client and server validation, direct email delivery, and an email-draft fallback
- `/api/inquiries` - Rate-limited server endpoint for validated event inquiries
- `/merchandise` - Intentional Online Store launch placeholder for future ecommerce
- `/sitemap.xml` - Search engine sitemap
- `/robots.txt` - Crawler policy

The app also supplies a branded Open Graph/Twitter image, application icon, 404 page, and error recovery page through Next.js file conventions.

## Content Updates

Update [src/content/site-content.ts](src/content/site-content.ts) for shared contact details, live social profiles, navigation labels, public event cards, partnership categories, and the external Online Store URL and launch flag. The `publicEvents` array intentionally starts empty so only confirmed appearances are published.

Images are stored in `public/images/`. Use `next/image` for site imagery and supply meaningful alt text. Do not reintroduce stock event photography when a client asset is available.

## Booking Integration

The contact form submits JSON to `/api/inquiries`, where the same inquiry contract is validated again before the message is delivered through Resend. The endpoint includes a honeypot, same-origin checks, body and field limits, best-effort IP rate limiting, request timeouts, and idempotency keys to reduce spam and duplicate messages. If delivery is unavailable, the completed form remains on screen and provides a prefilled email fallback.

Copy `.env.example` to `.env.local` for local development and configure these deployment variables in Vercel for production:

- `NEXT_PUBLIC_SITE_URL` — canonical public origin used by metadata, sitemap, robots, and structured data; defaults to the current Vercel deployment.
- `RESEND_API_KEY` — required Resend API key.
- `INQUIRY_FROM_EMAIL` — optional sender override. Until a domain is verified, the default is `Ambu Bar Website <onboarding@resend.dev>`; ensure the Resend account belongs to the recipient address.
- `INQUIRY_TO_EMAIL` — optional destination override; defaults to `AmbuBarLLC@gmail.com`.

After purchasing the domain, verify a sending subdomain with Resend, replace `INQUIRY_FROM_EMAIL` with an address on that verified domain, and set `NEXT_PUBLIC_SITE_URL` to the production origin.

## Deployment Checklist

- Set `NEXT_PUBLIC_SITE_URL` when the custom production domain is connected. Until then, the canonical URL is `https://ambubar.vercel.app`.
- Verify email, phone, and social profile URLs before publishing.
- Add `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL` to the Vercel project environment and test a real inquiry.
- Add confirmed public appearances to `publicEvents`; do not publish tentative or private bookings.
- Test the production site at desktop and mobile widths after deployment.
