# Desi Mail Club — Azadi Edition

Kids' cultural snail-mail product: an India Independence Day activity pack for
little desi kids (ages 4–7, sweet spot: 5-year-old beginner readers), delivered
by physical mail. Audience: Indian/South Asian parents in the US who want
cultural connection + screen-free fun. One-time $19, free US shipping, with a
"collect the year" teaser (Diwali Edition this fall, Holi next spring).

Mascot: **Moru the peacock**. Every pack includes a letter from Moru
personalized with the child's first name — that's the hero selling point.

## Voice & guardrails

- Tone: warm, playful, cultural, parent-friendly. **Never political or
  religious** (the FAQ addresses this head-on). Never preachy or overly
  patriotic.
- Trust pillars: founder note ("two desi parents in New Jersey"), the "Moru
  Promise" (no-fuss full refund), honest FAQ, **honest urgency only** — the
  order-by-Aug-1 deadline is real (mail transit for Aug 15). No fake scarcity,
  ever.
- Pack contents are real and locked (see index.html "What's inside") — don't
  invent new items.

## Tech decisions (deliberate — don't change without asking)

- Plain HTML/CSS/JS, **zero build step**, deployable on any static host.
- `js/config.js` is the ONLY go-live config file:
  - `stripePaymentLink` — empty = buy buttons open the "reserve" email modal;
    set = buttons become real Stripe checkout. The Stripe Payment Link must
    collect shipping address + a custom "Child's first name" field.
  - `formspreeEndpoint` — empty = forms run in demo mode.
  - `goatCounterCode` — empty = no analytics script loads at all.
  - `clarityProjectId` — Microsoft Clarity (heatmaps + session recordings,
    for seeing what visitors actually click). Empty = no script loads.
    Clarity sets its own cookies, unlike GoatCounter — add a consent
    banner before enabling it if EU/UK traffic becomes meaningful.
  - price, deadline banner toggle/dates.
- Order tracking with no backend: `data/orders.js` maps order numbers
  (`DMC-0001` style) → `{ stage: 1–4, mailedOn?, note? }`. Stages: received →
  packing → in the mail → delivered. Owner edits by hand and pushes.
  **PRIVACY RULE: orders.js is public — order numbers and stages only, never
  names/emails/addresses.** This repo is public (GitHub Pages), so nothing
  private goes in the repo, ever.
- `status.html` renders the 4-stage Moru journey tracker from that file.
- Design tokens (css/styles.css `:root`): saffron `#F0862F`, India green
  `#1E8A50`, peacock teal `#12808F`, chakra blue `#2D4B9A`, warm paper
  `#FFFDF8`. Fonts: Fraunces (display), Baloo 2 (accents/buttons), Mulish
  (body). Signature motif: tricolor "airmail" stripe dividers + watercolor
  hero washes.
- All illustrations are hand-coded inline SVGs marked with comments for later
  swapping with commissioned art. Mobile-first, reduced-motion respected,
  keyboard focus visible — keep it that way.

## Go-live status (2026-07-08: fully live)

All three `js/config.js` switches are set and deployed:

- **Stripe** (live mode, account `acct_1TqnIxHrIxx7sxmI` "Desi Mail Club",
  activated — charges + payouts enabled, statement descriptor DESI MAIL
  CLUB): product `prod_UqUOCif6JzEV1W`, price `price_1TqnPdHrIxx7sxmIIafDCFs3`
  ($19 one-time), payment link `plink_1TqnPzHrIxx7sxmIjfPW84ml` →
  https://buy.stripe.com/00w6oHgQs22Id6t8NJbZe00. US-only shipping address
  collection, required custom field "Child's first name (for Moru's letter)"
  (max 30 chars), Moru-voiced hosted confirmation, dynamic payment methods.
  Quantity fixed at 1 on purpose: one order = one child's name. The Stripe
  MCP server (mcp.stripe.com) + official Stripe plugin are configured for
  this project and authenticated to this account in **live mode**.
  NOTE: no real end-to-end purchase has been tested yet (a live
  buy-and-refund or a test-mode twin link are the options).
- **Formspree**: `https://formspree.io/f/xkolavgg` — free tier,
  50 submissions/month cap.
- **GoatCounter**: code `desimailclub`, dashboard
  https://desimailclub.goatcounter.com. Loader in `js/analytics.js` skips
  localhost/file:// so local previews don't pollute stats.

## Production setup (July 2026)

- **Live at**: https://desimailclub.com/ (custom domain, purchased
  2026-07-08). Served via GitHub Pages, deploy-from-branch `main`, root, with
  a `CNAME` file in the repo root pinning the domain. DNS: apex `A` records
  to GitHub's four Pages IPs (185.199.108/109/110/111.153) + `www` `CNAME` to
  `akhaitan.github.io`, "Enforce HTTPS" on. Push to `main` = deploy in ~1
  minute. The old `https://akhaitan.github.io/desi-mail-club/` URL still
  resolves (GitHub Pages keeps serving both) but all canonical/OG/sitemap
  URLs in the repo now point at desimailclub.com — don't reintroduce the old
  host when editing these files.
- Repo: https://github.com/akhaitan/desi-mail-club (public — required for
  Pages on the free plan). An earlier note referenced a "desi-mall-club"
  remote; that was a typo, the real repo uses "mail".
- `netlify.toml` / `vercel.json` carry security + cache headers and make a
  future move to Netlify/Vercel zero-config. GitHub Pages ignores them (it
  doesn't support custom headers).
- SEO surface: canonical + OG/Twitter meta and JSON-LD Product schema in
  `index.html`, `sitemap.xml`, `robots.txt`, `404.html` (Moru-voiced,
  absolute URLs), `assets/og-card.png` (1200×630 social card),
  `assets/apple-touch-icon.png`. All reference desimailclub.com at root
  (no `/desi-mail-club/` path prefix — that was GitHub Pages project-site
  scoping, not needed on the custom domain).
- Analytics: GoatCounter via `js/analytics.js`, config-driven, cookie-free
  (no consent banner needed). Dashboard: https://desimailclub.goatcounter.com.
- Local files `context.txt`, `preview-*.html`, `desi-mail-club.zip` are
  gitignored on purpose — never commit them (public repo).
