Refine the current website and Play feature.

Do NOT rebuild the site.
Do NOT redesign the existing structure.
Keep the current hero, works flow, project detail flow, canvas system, and camera logic.

Only refine layout, behavior, responsiveness, and feature integration.

---

## 1. KEEP THE ORIGINAL HERO

The original hero must remain exactly as it is by default.

* do not redesign the hero
* do not replace the original homepage state
* do not activate Play mode automatically

The user should first see the normal hero.

---

## 2. PLAY BUTTON + PLAY CARD

Keep the existing “Explore my works” button.
Add a second button next to it:
**Play**

When clicking “Play”:

* open the Play feature inside a LEFT side card
* the Play card must feel like part of the website
* it must open like a connected card in the canvas system
* it must NOT overlay or cover the hero

---

## 3. PLAY CARD LAYOUT

Change the Play card to a HORIZONTAL / LANDSCAPE card.

Requirements:

* wide rectangular card
* aligned to the left side of the hero
* visually balanced with the hero
* both cards must remain fully visible
* the hero may shift slightly to the right if needed
* maintain comfortable margins from the canvas edges

The layout should feel like:
[ Play Card ] — connected line — [ Hero Card ]

---

## 4. CENTER THE VIEW CORRECTLY

When the Play card opens:

* the camera / viewport must re-center on the full composition
* both the Play card and the hero must be comfortably visible
* nothing should be cut off
* do not leave the center point on the old hero position

The center should be based on both cards together.

---

## 5. PLAY CARD MUST NEVER BREAK TYPOGRAPHY

Critical typography fixes:

* “Yarden’s Portfolio” must ALWAYS be visible
* words must never disappear
* there must never be an empty state where no text is rendered
* text must never be cropped incorrectly
* use responsive scaling and safe bounds
* allow multi-line fallback if needed
* always guarantee readable output inside the Play feature

---

## 6. STYLE SYSTEM COLOR BEHAVIOR

Each style must have its own clear visual identity.

When clicking a style:

* change the style
* change the accent color
* change typography color
* change the background tone if needed

Do NOT keep one default color for all styles.
Each style should feel visually distinct.

---

## 7. PLAY CARD BOTTOM CONTROL AREA

At the bottom of the Play card, add a clean control area.

Include:

### Color control

* color palette or color picker
* controls typography + accent colors

### Motion control

* speed
* intensity
* distortion / movement amount

### Effects

Add toggleable effects such as:

* grain
* halftone
* noise
* blur
* glow

These effects should add depth, not destroy readability.

---

## 8. RANDOM / SHUFFLE

Replace the text “Random” with a shuffle-style icon.

Randomization should affect:

* style
* colors
* motion
* effects

Keep it visually clean and consistent with the feature UI.

---

## 9. HERO BUTTON FIX

Fix the hero buttons completely:

* buttons must NOT overlap
* keep equal spacing between them
* same height
* same padding
* same border radius
* make them visually similar in UI language to the Play feature buttons

The hero buttons should feel like part of the same design system.

---

## 10. CONNECTION LINES

Fix all connection lines in the site.

Rules:

* lines must always start from the EDGE / FRAME of the card
* never from inside the card
* never floating
* never detached
* keep them elegant and consistent with the canvas style

This applies especially to:

* lines going from hero to works
* lines connecting opened cards

---

## 11. WORKS FLOW

Keep the existing works flow and canvas logic.

Do NOT convert this into a normal webpage.

The works should still feel placed in space inside the same canvas.

---

## 12. PROJECT DETAIL CARD SIZE

Make the project detail card much larger.

Requirements:

* almost full screen
* still leave a visible canvas frame / margin around it
* keep the feeling that it exists inside the canvas
* more immersive and spacious
* but not literally edge-to-edge fullscreen

---

## 13. RESPONSIVE + SPATIAL CONSISTENCY (VERY IMPORTANT)

Everything must stay stable across different screen sizes and aspect ratios.

Rules:

* all elements must maintain their spatial relationships
* nothing should shift unpredictably
* nothing should detach from its anchor
* lines must remain attached to their card edges
* cards must keep their relative positions
* text decorations must stay attached to the text they belong to
* no “red line” type bugs on resize

Use:

* relative positioning
* anchor-based layout
* proportional spacing
* safe scaling rules

Avoid:

* fragile hard-coded offsets
* elements drifting when viewport changes
* broken alignment on publish or resize

The whole layout must feel like one stable spatial system.

---

## 14. INTERACTION RULES

When the cursor is over the Play card:

* all interaction should stay inside the card
* canvas movement / site navigation should not interfere

When the cursor leaves the Play card:

* normal site behavior resumes

---

## 15. DO NOT CHANGE THESE THINGS

Do NOT:

* redesign the original hero
* replace the homepage default state
* remove the works flow
* remove the project detail flow
* remove the canvas system
* convert to a regular page scroll site
* simplify the feature
* remove styles

Only refine the current implementation based on all rules above.

---

## FINAL GOAL

The result should feel like:

* the same original portfolio
* with a properly integrated Play feature card
* stable across screen sizes
* readable and responsive
* with stronger style behavior, color variation, motion controls, and effects
* while preserving the canvas feeling and keeping all spatial relationships correct
