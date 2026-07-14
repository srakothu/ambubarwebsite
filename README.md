# Ambu Bar LLC

The Ambu Bar website is a Next.js App Router site for a retired ambulance transformed into a mobile beverage bar serving Pennsylvania events. The website presents booking information, services, pricing guidance, merchandise, partnership opportunities, and public event updates.

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
npm run build
npm run start
```

`npm run build` performs the production TypeScript and route validation. `npm run start` serves the production build locally.

## Routes

- `/` - Main marketing and booking overview
- `/contact` - Inquiry form with client-side validation and an email-draft fallback
- `/merchandise` - Intentional launch placeholder for future ecommerce
- `/sitemap.xml` - Search engine sitemap
- `/robots.txt` - Crawler policy

The app also supplies a branded Open Graph/Twitter image, application icon, 404 page, and error recovery page through Next.js file conventions.

## Content Updates

Update [src/content/site-content.ts](src/content/site-content.ts) for shared contact details, live social profiles, navigation labels, public event cards, partnership categories, and the pop-up merchandise store URL. The `publicEvents` array intentionally starts empty so only confirmed appearances are published.

Images are stored in `public/images/`. Use `next/image` for site imagery and supply meaningful alt text. Do not reintroduce stock event photography when a client asset is available.

## Booking Integration

The contact form currently validates all inputs in the browser and opens a prefilled email draft addressed to Ambu Bar. Validation and mailto generation live in [src/lib/inquiry.ts](src/lib/inquiry.ts).

To connect a CRM, form provider, or server action later:

1. Keep the `InquiryValues` contract in `src/lib/inquiry.ts`.
2. Replace the `window.location.assign(buildInquiryMailto(...))` call in [src/components/contact/contact-page.tsx](src/components/contact/contact-page.tsx) with the integration submission.
3. Preserve the field-level validation and success/error messaging so the accessible form behavior remains intact.

## Deployment Checklist

- Confirm `https://www.ambubar.com` is the canonical production domain, or update `business.website` in `src/content/site-content.ts`.
- Verify email, phone, and social profile URLs before publishing.
- Add confirmed public appearances to `publicEvents`; do not publish tentative or private bookings.
- Connect the inquiry form to the chosen lead-management service.
- Test the production site at desktop and mobile widths after deployment.
