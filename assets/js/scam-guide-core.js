/* Decision rules and source-backed copy, shared by the browser and Node tests. */
(function (root, factory) {
  "use strict";
  const guide = factory();
  if (typeof module === "object" && module.exports) module.exports = guide;
  else root.ScamGuide = guide;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const sources = {
    response: ["FTC: after a scam", "https://consumer.ftc.gov/articles/what-do-if-you-were-scammed"],
    check: ["CFPB: stopping a check", "https://www.consumerfinance.gov/ask-cfpb/how-do-i-stop-payment-on-a-check-en-983/"],
    gift: ["FTC: gift card help", "https://consumer.ftc.gov/avoiding-reporting-gift-card-scams"],
    crypto: ["FTC: cryptocurrency", "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-scams"],
    mail: ["USPS: Package Intercept", "https://www.usps.com/manage/package-intercept.htm"],
    account: ["FTC: account recovery", "https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account"],
    code: ["FTC: shared verification codes", "https://consumer.ftc.gov/consumer-alerts/2024/03/whats-verification-code-why-would-someone-ask-me-it"],
    voice: ["FTC: Google Voice codes", "https://consumer.ftc.gov/consumer-alerts/2021/10/google-voice-scam-how-verification-code-scam-works-how-avoid-it"],
    identity: ["FTC: exposed personal information", "https://www.identitytheft.gov/databreach"],
    theft: ["FTC: identity theft recovery", "https://www.identitytheft.gov/"],
    freeze: ["FTC: credit freezes", "https://consumer.ftc.gov/articles/credit-freezes-and-fraud-alerts"],
    bank: ["CFPB: protect your accounts", "https://www.consumerfinance.gov/consumer-tools/bank-accounts/watch-accounts-closely-when-card-data-is-hacked/"],
    malware: ["FTC: checking for malware", "https://consumer.ftc.gov/articles/malware-how-protect-against-detect-and-remove-it"],
    phishing: ["FTC: phishing", "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams"],
    disconnect: ["FBI: remote-access scam response", "https://www.fbi.gov/contact-us/field-offices/anchorage/news/fbi-sees-increase-in-technical-support-scams-in-alaska"],
    tech: ["FBI: tech support scams", "https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/tech-support-scams"],
    evidence: ["FBI: evidence and reporting", "https://www.ic3.gov/Home/FAQ"],
    report: ["Report to the FTC", "https://reportfraud.ftc.gov/"],
    ic3: ["Report to FBI IC3", "https://www.ic3.gov/"],
    recovery: ["FTC: recovery scams", "https://consumer.ftc.gov/articles/refund-and-recovery-scams"]
  };
  const questions = {
    money: {
      title: "Did money go out?",
      hint: "Include payments you made and money taken without your permission.",
      type: "radio",
      options: [
        ["yes", "Yes", "I paid, sent money, or noticed money missing."],
        ["no", "No", "No money has gone out."],
        ["unsure", "I'm not sure", "I still need to check."]
      ]
    },
    payment: {
      title: "How did the money go out?",
      hint: "Choose every method involved.",
      type: "checkbox",
      options: [
        ["bank", "Bank transfer or Zelle"], ["card", "Credit or debit card"],
        ["app", "Payment app", "For example, PayPal, Venmo, or Cash App."],
        ["wire", "Wire service", "For example, Western Union or MoneyGram."],
        ["gift", "Gift card"], ["crypto", "Cryptocurrency"],
        ["cash", "Cash"], ["check", "Check"], ["other", "Another way / not sure"]
      ]
    },
    exposure: {
      title: "What else happened?",
      hint: "Even if you didn't pay, there may be something to secure. Choose all that apply.",
      type: "checkbox", exclusive: ["none", "unsure"],
      options: [
        ["account", "I shared a password or verification code", "Or approved a login / lost access to an account."],
        ["identity", "I shared personal or financial information", "For example, an ID, Social Security number, or card details."],
        ["device", "I clicked a link or gave device access", "Including a download, app, or remote-control session."],
        ["none", "None of these", "I only received or replied to the message or call."],
        ["unsure", "I'm not sure what I shared"]
      ]
    },
    identity: {
      title: "What information did you share?",
      hint: "Choose the types only. Don't enter any actual details.",
      type: "checkbox", exclusive: ["unsure"],
      options: [
        ["bank", "Bank account or card details"],
        ["id", "Social Security number or identity documents"],
        ["contact", "Name, email, phone number, or address"],
        ["unsure", "I'm not sure"]
      ]
    },
    device: {
      title: "What happened on your device?",
      hint: "Choose the closest match. If several apply, choose the one that gave them the most access.",
      type: "radio",
      options: [
        ["link", "I only opened a link", "I didn't download anything or allow remote access."],
        ["download", "I downloaded a file or installed something", "Including an attachment, app, or browser extension."],
        ["remote", "I let someone control my device"],
        ["unsure", "I'm not sure"]
      ]
    }
  };
  function stepsFor(answers) {
    const steps = ["money"];
    if (answers.money === "yes") steps.push("payment");
    steps.push("exposure");
    if ((answers.exposure || []).includes("identity")) steps.push("identity");
    if ((answers.exposure || []).includes("device")) steps.push("device");
    return steps;
  }
  function cleanAnswers(answers) {
    const clean = {};
    for (const key of Object.keys(questions)) {
      const question = questions[key];
      const allowed = question.options.map(option => option[0]);
      if (question.type === "checkbox") {
        let values = [...new Set((Array.isArray(answers[key]) ? answers[key] : []).filter(value => allowed.includes(value)))];
        const exclusive = values.find(value => (question.exclusive || []).includes(value));
        if (exclusive) values = [exclusive];
        if (values.length) clean[key] = values;
      } else if (allowed.includes(answers[key])) clean[key] = answers[key];
    }
    const active = stepsFor(clean);
    for (const key of Object.keys(clean)) if (!active.includes(key)) delete clean[key];
    return clean;
  }
  function selectionAfterChange(key, selected, value, checked) {
    const exclusive = questions[key].exclusive || [];
    if (!checked) return selected.filter(item => item !== value);
    if (exclusive.includes(value)) return [value];
    return [...new Set([...selected.filter(item => !exclusive.includes(item)), value])];
  }
  function hasAnswer(answers, key) {
    return Array.isArray(answers[key]) ? answers[key].length > 0 : Boolean(answers[key]);
  }
  function actionsFor(rawAnswers) {
    const answers = cleanAnswers(rawAnswers);
    const actions = [];
    const add = (id, title, text, refs) => actions.push({ id, title, text, refs });
    const exposed = answers.exposure || [];
    const payment = answers.payment || [];
    const identity = answers.identity || [];
    const deviceRisk = exposed.includes("device") && answers.device !== "link";
    if (deviceRisk) add("device", "Use a device you trust for the next steps",
      "Stop banking or entering passwords on the affected device. If someone still has remote control, disconnect it from the internet. On that device, get trusted help to remove remote-access tools and check for malware; update security software and run a scan. A scan alone can't prove everything is safe.",
      ["malware", "disconnect"]);
    if (answers.money === "unsure") add("check-money", "Check your real accounts",
      "Open your bank or payment provider's official app or site from a device you trust. Look for unfamiliar activity. If you find any, contact the provider immediately and explain what happened.",
      ["bank", "response"]);
    if (answers.money === "yes") {
      if (payment.some(method => ["bank", "card", "check", "other"].includes(method))) add("payment-bank", "Contact your bank or card issuer now",
        "Explain whether you were tricked into paying or the transaction was unauthorized. Ask whether they can stop, recall, or dispute it. Use the official app or the number on your card." + (payment.includes("check") ? " For a check you sent, ask about stopping payment; fees may apply." : ""),
        ["response", "bank", ...(payment.includes("check") ? ["check"] : [])]);
      if (payment.includes("app")) add("payment-app", "Report the payment in the app",
        "Contact the payment app's official support immediately. Ask whether the payment can be reversed or refunded. If a linked card or bank account was charged, contact that provider too.",
        ["response"]);
      if (payment.includes("wire")) add("payment-wire", "Call the wire-transfer service",
        "Tell the service you were scammed and ask it to stop the transfer or refund it immediately.",
        ["response"]);
      if (payment.includes("gift")) add("payment-gift", "Contact the gift card company",
        "Keep the card and receipt. Tell the issuer the number or PIN was shared with a scammer, and ask whether the balance can be frozen or refunded.",
        ["gift"]);
      if (payment.includes("crypto")) add("payment-crypto", "Report the crypto payment promptly",
        "Contact the real exchange or ATM operator and ask what recovery options exist. Crypto transfers usually can't be reversed. Keep wallet addresses and transaction IDs for your report.",
        ["response", "crypto", "evidence"]);
      if (payment.includes("cash")) add("payment-cash", "If you mailed cash, try to stop delivery",
        "Contact the delivery company immediately. USPS Package Intercept has eligibility limits, fees, and no guarantee of success. If cash was handed over or delivered, contact local police; there is no card-style reversal.",
        ["response", "mail", "ic3"]);
    }
    if (exposed.includes("account") || deviceRisk) add("account", "Secure the accounts involved",
      "Use the provider's real app or website from a device you trust. Change passwords that were shared or used on the affected device, plus any reused passwords. Sign out other sessions, and turn on two-factor authentication. Check recovery details and email-forwarding rules. Locked out? Use the provider's official recovery process.",
      ["account"]);
    if (exposed.includes("account")) add("code", "Shared a code or approved a login?",
      "Tell the provider and check for changes or transactions—even if the code has expired. If it was a Google Voice code, follow the specific number-reclaim steps below.",
      ["code", "voice"]);
    if (identity.includes("bank") || answers.device === "remote") add("bank-details", "Protect your bank and card accounts",
      "Contact your bank or card issuer through a trusted channel. Ask how to secure the affected account or replace the card. Review activity, including small unfamiliar charges, and report anything suspicious promptly.",
      ["bank"]);
    if (identity.includes("id") || identity.includes("unsure")) add("identity", "Make a plan for the information exposed",
      "Use IdentityTheft.gov's exposed-information steps. If someone has already used your identity, report it there for a recovery plan. For information that could enable new credit accounts, consider a free freeze at all three bureaus: Equifax, Experian, and TransUnion. A freeze doesn't stop misuse of existing accounts.",
      ["identity", "theft", "freeze"]);
    if (identity.includes("contact")) add("contact", "Expect more convincing follow-ups",
      "Someone knowing your name or address doesn't prove they're legitimate. Verify new requests using contact details you find independently. Don't share passwords or codes with someone who contacts you.",
      ["phishing", "code"]);
    if (exposed.includes("device") && answers.device === "link") add("link", "Close the page and check what happened",
      "A click alone doesn't tell us whether anything was compromised. If you typed a password or personal details, add those branches too. If a file may have downloaded or you suspect malware, update security software and run a scan.",
      ["phishing", "malware"]);
    if (exposed.includes("unsure")) add("review-exposure", "Work out what may have been shared",
      "Review the conversation without reopening suspicious links. Check your account activity and think through any information, codes, downloads, or access you provided. Use the linked guides if something looks unfamiliar, then update your answers here.",
      ["response", "phishing", "account"]);
    add("evidence", "Save the evidence, then stop contact",
      "Keep messages, usernames, phone numbers, links, receipts, and transaction details in a safe place. Report the sender to the platform and block further contact. You don't need to keep talking to gather more proof.",
      ["evidence", "phishing"]);
    add("report", "Report what happened",
      "You can report a suspected scam to the FTC, even if you didn't lose money. For internet-related crime, report to FBI IC3. Save your report confirmation. Reporting helps authorities, but doesn't guarantee a refund or an individual response.",
      ["report", "ic3", "evidence"]);
    if (answers.money !== "no") add("recovery", "Watch for the follow-up scam",
      "Be wary of anyone who contacts you promising to recover your money for an upfront fee. Don't send more money or financial details to an unexpected “recovery expert.”",
      ["recovery"]);
    return actions;
  }
  return { sources, questions, stepsFor, cleanAnswers, selectionAfterChange, hasAnswer, actionsFor };
});
