---
name: RakanSales Marketing Website
description: A calm, connected sales operating system expressed through precise B2B storytelling and credible product evidence.
colors:
  rakan-green: "#23b750"
  rakan-green-hover: "#2fc762"
  focus-lime: "#62d816"
  mineral-canvas: "#f1f2ee"
  warm-surface: "#f7f8f5"
  white-surface: "#ffffff"
  primary-ink: "#0b0b0c"
  charcoal-surface: "#171719"
  interface-ink: "#202420"
  muted-copy: "#565b56"
  frame-border: "#d2d5cf"
  interface-border: "#dfe3de"
  signal-green-soft: "#e1f6e6"
  signal-green-ink: "#126f32"
typography:
  display:
    fontFamily: "Altone, Arial, sans-serif"
    fontSize: "clamp(46px, 5.2vw, 64px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Altone, Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Altone, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Altone, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Altone, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.1em"
rounded:
  compact: "6px"
  control: "8px"
  container: "10px"
  frame: "14px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.rakan-green}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.rakan-green-hover}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.control}"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "42px"
  navigation-bar:
    backgroundColor: "{colors.charcoal-surface}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.container}"
    padding: "0 12px"
    height: "50px"
  announcement-pill:
    backgroundColor: "{colors.charcoal-surface}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.pill}"
    padding: "3px 12px 3px 4px"
    height: "34px"
  evidence-item:
    backgroundColor: "transparent"
    textColor: "{colors.primary-ink}"
    padding: "0 32px"
    height: "62px"
  product-frame:
    backgroundColor: "{colors.warm-surface}"
    textColor: "{colors.interface-ink}"
    rounded: "{rounded.frame}"
    padding: "26px 20px 24px"
  product-scene:
    backgroundColor: "{colors.white-surface}"
    textColor: "{colors.interface-ink}"
    rounded: "{rounded.container}"
    height: "420px"
---

# Design System: RakanSales Marketing Website

## Overview

**Creative North Star: "The Connected Sales Desk"**

RakanSales should feel like the calm, capable workspace of a trusted Malaysian sales partner: operationally credible, immediately understandable to an SME owner, and composed enough for enterprise review. The system pairs a pale mineral canvas with compact charcoal framing and uses RakanSales green as a deliberate signal rather than ambient decoration.

The visual voice is premium B2B SaaS without generic dashboard gloss. Large editorial statements establish the promise, while compact, code-native product scenes provide concrete proof. Those scenes are a reusable evidence pattern, not a mandate to repeat any particular section copy, three-column composition, or workflow on every page.

**Key Characteristics:**

- Calm mineral fields with crisp charcoal contrast.
- One restrained Rakan green accent system.
- Altone typography with wide, decisive display lines and compact interface text.
- Low-radius containers, fine dividers, and tightly controlled depth.
- Credible HTML/CSS product scenes that explain a product state at a glance.
- Purposeful motion that resolves once and respects reduced-motion preferences.

## Colors

The palette is mineral and near-monochrome; green carries brand identity, action, selection, and positive progression.

### Primary

- **Rakan Green** (`rakan-green`): Brand marks, primary actions, active states, short accents, and meaningful data progression.
- **Rakan Green Hover** (`rakan-green-hover`): The brighter response state for primary actions, never a competing second accent.
- **Focus Lime** (`focus-lime`): High-visibility keyboard focus and small luminous details on dark surfaces.
- **Signal Green Soft / Signal Green Ink** (`signal-green-soft`, `signal-green-ink`): Paired semantic colors for compact selected states, tags, and positive workflow feedback inside product scenes.

### Neutral

- **Mineral Canvas** (`mineral-canvas`): The default light marketing field.
- **Warm Surface** (`warm-surface`): A subtle raised layer for shared frames and grouped content.
- **White Surface** (`white-surface`): Product panels and high-clarity interface interiors.
- **Primary Ink** (`primary-ink`): Main marketing headlines and body copy.
- **Charcoal Surface** (`charcoal-surface`): Fixed navigation, menus, and other compact dark framing.
- **Interface Ink** (`interface-ink`): Dense product-scene labels and values.
- **Muted Copy** (`muted-copy`): Supporting copy on light mineral fields.
- **Frame Border / Interface Border** (`frame-border`, `interface-border`): Hairline structure at marketing and compact UI scales.

