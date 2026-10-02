# Scam notes and tools

The homepage section and collection share one content file. Work was developed on `codex/scam-notes-draft` before integration into `main`.

## Content

- `_data/scam_research.yml` holds the `/scams/` entries and their destinations.
- `_includes/scam_research.liquid` renders the homepage paragraph and `/scams/` collection.
- `_pages/scams.md` defines the collection page.
- `_pages/scam-fraud-deception.md` is the editable, published article.
- Styles are scoped under `.scam-research` in `assets/css/custom.css`.

The interactive scam-response guide and the fraud/scam article have their own pages. The US map card links to its existing demo. Scam Daily has a placeholder page while the tool is being built. Each card is clickable across the whole block.

Edit the shared data while developing the content. When an article or tool is ready, replace its description, update its status, and add a `url` to the shared data. The project descriptions are drafts, not claims that the tools are already available.

## Review and version control

Review changes with `git diff` and `git status`, run the guide tests, and build the site before committing. A push to `main` triggers the existing deployment workflow. Keep future tool development on a separate branch until it is ready to publish.

## Interactive scam-response guide

- `/scams/what-next/` is linked from the homepage and collection.
- `_pages/scam-what-next.html`: minimal tree canvas, no-JavaScript fallback, and folded source notes.
- `assets/js/scam-guide-core.js`: questions, routing, checklist copy, and official source URLs.
- `assets/js/scam-guide.js`: short branch labels and advice, native answer buttons, immediate unfolding, and SVG connectors.
- `assets/css/scam-guide.css`: scoped responsive, light/dark, and print styles.
- `docs/tests/scam-guide.test.cjs`: routing and mixed-exposure regression checks; run `node --test docs/tests/scam-guide.test.cjs`.

The page starts with “Did money go out?” and three choices. Clicking an answer reveals a connected branch; earlier answers stay visible and editable. Payment and exposure branches allow multiple choices. Short advice appears in the tree, with longer guidance and sources inside disclosures. There is no separate form, progress tracker, or checklist screen. Changing a parent answer removes inapplicable child branches. Device advice includes account protection even without known password sharing. No answers are persisted or sent anywhere. The drawing uses native SVG/CSS, system fonts, and no external dependencies. Reduced-motion preferences are respected.

US guidance was checked September 25, 2026 against the FTC, CFPB, FBI IC3, and USPS pages linked in the guide. Recheck those sources and the review date when changing advice. Refunds and investigations are not promised. Credit freezes concern new credit, and a click alone is not labeled either safe or compromised. A payment dispute is distinct from a law-enforcement report.
