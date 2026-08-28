# RakanSales Website Q3 Revamp — AI Project Handoff

**Status date:** 21 August 2026  
**Repository:** `C:\Users\justi\Documents\ChatGPT\RakanSales Website Q3 Revamp`  
**Purpose:** Give another AI enough verified context to continue the project safely and consistently.

## 1. Executive summary

RakanSales is being repositioned and redesigned as one connected **sales operating system**, not as a collection of unrelated CRM features. The website must feel immediately understandable to Malaysian SME owners while remaining credible to sales managers and enterprise buyers.

Work completed so far is primarily strategy, information architecture, homepage copy planning, visual direction, and static HTML review comps. The most current implemented review artifact is `comp/header-navigation/`. It currently combines:

- A fixed, responsive header and navigation system.
- An interactive hero review comp.
- A compact trust/evidence strip.
- A three-part Discover / Convert / Scale product story using code-native HTML/CSS interface scenes.

The eventual production target is a custom WordPress frontend using semantic HTML, PHP templates, modern CSS, and focused JavaScript. No production WordPress theme, backend, database, authentication system, deployment, or external integration has been built yet.

## 2. Read these files first

Any AI continuing the work should read these in order:

1. `AGENTS.md` — project-wide operating agreement and safety rules.
2. `PRODUCT.md` — authoritative product facts, positioning, evidence, and constraints.
3. `DESIGN.md` — current design-system tokens and visual rules.
4. `comp/header-navigation/README.md` — pinned decisions for the current visual baseline.
5. The files directly relevant to the requested task.
6. `design-qa.md` when changing an already reviewed visual area.

Do not treat this handoff as overriding those files. `PRODUCT.md` remains the product source of truth.

## 3. Product definition

### Positioning

RakanSales is a messaging-first CRM expanded into a broader sales operating system. It connects lead discovery, conversations, sales execution, automation, analytics, and extensions in one platform. It is designed around how Malaysian businesses sell through WhatsApp, social channels, email, forms, calls, and relationship-led workflows.

### Audiences

- **Primary:** Malaysian SME owners evaluating how to organise and grow sales.
- **Secondary:** Sales managers and enterprise decision-makers requiring visibility, controls, security confidence, and scalability.

### Confirmed capabilities

- Omnichannel conversations and shared inboxes.
- Contacts and companies.
- Deals and Kanban pipelines.
- Lead assignment.
- AI replies and follow-ups.
- AI lead qualification and scoring.
- Sales analytics and forecasting.
- Forms, campaigns, appointments, and reporting.
- Mobile access and integrations.

Confirmed communication/channel coverage includes Website Live Chat, Facebook Messenger, WhatsApp, SMS, Gmail, Outlook, API-based custom channels, Telegram, LINE, Instagram, TikTok, and LinkedIn.

Lead Finder, AI Charts, and Marketplace are committed capabilities and must not be labelled “coming soon” unless the user changes direction. Their detailed behaviour still needs confirmation before specific claims are written.

Confirmed Marketplace examples are LinkedIn Enrichment, AI Voice Agent, AI Sales Advisor, AI Tokens, and AI Lead Finder. Activation, assignment, entitlement, and billing behaviour remain unconfirmed.

### Evidence available

- Existing public RakanSales website and content.
- RakanSales social profiles and Linktree.
- Supplied product screenshots for Conversations, Deal Pipeline, and Web Forms.
- Mobile app listings.
- VeecoTech parent-company information.
- Existing ISO/IEC 27001:2022 and Malaysia Digital positioning.

Do not invent customer outcomes, statistics, adoption figures, pricing, testimonials, integrations, certifications, release dates, or performance claims.

## 4. Work completed so far

### Product and project foundations

- Created `AGENTS.md` as the repository-wide working agreement.
- Created `PRODUCT.md` as the durable source of truth for the product.
- Established a frontend-only marketing-site scope for the current phase.
- Defined WordPress as the planned production direction while leaving hosting and exact implementation architecture open.
- Set WCAG 2.2 AA, responsive behaviour, keyboard access, visible focus, readable zoom, and reduced motion as minimum requirements.

### Information architecture and content planning

- Drafted `planning/sitemap.md` with proposed primary navigation, footer navigation, URL strategy, and deferred inner-page decisions.
- Drafted `planning/homepage-content-draft.md` covering the hero, trust, problem framing, platform model, connected workflow, AI layer, product evidence, outcomes, Marketplace/integrations, local trust, final conversion, and footer positioning.
- Deferred inner-page wireframes until the homepage direction is approved.

### Visual system

- Created `DESIGN.md` with the current design system, called **The Connected Sales Desk**.
- Established a mineral/near-monochrome field, compact charcoal navigation, and restrained Rakan green accents.
- Self-hosted Altone Regular, Medium, and SemiBold in the current comp.
- Defined typography, spacing, radii, borders, shadows, buttons, navigation, evidence frames, and code-native product-scene rules.

### Implemented review artifacts

