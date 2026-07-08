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
├── js/analytics.js   # GoatCounter loader (only runs when configured)
├── data/orders.js    # ⭐ Order statuses — update by hand as you pack & mail
├── 404.html          # Moru-voiced not-found page
├── sitemap.xml, robots.txt
├── netlify.toml, vercel.json   # headers/caching if you ever switch hosts
└── assets/           # favicon, social share card, touch icon
```

## Run it locally

Just open `index.html` in a browser — everything works from the filesystem.
Or serve it properly:

```bash
cd desi-mail-club
npx serve .        # or: python3 -m http.server 8000
```

## Live services (all connected as of July 2026)

Everything is wired through `js/config.js` — one field per service:

1. **Payments — LIVE.** Buy buttons go to a Stripe Payment Link
   (`buy.stripe.com/00w6oHgQs22Id6t8NJbZe00`) that collects payment,
   a US shipping address, and a required **"Child's first name"** custom
   field (powers the letter personalization). Manage it in the
   [Stripe dashboard](https://dashboard.stripe.com/payment-links)
   (account: Desi Mail Club). For a future edition (Diwali, Holi), create
   a new product + Payment Link and swap `stripePaymentLink`. To pause
   sales, deactivate the link in Stripe — buy buttons then fall back to
   the "reserve your pack" email modal only if you also blank the config
   field.

2. **Email capture — LIVE.** Club-list form and reserve modal deliver via
   Formspree (`formspree.io/f/xkolavgg`). Free tier caps at
   50 submissions/month — upgrade if reservation volume grows.

3. **Analytics — LIVE.** GoatCounter (cookie-free, no consent banner).
   Dashboard: https://desimailclub.goatcounter.com. The loader
   (`js/analytics.js`) skips localhost and file:// previews, so local
   testing never pollutes the stats.

4. **Deadline banner** — dates live in `js/config.js`. After Independence
   Day, set `showDeadlineBanner: false` to sell the pack evergreen.

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

## Deploy

**Live now on GitHub Pages**: https://akhaitan.github.io/desi-mail-club/
— every push to `main` redeploys in about a minute. Updating an order
status is just an edit + push.

If you ever want to switch hosts, `netlify.toml` and `vercel.json` are
already configured (they also add security + caching headers, which GitHub
Pages can't do): connect the GitHub repo on Netlify/Vercel and it deploys
with no build step.

**Custom domain later**: point desimailclub.com at Pages in the repo
settings, then swap the URL prefix in `index.html`, `status.html`,
`404.html`, `sitemap.xml`, and `robots.txt` (grep for `akhaitan.github.io`).

## Swapping in commissioned art later

All illustrations are hand-coded inline SVGs, marked with HTML comments
(e.g. `<!-- Moru the peacock (swap this SVG block...) -->`). Replace any block
with an `<img src="assets/your-art.png">` of the same footprint whenever you
commission painted artwork like your reference image.

## Design tokens

Palette (in `css/styles.css` `:root`): saffron `#F0862F` · India green `#1E8A50`
· peacock teal `#12808F` · chakra blue `#2D4B9A` · warm paper `#FFFDF8`.
Type: Fraunces (display) · Baloo 2 (accents — by Ek Type, Mumbai 🇮🇳) · Mulish (body).
