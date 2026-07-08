/* ============================================================
   Desi Mail Club — order status data
   Update this file by hand as you pack and mail each order.
   Redeploy the site (git push) and the Track My Mail page
   updates instantly. No customer emails or addresses here —
   only order numbers, so nothing private is ever public.

   stage: 1 = Order received
          2 = Moru is packing your envelope
          3 = In the mail
          4 = Delivered (mark this if a parent confirms)

   note (optional): a short friendly line shown under the tracker.
   mailedOn (optional): shown when stage >= 3.
   ============================================================ */

window.DMC_ORDERS = {
  /* Sample orders — replace with real ones. */
  "DMC-0001": { stage: 3, mailedOn: "July 3", note: "On its way — watch the mailbox!" },
  "DMC-0002": { stage: 2 },
  "DMC-0003": { stage: 1 },
};
