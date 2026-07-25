# Design System — Cadbury × Dopamint "Talk to Santa"

## 1. Design Philosophy

This landing page is a **premium, festive, brand-driven experience**. It must feel like an extension of Cadbury's iconic packaging — luxurious purple and gold, warm and inviting, with a sense of Christmas magic. The design should evoke the feeling of entering a Cadbury Christmas grotto: rich, warm, indulgent, and welcoming.

**Design Principles:**
1. **Premium & Luxurious** — Every element should feel hand-crafted and high-end
2. **Warm & Festive** — Christmas spirit permeates the entire design
3. **Brand-Faithful** — Cadbury's purple/gold identity is the core of every decision
4. **Inviting & Approachable** — Despite the luxury, the page should feel friendly and accessible
5. **Immersive** — The page should transport users into a Cadbury Christmas world

---

## 2. Color Palette

### Primary Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--purple-deep` | `#1B0A2E` | 27, 10, 46 | Navbar bg, footer bg, darkest backgrounds |
| `--purple-brand` | `#3B1A6E` | 59, 26, 110 | Primary brand purple, hero bg base |
| `--purple-mid` | `#5B2D8E` | 91, 45, 142 | Button backgrounds, card accents |
| `--purple-light` | `#7B4AAF` | 123, 74, 175 | Hero section gradients, "purple" text |
| `--purple-soft` | `#9B6FCF` | 155, 111, 207 | Light purple accents, hover states |

### Gold / Amber Accent Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--gold-primary` | `#C9A84C` | 201, 168, 76 | Logo, headings accent, borders |
| `--gold-light` | `#E2C97C` | 226, 201, 124 | Lighter gold for sparkles, highlights |
| `--gold-dark` | `#A08030` | 160, 128, 48 | Darker gold for depth, borders |
| `--gold-shimmer` | `#F5E6A3` | 245, 230, 163 | Sparkle effects, shimmer animations |

### Warm Neutrals

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--cream-bg` | `#F5EFE6` | 245, 239, 230 | Section backgrounds (steps, features) |
| `--cream-light` | `#FBF7F0` | 251, 247, 240 | Card backgrounds |
| `--cream-text` | `#F0E8D8` | 240, 232, 216 | Body text on dark backgrounds |
| `--white-soft` | `#FFFDF8` | 255, 253, 248 | Headings on dark backgrounds |

### Functional Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--green-check` | `#4CAF50` | Trust badge checkmark |
| `--text-dark` | `#2D1B4E` | Dark text on light backgrounds |
| `--text-muted` | `#6B5A7E` | Secondary text on light backgrounds |

---

## 3. Typography

### Font Stack

| Role | Font Family | Weight | Fallback |
|------|------------|--------|----------|
| **Display / Headings** | `Playfair Display` | 700, 800 (bold, extra-bold) | `Georgia, 'Times New Roman', serif` |
| **Body / UI** | `Inter` | 400, 500, 600 | `'Segoe UI', Roboto, sans-serif` |
| **Brand Script** | Cadbury custom logo (image/SVG) | N/A | N/A |

> **Note:** `Playfair Display` captures the elegant serif feel visible in the design (headings like "Ho ho ho" and "Three steps to the grotto"). `Inter` provides clean, modern body text readability.

### Type Scale

| Token | Size (Desktop) | Size (Mobile) | Line Height | Weight | Usage |
|-------|----------------|--------------|-------------|--------|-------|
| `--text-hero` | 64px (4rem) | 36px (2.25rem) | 1.1 | 800 | Hero main heading |
| `--text-h2` | 40px (2.5rem) | 28px (1.75rem) | 1.2 | 700 | Section headings |
| `--text-h3` | 28px (1.75rem) | 22px (1.375rem) | 1.3 | 700 | Card titles, banner heading |
| `--text-h4` | 20px (1.25rem) | 18px (1.125rem) | 1.4 | 600 | Sub-headings |
| `--text-body` | 16px (1rem) | 15px (0.9375rem) | 1.6 | 400 | Body text |
| `--text-small` | 14px (0.875rem) | 13px (0.8125rem) | 1.5 | 400 | Captions, legal text |
| `--text-label` | 12px (0.75rem) | 11px (0.6875rem) | 1.4 | 600 | Section labels ("THE EXPERIENCE") |