- `planning/wireframe/` — early homepage wireframe; it is now an older planning artifact.
- `comp/header-navigation/` — current homepage visual baseline and primary review comp.
- `comp/trust-section/` — trust-strip source comp and render.
- `comp/three-engines/` — approved Discover / Convert / Scale visual reference.

The current integrated comp includes the fixed navigation, hero, trust strip, and Discover / Convert / Scale section. The product scenes were rebuilt as authored HTML/CSS illustrations rather than embedded screenshots.

### Visual QA completed

`design-qa.md` records passing reviews for:

- Compact trust strip.
- Code-native product scenes.
- Discover / Convert / Scale composition.

Recorded checks include desktop and mobile captures, no horizontal overflow, no browser-console errors for the checked comp, accessible figure labelling, no fake interactive controls inside illustrations, minimum 10px visible mobile scene copy, and reduced-motion fallback. The QA evidence images are under `.impeccable/review/`.

Important: those results apply to the specific reviewed artifacts and states documented in `design-qa.md`; they are not proof that future changes pass automatically.

## 5. Current approved/pinned design decisions

### Header and navigation

- Fixed header with an 8px viewport inset.
- Compact dark navigation surface.
- Desktop order: Product, Solutions, Resources, Pricing, Why RakanSales, Language, Contact Us, Log In.
- Product, Solutions, and Resources use grouped dropdown panels.
- Pricing and Why RakanSales are direct links.
- Contact Us is the secondary utility action; Log In is the bright primary utility action.
- Altone, the approved RakanSales logo, and Rakan green replace reference-site branding.

The interaction pattern is inspired by respond.io, but RakanSales must retain its own identity and must not silently copy reference websites.

### Broader visual direction

- Premium, calm, high-trust B2B SaaS with editorial hierarchy.
- Mineral canvas (`#f1f2ee`), near-black ink, compact charcoal framing, restrained green (`#23b750`).
- Low radii, fine dividers, flat light surfaces, and shadows only where layering/state requires them.
- Real product screenshots or credible code-native product scenes are preferred over generic AI imagery.
- Motion should clarify hierarchy or causality, run once where appropriate, remain performant, and respect `prefers-reduced-motion`.
- Avoid generic equal-card grids, excessive glass effects, decorative complexity, oversized capsules, generic dashboard chrome, and unsupported metrics.

## 6. Current sitemap direction

Proposed top-level groups are Product, Solutions, Pricing, Resources, and Company, with Book a Demo, Start Free Trial, and Log In as primary actions/access paths.

Proposed product destinations include overview, Lead Finder, Omnichannel Inbox, Pipeline Management, AI Sales Automation, AI Charts and Analytics, Web Forms, Marketplace and Integrations, and Mobile App.

The route proposal is documented in `planning/sitemap.md`. It is not authorization to build every page. Existing high-value URLs must be preserved or deliberately redirected after SEO review.

## 7. Open decisions and missing inputs

- Whether Book a Demo or Start Free Trial is the dominant site-wide CTA.
- Exact free-trial duration and whether a credit card is required.
- Detailed behaviour and approved copy for Lead Finder, AI Charts, and Marketplace.
- Which integrations are included versus optional channel add-ons.
- Customer logos, testimonials, and measurable performance evidence approved for publication.
- Pricing, plan names, feature limits, and comparison structure.
- Exact security/certification copy approved by the relevant owner.
- Final industry solution-page list.
- Whether Marketplace and Integrations share a hub.
- Whether AI Charts sits under Analytics or has its own navigation item.
- Whether Marketplace categories need indexable pages or filters.
- Customer-story availability and permissions.
- Hosting and final WordPress architecture.

The current hero includes a placeholder customer-rating element in `comp/header-navigation/index.html`; it must not become a production claim without verified evidence.

## 8. What we are doing now / likely next phase

The repository is still in homepage direction and component-comp development, not production implementation. The current baseline stops after the Discover / Convert / Scale section. Likely next work should continue the homepage section by section while preserving already approved areas, then obtain homepage approval before creating inner-page wireframes or production routes.

A sensible continuation sequence is:

1. Resolve the highest-impact content decisions, especially the primary CTA and evidence that may be published.
2. Continue the remaining homepage narrative from the approved content plan.
3. Build each new section as a focused review artifact or integrate it carefully into the current comp.
4. Perform browser-based desktop/mobile QA, interaction checks, console checks, accessibility checks, and reduced-motion checks.
5. Record approved durable decisions in the appropriate source-of-truth document.
6. Only after homepage approval, plan inner pages and the WordPress production architecture.

This sequence is a recommended interpretation of the repository state, not a recorded user approval of the next specific section.

## 9. Installed dependencies, skills, and tooling

### npm dependency

`package.json` describes a private collection of redesign comps and planning artifacts. Its only declared package dependency is:

- `lucide-static` `^1.33.0` — local icon assets.

`node_modules/` and `package-lock.json` are present. There is no application framework, build script, test script, or production WordPress dependency declared.

### Project-local skills

`skills-lock.json` version-locks 24 GitHub-sourced skills:

