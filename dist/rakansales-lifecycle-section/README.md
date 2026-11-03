# RakanSales — Section 07 (Complete Sales Lifecycle)

Self-contained export of the interactive Section 07 component built with vanilla HTML, modern CSS, and focused JavaScript.

## Files Structure

```
rakansales-lifecycle-section/
├── index.html        # Standalone HTML page with Section 07 markup
├── styles.css        # Focused CSS tokens, fonts, pin container, and card styles
├── script.js         # Scroll-trigger and progressive fill progress rail controller
├── assets/           # High-resolution stage graphics (2.1 to 2.5)
│   ├── 2.1 Capture.png
│   ├── 2.2 Engage.png
│   ├── 2.3 Automate.png
│   ├── 2.4 Close.png
│   └── 2.5 Grow.png
└── fonts/            # Approved Altone brand fonts
    ├── Altone-Regular.ttf
    ├── Altone-Medium.ttf
    └── Altone-SemiBold.ttf
```

## Features
- **Scroll-Triggered Transitions**: Pinned full-viewport stage swap on desktop (`min-width: 981px` & `min-height: 640px`).
- **Interactive Progress Rail**: Top pill/bar indicators that track scroll distance proportionally per stage and allow instant click-to-jump navigation.
- **Alternating Layout**: Zig-zag orientation (copy left / image right for odd stages, reversed for even stages).
- **Responsive Fallback**: Automatically collapses into a smooth vertical flow on mobile and tablet screens.
- **Accessibility**: Support for `prefers-reduced-motion` and keyboard navigation (`inert` attributes applied to inactive off-screen cards).
