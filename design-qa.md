# Design QA: Compact trust strip

final result: passed

## Comparison target

- Source visual truth: `comp/trust-section/renders/trust-strip-v1.png`
- Source pixels: 2073 x 758
- Implementation: `http://127.0.0.1:51920/`
- Desktop implementation evidence: `.impeccable/review/trust-integrated-desktop.png`
- Mobile implementation evidence: `.impeccable/review/trust-integrated-mobile.png`
- Combined comparison evidence: `.impeccable/review/trust-qa-comparison.png`
- Desktop viewport: 1440 x 1000 CSS pixels, device scale factor 1, browser client width 1425 pixels
- Mobile viewport: 390 x 844 CSS pixels, device scale factor 1, browser client width 375 pixels
- State: trust strip centered in the viewport after page motion settled

## Full-view comparison

The implementation preserves the approved comp's compact proof-band structure: pale mineral field, centered single-line statement, short green accent, four evidence columns, and hairline separators. At desktop the implemented section is 246.75 CSS pixels tall, which matches the intended minimal role after normalizing the 2073-pixel source to the 1440-pixel implementation width.

The implementation intentionally uses live text instead of embedding the raster. This keeps the evidence accessible and allows certification wording and future customer logos to be replaced without regenerating an image.

## Required fidelity surfaces

- Fonts and typography: Altone is self-hosted and closely matches the source's clean grotesk character. Weight, alignment, hierarchy, and line wrapping are faithful.
- Spacing and layout rhythm: the desktop row remains single-line and evenly divided. The mobile layout collapses to a compact 2 x 2 grid with no horizontal overflow.
- Colors and visual tokens: `#f1f2ee`, near-black copy, muted gray secondary text, and RakanSales green reproduce the source palette.
- Accessibility: qualifier copy uses `#6a6f6a` on `#f1f2ee`, meeting WCAG AA contrast for small text.
- Image quality and asset fidelity: the target contains no photographic or logo assets. No raster, SVG, icon, or CSS-art substitute was needed.
- Copy and content: the approved structure and proof points are preserved. Internal verification placeholders were replaced with concise customer-facing benefit copy before handoff.

## Focused comparison

No additional focused crop was required. Every trust item, separator, qualifier, and typographic weight is legible in `.impeccable/review/trust-qa-comparison.png` at the comparison scale.

## Findings

No actionable P0, P1, or P2 differences remain.

---

# Design QA: Code-native product scenes

final result: passed

## Change requested

The three Discover / Convert / Scale graphics were rebuilt as individually authored HTML and CSS interfaces. The live section no longer crops or loads the approved reference image for product-scene content.

## Evidence

- Desktop evidence: `.impeccable/review/three-engines-code-desktop.png`
- Mobile evidence: `.impeccable/review/three-engines-code-mobile.png`
- Desktop viewport: 1586 x 1500 CSS pixels, browser client width 1571 pixels
- Mobile viewport: 390 x 844 CSS pixels, browser client width 375 pixels

## Product scenes

- Discover: lead search, source filtering, qualification, and routing into RakanSales.
- Convert: channel context, customer messages, reply composer, and a linked deal state.
- Scale: AI recommendation, illustrative forecast movement, and confirmed admin-managed add-ons.

## Verification

- Code-native figures rendered: 3
- Product-scene images loaded: 0
- Desktop scene dimensions: approximately 424 x 420 CSS pixels each
- Mobile scene dimensions: approximately 298 x 420 CSS pixels each
- Desktop horizontal overflow: none
- Mobile horizontal overflow: none
- Interactive controls inside illustrative scenes: none
- Minimum visible scene copy at mobile: 10 CSS pixels
- Illustration semantics: each figure exposes one concise `role="img"` label; internal mock-interface descendants are hidden from assistive technology
- Reduced-motion fallback: inherited from the section motion system

The approved shared frame, two-line desktop thesis, mineral palette, and responsive stacking remain unchanged. Each scene now has a distinct one-time state transition that demonstrates its specific workflow without looping.

Finish review increased the scene typography, removed low-value mobile add-on subtitles, darkened secondary interface copy, replaced the mock deal landmark with neutral structure, and consolidated each scene into one accessible illustration object. Post-fix browser checks confirm three labelled figures, zero scene images, zero nested `aside` landmarks, a 10-pixel minimum for visible mobile scene copy, and no horizontal overflow.

## Responsive and behavior checks

