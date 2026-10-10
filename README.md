# Northline — Glass Office Website

A cinematic, scroll-driven architectural website for a glass office building.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Three.js, React Three Fiber and Drei,
GSAP with ScrollTrigger, and Lenis for smooth scrolling.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm run start
```

## Pages

- `/` — Hero and the scroll-controlled 3D journey: exterior, entrance, reception, main workspace,
  meeting rooms, lounge and overview. The camera follows a single Catmull-Rom path, driven by
  GSAP ScrollTrigger scrub progress. The scene index on the right jumps to any room.
- `/spaces` — Seven spaces with schematic plans, feature lists and links back into the 3D journey
  (`/#scene-2` … `/#scene-5`).
- `/about` — Design philosophy, highlights, amenities, sustainability (placeholder), prototype
  figures and contact (placeholder).

## Project structure

```
app/
  layout.tsx          Root layout, Geist fonts (local files in app/fonts), global chrome
  template.tsx        Refined fade transition on every route change
  globals.css         Base typography, buttons, nav underline, reduced-motion rules
  page.tsx            Home: 3D journey + final call to action
  spaces/page.tsx     Spaces page
  about/page.tsx      About page
components/
  SiteNav.tsx         Fixed navigation, mobile menu
  Footer.tsx          Footer
  SmoothScroll.tsx    Lenis, synced to the GSAP ticker
  ScrollProgress.tsx  Thin top progress line
  Reveal.tsx          Scroll-triggered entrance for any block
  Parallax.tsx        Subtle scrubbed parallax
  SpacePlan.tsx       Schematic SVG plans for each space
  BuildingDrawing.tsx Schematic axonometric of the building (SVG)
  FinalCall.tsx       Closing call to action
  journey/
    BuildingJourney.tsx  Sticky stage, ScrollTrigger, captions, hero, scene index
    Scene3D.tsx          R3F canvas and camera rig
    Building.tsx         Glass envelope, mullion grid, slabs, roof, entrance, site
    Interior.tsx         Reception, workstations, meeting rooms, lounge, lighting
    primitives.tsx       Shared materials, unit box geometry and Box helper
    HeroHeadline.tsx     Staggered, masked headline reveal
lib/
  gsap.ts             GSAP + ScrollTrigger registration
  journey.ts          Scene copy, camera path knots, curve parameter mapping
  scroll.ts           Lenis access for programmatic scrolling
  motion.ts           Reduced-motion and WebGL detection
  content.ts          Spaces and amenities content
  copy.ts             About figures
```

## What is real, and what is a prototype

- The building is built from procedural 3D geometry in code: a glass envelope with a mullion grid,
  floor slabs, a roof, an entrance canopy, and interiors with desks, chairs, meeting tables, a
  reception desk and a lounge. Lighting uses a sun-style directional light with soft shadows, plus
  ceiling lamps and point lights.
- The glass is a transparent physical-style material with a procedural sky reflection. It does not
  use an HDR environment map, so reflections are stylised rather than fully physically traced.
- No external GLB models or textures are downloaded. To replace the procedural building with a
  detailed model, export a GLB from your modelling tool, place it in `public/models/`, and load it
  with `useGLTF` from Drei inside `Building.tsx` and `Interior.tsx`.
- Dimensions are prototype dimensions. They are not final building data.
- Sustainability claims, certifications, areas, contact details and the studio name are clearly
  marked placeholders. Replace them with confirmed information before publishing.
- If WebGL is unavailable, the journey falls back to the scene text and index, with no 3D canvas.
- Reduced-motion users get no smoothing and no scroll-scrubbed parallax; the camera snaps to
  each scroll position.

## Performance notes

- The canvas uses device pixel ratio capped at 1.6 and a 2048 px shadow map.
- Geometry is shared through a single unit box, and materials are created once.
- The 3D bundle is loaded with `next/dynamic` and `ssr: false`, so the rest of the site is not
  blocked by Three.js.
- ScrollTriggers are created inside `gsap.context` and reverted on unmount, so route changes do not
  leave duplicate triggers behind.

---

## Version 2: the furnished campus

### What changed

- **Campus.** A landscaped site with lawns, stone paths, a driveway, a car park with parked cars,
  benches, lamp posts, a terrace with umbrella tables, a pond, and instanced shrubs, grass and
  flowers. Trees sway gently from their bases. Placement is deterministic, so the garden is the
  same on every load.
- **Interiors.** Reception with a desk, monitors, waiting sofas and plants. A main workspace with
  twelve desks, accessories, chairs and pendant lights. Two glass meeting rooms with a conference
  table and wall screens. Four private offices with desks, bookshelves and filing. A lounge with
  sofas, armchairs and a rug. A café with round tables, a serving counter and coffee machines.
  Ceiling beams, an elevator core, and a rear fire exit with an illuminated sign.
- **People.** About 35 low-poly figures with natural proportions, in eight clothing palettes.
  Seated figures sit still with slight head movement. Standing figures breathe and turn their
  heads. Walking figures follow paths and swing their limbs. Faces are deliberately not detailed,
  to avoid distortion at this level of geometry.
- **Journey.** Ten scenes, from the wide campus view through the façade, entrance, reception,
  workspace, meeting room, private office, lounge and café, to the overview. The camera follows a
  single Catmull-Rom path, with scenes spaced by arc length so pacing stays even.
- **Homepage sections below the journey.** Workspace, collaboration, amenities, architecture,
  a closing statement, the contact call to action, and the footer.

### Checking the camera path

```bash
node scripts/check-camera-path.mjs
```

This samples the path at eye height and reports any point inside a full-height wall. It is a
numerical check on the route, not a substitute for looking at it in a browser.

### Limitations

- No external GLB models or textures are included. Characters, furniture and planting are
  procedural. To use detailed models, export them as GLB and load them with `useGLTF`.
- Figures are simplified: not rigged, with no facial detail.
- Glass is a stylised transparent material with no HDR environment map.
- Mobile uses a lighter configuration: fewer trees and plants, fewer people, and 1024 px shadows.
