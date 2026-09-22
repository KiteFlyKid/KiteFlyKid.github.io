# Shang Ma’s academic website

Personal site at https://shangma.org, using the real [al-folio](https://github.com/alshedivat/al-folio) v1.2 theme runtime (`al_folio_core` 1.0.15). The theme provides the layouts, responsive navigation, typography, dark mode, and publication rendering. Only the necessary plugins are enabled; no demo posts or sample content are included.

## Preview locally

Use Ruby 3.1.3 and Bundler:

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Visit http://127.0.0.1:4000. `bundle exec jekyll build` creates `_site/`.

## Update content

- `_pages/about.md`: biography, news, and homepage.
- `_bibliography/papers.bib`: all publications. Set `selected = {true}` to feature a paper on the homepage. Acceptance status belongs in the venue field until final proceedings metadata is available.
- `_includes/experience.liquid`: both NEC Labs internships, shared by the homepage and CV.
- `_includes/education.liquid`: education, shared by the education page and CV.
- `_includes/services.liquid`: services, shared by the services page and CV.
- `_pages/cv.md`: printable web CV. Its print button also supports saving as PDF through the browser.
- `_data/socials.yml`: email and profile links.
- `_config.yml`: site settings and canonical URL.
- `assets/img/publication_preview/`: original figures for selected papers; sources are recorded in `docs/publication-figures.md`.
- `_layouts/bib.liquid`: al-folio bibliography template with figure previews and full-size image links.
- `assets/css/custom.css`: small site-specific and print adjustments.
- `_includes/head.liquid`: upstream head template with one extra stylesheet; compare against upstream when upgrading the theme.

The original portrait, domain (`CNAME`), images, and NDSS PDF are preserved. Theme dependencies and Linux/macOS platforms are locked in `Gemfile.lock`.

## Publish

In GitHub **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The `Build and deploy al-folio` workflow builds pull requests and deploys pushes to `main` or `master`. This is required because al-folio’s plugins are not supported by GitHub’s default safe-mode Jekyll builder. The custom domain remains `shangma.org`.

## Content provenance

Existing biography, research visits, education dates, internship start, awards, and six earlier publications were migrated from the original `_pages/about.md`. The original time-sensitive “fourth-year” wording was changed to “PhD student.” The expected graduation date is retained from the repository. NEC internship date ranges and research summaries were supplied by the site owner: January–April 2026 in Data Science & System Security (AI-generated misinformation detection), and June–August 2026 in Integrated Systems (Memory for enterprise proactive agent). Research visit end dates were not available, so only documented start dates are shown.

- PreScam author list and preprint: https://arxiv.org/abs/2605.12243
- Agent+P author list and preprint: https://arxiv.org/abs/2510.06042
- Additional 2026 preprint: https://arxiv.org/abs/2606.16052
- TNSM publication year and bibliographic details: https://li-beibei.github.io/Publications.html
- COLM 2026 and AACL 2026 Main Conference acceptance statuses and service labels were supplied by the site owner.
- Scholar and LinkedIn profile links are retained. Direct profile access was blocked during migration; no unsupported employment history was inferred.

`TBD reviewer` is retained literally as requested; no journal expansion is assumed. The old citation crawler is retained as source under `google_scholar_crawler/`, excluded from the site build; its obsolete scheduled workflow has been removed because the new site does not consume those statistics.

Validation: the site builds successfully; all five main pages and 98 local links/assets were checked, with no missing targets. Browser checks covered desktop/mobile layout, mobile navigation, light/dark mode, publication filtering, and BibTeX expansion.

The al-folio theme and its plugins retain their upstream licenses; the license for the copied template overrides is in `docs/licenses/al-folio-core-LICENSE`. This repository’s existing license is preserved.
