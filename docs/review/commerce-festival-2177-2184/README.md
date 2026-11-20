# Commerce workflow and festival radar acceptance

Exact source heads and actual upstream parent are in source.json. Each feature changes only the four files required by its assigned issue. The existing repository modules are adapted to a local order model and an illustrative Tokyo festival layout. No real payment, booking, geolocation, route or venue availability is claimed.

All 6 FSM and 12 geometry Node tests pass, scoped oxlint is clean, and normal Node 22 builds pass. Geometry uses an independent 3D-vector oracle. Native development and production browser checks pass guarded transitions, rejection/reset, custom self loops, duplicate protection, keyboard focus, Mermaid download, radar keyboard/list/range input, dateline/polar cases, invalid-input preservation, pause, reduced motion and 320/390/760px layouts with no page errors or failed resources. Mermaid 12.3.0 parses and renders ordinary and adversarial exports. Screenshots were inspected.

## Reproduce

Check out either source head. Use Node 22 with npm ci, node --test on the four-file feature test, scoped oxlint, npm run build and the normal Vite dev/preview commands. Run the corresponding browser harness with PLAYWRIGHT_MODULE set to an installed Playwright ESM module, BASE to the server URL, OUT to an output directory, and KIND=geo for the festival harness. A fresh headless Chrome profile at the default macOS Chrome path is used.
