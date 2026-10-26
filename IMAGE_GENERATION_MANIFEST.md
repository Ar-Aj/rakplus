# RAKPLUS — IMAGE GENERATION MANIFEST (LIGHT-THEME FUTURISTIC INFOGRAPHIC EDITION)
### v4.0 — Studio White Architectural Luxury · Glassmorphic HUD Cards · Polestar / Teenage Engineering / Apple M-Series Reference

> **Workflow:** We use an LLM Image Generation Agent (Image-to-Image / Reference-Guided Generation). For every prompt we **attach the real factory studio photograph(s) of the RakPlus product** and the agent transforms only the **environment / context / scene story** to visualize the exact section topic the image accompanies. The reference photo is the source of truth for product geometry, orientation, and text/embossing; the AI only re-lights and re-stages it.
>
> **We are completely abandoning the "dark wet background cover photo" look.** Every prompt describes a **bright, ultra-clean architectural daylight studio** scene — inspired by **Apple M-Series Hardware Breakdowns, Polestar Engineering, and Teenage Engineering** — where the product is staged like a keynote exploded-view diagram with floating frosted-glass HUD cards, thin CAD leader lines, and isometric blueprint grids built into the scene.

---

## 🤖 SYSTEM INSTRUCTION BLOCK — Verbatim, prepend to every prompt

> You are a luxury editorial product-photography image generation agent. You will receive one or more reference photographs of a real RakPlus pipe or fitting and must produce a **1:1 square (2048×2048) light-theme futuristic engineering infographic render** that **preserves the exact product geometry, orientation, and text/embossing of the reference** while **transforming the environment into a bright, ultra-clean architectural daylight studio** that visualizes the precise section topic described in the prompt.
>
> You must obey the following rules without exception:

### Rule 1 — Strict Orientation Lock
- **Pipes must remain strictly horizontal** (0° axis), running left-to-right. Do NOT rotate, tilt, bend, warp, or slice the pipe at any angle.
- **Fittings must keep their exact real-world resting orientation from the reference photo.** Upright elbows stay upright. Sockets on their side stay on their side. 3/4 studio angles remain at 3/4. Do NOT re-orient fittings to a "prettier" pose.
- **No dramatic Dutch angles, no top-down rotations, no bendy warps.**

### Rule 2 — 100% Exact Text & Embossing Lock
The reference photo is the single source of truth for product text. **You may not invent, rephrase, or stylize any text or embossing on the product.**

**On Straight Pipes** (`RakPlus Green Pipe in Wet Industrial Setting.png`), preserve the exact horizontal black ink stencil line verbatim, exactly as printed in the reference photo:
```
RakPlus® --- RakPlus PP-R Pipe System Size 63x10,5mm SDR6 / PN20 German STD DIN 8077/78 ISO 9001:2015 WRAS Approved Material
```
- The line runs **horizontally along the long axis** of the pipe.
- The text is **black ink on green polymer** (NOT white paint, NOT laser-etched, NOT gold leaf).
- Letter spacing, capitalization, em-dashes, slashes, and the ® registered mark are **preserved exactly**.

**On Molded Fittings**, preserve the exact raised 3D green polymer mold embossing verbatim, in the exact collar/body location shown in the reference:
- `RakPlus®` (with the registered mark)
- `Ø32x1"` (the diameter-by-thread callout, with the metric/imperial slash)
- `PP-R TYP3` (the material-grade stamp)
- `Ø32/34` (the inner/outer diameter, when present)
- `RPEC` / `RPRS` (fitting-family stamps, when present)
- The embossing is **raised green polymer on green polymer** — it catches the same studio lighting as the body and reads as subtle highlights/shadows, NOT as white paint and NOT as flat laser text.