### Special Typography Treatments

- **"purple" in hero heading:** Italic style, uses `--purple-light` color
- **Section labels** (e.g., "THE EXPERIENCE", "WHY PEOPLE ARE TALKING"): Uppercase, letter-spacing `0.2em`, gold color, small size
- **Step numbers** (01, 02, 03): `Inter` font, weight 600, inside gold ring

---

## 4. Spacing System

Based on an 8px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight inner padding |
| `--space-sm` | 8px | Small gaps |
| `--space-md` | 16px | Standard padding |
| `--space-lg` | 24px | Card padding, element gaps |
| `--space-xl` | 32px | Section internal spacing |
| `--space-2xl` | 48px | Between major elements |
| `--space-3xl` | 64px | Section padding (vertical) |
| `--space-4xl` | 96px | Large section separation |
| `--space-5xl` | 128px | Hero section padding |

---

## 5. Layout & Grid

### Container

```
Max-width: 1280px
Padding: 0 24px (mobile: 0 16px)
Margin: 0 auto
```

### Grid System

- **Desktop:** 12-column grid, 24px gutter
- **Tablet:** 8-column grid, 16px gutter
- **Mobile:** 4-column grid, 16px gutter

### Section Layouts

| Section | Desktop Layout | Tablet Layout | Mobile Layout |
|---------|---------------|--------------|--------------|
| Navbar | Logo — Nav links — Sign in (flex, justify-between) | Same but tighter | Logo — Hamburger (flex, justify-between) |
| Hero | 5-col text / 7-col image | 6/6 split or stacked | Full-width stacked |
| Steps | 3 equal columns | 3 columns (compressed) | 1 column stacked |
| Banner | Image / Text / Ornament (flex row) | Image + text / Ornament below | Full-width stacked |
| Features | 3 equal columns | 3 columns (compressed) | 1 column stacked |
| Footer | Logo / Text / Socials (flex row) | Same, wrapped | Stacked center-aligned |

---

## 6. Component Specifications

### 6.1 Navigation Bar

```
Height: 64px (desktop), 56px (mobile)
Background: var(--purple-deep) with 95% opacity
Backdrop-filter: blur(12px)
Position: fixed, top: 0, z-index: 1000
Border-bottom: 1px solid rgba(201, 168, 76, 0.15)
```

- **Logo:** Height 32px, gold colored
- **Star icon:** 16px, gold, positioned between logo and "Talk to Santa"
- **Nav links:** `Inter`, 14px, weight 500, cream-text color, 24px gap between links
- **Sign in button:** 
  - Background: `var(--gold-primary)`
  - Text: `var(--purple-deep)`, 14px, weight 600
  - Padding: 8px 20px
  - Border-radius: 20px (pill shape)
  - Hover: background lightens to `var(--gold-light)`

### 6.2 Hero Section

```
Min-height: 100vh (or approximately 700px)
Padding: 120px top (for navbar clearance)
Background: radial-gradient(ellipse at 70% 50%, #3B1A6E, #1B0A2E)
Overflow: hidden (for ribbon)
```

- **Golden arch frame:**
  - SVG or CSS border with golden gradient
  - Approximately 500px tall, arch shape (semicircle top, straight sides)
  - Border: 3px solid, gold gradient
  - Box-shadow: 0 0 40px rgba(201, 168, 76, 0.3)

