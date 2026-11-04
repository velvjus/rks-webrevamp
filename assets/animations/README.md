# RakanSales – Website animations

16 animated scenes for rakansales.com, grouped by section of the site and built from the Figma designs. They are made from plain HTML, CSS and JavaScript. There are no libraries, no build step and no dependencies.

**Preview:** serve this folder and open `preview.html` to see every scene, or open any `<section>/<scene>/index.html` on its own.

## The scenes

### Section 1: Feature cards (`features/`, 407 × 380, loops)

| # | Scene | Folder | What it shows | Loop |
|---|-------|--------|---------------|------|
| 1.1 | Search | `features/search/` | Search Nearby sends a pulse and nearby customers pop up on the map | ~5s |
| 1.4 | Omnichannel | `features/omnichannel/` | WhatsApp, Telegram and Gmail conversations, with the whole team replying from one account | ~9.5s per channel |
| 1.7 | AI follow-up | `features/ai-followup-story/` | Auto follow-up is turned on, AI chases a quiet quote, the agent is notified | ~15s |

### Section 2: Lifecycle (`lifecycle/`, 700 × 400, loops)

| # | Scene | Folder | What it shows | Loop |
|---|-------|--------|---------------|------|
| 2.1 | Capture | `lifecycle/capture/` | Messages from 8 channels fly into one Conversations inbox | new message every 2.6s |
| 2.2 | Engage | `lifecycle/engage/` | A customer asks, the AI searches the Knowledge Base and replies | 7.2s per Q&A |
| 2.3 | Automate | `lifecycle/automate/` | Automations switch on, then triggers fire them | 4.6s per trigger |
| 2.4 | Close | `lifecycle/close/` | A deal is dragged across the kanban to Won, then a new deal is added | ~9.8s |
| 2.5 | Grow | `lifecycle/grow/` | Live dashboard: deals won and new leads update the KPIs and charts | 3.8s per update |

### Section 3: Continuity (`continuity/`, 300 × 200, plays once)

| # | Scene | Folder | What it shows | Length |
|---|-------|--------|---------------|--------|
| 3.1 | Unified conversation hub | `continuity/hub/` | Messages from every channel land in one inbox | 6.8s |
| 3.2 | AI-assisted handoff | `continuity/handoff/` | AI books the session, then hands over to a person | 5.3s |
| 3.3 | Shared customer context | `continuity/context/` | Files, notes and activity connect to one profile | 5.6s |
| 3.4 | Pipeline continuity | `continuity/pipeline/` | A deal moves from New to Qualified | 3.9s |

### Section 4: AI Capabilities (`ai/`, 700 × 405, plays once)

| # | Scene | Folder | What it shows | Length |
|---|-------|--------|---------------|--------|
| 4.1 | Smart scheduling | `ai/scheduling/` | AI replies and books the meeting into the calendar (677 × 383) | 5.7s |
| 4.2 | AI lead scoring & routing | `ai/scoring/` | A new lead is scored and routed to the top closer | 6s |
| 4.3 | AI voice translation | `ai/translate/` | A voice note is transcribed and translated | 6.2s |
| 4.4 | AI name card scanner | `ai/scanner/` | A name card is scanned and becomes a contact | 5.4s |

---

## How each scene behaves

- **Fixed design, fluid size.** Each scene draws at its design size and scales to fill its container width, so give it a width and the height follows. See the sizes table below.
- **Plays only when visible.** An `IntersectionObserver` (35% visible) starts the scene and stops it when it scrolls away. Timers are cleared and the scene resets, so it starts fresh each time it comes back into view. Nothing runs off-screen.
- **Two kinds of playback.**
  - Sections 1 and 2 loop for as long as they are on screen.
  - Sections 3 and 4 play once, then rest with a gentle idle motion. They replay on mouse hover, or on click or tap.
