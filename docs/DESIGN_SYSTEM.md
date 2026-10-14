# NyaySahayak 2.0 — "Editorial Forensic" Design System Specification

**Document Reference**: `docs/DESIGN_SYSTEM.md`  
**Status**: Approved Design System  
**Aesthetic Direction**: "Editorial Forensic" (Typography-led, Courtroom Parchment, Graphite Ink, Restrained Vermilion)  
**Author**: Lead Software Architect & Principal UI/UX Designer  
**Target Framework**: Tailwind CSS, shadcn/ui, Framer Motion, React Three Fiber 9 & Drei  

---

## 1. Design Philosophy & Aesthetic Manifesto

### 1.1 The Concept of "Editorial Forensic"
Legal practice at the appellate and constitutional level is an intellectual discipline of profound gravitas, precision, and forensic scrutiny. An advocate arguing before a Constitution Bench or reviewing a 1,000-page paper book does not need an entertainment software dashboard or a neon-saturated "AI gadget."

**Editorial Forensic** draws inspiration from:
- The austere typographic discipline of the **Supreme Court Reports (SCR)**, the **All India Reporter (AIR)**, and classical legal folios.
- Physical courtroom parchment, heavy bond paper, and high-density legal ink.
- Forensic investigation dossiers where every assertion, date, and exhibit is cross-referenced with millimeter precision.

### 1.2 Explicit Rejection of Generic AI Dashboard Tropes
NyaySahayak 2.0 explicitly bans:
- ❌ **No Cyberpunk Neon & Violet/Purple Gradients**: No glowing AI borders, glowing orb animations, or sci-fi themes.
- ❌ **No Sycophantic "Friendly Bot" Avatars**: No robotic mascots, chat bubbles, or conversational fluff.
- ❌ **No Cluttered Card Grids without Hierarchy**: No endless floating widgets with uninformative metric cards.
- ❌ **No Arbitrary Animation**: Every motion must communicate state change, spatial hierarchy, or evidentiary connection.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Foundational Palette (Warm Parchment & Graphite Ink)

| Token Name | Hex Code | HSL | Semantic Role |
| :--- | :--- | :--- | :--- |
| `paper-canvas` | `#FAF7F2` | `38, 33%, 97%` | Background canvas evoking archival Indian legal paper. |
| `paper-surface` | `#FFFFFF` | `0, 0%, 100%` | Card, docket, and sheet surface layer. |
| `paper-elevated` | `#F4EFE6` | `39, 32%, 93%` | Subtle background for secondary drawers, headers, and tabs. |
| `paper-border` | `#E3DCD0` | `38, 25%, 85%` | Crisp 1px borders delineating forensic columns and tables. |
| `ink-primary` | `#121417` | `216, 12%, 8%` | Primary legal text, ratio decidendi, and judgment titles. |
| `ink-secondary` | `#3D434D` | `218, 12%, 27%` | Secondary descriptions, advocate names, and docket metadata. |
| `ink-tertiary` | `#6A7280` | `218, 9%, 46%` | Timestamps, page numbers, and helper hints. |

### 2.2 Accent Palette (Restrained Judicial Vermilion)
In the Indian legal tradition, vermilion (*sindoor / red tape*) symbolizes binding authority, urgency, and the seal of the court. It is applied sparingly (less than 5% visual weight) exclusively for active focus states, crucial objections, and key milestones.

| Token Name | Hex Code | HSL | Semantic Role |
| :--- | :--- | :--- | :--- |
| `vermilion-primary` | `#B83A24` | `9, 67%, 43%` | Primary brand accent, active tab indicator, key action buttons. |
| `vermilion-hover` | `#932714` | `9, 76%, 33%` | Hover and active pressed state for primary actions. |
| `vermilion-wash` | `#F9EDE9` | `11, 62%, 95%` | Subtle alert background and active row highlighting. |
| `vermilion-border` | `#E8B8AE` | `10, 56%, 80%` | Border token for highlighted evidence and active focus rings. |

