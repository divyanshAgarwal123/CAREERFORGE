# Location radar acceptance

Exact source heads and actual parent are in source.json. Each assigned issue changes only its four dedicated geo-tracker files. The existing repository geometry module is adapted to illustrative pickup points and studio locations, with distinct data, origin and range. No real opening hours, inventory, bookings, shipping prices, road routes, travel times or device geolocation are claimed.

All 12 Node tests per page, scoped oxlint and normal Node 22 builds pass. Tests compare distances against an independent 3D-vector oracle and analytical cases, plus dateline/polar/coincident/antipodal coordinates, cardinal bearings, deterministic non-mutating sorting and malformed/bounded node lists.

Native development and production checks pass keyboard-selectable radar blips, list selection, actual range input, the dateline example, invalid-input preservation, undefined polar headings, pause/reduced motion and desktop/320/390/760px layouts with zero browser errors or failed resources. Screenshots were inspected.

## Reproduce

Check out either source SHA, run npm ci under Node 22, the corresponding geo-tracker.test.mjs with node --test, scoped oxlint and npm run build. Run normal Vite dev/preview, then browser-check.mjs with PLAYWRIGHT_MODULE pointing to an installed Playwright ESM module, BASE set to the local URL and OUT to an evidence directory. Set FOLDER=ecommerce-store and NORTH="North demo pickup", or FOLDER=agency-studio and NORTH="North demo studio". The harness uses a fresh headless Chrome profile at the default macOS Chrome path.