- **Reduced motion.** If the visitor has *Reduce motion* turned on, the scene shows a still final state.
- **Fully self-contained.** All CSS is scoped under one prefix per scene, and the JS is wrapped in an IIFE with no globals.
- **Assets:** each scene loads its images from its own `assets/` folder using relative paths (`assets/...`).
- **Fonts:** Inter from Google Fonts, loaded in each file's `<head>`. If the site already loads Inter, you can drop that `<link>`, but keep the weights the scene asks for. 1.1 Search also uses Poppins.

| Scene(s) | Aspect ratio | Max width | Background |
|----------|--------------|-----------|------------|
| 1.1, 1.4, 1.7 | `407/380` | 814px | `#fafafa` |
| 2.1–2.5 | `7/4` | 1400px | `#0e1115` |
| 3.1–3.4 | `3/2` | 1200px | `#fafafa` |
| 4.1 | `677/383` | 1200px | `#03130a` |
| 4.2 | `700/405` | 1200px | `#031a0c` |
| 4.3 | `700/405` | 1200px | `#021208` |
| 4.4 | `700/405` | 1200px | `#010a05` |

| Scene | Root element | CSS prefix |
|-------|-------------|------------|
| 1.1 Search | `.rks[data-rks]` | `rks-` |
| 1.4 Omnichannel | `.rko[data-rko]` | `rko-` |
| 1.7 AI follow-up | `.rkfs[data-rkfs]` | `rkfs-` |
| 2.1 Capture | `.rkcp-capture[data-rkcp]` | `rkcp-` |
| 2.2 Engage | `.rke[data-rke]` | `rke-` |
| 2.3 Automate | `.rka[data-rka]` | `rka-` |
| 2.4 Close | `.rkc[data-rkc]` | `rkc-` |
| 2.5 Grow | `.rkg[data-rkg]` | `rkg-` |
| 3.1 Hub | `.rkh-hub[data-rkh]` | `rkh-` |
| 3.2 Handoff | `.rkho-handoff[data-rkho]` | `rkho-` |
| 3.3 Context | `.rkx-context[data-rkx]` | `rkx-` |
| 3.4 Pipeline | `.rkp-pipeline[data-rkp]` | `rkp-` |
| 4.1 Scheduling | `.rkac-sched[data-rkac-sched]` | `rkac-` |
| 4.2 Scoring | `.rkls-score[data-rkls-score]` | `rkls-` |
| 4.3 Translate | `.rkvt-voice[data-rkvt-voice]` | `rkvt-` |
| 4.4 Scanner | `.rkns-scan[data-rkns-scan]` | `rkns-` |

---

## Option A: iframe (recommended, quickest)

Upload the section folders as they are and embed each scene with an iframe. Add `?embed` to the URL. It removes the dark preview padding around the scene and hides the scrollbars, so only the animation shows.

```html
<iframe
  src="/animations/lifecycle/capture/index.html?embed"
  title="Leads from every channel land in one inbox"
  loading="lazy"
  scrolling="no"
  style="display:block;width:100%;aspect-ratio:7/4;border:0;border-radius:16px;background:#0e1115"
></iframe>
```

Use the aspect ratio and background from the sizes table for each scene. Always name `index.html` in the URL, because some hosts will not serve a bare folder. Scroll-triggered play/pause and hover replay still work inside an iframe.

Notes:
- With `?embed` the scene's 16px corners are removed, so round the iframe itself (as above) if you want them.
- For tabs or a carousel that shows one scene at a time, leave the hidden ones as they are. A scene doesn't run while it's off-screen, and it restarts from the beginning when it's shown again.

## Option B: paste inline (no iframe)

Use this if the site builder lets you add custom HTML, CSS and JS on the page itself.

From the scene's `index.html`, copy these three parts:

1. **The second `<style>` block** in `<head>` (the one starting `/* ---------- Embed: everything below is scoped to … */`). Skip the small first `<style>` line, which only handles `?embed`.
2. **The markup:** the single root `<div class="rk…" data-rk…>…</div>` inside `<body>`.
3. **The `<script>` block** at the end of `<body>` (the IIFE). Skip the one-line `?embed` script in `<head>`.

