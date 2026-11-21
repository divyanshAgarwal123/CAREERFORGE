# Venue and wellness radar acceptance

Issue #2212 adds the requested GamingEsportsHubGeoRadarEngine and venue radar. Issue #2216 adds HealthVitalityGeoRadarEngine and a fictional wellness-location radar. Each changes exactly its four assigned geo-tracker files; actual source heads and parent are in source.json. The existing repository spherical geometry engine is adapted to distinct example locations, origin, radius and presentation. No device location, external maps, real venue schedules or care-provider availability are used.

Both 12-test Node suites, scoped oxlint and normal Node 22 builds pass. Analytical cases and an independent three-dimensional vector oracle cover distance accuracy, dateline crossings, cardinal/undefined bearings, near-antipodes, deterministic sorting and bounded, mutation-safe inputs.

All four native Vite development/production reports passed distance-sorted cards and outside-range status, native range controls, Space/Enter blips, actual eastward dateline placement, invalid-input preservation, polar headings, list selection, sweep pause/resume, reduced motion, desktop and 320/390/760px layouts. Browser errors and failed resources are empty. Screenshots were visually inspected.

## Reproduce

Check out a source head in source.json; under Node 22 run npm ci, node --test public/showcase/PROJECT/geo-tracker.test.mjs, npm run lint -- public/showcase/PROJECT/geo-tracker.js public/showcase/PROJECT/geo-tracker.test.mjs, and npm run build. Start the normal npm run dev or npm run preview server. Run browser-check.mjs with PLAYWRIGHT_MODULE pointing to an installed Playwright ESM module, BASE set to the local URL, OUT to an evidence directory, and FOLDER to gaming-esports-hub or health-vitality. Set NORTH to "North demo training venue" or "North demo wellness hub", respectively. The harness uses a fresh headless Chrome profile at the standard macOS application path.

The wellness branch incorporates upstream main after the repository merge workflow failed with "Base branch was modified". Its four feature files are byte-identical; the focused tests, lint, normal production build and both native browser modes passed again at the updated head in source.json. This was a normal base merge, with no force push or workflow rerun.