**The Green Signal Rule.** Green must communicate identity, action, focus, selection, or progress. Its restraint is what makes it authoritative.

**The Mineral Field Rule.** Use tonal separation and hairlines to organise light sections; do not fill every container with a different neutral.

## Typography

**Display Font:** Altone (with Arial and sans-serif fallbacks)  
**Body Font:** Altone (with Arial and sans-serif fallbacks)  
**Label Font:** Altone (with Arial and sans-serif fallbacks)

**Character:** Altone gives the site one consistent, contemporary grotesk voice. Tight display tracking creates editorial confidence; regular body settings keep product and sales language approachable.

### Hierarchy

- **Display** (600, responsive `54–72px`, `0.96` line-height, `-0.038em` tracking): Major marketing theses, normally balanced into one or two decisive lines; the normative clamp is recorded in the frontmatter.
- **Headline** (600, `34px`, `1` line-height, `-0.035em` tracking): Strong feature statements inside large dark or editorial surfaces.
- **Title** (600, `22px`, `1.2` line-height, `-0.025em` tracking): Product-story and card headings.
- **Body** (400, `18px`, `1.55` line-height): Primary explanatory copy, generally held to roughly `62ch` or a similarly readable measure.
- **Label** (600, `11px`, `1.35` line-height, `0.1em` tracking): Sparse uppercase navigation categories and eyebrows. Compact product-scene text uses sentence case at `10–11px` and weights `400–600`.

**The Wide Thesis Rule.** Give display copy enough measure to land in intentional, balanced lines; do not force a strong statement into a narrow multi-line stack by default.

**The Interface Legibility Rule.** Compact product scenes may be dense, but visible mobile scene copy must not fall below the established `10px` floor.

## Layout

The system moves between a compact full-width navigation frame and generous editorial bands. The header sits at an `8px` viewport inset and caps at `1320px`; major copy measures cap around `1120px`, while evidence-rich frames may extend to approximately `1450px`. Large light sections use generous outer whitespace, then concentrate density inside a single clearly bounded evidence surface.

Desktop layouts may use three coordinated columns when the content genuinely forms a connected set. At the established `760px` scene breakpoint, those columns stack, text aligns left, dividers rotate from vertical to horizontal, and hover lift is removed. The navigation collapses at `860px`; compact evidence grids step from four columns to two near `980px`. These are observed responsive patterns, not a requirement that every future section use the same counts.

**The Shared Frame Rule.** When several product stories belong to one system, prefer one shared container with internal hairlines over a row of unrelated floating cards.

**The Density Handoff Rule.** Keep marketing copy spacious, then let the product evidence become compact; do not use dashboard density for the entire page.

## Elevation & Depth

Depth is hybrid and tightly assigned. Mineral sections stay flat, using tonal layering and `1px` borders for hierarchy. Shadows belong to dark navigation overlays, large product windows, dropdowns, and a restrained hover response on product evidence; they are not the default treatment for every card.

### Shadow Vocabulary

- **Navigation Float** (`0 10px 30px rgba(0,0,0,.12)`): Subtle separation for the fixed charcoal header after it leaves the hero surface.
- **Overlay Lift** (`0 24px 70px rgba(0,0,0,.35)`): Dropdown menus and other temporary dark overlays.
- **Product Window Depth** (`0 38px 100px rgba(0,0,0,.45)`): A single major product window against the dark hero.
- **Evidence Hover Lift** (`0 18px 36px rgba(34,45,36,.1)`): Fine-pointer feedback for a product-scene preview, paired with a `-5px` translation.

**The Flat-by-Default Rule.** Resting light surfaces are organised by tone and hairlines. Add shadow only when it explains layering, state, or a hero focal object.

## Shapes

The form language is gently precise rather than soft or playful. Small interface controls use `6–8px` corners, navigation and product-scene containers use about `10px`, and a large shared frame may reach `14px`. Pills use a full `999px` radius only for labels and statuses; circles are reserved for avatars, indicators, and simple icon geometry.

