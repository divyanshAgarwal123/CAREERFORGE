# SaaS and portfolio payload acceptance

The exact source heads and actual parent are recorded in source.json. Each assigned issue adds only its four dedicated compression-suite files. These reuse the existing repository bounded UTF-8 LZW implementation with synthetic CloudPulse telemetry and DevCraft project manifests. No shared files, dependencies or configurations change.

All 12 Node tests per feature, scoped oxlint and normal Node 22 production builds pass. Development and production browser checks independently decode five actual downloads per page: example, Unicode/BOM/NUL, expansion, empty input and retry. Reported packed sizes match real files including the header. Keyboard analysis, edit invalidation, bounds, invalid link-speed recovery, modeled times, download failure/retry and URL cleanup pass. Reduced motion and desktop/320/390/760px layouts pass without page errors or failed resources. Screenshots were inspected. The transfer times are explicit models, not network benchmarks; the codec is a standalone LZW1 format, not ZIP.

## Reproduce

Check out a source head with Node 22. Run npm ci, node --test for the dedicated test file, scoped oxlint and npm run build. Start normal Vite dev/preview. Set PLAYWRIGHT_MODULE to an installed Playwright ESM module, BASE to the local URL, OUT to an evidence directory, FOLDER to the target folder and SAMPLE_TOKEN to either CloudPulse demo gateway or Unicode toolkit. Run browser-check.mjs with local Chrome at its default macOS path. Fresh profiles and synthetic local data are used.
