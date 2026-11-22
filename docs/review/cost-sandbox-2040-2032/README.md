# Resource pricing sandboxes — issues2040 and2032

The exact commits, actual parents and branches are in source.json, with per-file SHA256s in source-sha256.json. Both issues were actually assigned before any feature branch or code. Each PR adds only its four dedicated cost-optimizer files. Existing SaaS 36-month TCO/subscription pricing, Agency project-scope ROI estimator, benchmark and shared files are preserved. Those existing estimators do not implement this separately requested graduated resource-consumption model.

## The model is fictional

This is a resource cost-estimation sandbox, not provider pricing or provisioning. Compute represents worker-hours, storage GB-months and bandwidth GB transferred. The full invented rate table and graduated0/10/20 percent volume discounts are visible. One demo credit has100 integer subunits. Each tier's discount rounds half up to a subunit; annual billing multiplies the graduated monthly subtotal by12, then applies a15 percent annual discount once. No taxes, real currency conversion, payment, backend, storage or upload is claimed.

## Validation

-20 focused Node tests pass across the two modules: exact graduated boundaries, discount and annual rounding, zero/max inputs, invalid-state retention, deep quote independence and JSON structure. A property check traverses all20001 bandwidth quantities per module for monotonicity and line reconciliation.
- Scoped oxlint and both normal Node22 builds pass.
- All four native Vite development/production reports pass. Native keyboard sliders/radio billing match independently calculated35400 monthly/361080 annual subunits for the default quantities. Price changes animate when motion is allowed and cancel with reduced motion. Zero usage remains finite; native End keys verify the maximum annual3442500 subunits. Native slider gradient fill variables track zero/default/max values, the CSS rule is checked, and actual tracks are captured in visually reviewed screenshots. Chrome does not expose this internal track through getComputedStyle, so no pseudo-element computed-style measurement is claimed.
- Two real JSON downloads per native run are saved and decoded against the displayed quote. Explicit URL-allocation denial retains the estimate and retries; all Blob URLs and temporary anchors are cleaned. Explicit invalid-quantity fixture also retains/recoveries the quote. These are labeled failure fixtures; the normal controls, arithmetic, animation and downloads are native.
-1360/760/390/320px layouts have no overflow or page/resource failures; no fetch/XHR is made. Representative desktop and mobile screenshots for each module were visually reviewed.

## Reproduce

Check out the source commit for the chosen issue, install the repository dependencies under Node22 and run:

```sh
node --test public/showcase/SLUG/cost-optimizer.test.mjs
npm run build
npm run dev -- --host 127.0.0.1 --port 5432 --strictPort
```

For the production check use npm run preview on the same port after stopping development. Use saas-launchpad or agency-studio for SLUG. Install Playwright outside the repository and point PLAYWRIGHT_MODULE at its importable entry point. Chrome defaults to /Applications/Google Chrome.app/Contents/MacOS/Google Chrome; CHROME_PATH can override it.

```sh
BASE=http://127.0.0.1:5432 FOLDER=SLUG OUT=/tmp/cost-proof PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node browser-harness.mjs
```

The harness creates its output folder. Reports and screenshots are observations of the recorded Chrome/macOS environment. Local and hosted acceptance, review, merge and official credit remain separate states.
