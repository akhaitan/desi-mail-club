# Desi Mail Club — Azadi Edition 🦚✉️

A clean, mobile-first landing page for a kids' cultural snail-mail product.
No frameworks, no build step — plain HTML/CSS/JS you can deploy anywhere in minutes.

## What's here

```
desi-mail-club/
├── index.html        # Landing page
├── status.html       # "Track my mail" — order status lookup
├── css/styles.css    # All styles (design tokens at the top)
├── js/config.js      # ⭐ THE ONLY FILE YOU EDIT TO GO LIVE
├── js/main.js        # CTA logic, banner, forms, animations
├── js/status.js      # Order tracker logic
├── data/orders.js    # ⭐ Order statuses — update by hand as you pack & mail
└── assets/favicon.svg
```

## Run it locally

Just open `index.html` in a browser — everything works from the filesystem.
Or serve it properly:

```bash
cd desi-mail-club
npx serve .        # or: python3 -m http.server 8000
```

## Go-live checklist (~15 minutes)

1. **Email capture** — create a free form at [formspree.io](https://formspree.io),
   copy the endpoint URL (`https://formspree.io/f/xxxxxxx`) into
   `formspreeEndpoint` in `js/config.js`. Both the club-list form and the
   reserve modal will start delivering to your inbox.

2. **Payments (when ready)** — in the [Stripe dashboard](https://dashboard.stripe.com/payment-links),
   create a Payment Link:
   - Product: *Desi Mail Club — Azadi Edition*, $19
   - Turn on **Collect shipping address**
   - Add a **custom field**: "Child's first name" (this powers the personalization!)

   Paste the link into `stripePaymentLink` in `js/config.js`. Every buy button
   on the site instantly switches from "reserve" mode to real checkout.
   Nothing else to change.

3. **Deadline banner** — dates live in `js/config.js`. After Independence Day,
   set `showDeadlineBanner: false` to sell the pack evergreen.

## Order status workflow (no backend needed)

1. When an order comes in (Stripe emails you), assign it the next number:
   `DMC-0001`, `DMC-0002`, …
2. Email the customer their order number (Stripe's receipt email can include it,
   or send a quick personal note — nice touch for a small brand).
3. Add/update the order in `data/orders.js`:

   ```js
   "DMC-0007": { stage: 2 },                                  // packing
   "DMC-0007": { stage: 3, mailedOn: "Aug 2" },               // mailed
   "DMC-0007": { stage: 4, note: "Hope the flag came out great!" }, // delivered
   ```

4. Push/redeploy — the Track My Mail page updates immediately.

**Privacy by design:** `orders.js` contains only order numbers and stages —
never names, emails, or addresses — so it's safe to serve publicly.

## Deploy free

- **Netlify / Vercel**: drag the folder in, done.
- **GitHub Pages**: push this repo, enable Pages on `main`.

Updating an order status is just an edit + push.

## Swapping in commissioned art later

All illustrations are hand-coded inline SVGs, marked with HTML comments
(e.g. `<!-- Moru the peacock (swap this SVG block...) -->`). Replace any block
with an `<img src="assets/your-art.png">` of the same footprint whenever you
commission painted artwork like your reference image.

## Design tokens

Palette (in `css/styles.css` `:root`): saffron `#F0862F` · India green `#1E8A50`
· peacock teal `#12808F` · chakra blue `#2D4B9A` · warm paper `#FFFDF8`.
Type: Fraunces (display) · Baloo 2 (accents — by Ek Type, Mumbai 🇮🇳) · Mulish (body).
