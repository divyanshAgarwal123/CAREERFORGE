# Rendering stress labs — issues 2077, 2073, 2069, 2065

Exact source commits/parents/branches are in source.json. Each issue was fully audited and actually assigned before its branch and feature files were created. Each PR changes only the four dedicated telemetry-stress-tester files in its assigned showcase. Existing CPU operation/throughput benchmarks and all common/protected files are preserved.

## Validation

40 focused Node cases (10 per issue), scoped oxlint and four normal Node 22 builds pass. All eight native Vite development/production browser reports pass. Each normal run observes 61 real rAF callbacks, 60 measured intervals and 60 actual forced geometry reads after bounded 64-node mutations. FPS and adjacent interval jitter are independently recomputed by the browser harness.

Keyboard start/stop, progress, reports, cancellation/stale callbacks, invalid-input report retention, injected layout failure/retry and explicit visibility/unavailable-heap fixtures pass. Desktop/320/390/760px, reduced motion, no overflow, no page errors and no failed resources pass. Representative desktop/mobile screenshots for each target were visually reviewed.

These are observations of this machine with four concurrent browser processes. rAF intervals and forced DOM/layout timing are rendering proxies, not direct GPU paint or a universal hardware score. Approximate Chromium JS heap may fall with garbage collection and is excluded from the documented composite index. Synthetic tile data is labeled. No data is stored or uploaded.

|Issue|Mode|FPS|Jitter ms|DOM/layout ms|Callbacks|Layout reads|
|---|---|---:|---:|---:|---:|---:|
|2077|dev|60.006|0.083|0.305|61|60|
|2077|production|60.004|0.091|0.378|61|60|
|2073|dev|60.002|0.077|0.375|61|60|
|2073|production|60.004|0.081|0.373|61|60|
|2069|dev|60.000|0.071|0.202|61|60|
|2069|production|60.000|0.088|0.203|61|60|
|2065|dev|60.004|0.084|0.198|61|60|
|2065|production|60.002|0.067|0.195|61|60|

## Reproduce

Check out the source commit for the desired issue. With Node 22 and the repository's installed dependencies, run `node --test public/showcase/SLUG/telemetry-stress-tester.test.mjs`, `npm run build`, then `npm run dev -- --host 127.0.0.1 --port 5432 --strictPort` (or `npm run preview` for production). Install Playwright outside the repository and set PLAYWRIGHT_MODULE to its importable entry point; the recorded environment uses Chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome.

```sh
BASE=http://127.0.0.1:5432 FOLDER=SLUG OUT=/tmp/rendering-proof PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node browser-harness.mjs
```

Choose SLUG from source.json. Reports label every simulated failure/visibility/memory fixture; the normal callback/DOM workload is real. The harness creates its output directory. No source, dependency or workflow gate is changed by the harness.
