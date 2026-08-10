# Security

This is a static site: React + Vite, no backend, no database, no
authentication, no forms that submit anywhere. That architecture choice
already eliminates most of the OWASP Top 10 as live attack surface — the
sections below map each category honestly rather than pretending
categories apply where they don't.

Standard referenced: **OWASP Top 10:2025** (finalized January 2026 —
the first major revision since 2021; two new categories, one
consolidation).

## Reporting a vulnerability

See `/.well-known/security.txt` (RFC 9116), or email the address listed
there directly.

## Category-by-category

**A01:2025 – Broken Access Control (includes SSRF).** Not applicable.
There's nothing to control access to — no accounts, no protected routes,
no server making outbound requests on anyone's behalf.

**A02:2025 – Security Misconfiguration.** Addressed, with one honest
platform gap. `index.html` sets a `Content-Security-Policy` and
`Referrer-Policy` via `<meta>` — the only two security headers a browser
will actually honor when delivered that way. GitHub Pages serves static
files with no custom HTTP header support, so header-only protections
(`X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`,
HSTS) **cannot** be set from this repo — that's a hosting-platform
limit, not something fixable in code. HTTPS itself is already enforced
by GitHub Pages (`*.github.io` is HSTS-preloaded). If clickjacking
protection needs to be airtight, the real fix is fronting the site with
Cloudflare's free tier (Transform Rules can inject the missing headers)
— not something to fake with a meta tag that browsers will silently
ignore.

**A03:2025 – Software Supply Chain Failures.** Addressed. `npm audit`
found `react-router-dom` sitting in `package-lock.json` with a known
high-severity CVE — a leftover from an earlier version of this project,
unused by any current code but still present in the dependency tree.
Removed. Runtime dependencies are `react`, `react-dom`, and `gsap`
(added for the scroll-driven motion — GSAP is a long-established,
widely-audited animation library with no build step of its own and no
transitive dependencies of its own weight to speak of). Zero third-party
CDN scripts are loaded at runtime (so there's nothing that needs
Subresource Integrity), and Dependabot is configured for both `npm` and
the GitHub Actions used in the deploy pipeline, so new CVEs get flagged
automatically going forward instead of found by accident.

**A04:2025 – Cryptographic Failures.** Mostly not applicable — no
passwords, no sensitive data at rest, nothing transmitted beyond the
contact details already published intentionally (email, WhatsApp).
Transport encryption is handled by GitHub Pages.

**A05:2025 – Injection.** Not applicable in practice, hardened anyway.
There are no forms and no user input anywhere on the site — verified by
grep, there's zero `dangerouslySetInnerHTML`, `eval`, `document.write`,
or raw `innerHTML` use in the codebase. All content renders from a
single local data file. `script-src 'self'` in the CSP (no
`unsafe-inline`, no `unsafe-eval`) is defense-in-depth for a vector that
doesn't currently exist.

**A06:2025 – Insecure Design.** Addressed by an earlier architectural
decision, not a patch. This project originally had a NestJS backend,
PostgreSQL, JWT auth, and an admin CMS panel — all removed in favor of a
static site once it was clear the attack surface (auth, database,
admin routes) wasn't worth carrying for a personal portfolio. Removing
an entire class of vulnerability by not building the thing that would
carry it is the actual point of "secure by design."

**A07:2025 – Authentication Failures.** Not applicable — there is no
authentication anywhere on the site.

**A08:2025 – Software or Data Integrity Failures.** Addressed. The
deploy workflow (`.github/workflows/deploy.yml`) uses only official,
version-pinned GitHub Actions (`actions/checkout@v4`,
`actions/setup-node@v4`, `actions/upload-pages-artifact@v3`,
`actions/deploy-pages@v4`) — no arbitrary third-party actions. Workflow
permissions are least-privilege (`contents: read`, `pages: write`,
`id-token: write` only — not the default broad token). Every deployment
is built fresh from a specific commit on a GitHub-hosted runner, so
what's live is always traceable to source.

**A09:2025 – Security Logging & Alerting Failures.** Mostly not
applicable (no server, so no server-side logs to fail at generating).
The closest equivalent — knowing who deployed what and when — is
covered by GitHub's own Actions run history and Pages deployment log,
which this repo doesn't need to reimplement.

**A10:2025 – Mishandling of Exceptional Conditions.** Lightly
applicable. The two places that load external content (`Avatar.jsx`,
`TestimonialCard.jsx`) already fail gracefully — a missing image falls
back to initials instead of a broken-image icon. There's no async data
fetching or complex state elsewhere for "exceptional conditions" to
meaningfully arise in.

## What to re-check after any future change

- If a contact **form** is ever added back (one existed earlier and was
  removed), Injection (A05) and Insecure Design (A06) become live
  concerns again — it would need server-side validation somewhere, which
  means this stops being a pure static site.
- If a backend, database, or admin panel is ever reintroduced, this
  entire document needs a rewrite — most categories above are marked
  "not applicable" specifically *because* those don't exist.