- Desktop section height: 246.75 CSS pixels
- Mobile section height: 307.30 CSS pixels
- Desktop horizontal overflow: none
- Mobile horizontal overflow: none
- Relevant section controls: none
- Browser console errors: none

## Comparison history

The first implementation rendered at approximately 307 CSS pixels tall on desktop. It was tightened by reducing section padding and evidence-row spacing. The post-fix desktop capture measures 246.75 CSS pixels and now matches the approved comp's minimal visual role.

The finish review also identified insufficient contrast in the small verification qualifiers. Their color was darkened from `#777c77` to `#6a6f6a` without changing the approved composition.

The internal phrases `Wording to verify` and `Status to verify` were subsequently replaced with `Security built into every workflow` and `Designed for Malaysian businesses`. This was a copy-only refinement; the trust-strip structure and hierarchy remain unchanged.

## Follow-up polish

No blocking polish remains. Verified certification or customer-logo assets can replace the typographic evidence later without changing the section structure.

---

# Design QA: Discover / Convert / Scale

final result: passed

## Comparison target

- Source visual truth: `comp/three-engines/renders/three-engines-approved.png`
- Source pixels: 1586 x 992
- Implementation: `http://127.0.0.1:51920/`
- Desktop implementation evidence: `.impeccable/review/three-engines-desktop.png`
- Mobile implementation evidence: `.impeccable/review/three-engines-mobile.png`
- Combined comparison evidence: `.impeccable/review/three-engines-qa-comparison.png`
- Desktop viewport: 1586 x 1450 CSS pixels, browser client width 1571 pixels
- Mobile viewport: 390 x 2250 CSS pixels, browser client width 375 pixels
- State: section fully revealed after entrance motion settled

## Full-view comparison

The implementation preserves the approved comp's central idea: a two-line operating-system statement followed by one shared, lightly framed surface containing three connected product stories. The live version uses accessible headings and supporting copy above three high-resolution crops derived from the approved visual comp.

The desktop title was widened and reduced slightly after the first capture so `Your entire sales operation.` remains one line and `Working as one.` remains the second line, matching the approved composition. Vertical padding and the frame offset were tightened in the same pass.

## Required fidelity surfaces

- Fonts and typography: self-hosted Altone, near-black headings, restrained negative tracking, and muted supporting copy reproduce the approved hierarchy.
- Spacing and layout rhythm: centered introduction, one shared three-column frame, fine internal dividers, and balanced panel padding match the selected structure.
- Colors and visual tokens: pale mineral background, warm-white frame, hairline borders, and RakanSales green accents remain consistent with the existing page system.
- Image quality and asset fidelity: all three UI crops are local PNG assets derived from the approved comp and retain their original proportions without browser scaling artifacts.
- Accessibility: all marketing copy remains live HTML, images have descriptive alternative text, non-interactive cards stay out of the tab order, and reduced-motion users receive the fully visible final state.
- Copy and content: Discover, Convert, and Scale describe committed RakanSales capabilities without filler language.

## Responsive and behavior checks

- Desktop section height: 1188.26 CSS pixels
- Mobile section height: 2068.30 CSS pixels
- Desktop heading lines: 2
- Desktop horizontal overflow: none
- Mobile horizontal overflow: none
- Product cards rendered: 3 at both viewports
- Product imagery loaded: 3 of 3
- Entrance motion: one intersection observer, staggered opacity / blur / translate reveal

## Findings and history

The first desktop implementation wrapped the heading into three lines because its content measure was too narrow. The final pass increased the intro measure to 1120 pixels, capped the heading at 72 pixels, and reduced the outer vertical spacing. The post-fix capture now preserves the approved two-line title and a more compact section rhythm.

Finish review added one live, sentence-style disclosure for the shared set of authored product scenes, removed focusability from the non-interactive articles, and replaced speculative integrations in the Scale image with committed capabilities: AI Voice Agent, AI Lead Finder, and LinkedIn Enrichment. Asset provenance is recorded in `comp/header-navigation/assets/three-engines-provenance.md`, and the required 1586 x 992 reproduction checkpoint is stored at `.impeccable/review/hero-repro.png`.

The final mobile evidence was assembled from direct 390 x 844 viewport captures of the live intro and each fully settled card. This avoids the browser's long-capture compositor artifact while preserving the actual responsive typography, spacing, imagery, and single-instance content tree. DOM verification confirmed exactly three cards, zero horizontal overflow, and one Scale story.

No actionable P0, P1, or P2 differences remain.
