/* Desi Mail Club — analytics.js
   Loads GoatCounter (goatcounter.com) and Microsoft Clarity only when
   their codes are set in js/config.js, and never on localhost or
   file:// previews.
   GoatCounter is cookie-free and GDPR-friendly — no consent banner.
   Clarity sets its own cookies for session recording/heatmaps — if you
   ever get EU/UK visitors at meaningful volume, add a consent banner
   before turning this on. */

(function () {
  "use strict";
  var CFG = window.DMC_CONFIG || {};

  var host = window.location.hostname;
  if (!host || host === "localhost" || host === "127.0.0.1" || window.location.protocol === "file:") return;

  var gcCode = (CFG.goatCounterCode || "").trim();
  if (gcCode) {
    var gc = document.createElement("script");
    gc.async = true;
    gc.src = "https://gc.zgo.at/count.js";
    gc.setAttribute("data-goatcounter", "https://" + gcCode + ".goatcounter.com/count");
    document.head.appendChild(gc);
  }

  var clarityId = (CFG.clarityProjectId || "").trim();
  if (clarityId) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }
})();
