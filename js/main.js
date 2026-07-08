/* Desi Mail Club — main.js
   Reads window.DMC_CONFIG (js/config.js). No frameworks, no build. */

(function () {
  "use strict";
  var CFG = window.DMC_CONFIG || {};

  /* ---------- Price + dates from config ---------- */
  document.querySelectorAll(".js-price").forEach(function (el) {
    el.textContent = CFG.price || "$19";
  });
  document.querySelectorAll(".js-order-by").forEach(function (el) {
    el.textContent = CFG.orderByDate || "August 1";
  });

  /* ---------- Deadline banner ---------- */
  var banner = document.getElementById("deadline-banner");
  if (banner && CFG.showDeadlineBanner) {
    var by = document.getElementById("banner-order-by");
    var hol = document.getElementById("banner-holiday");
    if (by) by.textContent = CFG.orderByDate || "August 1";
    if (hol) hol.textContent = CFG.holidayDate || "August 15";
    banner.hidden = false;
  }

  /* ---------- Buy buttons: Stripe link if set, reserve modal if not ---------- */
  var modal = document.getElementById("reserve-modal");
  var hasStripe = typeof CFG.stripePaymentLink === "string" && CFG.stripePaymentLink.trim() !== "";

  document.querySelectorAll(".js-buy").forEach(function (btn) {
    if (hasStripe) {
      btn.setAttribute("href", CFG.stripePaymentLink);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
    } else if (modal && typeof modal.showModal === "function") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.showModal();
      });
    }
    /* If <dialog> is unsupported and Stripe isn't set, buttons keep their static href (the live Stripe link, hardcoded in markup as a no-JS fallback). */
  });

  /* ---------- Email forms (Formspree, with demo mode) ---------- */
  document.querySelectorAll(".js-email-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.parentElement.querySelector(".form-msg");
      var emailInput = form.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : "";
      if (!email) return;

      var endpoint = (CFG.formspreeEndpoint || "").trim();
      var kind = form.getAttribute("data-kind") || "Signup";

      function ok(text) {
        if (msg) { msg.textContent = text; msg.classList.remove("error"); }
        form.reset();
      }
      function fail(text) {
        if (msg) { msg.textContent = text; msg.classList.add("error"); }
      }

      /* Demo mode: no endpoint configured yet. */
      if (!endpoint) {
        ok(kind === "Question"
          ? "Got it! 🦚 (Demo mode — add your Formspree endpoint in js/config.js to receive real messages.)"
          : "You're on the list! 🦚 (Demo mode — add your Formspree endpoint in js/config.js to collect for real.)");
        return;
      }

      var data = new FormData(form);
      data.append("_subject", "Desi Mail Club — " + kind);
      data.append("kind", kind);

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            var successText = "You're in the club! 🦚 Watch your inbox.";
            if (kind === "Pack reservation") successText = "Reserved! 🦚 We'll email you the moment checkout opens.";
            if (kind === "Question") successText = "Got it! 🦚 A real human will reply within a day or two.";
            ok(successText);
          } else {
            fail("Hmm, that didn't go through. Mind trying again?");
          }
        })
        .catch(function () {
          fail("Couldn't reach the mailroom — check your connection and try again.");
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });

  /* ---------- Scroll reveal (respects reduced motion via CSS) ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
