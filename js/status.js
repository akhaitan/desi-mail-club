/* Desi Mail Club — status.js
   Looks up order numbers in window.DMC_ORDERS (data/orders.js)
   and renders Moru's 4-stage journey tracker. */

(function () {
  "use strict";

  var STAGES = [
    { emoji: "📬", name: "Order received", desc: "Moru has your order and is very excited about it." },
    { emoji: "🦚", name: "Moru is packing your envelope", desc: "Printing the letter with their name, tucking in every sticker." },
    { emoji: "✉️", name: "In the mail", desc: "Off with the postal service — typically 3–5 days from here." },
    { emoji: "🎉", name: "Delivered", desc: "Cue the mailbox dance. Say Jai Hind for us!" },
  ];

  var form = document.getElementById("status-form");
  var input = document.getElementById("order-input");
  var msg = document.getElementById("status-msg");
  var wrap = document.getElementById("tracker-wrap");
  var trackerEl = document.getElementById("tracker");
  var orderEl = document.getElementById("tracker-order");
  var noteEl = document.getElementById("tracker-note");

  function normalize(raw) {
    var v = raw.trim().toUpperCase().replace(/\s+/g, "");
    if (!v) return "";
    if (!/^DMC-/.test(v)) {
      v = v.replace(/^DMC/, "");
      v = "DMC-" + v.replace(/^-+/, "");
    }
    return v;
  }

  function render(orderNo, order) {
    orderEl.textContent = "Order " + orderNo;
    trackerEl.innerHTML = "";

    var stage = Math.min(Math.max(order.stage || 1, 1), STAGES.length);

    STAGES.forEach(function (s, i) {
      var n = i + 1;
      var li = document.createElement("li");
      li.className = n < stage ? "done" : n === stage ? "current" : "todo";

      var dot = document.createElement("span");
      dot.className = "dot";
      dot.textContent = n <= stage ? s.emoji : "·";
      li.appendChild(dot);

      var name = document.createElement("span");
      name.className = "stage-name";
      name.textContent = s.name;
      li.appendChild(name);

      var desc = document.createElement("span");
      desc.className = "stage-desc";
      desc.textContent =
        n === 3 && stage >= 3 && order.mailedOn
          ? "Mailed on " + order.mailedOn + " — typically 3–5 days from there."
          : s.desc;
      li.appendChild(desc);

      trackerEl.appendChild(li);
    });

    if (order.note) {
      noteEl.textContent = order.note;
      noteEl.hidden = false;
    } else {
      noteEl.hidden = true;
    }

    wrap.hidden = false;
    wrap.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var orders = window.DMC_ORDERS || {};
    var orderNo = normalize(input.value);
    msg.textContent = "";
    msg.classList.remove("error");

    if (!orderNo) return;

    var order = orders[orderNo];
    if (order) {
      render(orderNo, order);
    } else {
      wrap.hidden = true;
      msg.textContent =
        "Hmm, we couldn't find " + orderNo + ". Double-check the number in your confirmation email — or write to hello@desimailclub.com and we'll find it for you.";
      msg.classList.add("error");
    }
  });
})();