- `animate`
- `animate-expo`
- `animation-vocabulary`
- `apple-design`
- `ask-sonner`
- `brandkit`
- `design-taste-frontend`
- `design-taste-frontend-v1`
- `emil-design-eng`
- `find-animation-opportunities`
- `full-output-enforcement`
- `gpt-taste`
- `high-end-visual-design`
- `image-to-code`
- `imagegen-frontend-mobile`
- `imagegen-frontend-web`
- `improve-animations`
- `industrial-brutalist-ui`
- `minimalist-ui`
- `pick-ui-library`
- `prototype`
- `redesign-existing-projects`
- `review-animations`
- `stitch-design-taste`

The repository also contains `.agents/skills/impeccable/`, making **Impeccable** available project-locally even though it is not listed in the current `skills-lock.json`. Therefore, the folder contains 25 project-local skill directories in total, while 24 are lockfile-tracked.

Project instructions require `design-taste-frontend` and `impeccable` for substantial landing-page design/implementation when their triggers apply. Use the relevant motion skill for animation work and the relevant image/prototype skill for image-led tasks. Always read the selected skill's complete `SKILL.md` before acting.

### Impeccable configuration

- `.impeccable/config.json` sets the build path to `comp`.
- `.impeccable/config.local.json` records accepted hook consent.
- `.codex/hooks.json` runs Impeccable checks after design-relevant edits and a deeper pass when a task stops.
- Generated design explorations, prompts, metrics, and visual QA captures live under `.impeccable/`.

### Plugins/connectors

No installed Airtable, GitHub, Gmail, Figma, Google Drive, or other external connector plugin is evidenced by this repository. No project plugin manifest or MCP/connector configuration was found.

The Codex session may advertise optional plugins that can be installed later, but those recommendations are **not installed project dependencies**. Do not tell a future AI that a recommended plugin is installed unless it verifies the active environment. Installing or connecting a plugin may also grant external-account access and should only be done when explicitly requested and relevant.

## 10. Repository map

```text
AGENTS.md                              Project-wide rules
PRODUCT.md                             Product source of truth
DESIGN.md                              Current design system
PROJECT-HANDOFF.md                     This handoff
design-qa.md                           Recorded visual QA evidence/results
skills-lock.json                       Version-locked local skills
package.json / package-lock.json       Minimal npm dependency metadata
.agents/skills/                        Local skill implementations
.codex/hooks.json                      Impeccable Codex hooks
.impeccable/                           Design decisions, mocks, and QA captures
planning/sitemap.md                    Proposed sitemap and route plan
planning/homepage-content-draft.md     Homepage content plan/draft
planning/wireframe/                    Earlier homepage wireframe
comp/header-navigation/                Current integrated visual baseline
comp/trust-section/                    Trust-strip source comp
comp/three-engines/                    Approved three-engine reference
```

Key current-comp assets include the green and white RakanSales SVG logos, Altone font files, supplied product screenshots, customer/avatar imagery used by the review comp, and the code-native three-engine implementation. Asset provenance for the three-engine work is recorded in `comp/header-navigation/assets/three-engines-provenance.md`.

## 11. Git and collaboration state

At the time of this handoff:

- The branch is `master`.
- The repository has **no commits yet**.
- All visible project files are untracked according to `git status --short`.
- No commit history exists from which to reconstruct authorship or chronology.

Assume any uncommitted file may belong to the user or another active task. Do not reset, discard, delete, broadly reformat, commit, branch, merge, publish, or deploy unless the user explicitly requests it. Check `git status --short` and inspect a shared file immediately before editing.

## 12. Rules the next AI must preserve

- Present one connected sales operating system, not a loose CRM feature list.
- Preserve the RakanSales name, logo, green identity, Malaysian relevance, and trusted-sales-partner positioning.
- Keep the site clear for SME owners without weakening enterprise credibility.
- Use product evidence and restrained language; never fabricate facts or proof.
- Do not mark Lead Finder, AI Charts, or Marketplace as coming soon.
- Do not add backend, database, authentication, or external integrations without explicit instruction.
- Do not create inner pages or production routes merely because they appear in planning.
- Preserve approved work when adding a new section; avoid incidental redesigns.
- Use semantic HTML, progressive enhancement, maintainable CSS/JS, keyboard support, visible focus, responsive layouts, and reduced-motion handling.
- Meaningful visual changes require browser review at representative desktop and mobile sizes plus primary interaction and console checks.
- Record durable approved decisions in `PRODUCT.md`, `AGENTS.md`, the nearest component README, or the appropriate planning file rather than leaving them only in chat.

## 13. Confidence and limitations of this handoff

This summary is reconstructed from the repository as it exists on 21 August 2026. Because there are no Git commits and prior chat transcripts are not stored here, it cannot reliably identify who performed each action, the exact chronological order, or which skills were actively invoked in every previous conversation. It distinguishes confirmed repository evidence from recommendations and inferred next steps. A future AI should re-check the live filesystem and Git state before acting.
