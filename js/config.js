/* ============================================================
   Desi Mail Club — site configuration
   This is the ONLY file you need to edit to go live.
   ============================================================ */

window.DMC_CONFIG = {
  /* 1) PAYMENTS — paste your Stripe Payment Link here when ready.
        Create one at https://dashboard.stripe.com/payment-links
        (Product: "Desi Mail Club — Azadi Edition", $19, collect
        shipping address + add a custom field "Child's first name").
        While this is empty (""), the buy buttons open a
        "Reserve your pack" email form instead. */
  stripePaymentLink: "https://buy.stripe.com/00w6oHgQs22Id6t8NJbZe00",

  /* 2) EMAIL CAPTURE — paste your Formspree endpoint here.
        Create a free form at https://formspree.io and copy the
        URL that looks like: https://formspree.io/f/abcdwxyz
        While this is empty, forms run in demo mode (they show
        success but don't send anywhere). */
  formspreeEndpoint: "https://formspree.io/f/xkolavgg",

  /* 3) PRICE shown on buttons and the pricing card. */
  price: "$19",

  /* 4) DEADLINE BANNER — order-by date for Independence Day
        delivery. Set showDeadlineBanner to false to hide it
        (e.g., after Aug 15, or to sell the pack evergreen). */
  showDeadlineBanner: true,
  orderByDate: "August 1",
  holidayDate: "August 15",

  /* 5) ANALYTICS — free, private, no cookies (no consent banner
        needed). Sign up at https://www.goatcounter.com, pick a
        site code (e.g. "desimailclub"), and paste it here.
        Dashboard lives at https://YOURCODE.goatcounter.com.
        While this is empty, no analytics script loads at all. */
  goatCounterCode: "desimailclub",

  /* 6) CLICK/SESSION ANALYTICS — free, gives heatmaps + session
        recordings so you can see what people actually click on.
        Sign up at https://clarity.microsoft.com, create a project
        for this site, and paste the Project ID here (10-character
        code from Settings > Setup, e.g. "abc123defg").
        While this is empty, no Clarity script loads at all. */
  clarityProjectId: "xj9jtcvuff",
};