- **Purple ribbon:**
  - Positioned absolutely at the bottom of the hero
  - Uses clip-path or SVG for the flowing wave shape
  - Background: linear-gradient(135deg, #5B2D8E, #3B1A6E)
  - Subtle shadow for 3D effect

### 6.3 Step Cards

```
Background: var(--cream-light)
Border-radius: 16px
Padding: 24px
Border: 1px solid rgba(201, 168, 76, 0.12)
Box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04)
```

- **Number badge:**
  - Width/Height: 48px
  - Border: 2px solid var(--gold-primary)
  - Border-radius: 50%
  - Font: Inter, 18px, weight 600
  - Color: var(--gold-primary)
  - Background: transparent

### 6.4 Prize Banner

```
Background: linear-gradient(135deg, #2D1060 0%, #4B1A8E 50%, #3B1A6E 100%)
Border-radius: 24px
Padding: 48px
Margin: 0 auto
Max-width: 1100px
Overflow: hidden
Position: relative
```

- **Sparkle particles:** Pseudo-elements or JS-generated gold dots with opacity animation

### 6.5 Feature Cards

```
Background: var(--cream-light)
Border-radius: 16px
Padding: 0 (image flush to top)
Border: 1px solid rgba(201, 168, 76, 0.12)
Overflow: hidden
```

- **Image container:** border-radius 12px top corners, aspect-ratio 4/3
- **Text area:** padding 20px

### 6.6 CTA Buttons

**Primary:**
```
Background: var(--purple-mid)
Color: var(--white-soft)
Padding: 14px 28px
Border-radius: 8px
Font: Inter, 15px, weight 600
Border: none
Cursor: pointer
Transition: all 0.3s ease
```
- Hover: `transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91, 45, 142, 0.4);`

**Secondary (Outlined):**
```
Background: transparent
Color: var(--cream-text)
Padding: 14px 28px
Border-radius: 8px
Border: 1.5px solid var(--cream-text)
Font: Inter, 15px, weight 500
```
- Contains a play icon circle (24px, border 1.5px, cream) on the right

---

## 7. Imagery & Assets Style Guide

### Photography Style
- **Warm, high-quality product photography** with soft focus backgrounds
- Color-graded to match the purple/gold palette
- Rich, warm lighting (fireplace/candlelight tones)

### Illustration Style
- **Footer village:** Flat illustration with subtle depth, purple/blue twilight palette, warm yellow window glows
- Whimsical but sophisticated — not cartoonish

### Iconography
- Step icons are **realistic mini-illustrations** (Santa hat, gift box), not flat icons
- The speech bubble (step 3) is more icon-like but still has depth/gold color
- Social media icons: Clean, minimal outlines in gold/cream

---

## 8. Effects & Visual Treatments

### Gradients
- **Hero background:** `radial-gradient(ellipse at 70% 50%, #3B1A6E, #1B0A2E)`
- **Banner background:** `linear-gradient(135deg, #2D1060, #4B1A8E, #3B1A6E)`
- **Gold border:** `linear-gradient(135deg, #A08030, #E2C97C, #C9A84C)`

### Shadows
- **Cards:** `0 4px 20px rgba(0, 0, 0, 0.04)`
- **Buttons (hover):** `0 8px 24px rgba(91, 45, 142, 0.4)`
- **Golden arch:** `0 0 40px rgba(201, 168, 76, 0.3)`
- **Ribbon:** `0 -4px 20px rgba(0, 0, 0, 0.15)`

### Animations
```css
/* Fade-in on scroll */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Gold shimmer */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Sparkle pulse */
@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Gentle float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

### Transition Defaults
```css
--transition-fast: 150ms ease;
--transition-default: 300ms ease;
--transition-slow: 500ms ease;
```

---

## 9. Responsive Breakpoints

```css
/* Mobile First approach */
/* Small mobile */
@media (min-width: 375px) { }

/* Large mobile */
@media (min-width: 480px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1280px) { }

/* Extra large */
@media (min-width: 1440px) { }
```

### Key Responsive Adjustments

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Container padding | 16px | 24px | 24px |
| Section vertical padding | 48px | 64px | 96px |
| Hero heading size | 36px | 48px | 64px |
| Card grid | 1 column | 3 columns | 3 columns |
| Banner layout | Stacked | Row | Row |
| Nav style | Hamburger | Full | Full |
| Footer layout | Stacked center | Row | Row |

---

## 10. Accessibility Considerations

- All images must have descriptive alt text
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Gold text on purple backgrounds must meet WCAG AA standards
- Focus-visible outlines on all interactive elements (gold outline)
- Skip-to-content link at the top of the page
- Semantic heading hierarchy (single H1 in hero, H2 for sections, H3 for cards)
- Animations respect `prefers-reduced-motion` media query
- All interactive elements (buttons, links) have min 44px touch targets on mobile
