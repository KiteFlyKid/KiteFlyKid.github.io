/* A growing tree: answers stay visible, and selecting a branch reveals its advice. */
(function () {
  "use strict";
  const guide = window.ScamGuide;
  const app = document.getElementById("scam-tree-app");
  if (!guide || !app) return;
  const stages = document.getElementById("scam-tree-stages");
  const reset = document.getElementById("scam-tree-reset");
  const status = document.getElementById("scam-tree-status");
  let answers = {};

  const views = {
    money: { title: "Did money go out?", options: [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]] },
    payment: {
      title: "How did you pay?", hint: "You can pick more than one.",
      options: [["bank", "Bank / card"], ["app", "Payment app"], ["gift", "Gift card"], ["crypto", "Crypto"], ["cash", "Cash"], ["other", "Another way"]]
    },
    exposure: {
      title: "Did you share anything else?", hint: "Pick every branch that fits.",
      options: [["account", "Password / code"], ["identity", "Personal info"], ["device", "A click / device access"], ["none", "Nothing else"], ["unsure", "Not sure"]]
    },
    identity: {
      title: "What information?", hint: "You can pick more than one.",
      options: [["bank", "Bank / card details"], ["id", "SSN / ID"], ["contact", "Contact details"], ["unsure", "Not sure"]]
    },
    device: {
      title: "What happened on the device?",
      options: [["link", "Just a link"], ["download", "A download / app"], ["remote", "Remote access"], ["unsure", "Not sure"]]
    }
  };
  const brief = {
    "check-money": ["Check your accounts first.", "Use your real bank or payment app on a trusted device. Anything unfamiliar? Contact the provider now."],
    "payment-bank": ["Contact your bank or card issuer now.", "Use the real app or the number on your card. Explain what happened and ask whether they can stop or reverse the payment."],
    "payment-app": ["Contact the payment app now.", "Ask its official support about reversing the payment. If a linked bank or card was charged, contact them too."],
    "payment-gift": ["Call the gift card company.", "Keep the card and receipt. Ask the issuer to freeze the remaining balance and whether a refund is possible."],
    "payment-crypto": ["Contact the exchange or ATM operator.", "Crypto usually can't be reversed. Ask about recovery options, and save the wallet address and transaction ID."],
    "payment-cash": ["Mailed cash? Try to stop delivery.", "Contact the delivery company immediately. If it was already delivered or handed over, contact local police."],
    "account": ["Secure the account.", "On a trusted device, change exposed or reused passwords, sign out other sessions, and turn on two-factor authentication. Locked out? Use official account recovery."],
    "code": ["Shared a code?", "Contact the provider and check account activity, even if the code has expired. Google Voice has its own recovery steps."],
    "bank-details": ["Tell your bank or card issuer.", "Ask how to protect the account or replace the card. Check transactions and report unfamiliar charges."],
    "identity": ["Protect your identity.", "Use IdentityTheft.gov for steps that fit what you shared. Consider a free credit freeze at all three bureaus to help prevent new credit accounts."],
    "contact": ["Be careful with follow-up messages.", "Knowing your name or address doesn't make someone trustworthy. Verify new requests independently."],
    "link": ["Close the page.", "A click alone doesn't tell us if anything was compromised. Entered a password or personal details? Follow those branches too. Suspect a download? Check for malware."],
    "device": ["Use a different, trusted device.", "If remote access is still active, disconnect the affected device. Get trusted help to remove unwanted access and scan for malware before using it for sensitive tasks."],
    "review-exposure": ["Check what you shared.", "Look through the conversation without reopening suspicious links. Check account activity, then follow any branches that fit."]
  };

  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function sourceLink(key) {
    const [label, url] = guide.sources[key];
    const link = el("a", label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(el("span", " (new tab)", "sr-only"));
    return link;
  }
  function sketch(className) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    return svg;
  }
  function stroke(svg, d, selected) {
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", d);
    if (selected) path.setAttribute("class", "is-chosen");
    svg.append(path);
  }
  function selectedValues(key) {
    return Array.isArray(answers[key]) ? answers[key] : answers[key] ? [answers[key]] : [];
  }
  function choose(key, value) {
    if (guide.questions[key].type === "radio") {
      answers[key] = value;
    } else {
      const before = selectedValues(key);
      answers[key] = guide.selectionAfterChange(key, before, value, !before.includes(value));
    }
    answers = guide.cleanAnswers(answers);
    render({ key, value });
  }
  function question(key) {
    const view = views[key];
    const section = el("section", "", "tree-stage tree-question-stage");
    section.dataset.stage = key;
    section.setAttribute("aria-labelledby", "tree-question-" + key);
    const heading = el(key === "money" ? "h1" : "h2", view.title, "tree-question");
    heading.id = "tree-question-" + key;
    section.append(heading);
    if (view.hint) section.append(el("p", view.hint, "tree-hint"));
    const choices = el("div", "", "tree-choices");
    choices.setAttribute("role", "group");
    choices.setAttribute("aria-labelledby", heading.id);
    const selected = selectedValues(key);
    choices.classList.toggle("has-selection", selected.length > 0);
    view.options.forEach(([value, text], index) => {
      const button = el("button", text, "tree-choice");
      button.type = "button";
      button.dataset.value = value;
      button.dataset.key = key;
      button.style.setProperty("--branch-tilt", (index % 2 ? ".6" : "-.6") + "deg");
      button.setAttribute("aria-pressed", String(selected.includes(value)));
      button.addEventListener("click", () => choose(key, value));
      choices.append(button);
    });
    section.append(sketch("tree-choice-lines"), choices);
    return section;
  }
  function note(action, alt) {
    const copy = alt || brief[action.id];
    if (!copy) return null;
    const article = el("article", "", "tree-note");
    article.dataset.action = action.id;
    article.append(el("h3", copy[0]), el("p", copy[1]));
    const details = el("details", "", "tree-detail");
    details.append(el("summary", "Details & sources"));
    details.append(el("p", action.text));
    const links = el("div", "", "tree-sources");
    action.refs.forEach(key => links.append(sourceLink(key)));
    details.append(links);
    article.append(details);
    return article;
  }
  function notes(actions, ids, context) {
    const selected = actions.filter(action => ids.includes(action.id));
    if (!selected.length) return;
    const group = el("div", "", "tree-notes");
    if (context) group.setAttribute("aria-label", context);
    for (let action of selected) {
      let alt;
      if (action.id === "payment-bank" && selectedValues("payment").includes("other")) {
        alt = ["Contact the payment provider.", "Contact the bank, card issuer, or payment service you used. For a wire, call the transfer service; for a check, ask your bank about stopping payment."];
        action = { ...action, text: "For a wire service such as Western Union or MoneyGram, contact the service immediately and ask for a refund. For a check you sent, ask your bank about stopping payment; fees may apply. For another method, contact the provider you used.", refs: ["response", "check"] };
      }
      const leaf = note(action, alt);
      if (leaf) group.append(leaf);
    }
    stages.append(group);
  }
  function closing() {
    const section = el("section", "", "tree-ending");
    section.append(el("h2", "Keep the messages. Then block & report."));
    section.append(el("p", "Save the conversation and any payment records. You can report it even if you didn't lose money."));
    const links = el("div", "", "tree-sources");
    ["report", "ic3"].forEach(key => links.append(sourceLink(key)));
    section.append(links);
    if (answers.money !== "no") {
      const warning = el("p", "And don't pay someone who promises to get your money back.", "tree-small-note");
      section.append(warning);
    }
    stages.append(section);
  }
  function render(origin) {
    stages.replaceChildren();
    stages.append(sketch("tree-trunk"), question("money"));
    const actions = guide.actionsFor(answers);
    if (answers.money) {
      if (answers.money === "yes") {
        stages.append(question("payment"));
        notes(actions, ["payment-bank", "payment-app", "payment-gift", "payment-crypto", "payment-cash"], "Payment steps");
      } else if (answers.money === "unsure") notes(actions, ["check-money"]);
      if (answers.money !== "yes" || selectedValues("payment").length) {
        stages.append(question("exposure"));
        // Device safety comes before any instructions to sign in to an account.
        if (selectedValues("exposure").includes("device")) {
          stages.append(question("device"));
          if (answers.device) notes(actions, answers.device === "link" ? ["link"] : ["device", "account", ...(answers.device === "remote" ? ["bank-details"] : [])], "Device steps");
        }
        if (selectedValues("exposure").includes("account")) {
          const ids = answers.device && answers.device !== "link" ? ["code"] : ["account", "code"];
          notes(actions, ids, "Account steps");
        }
        if (selectedValues("exposure").includes("identity")) {
          stages.append(question("identity"));
          const ids = answers.device === "remote" ? ["identity", "contact"] : ["bank-details", "identity", "contact"];
          notes(actions, ids, "Personal information steps");
        }
        notes(actions, ["review-exposure"]);
        const ready = selectedValues("exposure").length &&
          (!selectedValues("exposure").includes("identity") || selectedValues("identity").length) &&
          (!selectedValues("exposure").includes("device") || answers.device);
        if (ready) closing();
      }
    }
    reset.hidden = !answers.money;
    requestAnimationFrame(drawLines);
    if (origin) {
      const selector = '[data-key="' + origin.key + '"][data-value="' + origin.value + '"]';
      stages.querySelector(selector)?.focus({ preventScroll: true });
      const label = views[origin.key].options.find(option => option[0] === origin.value)[1];
      const selected = selectedValues(origin.key).includes(origin.value);
      status.textContent = label + (selected ? " selected. Follow the branch below." : " removed. Tree updated.");
      if (selected) requestAnimationFrame(() => {
        const branch = stages.querySelector('[data-stage="' + origin.key + '"]');
        const next = branch?.nextElementSibling;
        if (next && next.getBoundingClientRect().bottom > window.innerHeight - 24) {
          next.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }
      });
    }
  }
  function drawLines() {
    const stageBox = stages.getBoundingClientRect();
    for (const section of stages.querySelectorAll(".tree-question-stage")) {
      const svg = section.querySelector(".tree-choice-lines");
      const box = section.getBoundingClientRect();
      const heading = section.querySelector(".tree-question").getBoundingClientRect();
      svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
      svg.replaceChildren();
      const x = heading.left + heading.width / 2 - box.left;
      const y = heading.bottom - box.top + 7;
      for (const button of section.querySelectorAll(".tree-choice")) {
        const b = button.getBoundingClientRect();
        const bx = b.left + b.width / 2 - box.left;
        const by = b.top - box.top - 5;
        const bend = Math.min(40, (by - y) * .6);
        stroke(svg, "M " + x + " " + y + " C " + x + " " + (y + bend) + ", " + bx + " " + (by - 18) + ", " + bx + " " + by, button.getAttribute("aria-pressed") === "true");
      }
    }
    const trunk = stages.querySelector(".tree-trunk");
    trunk.setAttribute("viewBox", "0 0 " + stageBox.width + " " + stageBox.height);
    trunk.replaceChildren();
    const blocks = [...stages.children].filter(node => node !== trunk);
    for (let i = 1; i < blocks.length; i++) {
      const prev = blocks[i - 1];
      const next = blocks[i];
      const a = prev.getBoundingClientRect();
      const b = next.getBoundingClientRect();
      const chosen = prev.querySelectorAll('.tree-choice[aria-pressed="true"]');
      const endpoints = chosen.length ? [...chosen] : [prev];
      for (const endpoint of endpoints) {
        const e = endpoint.getBoundingClientRect();
        const x = e.left + e.width / 2 - stageBox.left;
        const y = chosen.length ? e.bottom - stageBox.top + 5 : a.bottom - stageBox.top + 5;
        const nx = b.left + b.width / 2 - stageBox.left;
        const ny = b.top - stageBox.top - 8;
        // In a wrapped answer row, route below all answers to avoid crossing buttons.
        const mid = Math.max(y + 15, a.bottom - stageBox.top + 16);
        stroke(trunk, "M " + x + " " + y + " C " + x + " " + mid + ", " + nx + " " + (ny - 20) + ", " + nx + " " + ny, true);
      }
    }
  }
  reset.addEventListener("click", () => {
    answers = {};
    render();
    const heading = stages.querySelector("h1");
    heading.tabIndex = -1;
    heading.focus();
    status.textContent = "Tree reset.";
  });
  render();
  app.hidden = false;
  document.getElementById("scam-tree-fallback").hidden = true;
  const observer = new ResizeObserver(drawLines);
  observer.observe(stages);
  window.addEventListener("resize", drawLines);
})();