### 2.3 Evidentiary & Verification Status Tokens

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ EVIDENTIARY VERIFICATION STATUS PALETTE                                     │
├───────────────────┬─────────────┬─────────────┬─────────────────────────────┤
│ STATUS            │ FOREGROUND  │ BACKGROUND  │ MEANING / CRITERIA          │
├───────────────────┼─────────────┼─────────────┼─────────────────────────────┤
│ VERIFIED          │ #1B5E20     │ #EDF7EE     │ Good law; verbatim match;   │
│                   │ (Deep Sage) │ (Sage Wash) │ binding ratio decidendi.    │
├───────────────────┼─────────────┼─────────────┼─────────────────────────────┤
│ PARTIAL           │ #8C6200     │ #FFF9E6     │ Quoted accurately, but      │
│                   │ (Amber)     │ (Amber Wash)│ proposition is disputed.    │
├───────────────────┼─────────────┼─────────────┼─────────────────────────────┤
│ CONTESTED         │ #B25900     │ #FFF0E0     │ Non-whitelisted or split    │
│                   │ (Ochre)     │ (Ochre Wash)│ coordinate bench authority. │
├───────────────────┼─────────────┼─────────────┼─────────────────────────────┤
│ OVERRULED /       │ #B71C1C     │ #FDECEA     │ Reversed by larger bench    │
│ FABRICATED        │ (Crimson)   │ (Crimson W.)│ or phantom hallucination.   │
└───────────────────┴─────────────┴─────────────┴─────────────────────────────┘
```

---

## 3. Typographic Hierarchy

NyaySahayak 2.0 employs a strict 3-tiered typographic system:
1. **Editorial Serif**: For case titles, statutory extracts, judgments, and legal propositions.
   - Preferred Font: `Fraunces` or `Source Serif 4` (Google Fonts).
2. **Precision Sans-Serif**: For UI controls, navigation, tables, and system metrics.
   - Preferred Font: `Inter` or `Satoshi`.
3. **Monospaced Forensic**: For citations, section numbers, case numbers, CNR numbers, and physical page/bounding-box coordinates.
   - Preferred Font: `JetBrains Mono`.

### 3.1 Type Scale
| Level | Font Family | Size | Weight | Line Height | Tracking | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Display / H1` | Editorial Serif | 32px (2rem) | 600 SemiBold | 1.25 | -0.02em | Case Title, Courtroom Arena Banner |
| `Heading / H2` | Editorial Serif | 24px (1.5rem) | 600 SemiBold | 1.30 | -0.01em | Docket Section, Master Graph Headings |
| `Subheading / H3` | Precision Sans | 18px (1.125rem) | 600 SemiBold | 1.40 | 0.00em | Card headers, Modal titles |
| `Body Large` | Editorial Serif | 16px (1.0rem) | 400 Regular | 1.65 | 0.00em | Extracted judgment text, petition excerpts |
| `Body Regular` | Precision Sans | 14px (0.875rem) | 400 Regular | 1.50 | 0.00em | Standard UI labels, descriptions, summaries |
| `Meta / Caption` | Precision Sans | 12px (0.75rem) | 500 Medium | 1.40 | +0.01em | Timestamps, author tags, table headers |
| `Forensic Mono` | JetBrains Mono | 13px (0.8125rem) | 500 Medium | 1.40 | -0.01em | Citations `(2021) 2 SCC 1`, Coordinates |

---

## 4. Layout Architecture & Forensic Grids

### 4.1 The 8pt Legal Grid
All padding, margin, row height, and column widths strictly follow increments of 8px (8, 16, 24, 32, 48, 64).

