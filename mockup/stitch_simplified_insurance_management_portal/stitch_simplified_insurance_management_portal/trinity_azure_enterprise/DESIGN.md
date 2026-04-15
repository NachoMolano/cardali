# Design System Specification

## 1. Overview & Creative North Star: "The Digital Concierge"

This design system moves away from the rigid, grid-locked aesthetic of traditional enterprise software. Instead of a cluttered dashboard, we treat the insurance CRM as a "Digital Concierge"—an environment characterized by high-end editorial layouts, intentional whitespace, and a sense of calm authority.

The system breaks the "template" look by utilizing **Tonal Layering** and **Asymmetrical Breathing Room**. We move beyond standard boxes by overlapping elements and using radical typography scales (mixing the architectural strength of *Manrope* with the functional precision of *Inter*). This creates a signature experience that feels bespoke, premium, and inherently trustworthy.

---

## 2. Colors & Surface Philosophy

The color strategy is rooted in "Atmospheric Depth." We avoid harsh contrasts in favor of a sophisticated, monochromatic-leaning palette that uses the primary blue as an anchor, not a blunt instrument.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined exclusively through background color shifts or tonal transitions. 
*   *Example:* A `surface-container-low` section sitting on a `surface` background provides all the definition a professional eye needs.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
*   **Base Layer:** `surface` (#f9f9ff)
*   **Secondary Content:** `surface-container-low` (#f0f3ff)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff)
*   **Emphasis/Nav:** `primary-container` (#1a365d)

### The "Glass & Gradient" Rule
To elevate the "enterprise-grade" feel, use **Glassmorphism** for floating elements (e.g., dropdowns, modals). Use a semi-transparent `surface` color with a `20px` backdrop-blur. 
*   **Signature Textures:** Main CTAs or high-level KPI cards should utilize a subtle linear gradient (135°) from `primary` (#002045) to `primary-container` (#1a365d) to provide a "soul" that flat hex codes lack.

---

## 3. Typography: The Editorial Edge

The system uses a dual-typeface approach to balance authority with readability.

*   **Display & Headlines (Manrope):** Used for data storytelling and page titles. The wide apertures and geometric curves of Manrope convey a modern, architectural confidence.
*   **Body & Labels (Inter):** Used for all functional data. Inter's tall x-height ensures maximum legibility in dense insurance tables and CRM lead lists.

| Role | Font | Size | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | Manrope | 3.5rem | 700 | Large Hero/KPI numbers |
| **Headline-MD** | Manrope | 1.75rem | 600 | Section titles |
| **Title-SM** | Inter | 1rem | 600 | Card headers, sidebar items |
| **Body-MD** | Inter | 0.875rem | 400 | Standard UI text, table rows |
| **Label-SM** | Inter | 0.6875rem | 500 | Metadata, micro-copy |

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional drop shadows in favor of **Natural Light Physics**. Depth is conveyed through "stacking" container tiers.

*   **The Layering Principle:** Place a `surface-container-lowest` card on top of a `surface-container-low` section. This creates a soft "lift" that feels integrated rather than floating.
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal), use a `0 20px 40px` blur. The shadow color must be a tinted version of the surface (#111c2c at 5% opacity), never pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in data-heavy views, use the `outline-variant` token at **15% opacity**. 100% opaque borders are strictly forbidden.

---

## 5. Components

### KPI Cards & Data Containers
*   **Forbid Dividers:** Do not use lines to separate content. Use vertical whitespace (1.5rem to 2rem) and `body-sm` label headers to create grouping.
*   **Corner Radii:** Use `xl` (0.75rem) for main dashboard cards and `md` (0.375rem) for inner nested elements.

### Buttons
*   **Primary:** A gradient from `primary` to `primary-container`. High-contrast `on-primary` text. No border.
*   **Secondary:** `surface-container-high` background with `primary` text. Provides a soft, tactile feel.
*   **Tertiary/Ghost:** No background. `primary` text. Use for low-emphasis actions like "Cancel" or "View All."

### Data Tables (The "Insurance Ledger")
*   **Header:** Use `surface-container-low` for the header row.
*   **Row Height:** 48px to 56px to ensure the UI "breathes."
*   **Separation:** Use a subtle background shift on hover (`surface-container-highest`) rather than persistent row lines.

### Specialized CRM Components
*   **Policy Status Chips:** Use high-chroma `error_container` or `secondary_container` with `0.25rem` (sm) rounding for a "tag" aesthetic.
*   **Sidebar Navigation:** Vertical, using `on_surface_variant` for icons. The active state uses a "pill" shape behind the icon in `primary_fixed`, creating a clear visual anchor.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical spacing. Allow a wider left-margin on headers to create an editorial "hang."
*   **Do** use `primary_fixed` (#d6e3ff) for secondary highlights to soften the deep blue palette.
*   **Do** prioritize "Overlapping Elements." Let a KPI card slightly overlap a background color block to create 3D depth.

### Don't
*   **Don't** use 1px solid lines for tables or layout sections.
*   **Don't** use pure black (#000000) for text. Use `on_surface` (#111c2c) to maintain tonal softness.
*   **Don't** clutter the screen. If a page feels "busy," increase the whitespace by 20% before removing content.