# RakanSales Website Q3 Revamp — Project Instructions

These instructions apply to every Codex task working anywhere in this repository. Treat this file as the project-wide operating agreement. More specific `AGENTS.md` files may add or override instructions within their own subdirectories.

## Start Every Task Here

1. Read this file completely.
2. Read `PRODUCT.md` before planning, writing marketing copy, making design decisions, or changing product-facing code.
3. Inspect `git status --short` before editing. This project may have several Codex tasks working concurrently.
4. Read only the planning documents, component notes, source files, and skills relevant to the current request. Do not assume another chat's history is available.
5. State any consequential assumption before acting when it is not already resolved by repository evidence.

## Source of Truth

- `PRODUCT.md` is the source of truth for audience, product positioning, confirmed capabilities, evidence, brand commitments, constraints, and accessibility expectations.
- `planning/sitemap.md` and `planning/homepage-content-draft.md` are planning artifacts. They may evolve and do not override `PRODUCT.md` or an explicit user decision.
- `comp/header-navigation/` is the current homepage review comp and visual baseline. Its `README.md` records pinned decisions for the header and navigation.
- `planning/wireframe/` is an earlier planning artifact. Do not treat it as the latest visual baseline when the current comp covers the same area.
- `design-qa.md` records design QA state; it is evidence, not a substitute for these instructions.
- Explicit instructions from the user take precedence. When the user approves or changes a durable project decision, update the appropriate repository document so new chats inherit it.

## Product and Content Guardrails

- Present RakanSales as one connected sales operating system, not a loose collection of CRM features.
- Keep the experience immediately understandable to Malaysian SME owners while retaining credibility for sales managers and enterprise decision-makers.
- Preserve the RakanSales name, recognizable green identity, product logo, Malaysian relevance, and trusted-sales-partner positioning.
- Use real product evidence wherever possible. Do not fabricate customer outcomes, adoption figures, pricing, testimonials, integrations, certifications, product behavior, release dates, or performance claims.
- Do not label Lead Finder, AI Charts, or Marketplace as “coming soon” unless the user changes the product direction. Their detailed behavior must still be confirmed before making specific claims.
- When evidence is incomplete, use accurate restrained language, identify the gap, or ask for confirmation if it materially changes the result.
- Do not silently copy reference websites. References establish quality, tone, interaction ideas, or information hierarchy; RakanSales must retain its own identity.
- The current scope is a frontend marketing website. Do not add a backend, database, authentication system, or external integration unless explicitly requested.

## Design Direction

- Aim for a polished, modern, high-trust B2B product experience with strong editorial hierarchy and clear product storytelling.
- Avoid generic AI-site patterns, decorative complexity without purpose, unsupported imagery, excessive glass effects, and repetitive equal-card layouts.
- Use Altone and the approved RakanSales brand assets where the current design system calls for them.
- Maintain continuity with approved work. Do not redesign previously approved sections incidentally while building a new section.
- Prefer real RakanSales interface screenshots and supplied assets over generic product mockups. Never distort product evidence to imply unsupported functionality.
- Motion must clarify hierarchy, state, or narrative. Keep it performant, interruptible where relevant, and compatible with `prefers-reduced-motion`.

## Skills

Project-local skills live in `.agents/skills/` and are versioned in `skills-lock.json`. Select only skills that match the task and follow each selected skill's `SKILL.md` completely.

- For substantial landing-page design or implementation, use `design-taste-frontend` and `impeccable` when their trigger conditions match.
- For animation implementation or review, use the relevant motion skill rather than inventing a separate motion process.
- For image-led implementation, image generation, prototyping, or other specialized work, use the corresponding installed skill when the request triggers it.
- Skills complement this project agreement; they do not override product facts, explicit user decisions, or evidence constraints.

## Implementation Standards

- The planned production target is a custom WordPress frontend using semantic HTML, PHP templates, modern CSS, and focused JavaScript. The current HTML comp is a review artifact and does not lock the final WordPress architecture.
- Preserve the existing stack and structure unless the task explicitly calls for a change.
- Use semantic HTML, progressive enhancement, and maintainable CSS and JavaScript. Avoid unnecessary dependencies.
- Keep interactions functional: navigation, dropdowns, controls, links, and primary calls to action should behave as represented within the agreed scope.
- Target WCAG 2.2 AA. At minimum, support keyboard navigation, visible focus, readable contrast and zoom, appropriate labels/semantics, responsive layouts, and reduced motion.
- Test at representative desktop and mobile sizes. Avoid fixing one viewport at the expense of another.
- Do not create production routes, pages, or features merely because they appear in planning unless the user asks to implement them.

## Concurrent Work Safety

- Assume uncommitted files and edits may belong to the user or another active task.
- Never discard, reset, overwrite, or broadly reformat unrelated work.
- Keep edits tightly scoped to the requested item. Inspect a file immediately before patching it if concurrent changes are plausible.
- Before modifying a shared file, check its current contents and `git status`. If another task is actively changing the same lines or the intended ownership is unclear, stop and coordinate with the user.
- Do not create commits, branches, merge work, publish, deploy, or modify external systems unless explicitly requested.
- Place temporary review artifacts in a clearly named project subdirectory and do not delete material files without explicit authorization.

## Verification and Handoff

- Verify changes in proportion to risk. Run relevant syntax, build, and lint checks when available.
- Meaningful visual changes require browser-based review at representative desktop and mobile sizes, plus checks of primary interactions and browser-console errors.
- Compare against the approved reference or existing baseline when fidelity matters. Fix material regressions before handing off.
- Keep claims about verification precise. A successful build or HTTP response alone is not visual QA.
- In the handoff, summarize what changed, what was verified, any known limitations, and the exact files involved. Provide the local preview link when one is running.

## Keeping Project Memory Current

- Chats are useful working context but are not durable project memory.
- Record approved product facts and durable positioning changes in `PRODUCT.md`.
- Record project-wide collaboration or engineering rules in this file.
- Record component-specific approved decisions in the nearest relevant README or scoped `AGENTS.md`.
- Record sitemap and copy evolution in the corresponding files under `planning/`.
- When a new user update conflicts with an existing document, flag the conflict and update the source of truth as part of the task rather than leaving the decision only in chat.