### Rule 3 — Authentic Material Physics (Light Theme)
- **PP-R Type 3 polymer body:** matte-satin emerald green (#047857 / #059669) with subtle teal sub-tones. NOT glossy plastic, NOT neon, NOT black-tinted.
- **Subtle micro-detail** on the polymer surface — light reflection, faint material grain, no heavy condensation in the light-theme scenes.
- **Brass inserts (CW617N, 100% brass):** precision-machined hexagonal or threaded inserts, brushed 200-grit gold finish, NOT chrome-plated, NOT mirror-polished. The brass reads as warm gold against the cool green polymer.
- **Architectural environment (LIGHT THEME):** bright, ultra-clean daylight studio surfaces — alabaster white (#FAFAFA), matte white micro-cement (#F2F4F3), brushed silver anodized aluminum, white marble, optical-grade ceramic inspection stages. Soft natural skylight key-light (5000K) with warm amber bounce-fill from the lower-right. **NO dark obsidian, NO dark basalt, NO wet concrete.**
- **NEVER** add moss, algae, leaves, dirt, or any non-industrial decoration on or near the product.
- **Futuristic Informative Graphic Layers** built into the scene: every image must feature sleek, futuristic translucent frosted-white **glassmorphic HUD cards**, thin emerald CAD leader lines, isometric blueprint grids, and floating technical data visualizations positioned around the product — **while keeping the product itself 100% untouched in the center 60% safe zone.**

### Rule 4 — Universal 1:1 Responsive Safe-Zone
- Output is always **2048×2048 px, 1:1 square**.
- The product is strictly inside the **center 60% safe zone** (the central 1228×1228 px region).
- **Bright** architectural breathing room on all 4 sides (NOT dark — this is a light-theme manifest). Generous alabaster-white breathing room so CSS `object-cover object-center` works on **Desktop (16:9 / 21:9), Tablet (4:3 / 3:2), and Mobile (4:5 / 9:16)** with **zero clipping of the product** at any aspect ratio.
- Floating glassmorphic spec cards, CAD leader lines, and infographic elements are placed **outside** the center 60% safe zone so they never overlap or cover the product.

### Reject Conditions
Reject and re-render the output if any of the following appear:
- A pipe is rotated, bent, or sliced at an angle other than 0°.
- A fitting is re-posed to a different orientation than the reference.
- Pipe text is white, gold, laser-etched, or paraphrased.
- Fitting embossing is rendered as flat white text or laser etching.
- The product is cropped, clipped, or extends past the 60% safe-zone.
- Moss, algae, leaves, dirt, or any non-industrial decoration appears on or near the product.
- The polymer reads as neon, glossy, or black-tinted instead of matte-satin emerald green.
- The brass insert reads as chrome or mirror-polished instead of brushed gold.
- The environment is **dark / obsidian / wet / basalt / black** — this is a LIGHT-THEME manifest.
- The environment is generic / unrelated to the section topic described in the prompt.
- The render is a "floating cover photo" with no architectural story, no glassmorphic HUD cards, no CAD callout lines, or no infographic context.

---

## 🎨 UNIVERSAL STYLE DESCRIPTOR — Prepend verbatim to every prompt

```
Hyper-realistic editorial product photograph in the style of a $10k+
luxury architectural engineering infographic — inspired by Apple M-Series
hardware breakdowns, Polestar automotive engineering, and Teenage
Engineering product photography. The product from the attached reference
photograph is staged in a BRIGHT, ULTRA-CLEAN daylight studio environment
that visualizes the section topic described in the prompt. Surfaces
include alabaster white stone (#FAFAFA), matte white micro-cement
(#F2F4F3), brushed silver anodized aluminum, white marble, and optical-
grade ceramic inspection stages. Soft natural skylight key-light (5000K)
with warm amber bounce-fill from the lower-right.

Around the product, floating translucent frosted-white glassmorphic HUD
cards, thin emerald CAD leader lines, isometric blueprint grids, and
floating technical data visualizations tell the section's engineering
story — while the product itself is left 100% untouched in the center
60% safe zone.

Cool-overhead / warm-bounce lighting balance, editorial 8K quality, f/2.8,
focal 85mm, ISO 200, film grain 0.3. 1:1 square 2048×2048, product
strictly inside the center 60% safe zone, generous bright breathing
room on all 4 sides. The product's geometry, orientation, and text/
embossing are preserved EXACTLY from the reference.
```

---

## 🖼️ THE 10 CONTEXTUAL EDITORIAL PROMPTS

For every asset below: **attach the exact reference image(s)**, prepend the **SYSTEM INSTRUCTION BLOCK** AND the **UNIVERSAL STYLE DESCRIPTOR** to the **Copy-Paste Prompt**, and submit.

---

### 1. HOME PAGE — Hero Section ("WRAS Approved PPR Pipes & Fittings in the UAE")

- **File:** `public/images/home-hero-pipe-system.png`
- **Website Component Placement:** `AboveTheFoldHero` background plate on the Home page — accompanies the section copy *"WRAS Approved PPR Pipes & Fittings in the UAE"*.
- **Reference Image(s) to Attach:** `RakPlus Green Pipe in Wet Industrial Setting.png` (the horizontal green pipe reference).
- **Concept:** **Futuristic Architectural MEP Telemetry Display (Light Theme).**
- **Contextual Scene Story:** The horizontal green RakPlus `63x10,5mm SDR6 / PN20` pipe runs across a bright, minimalist white architectural micro-cement & brushed-aluminum laboratory wall. Floating above and below the pipe (outside the pipe body) are sleek, translucent frosted-white **glassmorphic HUD cards** and thin emerald CAD callout lines displaying `DIN 8077/78`, `PN20 / SDR6`, `WRAS APPROVED`, and `50 YEARS GUARANTEE` with clean vector bar graphs.
- **Strict Product Lock:** Pipe strictly horizontal (`0°`), exact black printed text line preserved verbatim.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached horizontal green RakPlus PP-R pipe reference
("RakPlus Green Pipe in Wet Industrial Setting.png") and place it
in a BRIGHT, ULTRA-CLEAN daylight studio environment — a minimalist
white architectural micro-cement and brushed-silver anodized aluminum
laboratory wall. The pipe must run strictly horizontal left-to-right
at the 0° axis, NOT rotated, NOT tilted, NOT bent.

Floating ABOVE and BELOW the pipe (outside the pipe body, in the
bright breathing room) are sleek, translucent frosted-white
glassmorphic HUD cards connected to the pipe by thin emerald CAD
leader lines. The cards display:
  • "DIN 8077/8078"
  • "PN20 / SDR6"
  • "WRAS APPROVED"
  • "50 YEARS GUARANTEE"
Each card carries a clean vector bar graph or data visualization
visualizing the corresponding spec.

The long horizontal black ink stencil line on the pipe is preserved
VERBATIM ("RakPlus® --- RakPlus PP-R Pipe System Size 63x10,5mm
SDR6 / PN20 German STD DIN 8077/78 ISO 9001:2015 WRAS Approved
Material") — black ink on green polymer, NOT white paint, NOT
laser-etched, NOT gold. Matte-satin emerald green PP-R.

1:1 square 2048×2048, product strictly inside the center 60% safe
zone, generous BRIGHT alabaster-white breathing room on all 4
sides. No moss, no algae, no leaves, no text overlays on the
product itself, no logos.
```

---

### 2. HOME PAGE — Bento Section ("100% Brass Insert Transitions — DIN 8076")

- **File:** `public/images/home-bento-brass-transition.png`
- **Website Component Placement:** Home page bento spec card — accompanies the section copy *"100% Brass Insert Transitions — DIN 8076"*.
- **Reference Image(s) to Attach:** `WhatsApp Image 2026-09-24 at 8.05.25 PM.jpeg` (the green 90° transition female elbow with golden hex brass insert — embossed `Rak PLUS® / Ø32x1" / PP-R TYP3`).
- **Concept:** **100% Brass Insert CAD Exploded Spec Card (Light Theme).**
- **Contextual Scene Story:** The green `Ø32x1" PP-R TYP3` Transition Elbow with the golden hexagonal brass insert rests at its exact 3/4 angle on a bright white architectural drafting surface printed with crisp silver isometric CAD grid lines. Floating beside the golden hex brass threads is a futuristic translucent frosted-glass UI card with a golden leader line pointing to the brass threads: `100% BRASS CW617N | DIN 8076 | ZERO LEAK TORQUE SEAL`.
- **Strict Product Lock:** Exact 3/4 resting angle, exact golden hex brass insert, exact raised 3D green embossing (`Rak PLUS®`, `Ø32x1"`, `PP-R TYP3`).
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached WhatsApp Image 2026-09-24 at 8.05.25 PM.jpeg
reference of a RakPlus green 90° transition female elbow with
golden hex brass insert and place it on a BRIGHT WHITE architectural
drafting surface printed with crisp silver isometric CAD grid
lines. PRESERVE THE EXACT 3/4 RESTING ANGLE FROM THE REFERENCE —
the elbow sits naturally on its side at the 3/4 studio angle,
NOT re-posed.

Floating BESIDE the golden hex brass threads is a futuristic
translucent frosted-glass UI card connected to the brass by a
thin GOLDEN leader line. The card reads:
  "100% BRASS CW617N | DIN 8076 | ZERO LEAK TORQUE SEAL"

The exact raised 3D green polymer embossing on the upper shoulder
is preserved VERBATIM ("Rak PLUS®", "Ø32x1"", "PP-R TYP3"),
rendered as raised green-on-green embossing catching the studio
lighting, NOT as white paint, NOT as flat laser text. The hex
brass insert is brushed 200-grit gold (NOT chrome, NOT mirror-
polished). Matte-satin emerald green PP-R.

1:1 square 2048×2048, product strictly inside the center 60% safe
zone, generous bright breathing room on all 4 sides. No moss, no
algae, no leaves, no text overlays on the product, no logos.
```

---

### 3. INNOVATION PAGE — Section 1 ("German Standard DIN 8077/8078 & Melt-Flow Precision")

- **File:** `public/images/innovation-din-precision-sockets.png`
- **Website Component Placement:** Innovation page Section 1 — accompanies the section copy *"German Standard DIN 8077/8078 & Melt-Flow Precision"* (dimensional wall-thickness precision SDR11 to SDR5, 905 kg/m³ density).
- **Reference Image(s) to Attach:** `create-a-hyper-realistic-premium-rakplus-pp-r-redu.png` (reducer socket pair) OR `ZYA07837.jpg` (the upright green reducer socket).
- **Concept:** **Optical Laser Metrology & Dimensional Tolerance Infographic (Light Theme).**
- **Contextual Scene Story:** The RakPlus green socket pair rests on a bright white optical-grade ceramic inspection stage. Fine emerald-green laser measurement rings and architectural dimension arrows (`|<-- Ø32mm / SDR6 -->|`) project around the fittings, accompanied by a floating frosted-glass telemetry card showing `DENSITY: 905 kg/m³ (ISO 1183)` and `MFR: ≤ 0.3 g/10min`.
- **Strict Product Lock:** Exact two-fitting composition from the reference (one lying on its side showing the inner step bore and raised green `RakPlus® Ø32x1" PP-R TYP3` rim embossing, one standing upright), zero distortion.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached reducer socket reference and place the RakPlus
green socket pair on a BRIGHT WHITE optical-grade ceramic
inspection stage. PRESERVE THE EXACT RESTING ORIENTATIONS FROM
THE REFERENCES: one fitting lies on its side showing the inner
step bore and the raised green "RakPlus® Ø32x1" PP-R TYP3" rim
embossing, the other stands upright. ZERO distortion.

Fine emerald-green laser measurement rings and architectural
dimension arrows ("<-- Ø32mm / SDR6 -->") project AROUND the
fittings (NOT covering the product), accompanied by a floating
frosted-glass telemetry card connected by a thin emerald
leader line. The card reads:
  "DENSITY: 905 kg/m³ (ISO 1183)"
  "MFR: ≤ 0.3 g/10min"

The raised 3D green polymer embossing is preserved VERBATIM on
both fittings, rendered as raised green-on-green embossing
catching the studio lighting, NOT as white paint, NOT as flat
laser text. The brushed brass inserts (if any) are brushed
200-grit gold. Matte-satin emerald green PP-R.

1:1 square 2048×2048, products strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no text overlays on the product, no
logos.
```

---

### 4. INNOVATION PAGE — Section 2 ("Thermal Stability: 0°C to 70°C Continuous, 100°C Peak & 0.24 W/m·K")

- **File:** `public/images/innovation-thermal-resilience.png`
- **Website Component Placement:** Innovation page Section 2 — accompanies the section copy on thermal stability (0°C to 70°C continuous, 100°C peak, 0.24 W/m·K low thermal conductivity).
- **Reference Image(s) to Attach:** `RakPlus Green Pipe in Wet Industrial Setting.png` (the horizontal green pipe).
- **Concept:** **Dual-Zone Thermal Gradient Infographic (0°C to 100°C & 0.24 W/mK) — Light Theme.**
- **Contextual Scene Story:** Bright white high-tech climate test chamber. The horizontal RakPlus green pipe runs through the center. Above the left half floats a frosted glass card with **icy-blue vector isotherm waves** reading `0°C CONTINUOUS COLD`; above the right half floats a frosted glass card with **warm solar-amber isotherm waves** reading `70°C CONTINUOUS / 100°C PEAK | 0.24 W/m·K INSULATION`.
- **Strict Product Lock:** Pipe strictly horizontal (`0°`), exact black stencil text line preserved verbatim.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached horizontal green RakPlus PP-R pipe reference
and place it in a BRIGHT WHITE high-tech climate test chamber.
The pipe must run strictly horizontal left-to-right at the 0°
axis, NOT rotated, NOT tilted, NOT bent.

Above the LEFT HALF of the pipe, a translucent frosted-glass
card displays ICY-BLUE vector isotherm waves radiating outward
from a thin sapphire leader line pointing to the pipe. The card
reads:
  "0°C CONTINUOUS COLD"

Above the RIGHT HALF of the pipe, a second translucent frosted-
glass card displays WARM SOLAR-AMBER isotherm waves radiating
outward from a thin amber leader line pointing to the pipe.
The card reads:
  "70°C CONTINUOUS / 100°C PEAK"
  "0.24 W/m·K INSULATION"

The two cards sit in the bright breathing room above the pipe,
NOT covering it.

The long horizontal black ink stencil line on the pipe is
preserved VERBATIM ("RakPlus® --- RakPlus PP-R Pipe System Size
63x10,5mm SDR6 / PN20 German STD DIN 8077/78 ISO 9001:2015
WRAS Approved Material") — black ink on green polymer, NOT
white paint, NOT laser-etched, NOT gold. Matte-satin emerald
green PP-R.

1:1 square 2048×2048, product strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no text overlays on the product, no
logos.
```

---

### 5. INNOVATION PAGE — Section 3 ("DVS 2207 Homogeneous Socket Fusion Integrity")

- **File:** `public/images/innovation-dvs2207-elbow-joint.png`
- **Website Component Placement:** Innovation page Section 3 — accompanies the section copy *"DVS 2207 Homogeneous Socket Fusion Integrity"* (directional flow strength under high pressure PN20).
- **Reference Image(s) to Attach:** `ZYA07811.jpg` (the all-green 90° elbow standing upright in profile — embossed `Rak PLUS® PPR TYP3`).
- **Concept:** **DVS 2207 Homogeneous Socket Fusion Flow Vector Infographic (Light Theme).**
- **Contextual Scene Story:** The upright green 90° Elbow on a bright alabaster architectural pedestal. Crisp emerald-and-cyan **3D fluid-dynamics flow arrows** curve smoothly around the 90° bend in the background, with a translucent glassmorphic spec card pointing via a thin hairline to the socket collar: `DVS 2207 FUSION ZONE | CHARPY IMPACT: NO BREAK (ISO 179/1eU)`.
- **Strict Product Lock:** Exact upright profile orientation of `ZYA07811.jpg`, preserving the raised 3D green embossed `Rak PLUS® PP-R TYP3` text on the lower vertical collar.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached ZYA07811.jpg reference of a RakPlus 90° green
PP-R elbow and place it standing upright on a BRIGHT ALABASTER
architectural pedestal. PRESERVE THE EXACT UPRIGHT PROFILE
ORIENTATION FROM THE REFERENCE — the elbow stands vertically
with the 90° bend clearly visible, NOT re-posed.

In the bright breathing room BEHIND and AROUND the elbow (not
covering it), crisp emerald-and-cyan 3D fluid-dynamics flow
arrows curve smoothly around the 90° bend, visualizing the
section's flow integrity story.

A translucent glassmorphic spec card sits in the upper-right
bright breathing room, connected to the socket collar by a
thin emerald hairline leader. The card reads:
  "DVS 2207 FUSION ZONE"
  "CHARPY IMPACT: NO BREAK (ISO 179/1eU)"

The exact raised 3D green polymer embossing on the lower
vertical collar is preserved VERBATIM ("Rak PLUS®", "PP-R TYP3"),
rendered as raised green-on-green embossing catching the studio
lighting, NOT as white paint, NOT as flat laser text. Matte-
satin emerald green PP-R.

1:1 square 2048×2048, product strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no text overlays on the product, no
logos.
```

---

### 6. SUSTAINABILITY PAGE — Section 1 ("WRAS Approved Material — 100% Hygienic Potable Water Purity")

- **File:** `public/images/sustainability-wras-water-purity.png`
- **Website Component Placement:** Sustainability page Section 1 — accompanies the section copy *"WRAS Approved Material — 100% Hygienic Potable Water Purity"* (non-toxic, odor-free drinking water safety).
- **Reference Image(s) to Attach:** `green main.png` (the two green sockets — one lying on its side showing the inner step bore and `RakPlus® Ø32x1" PP-R TYP3` rim embossing, one standing upright).
- **Concept:** **WRAS Potable Water Purity & Molecular Hygiene Card (Light Theme).**
- **Contextual Scene Story:** Bright, sunlit white architectural water-testing laboratory surface with crystal-clear turquoise-tinted pure water ripples around the base of the two green RakPlus sockets. Floating translucent white glass infographic card in the upper quadrant displays a clean shield icon and `WRAS APPROVED MATERIAL | 100% NON-TOXIC POTABLE WATER | ZERO HEAVY METALS`.
- **Strict Product Lock:** Exact two-fitting composition from `green main.png`.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached green main.png reference of two RakPlus equal
sockets and place BOTH fittings on a BRIGHT, SUNLIT WHITE
architectural water-testing laboratory surface. PRESERVE THE
EXACT RESTING ORIENTATIONS FROM THE REFERENCE — one socket lies
on its side showing the inner step bore and the raised green
"RakPlus® Ø32x1" PP-R TYP3" rim embossing, the other stands
upright. ZERO distortion.

Crystal-clear, TURQUOISE-TINTED pure water ripples gently around
the base of the two sockets, refracting the soft natural
skylight.

A floating translucent white glass infographic card sits in the
upper-quadrant bright breathing room, displaying a clean shield
icon and the text:
  "WRAS APPROVED MATERIAL"
  "100% NON-TOXIC POTABLE WATER"
  "ZERO HEAVY METALS"

The exact raised 3D green polymer embossing on the rim is
preserved VERBATIM ("RakPlus®", "Ø32x1"", "PP-R TYP3"), rendered
as raised green-on-green embossing catching the studio lighting,
NOT as white paint, NOT as flat laser text. Matte-satin emerald
green PP-R.

1:1 square 2048×2048, products strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no dirt, no text overlays on the
product, no logos.
```

---

### 7. SUSTAINABILITY PAGE — Section 2 ("50-Year Guaranteed Lifespan & Zero Corrosion vs. Metal")

- **File:** `public/images/sustainability-50yr-corrosion-free.png`
- **Website Component Placement:** Sustainability page Section 2 — accompanies the section copy *"50-Year Guaranteed Lifespan & Zero Corrosion vs. Metal"* (chemical resistance, zero rust / scaling in harsh UAE coastal & industrial conditions).
- **Reference Image(s) to Attach:** `ZYA07832.jpg` (the green domed end cap `RPEC`) + `ZYA07837.jpg` (the green upright reducer socket `RPRS`).
- **Concept:** **50-Year Lifespan & Chemical Resistance Matrix Card (Light Theme).**
- **Contextual Scene Story:** The upright green End Cap and Reducer Socket staged on a clean white marble & brushed-steel laboratory platform. Behind them floats a futuristic frosted-glass data dashboard comparing `PP-R: 0% CORROSION (50 YEARS)` vs. `METAL: OXIDATION & SCALING`, with pH/chemical resistance badges (`20°C–100°C RESISTANT`).
- **Strict Product Lock:** Exact upright resting orientations from `ZYA07832.jpg` and `ZYA07837.jpg`.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached ZYA07832.jpg (End Cap "RPEC") and ZYA07837.jpg
(Reducer Socket "RPRS") reference photographs and place BOTH
fittings on a CLEAN WHITE MARBLE & BRUSHED-STEEL laboratory
platform. PRESERVE THE EXACT UPRIGHT RESTING ORIENTATIONS FROM
THE REFERENCES — both fittings sit naturally upright as shown,
NOT re-posed.

Behind the fittings (in the bright breathing room) floats a
futuristic frosted-glass data dashboard connected to the
fittings by thin emerald leader lines. The dashboard compares:
  Left card:  "PP-R: 0% CORROSION (50 YEARS)" — emerald badge
  Right card: "METAL: OXIDATION & SCALING" — crimson badge
Plus a pH/chemical resistance badge:
  "20°C–100°C RESISTANT"

The exact raised 3D green polymer embossing on each fitting is
preserved VERBATIM ("RakPlus®", "PP-R TYP3", "RPEC", "RPRS"),
rendered as raised green-on-green embossing catching the studio
lighting, NOT as white paint, NOT as flat laser text. Matte-
satin emerald green PP-R.

1:1 square 2048×2048, products strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no dirt, no rust on the polymer,
no text overlays on the product, no logos.
```

---

### 8. SUSTAINABILITY PAGE — Section 3 ("Acoustic & Vibration Damping in High-Rise Towers")

- **File:** `public/images/sustainability-acoustic-clamp-system.png`
- **Website Component Placement:** Sustainability page Section 3 — accompanies the section copy *"Acoustic & Vibration Damping in High-Rise Towers"* (Catalogue p.04: damped vibrations and sounds are absorbed, resulting in noise reduction).
- **Reference Image(s) to Attach:** `ZYA07815.jpg` (the green pipe bracket / clamp embossed `RakPlus® Ø32/34`).
- **Concept:** **Acoustic Decibel Damping & Vibration Absorption Infographic (Light Theme).**
- **Contextual Scene Story:** The green RakPlus `Ø32/34` Pipe Clamp resting at its exact angled upright pose on a bright white architectural acoustic-ribbed panel. Clean emerald **sound-wave frequency bars** visibly flatten into a straight silent line across a floating frosted-glass HUD card reading `ACOUSTIC & VIBRATION DAMPING | HIGH-RISE RISER SILENCE`.
- **Strict Product Lock:** Exact angled upright pose of `ZYA07815.jpg` with the C-clamp arms, side interlocking tabs, and raised green `RakPlus® Ø32/34` base embossing untouched.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached ZYA07815.jpg reference of a green RakPlus
Ø32/34 pipe bracket clamp and place it on a BRIGHT WHITE
architectural acoustic-ribbed panel. PRESERVE THE EXACT ANGLED
UPRIGHT POSE FROM THE REFERENCE — the bracket's C-clamp arms,
side interlocking tabs, and angled base are exactly as shown,
NOT re-posed.

In the bright breathing room, a frosted-glass HUD card displays
clean emerald sound-wave frequency bars that visibly flatten
from a tall peak on the left into a straight silent line on
the right, visualizing "sound being absorbed". The card reads:
  "ACOUSTIC & VIBRATION DAMPING"
  "HIGH-RISE RISER SILENCE"

The exact raised 3D green polymer embossing on the base is
preserved VERBATIM ("RakPlus®", "Ø32/34"), rendered as raised
green-on-green embossing catching the studio lighting, NOT as
white paint, NOT as flat laser text. Matte-satin emerald green
PP-R.

1:1 square 2048×2048, product strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no text overlays on the product, no
logos.
```

---

### 9. ABOUT PAGE — Section 1 ("Aquasmart Plastic Industries L.L.C — ISO 9001 & ISO 14001 UAE Manufacturing")

- **File:** `public/images/about-aquasmart-uae-manufacturing.png`
- **Website Component Placement:** About page Section 1 — accompanies the section copy *"Aquasmart Plastic Industries L.L.C — ISO 9001 & ISO 14001 UAE Manufacturing"* (UAE factory in Umm Al Quwain, strict in-house QA/QC laboratory testing).
- **Reference Image(s) to Attach:** `RakPlus Green Pipe in Wet Industrial Setting.png` (the horizontal green pipe).
- **Concept:** **Aquasmart UAE ISO 9001 / 14001 Smart Factory Telemetry (Light Theme).**
- **Contextual Scene Story:** The horizontal green RakPlus pipe supported on a brushed silver CNC inspection cradle in a bright, spotless white German-standard QA/QC laboratory. Floating glassmorphic certification cards above the pipe display `AQUASMART PLASTIC INDUSTRIES L.L.C — UMM AL QUWAIN, UAE`, `ISO 9001:2015`, and `ISO 14001:2015`.
- **Strict Product Lock:** Pipe strictly horizontal (`0°`), exact black printed text line (`RakPlus® --- RakPlus PP-R Pipe System Size 63x10,5mm SDR6 / PN20 German STD DIN 8077/78 ISO 9001:2015 WRAS Approved Material`) 100% sharp and unaltered.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached horizontal green RakPlus PP-R pipe reference
and place it resting on a BRUSHED SILVER CNC inspection cradle
inside a BRIGHT, SPOTLESS WHITE German-standard QA/QC laboratory.
The pipe must run strictly horizontal left-to-right at the 0°
axis, NOT rotated, NOT tilted, NOT bent.

Floating in the bright breathing room above the pipe, glassmorphic
certification cards display:
  • "AQUASMART PLASTIC INDUSTRIES L.L.C"
  • "UMM AL QUWAIN, UAE"
  • "ISO 9001:2015"
  • "ISO 14001:2015"
Each card connected to the pipe by a thin emerald CAD leader
line.

The long horizontal black ink stencil line on the pipe is
preserved VERBATIM ("RakPlus® --- RakPlus PP-R Pipe System Size
63x10,5mm SDR6 / PN20 German STD DIN 8077/78 ISO 9001:2015
WRAS Approved Material") — 100% sharp and unaltered, black ink
on green polymer, NOT white paint, NOT laser-etched, NOT gold.
The brushed silver cradle shows faint brushed reflections of the
pipe. Matte-satin emerald green PP-R.

1:1 square 2048×2048, product strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no text overlays on the product, no
logos.
```

---

### 10. PRODUCTS HUB — Category Showcase ("Complete DIN 8077/8078 Pipe & Fitting System")

- **File:** `public/images/products-complete-system-showcase.png`
- **Website Component Placement:** Products Hub / Category Showcase section — accompanies the section copy *"Complete DIN 8077/8078 Pipe & Fitting System"* (unified polymer and brass piping system for residential towers, villas, and industrial plants).
- **Reference Image(s) to Attach:** `WhatsApp Image 2026-09-24 at 8.05.25 PM.jpeg` (Brass Transition Elbow) + `ZYA07811.jpg` (All-Green 90° Elbow) + `ZYA07837.jpg` (Reducer Socket) + `ZYA07815.jpg` (Pipe Clamp).
- **Concept:** **Complete 29-Family Modular System Blueprint Knolling (Light Theme).**
- **Contextual Scene Story:** Bright white architectural engineering board with crisp grey millimeter grid lines and CAD callout boxes around each real fitting (`RPFSH BRASS SERIES`, `RPE90 ELBOW`, `RPRS REDUCER`, `RPBT CLAMP`), presenting the complete SDR11–SDR5 (`20mm–110mm`) product ecosystem like an Apple hardware exploded keynote slide.
- **Strict Product Lock:** Every fitting keeps its exact real-world proportions, original resting angle, golden brass threads, and raised green mold embossing.
- **Copy-Paste Prompt:**
```
{INSERT SYSTEM INSTRUCTION BLOCK HERE}
{INSERT UNIVERSAL STYLE DESCRIPTOR HERE}

Take the attached references (WhatsApp Image 2026-09-24 at
8.05.25 PM.jpeg Brass Transition Elbow, ZYA07811.jpg All-Green
90° Elbow, ZYA07837.jpg Reducer Socket, ZYA07815.jpg Pipe Clamp)
and compose ALL FOUR fittings into an architectural knolling /
editorial product family composition on a BRIGHT WHITE
architectural engineering board with crisp GREY MILLIMETER GRID
LINES etched into the surface — like an Apple hardware exploded
keynote slide.

PRESERVE THE EXACT REAL-WORLD PROPORTIONS AND RESTING ANGLES
FROM EACH REFERENCE — the Brass Transition Elbow sits naturally
at its 3/4 studio angle, the All-Green 90° Elbow stands upright,
the Reducer Socket sits on its side, the Pipe Clamp sits at its
angled upright pose.

Each fitting has a thin emerald CAD callout line connecting it
to a small frosted-glass label card in the bright breathing room:
  • "RPFSH BRASS SERIES"
  • "RPE90 ELBOW"
  • "RPRS REDUCER"
  • "RPBT CLAMP"

The exact raised 3D green polymer embossing on each fitting is
preserved VERBATIM ("Rak PLUS®", "RakPlus®", "Ø32x1"", "PP-R
TYP3", "Ø32/34", "RPEC", "RPRS"), rendered as raised green-on-
green embossing catching the studio lighting, NOT as white
paint, NOT as flat laser text. The hex brass inserts are
brushed 200-grit gold (NOT chrome, NOT mirror-polished). Matte-
satin emerald green PP-R.

A subtle dimensional callout in the lower breathing room reads:
  "COMPLETE SYSTEM · SDR11 – SDR5 · Ø20mm – Ø110mm"

1:1 square 2048×2048, products strictly inside the center 60%
safe zone, generous bright breathing room on all 4 sides. No
moss, no algae, no leaves, no text overlays on the product, no
logos.
```

---

## 📐 USAGE NOTES

- **The 4-rule system instruction block and the universal style descriptor are non-negotiable.** Every prompt must prepend them. Every output that violates them is rejected and re-issued.
- **The reference image(s) are the source of truth** for product geometry, orientation, and text/embossing. The AI's job is to **stage the product in a bright architectural scene that visualizes the section topic** — NOT to redesign the product and NOT to render a dark cover photo.
- **We are completely abandoning dark wet backgrounds.** This is a **light-theme futuristic infographic manifest**. Every scene must be bright, ultra-clean, daylight-studio-lit, and feature **glassmorphic HUD cards, CAD leader lines, blueprint grids, and floating data visualizations** built into the scene around the product.
- **Every prompt describes a specific architectural editorial scene tied to a specific section copy on the website.** This is what differentiates a $10k+ luxury editorial asset from a "product on a wet floor" cover photo.
- **All assets are 1:1 (2048×2048)** with the subject strictly inside the center 60% safe zone.
- When consuming in code, use `object-cover object-center` to crop to any aspect ratio without losing subject. Apply a slight `scale-105` for the tightest mobile crops to keep edges invisible.
- The same prompt body can be re-rendered at 2× (4096×4096) for 4K hero canvases — keep the same system instruction block, style descriptor, and reference images verbatim.

---

*Generated as part of the RAKPLUS Design System Consolidation — Phase 23.0, AI Image-to-Image Generation Manifest v4.0 (Light-Theme Futuristic Infographic Edition).*
