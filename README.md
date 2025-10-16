# Baker O’Brien Globe Bundle

This directory is a self-contained copy of the interactive globe used on [https://bakerobrien.com/prism](https://bakerobrien.com/prism).  
Everything required to run the globe outside of Craft CMS (HTML, CSS, JavaScript, GlobeKit assets, and the licensed runtime) lives here so it can be embedded in any static site, portal, or SPA.

## What’s Included

| Path | Purpose |
| --- | --- |
| `index.html` | Minimal example that renders the production globe in a two-column promo layout. Use this as your reference implementation. |
| `globe.js` | Plain JS module exporting `createGlobe()`. This is the port of `components/elements/Globe.vue` from the Nuxt app. |
| `globe.css` | Styles extracted from the live PRISM page (layout, typography, button, responsive tweaks). |
| `assets/` | Required GlobeKit resources: `pointglobe.bin`, `clouds.png`, `disk-glow-border.png`, and `gkweb_bg.wasm`. |
| `vendor/globekit-public/` | Copy of the production `globekit-public` package. `globekit.umd.js` is loaded directly in the example page. |
| `default-points.json` | JSON export of the demo coordinate list. Matches `demoPoints()` from the Craft component. |

## Quick Start (see `index.html`)

1. Serve the folder with any static server (WASM must come from HTTP/HTTPS):
   ```bash
   cd globe-code
   python3 -m http.server 8080
   ```
2. Open `http://127.0.0.1:8080/index.html`. You should see the globe rotating with landmass particles, atmosphere glow, and the demo dots exactly like the live PRISM page.

## Embedding in Another App

You can drop the globe into any build system with the following pieces:

1. **Assets** – keep `assets/` accessible at runtime. If you need different paths, pass them when calling `createGlobe()`.
2. **Runtime** – load `vendor/globekit-public/globekit.umd.js` (or bundle the ESM file) before you call `createGlobe()`. The script exposes `window.globekitjs`.
3. **Module** – import `createGlobe` and initialise it with a `<canvas>` element:
   ```html
   <script src="/path/to/globekit.umd.js"></script>
   <script type="module">
     import { createGlobe } from '/path/to/globe.js';

     const canvas = document.querySelector('#globe-canvas');
     const kit = window.globekitjs;

     createGlobe(canvas, {
       hasDots: true,
       kit,
       pointDataPath: '/path/to/assets/pointglobe.bin',
       noiseTexture: '/path/to/assets/clouds.png',
       atmosphereTexture: '/path/to/assets/disk-glow-border.png',
       wasmPath: '/path/to/assets/gkweb_bg.wasm'
     });
   </script>
   ```
4. **Styling** – copy the relevant rules from `globe.css` or import the file as-is to get the responsive layout and fade-in behaviour. The canvas adds `globe-canvas--ready` once the draw loop starts.

## `createGlobe()` Options

| Option | Default | Details |
| --- | --- | --- |
| `kit` | `undefined` | GlobeKit class bundle. Pass `window.globekitjs` (or an object with `GlobeKitView`, `PointGlobe`, `Points`, `Atmosphere`). |
| `hasDots` | `false` | Turns on the additional points layer rendered in production. |
| `points` | `DEFAULT_POINTS` | Array of `[lat, lon]` pairs or a GeoJSON FeatureCollection for custom markers. |
| `bgColor` | `0xffffff` | Renderer clear colour (number or hex string). |
| `dotColor` | `0xffffff` | Colour applied to generated dots. |
| `landColor` | `"#183C55"` | Colour used for the `PointGlobe` landmass particles. |
| `wasmPath` | `./assets/gkweb_bg.wasm` | Path to the GlobeKit WASM module. |
| `pointDataPath` | `./assets/pointglobe.bin` | Landmass particle data. |
| `noiseTexture` | `./assets/clouds.png` | Noise texture used by GlobeKit. |
| `atmosphereTexture` | `./assets/disk-glow-border.png` | Texture for the halo drawable. |
| `atmosphereScale` | `1.3` | Matches production halo size. |
| `startLat`, `startLon` | `29.7`, `-95.3` | Initial camera focus. |

The helper resolves the required classes automatically by checking the provided `kit` object, `kit.default`, or globals (`window.globekitjs`, `window.GlobeKit`). It returns `{ view, atmosphere, pointGlobe, dots }` so you can add extra drawables or adjust properties after initialisation.

## Notes & Caveats

- The GlobeKit runtime is proprietary; keep `vendor/globekit-public` private unless you have redistribution rights.
- All assets were captured from production on 2025‑10‑10. Refresh them if the live site changes.
- Browsers require WASM to be served via HTTP/HTTPS. Opening the HTML file directly from disk will fail.
- `default-points.json` is provided for convenience—replace it or pass your own coordinates for different markers.

## Verification Checklist

- [ ] Globe renders with the same landmasses, dots, and glow as https://bakerobrien.com/prism  
- [ ] No 404s in the network tab for WASM, textures, or `pointglobe.bin`  
- [ ] Canvas receives `globe-canvas--ready` once drawing starts (ensures the fade-in works)  
- [ ] Copy and button styles match design once `globe.css` is included

With those checks complete you can hand the folder to the PRISM engineers—the bundle is production-ready and framework-agnostic.