Borders are normally `1px` and low contrast. Clipping belongs to bounded product windows and scenes, not to decorative blobs. The modest radii keep the platform credible and operational while preventing the mineral layout from feeling severe.

**The Radius Hierarchy Rule.** Increase radius with container scale, but keep the silhouette taut; do not turn major B2B surfaces into oversized capsules.

## Components

### Buttons

Buttons are compact, confident, and visually quiet until action is required.

- **Shape:** Gently rounded controls (`8px`).
- **Primary:** Rakan Green with white text; full marketing actions are `42px` high with `0 16px` padding, while navigation actions use the established compact `32px` height.
- **Hover / Focus:** Brighten to Rakan Green Hover and translate by at most `-1px` on fine pointers. Keyboard focus uses a `2px` Focus Lime outline with a `2px` offset.
- **Secondary:** Transparent on dark surfaces with a low-contrast white border; hover adds a subtle charcoal fill.

### Chips

- **Style:** Fully rounded, content-sized labels with compact `3–7px` internal spacing. Neutral announcement chips may use charcoal-on-charcoal layering; workflow states use soft green with deep green text.
- **State:** Chips describe status or filters. They do not replace primary actions, and their color must have a semantic reason.

### Cards / Containers

- **Corner Style:** `10px` for product-scene previews and `14px` for a large shared product frame.
- **Background:** Warm Surface for grouped marketing evidence; White Surface for the compact interface scenes inside it.
- **Shadow Strategy:** Flat at rest on light sections; see Elevation & Depth for the narrow exceptions.
- **Border:** `1px` mineral hairlines, with internal dividers used to show connection.
- **Internal Padding:** Common container spacing is `12–20px`; the large shared frame uses `26px 20px 24px` on desktop.

### Navigation

The fixed navigation is a compact `50px` charcoal surface with an `8px` viewport inset and `10px` corners. Items are `32px` high, Altone `14px` medium, and use an `8px` radius. Hover and expanded states add a nearby charcoal tone; expanded dropdown triggers also receive a faint inset border. On narrow screens, replace the desktop links with the menu trigger and a scrollable, keyboard-operable disclosure surface.

### Code-Native Product Scenes

Product scenes are authored HTML/CSS illustrations that resemble real RakanSales interface states without pretending to be interactive controls. Each scene uses one concise accessible figure label, hides decorative descendants from assistive technology, keeps text at the established compact scale, and combines white panels, mineral separators, dense alignment, and sparse green state cues.

The reusable rule is the evidence method: choose one product truth, compose only the UI fragments needed to explain it, and animate a meaningful state transition once when revealed. The current Discover, Convert, and Scale stories are examples, not a universal layout or copy template. Reveal motion uses the established ease-out curve, settles into a fully legible final state, unobserves after entry, and falls back to that final state under `prefers-reduced-motion`.

**The Credible Scene Rule.** A product scene must make one supported workflow legible at a glance. Do not add generic dashboard chrome, fake controls, or unsupported metrics to make it look busier.

**The One-Time Motion Rule.** Product-state motion demonstrates causality once, then gets out of the way; it never loops as decoration.

## Do's and Don'ts

### Do:

- **Do** preserve the approved RakanSales logo, Altone typography, Malaysian relevance, and recognisable green identity.
- **Do** use generous mineral space around compact, information-rich evidence.
- **Do** keep primary actions, focus, selection, and progress visually distinct and accessible.
- **Do** use real product screenshots when available and code-native scenes when a focused workflow explanation is clearer.
- **Do** keep product-scene figures non-interactive unless the surrounding experience explicitly introduces real controls.
- **Do** verify desktop and mobile layouts, keyboard focus, contrast, zoom, and reduced-motion behavior.

### Don't:

- **Don't** turn the product into a loose grid of equal feature cards; connected workflows should read as one operating system.
- **Don't** use green as a broad decorative wash or introduce competing accent colors without product meaning.
- **Don't** add excessive glass, oversized radii, heavy card shadows, or ornamental depth to mineral sections.
- **Don't** fabricate performance figures, customer outcomes, integrations, or product behavior inside visual evidence.
- **Don't** generalise the current three-scene composition, its copy, or its section-specific dimensions into a site-wide template.
- **Don't** loop product-state animations or hide final content from reduced-motion users.
