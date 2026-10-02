const test = require("node:test");
const assert = require("node:assert/strict");
const guide = require("../../assets/js/scam-guide-core.js");
const ids = answers => guide.actionsFor(answers).map(action => action.id);

test("no payment and no exposure goes straight to evidence and reporting", () => {
  const answers = { money: "no", exposure: ["none"] };
  assert.deepEqual(guide.stepsFor(answers), ["money", "exposure"]);
  assert.deepEqual(ids(answers), ["evidence", "report"]);
});
test("mixed exposure preserves every relevant branch and puts a trusted device first", () => {
  const answers = { money: "yes", payment: ["card", "gift"], exposure: ["account", "identity", "device"], identity: ["bank", "id"], device: "remote" };
  assert.deepEqual(guide.stepsFor(answers), ["money", "payment", "exposure", "identity", "device"]);
  const result = ids(answers);
  assert.equal(result[0], "device");
  for (const id of ["payment-bank", "payment-gift", "account", "code", "bank-details", "identity", "evidence", "report", "recovery"]) assert.ok(result.includes(id), id);
  assert.equal(new Set(result).size, result.length);
});
test("changing parent answers drops obsolete payment and exposure details", () => {
  const answers = guide.cleanAnswers({ money: "no", payment: ["crypto"], exposure: ["none"], identity: ["id"], device: "remote" });
  assert.deepEqual(answers, { money: "no", exposure: ["none"] });
  assert.deepEqual(ids(answers), ["evidence", "report"]);
});
test("exclusive options replace exposures and selecting an exposure replaces none", () => {
  assert.deepEqual(guide.selectionAfterChange("exposure", ["account", "device"], "none", true), ["none"]);
  assert.deepEqual(guide.selectionAfterChange("exposure", ["none"], "identity", true), ["identity"]);
  assert.deepEqual(guide.selectionAfterChange("exposure", ["account"], "unsure", true), ["unsure"]);
  assert.deepEqual(guide.selectionAfterChange("identity", ["id"], "unsure", true), ["unsure"]);
  assert.deepEqual(guide.selectionAfterChange("exposure", ["account", "device"], "device", false), ["account"]);
});
test("even inconsistent input cannot preserve hidden children", () => {
  assert.deepEqual(guide.cleanAnswers({ money: "no", exposure: ["none", "identity"], identity: ["id"] }), { money: "no", exposure: ["none"] });
});
test("each payment method gets a recovery contact", () => {
  const expected = { bank: "payment-bank", card: "payment-bank", check: "payment-bank", other: "payment-bank", app: "payment-app", wire: "payment-wire", gift: "payment-gift", crypto: "payment-crypto", cash: "payment-cash" };
  for (const [method, action] of Object.entries(expected)) assert.ok(ids({ money: "yes", payment: [method], exposure: ["none"] }).includes(action), method);
});
test("not sure never silently becomes no", () => {
  const result = ids({ money: "unsure", exposure: ["unsure"] });
  for (const id of ["check-money", "review-exposure", "recovery"]) assert.ok(result.includes(id));
});
test("a click alone does not assert account compromise", () => {
  const result = ids({ money: "no", exposure: ["device"], device: "link" });
  assert.ok(result.includes("link"));
  assert.ok(!result.includes("device"));
  assert.ok(!result.includes("account"));
});
test("remote access secures accounts even when no password was knowingly shared", () => {
  const result = ids({ money: "no", exposure: ["device"], device: "remote" });
  assert.equal(result[0], "device");
  assert.ok(result.includes("account"));
  assert.ok(result.includes("bank-details"));
});
test("bank information and identity documents get different protection steps", () => {
  assert.ok(!ids({ money: "no", exposure: ["identity"], identity: ["contact"] }).includes("identity"));
  assert.ok(ids({ money: "no", exposure: ["identity"], identity: ["bank"] }).includes("bank-details"));
  assert.ok(ids({ money: "no", exposure: ["identity"], identity: ["id"] }).includes("identity"));
});
test("every result has official source links and unique action IDs", () => {
  const answers = { money: "yes", payment: guide.questions.payment.options.map(option => option[0]), exposure: ["account", "identity", "device"], identity: ["bank", "id", "contact"], device: "remote" };
  const actions = guide.actionsFor(answers);
  assert.equal(actions.length, new Set(actions.map(action => action.id)).size);
  for (const action of actions) {
    assert.ok(action.refs.length, action.id);
    for (const key of action.refs) {
      assert.ok(guide.sources[key], key);
      const hostname = new URL(guide.sources[key][1]).hostname;
      assert.ok(hostname.endsWith(".gov") || hostname === "www.usps.com", hostname);
    }
  }
});