Then:
- **Fix asset paths.** Find and replace `assets/` with the URL where you uploaded that scene's `assets/` folder. This covers `src="assets/…"` in the markup, `url(assets/…)` in the CSS and the paths inside the script.
- **Use each scene only once per page.** Each script looks for the first matching root (`[data-rkcp]`, `[data-rke]` and so on). Different scenes can share a page, because every prefix is unique.
- **Set the width on the parent.** The root sets its own `width:100%`, `max-width` and `aspect-ratio`.
- **Avoid site styles leaking in.** Scene CSS is scoped, but site-wide rules on bare elements (`div`, `img`, `p`, `b`, `small`, `svg`) can leak in. If something looks off, check for a global `img { height:auto }` or `p { margin-bottom }` rule, or use Option A.

---

## Editing the content

The copy that changes during an animation lives in plain arrays or objects near the top of each scene's `<script>`, marked `Editable content` in most scenes. Change the text there; the layout does not need touching. Text that is fixed in the design, such as card labels, is in the scene's HTML.

| Scene | What to edit | Notes |
|-------|--------------|-------|
| 1.1 Search | `T` | Loop timing in ms. Pins and deal badges are in the HTML: `--t` is each one's pop-in delay. |
| 1.4 Omnichannel | `channels`, `AGENT_NAMES` | One entry per channel, with the customer message and the three replies. |
| 1.7 AI follow-up | `contact`, `quote`, `silence`, `followUps`, `reply` | The customer, the quote, the gap and each message. Add or remove `followUps` freely. |
| 2.1 Capture | `leads` | One entry per incoming message: channel, name, initials/avatar, colour, message text. `MAX_NEW_ROWS` caps how many new rows stack before old ones drop off. |
| 2.2 Engage | `script`, `sources` | `script` holds the question and answer pairs. Each pair points at the Knowledge Base row (`sources`) it was answered from. |
| 2.3 Automate | `automations`, `beats` | `automations` are the rows in the list (`on:false` shows one switched off). `beats` are the triggers that fly in (`warn:true` shows an amber escalation result). |
| 2.4 Close | `columns`, `initial`, `incoming` | Pipeline stages, the deals shown at the start, and the new deals added each loop. Weighted value and counts are calculated from these. |
| 2.5 Grow | `START`, `beats` | `START` holds the dashboard's starting figures. `beats` alternate between deal-won and new-lead updates. |
| 3.1 Hub | `convos`, `inboxes`, `arrivalOrder` | The conversations, the inbox list and the order messages arrive in. |
| 3.2 Handoff | `copy` | All the scene's text. |
| 3.3 Context | `copy`, `activity` | The scene's text and the activity feed entries. |
| 3.4 Pipeline | `moving`, `newCol`, `boardCols` | The deal that moves, the column it lands in and the board columns. `POSE` sets the dragged card's position and tilt. |
| 4.1 Scheduling | `copy` | Chat messages, the calendar event and the badge. |
| 4.2 Scoring | `lead`, `column` | The new lead and its signals. `column` holds the totals once the lead is in; the starting figures are worked out from `lead.value`. |
| 4.3 Translate | `copy` | Customer, transcript, translation and reply. The waveform comes from `bars`. |
| 4.4 Scanner | `copy`, `totalContacts` | Status text and the contact count shown after saving. |

In Sections 3 and 4, the `steps` array sets each scene's timeline as `[time in ms, change, effect]`, and `END` is when the idle motion starts.

Some content is part of an image rather than text: the kanban list in 4.2, the contacts list and name card in 4.4, and the app headers in 4.1. Changing those means exporting a new image from Figma.

The names, companies, deals, messages and figures are placeholder copy. Swap in real examples as needed.

## Browser support

All current versions of Chrome, Edge, Safari and Firefox. The scenes use CSS `aspect-ratio`, `ResizeObserver`, `IntersectionObserver`, the Web Animations API, `offset-path` (for the moving dots in 4.1 and 4.2) and `backdrop-filter` (for the blur in 2.5 and 4.1). Motion is almost entirely `transform` and `opacity`, so playback stays smooth on mid-range phones.