### 4.2 The Split-Screen Forensic Dossier
The core interface for document inspection and fact verification utilizes a synchronized split-screen:
- **Left Panel (50% default, resizable)**: High-resolution PDF renderer displaying the original scanned or typed paper book with highlight overlays.
- **Right Panel (50%)**: Extracted structured intelligence (Facts, Timeline, Evidence, Citations) with interactive provenance cards.
- **Interaction Contract**: Hovering or clicking any fact on the right smoothly scrolls and frames the exact bounding box on the left PDF page with a warm vermilion highlight ring.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ CASE DOCKET HEADER: M/s Apex Infra v. State of Maharashtra | SLP (C) 4589/24 │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ ORIGINAL PAPER BOOK (VOL. 1)         │ FORENSIC FACT & EVIDENCE DOSSIER     │
│ [Page 142 of 480] [Zoom 100%]        │ [Facts] [Timeline] [Exhibits] [Issues]│
├──────────────────────────────────────┼──────────────────────────────────────┤
│ 14. That the Petitioner on           │ ┌─ FACT #12 ───────────────────────┐ │
│ 14.03.2021 issued notice under       │ │ Section 21 Arbitration Notice    │ │
│ Section 21 of the Act nominating     │ │ Issued on 14.03.2021             │ │
│ Sole Arbitrator...                   │ │ Provenance: Vol 1, Page 142, ¶4  │ │
│ ┌──────────────────────────────────┐ │ └──────────────────────────────────┘ │
│ │ [BOUNDING BOX HIGHLIGHT]         │ │ ┌─ EXHIBIT P-4 ────────────────────┐ │
│ │ "Postal Receipt No. ED14299IN..."│ │ │ Speed Post Tracking Confirmation │ │
│ └──────────────────────────────────┘ │ │ Admissibility: Valid under Sec 65B│ │
│                                      │ └──────────────────────────────────┘ │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 5. Purposeful 3D Visualizations (React Three Fiber 9 & Drei)

NyaySahayak 2.0 incorporates 3D strictly where spatial and temporal dimensions provide genuine analytical clarity that 2D cards cannot deliver.

### 5.1 The 3D Chronological Evidence Accordion / Stack
- **Use Case**: Visualizing an extensive litigation history spanning multiple courts (Trial Court, High Court First Appeal, Supreme Court SLP) across multiple paper-book volumes.
- **Implementation**:
  - Uses Three.js and `@react-three/fiber` with `@react-three/drei`.
  - Paper volumes are rendered as elegant parchment folios layered in 3D Z-space.
  - Interactive timeline slider scrubs through time: filings fan out in chronological order. Disputed events glow in amber/vermilion; verified court orders appear in dark ink with official embossed seal geometry.
  - Smooth camera transitions orbit to inspect specific evidentiary clusters.

### 5.2 The Spatial Courtroom Bench Simulator
- **Use Case**: Spatial orientation during multi-agent courtroom argument practice.
- **Implementation**:
  - A clean, architectural, minimalist 3D rendering of an Indian appellate courtroom (Advocate's lectern in the foreground; Opposing Counsel to the right; elevated Judicial Bench with 2 or 3 judicial chairs in the background).
  - Subtle acoustic concentric wave rings emanate from the active speaker (Opposing Counsel objecting, Judge interjecting, or Coach whispering tactical feedback).
  - Keeps the advocate immersed in the pressure of oral advocacy without distracting game-like elements.

### 5.3 Accessibility & Performance Guarantees
- **Reduced Motion Support**: If `prefers-reduced-motion` is detected in the browser, the 3D canvases are automatically swapped for high-density 2D SVG timelines and structured dialog columns.
- **Resource Cleanup**: All Three.js geometries, textures, and renderers are strictly disposed on component unmount to prevent GPU memory leaks.
- **Target Frame Rate**: Locked 60fps on modern integrated GPUs.

---

## 6. Micro-Interactions & Animation Tokens

- **Duration Standard**:
  - Micro-interactions (hover, tooltips, focus rings): `150ms ease-out`
  - Drawer & panel expansions: `250ms cubic-bezier(0.16, 1, 0.3, 1)`
  - Page transitions: `200ms ease-in-out`
- **Framer Motion Variants**:
  Standardized motion presets for forensic card appearances, drawer slides, and badge state changes.
