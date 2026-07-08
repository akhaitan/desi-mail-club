/* Desi Mail Club — analytics.js
   Loads GoatCounter (goatcounter.com) only when a site code is set
   in js/config.js, and never on localhost or file:// previews.
   GoatCounter is cookie-free and GDPR-friendly — no consent banner. */

(function () {
  "use strict";
  var CFG = window.DMC_CONFIG || {};
  var code = (CFG.goatCounterCode || "").trim();
  if (!code) return;

  var host = window.location.hostname;
  if (!host || host === "localhost" || host === "127.0.0.1" || window.location.protocol === "file:") return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + code + ".goatcounter.com/count");
  document.head.appendChild(s);
})();
