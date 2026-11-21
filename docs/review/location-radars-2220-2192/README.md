# Waypoint and meetup radar acceptance

Issue #2220 adds TravelOdysseyGeoRadarEngine and an illustrative expedition waypoint radar. Issue #2192 adds DeveloperPortfolioGeoRadarEngine and a fictional developer meetup radar. Each changes exactly its four assigned geo-tracker files; actual source heads and parent are in source.json. The existing repository spherical geometry engine is adapted to distinct example locations, origin, radius and presentation. No device location, external maps, real routes, schedules or bookings are used.

Both 12-test Node suites, scoped oxlint and normal Node 22 builds pass. Analytical cases and an independent three-dimensional vector oracle cover distance accuracy, dateline crossings, cardinal/undefined bearings, near-antipodes, deterministic sorting and bounded, mutation-safe inputs.

All four native Vite development/production reports passed distance-sorted cards and outside-range status, native range controls, Space/Enter blips, actual eastward dateline placement, invalid-input preservation, polar headings, list selection, sweep pause/resume, reduced motion, desktop and 320/390/760px layouts. Browser errors and failed resources are empty. Screenshots were visually inspected.

## Reproduce

Check out a source head in source.json; under Node 22 run npm ci, node --test public/showcase/PROJECT/geo-tracker.test.mjs, npm run lint -- public/showcase/PROJECT/geo-tracker.js public/showcase/PROJECT/geo-tracker.test.mjs, and npm run build. Start the normal npm run dev or npm run preview server. Run browser-check.mjs with PLAYWRIGHT_MODULE pointing to an installed Playwright ESM module, BASE set to the local URL, OUT to an evidence directory, and FOLDER to travel-odyssey or developer-portfolio. Set NORTH to "North demo visitor hub" or "North demo developer hub", respectively. The harness uses a fresh headless Chrome profile at the standard macOS application path.
