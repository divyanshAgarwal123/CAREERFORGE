# Rendering stress labs — issues 2061, 2057, 2053, 2049, 2045, 2041

Exact source commits/parents/branches are in source.json. Each issue was fully audited and actually assigned before its branch and feature files were created. Each PR changes only the four dedicated telemetry-stress-tester files in its assigned showcase. Existing CPU operation/throughput benchmarks and all common/protected files are preserved.

## Validation

60 focused Node cases (10 per issue), scoped oxlint and six normal Node 22 builds pass. All twelve native Vite development/production browser reports pass. Each normal run observes 61 real rAF callbacks, 60 measured intervals and 60 actual forced geometry reads after bounded 64-node mutations. FPS and adjacent interval jitter are independently recomputed by the browser harness.

Keyboard start/stop, progress, reports, cancellation/stale callbacks, invalid-input report retention, injected layout failure/retry and explicit visibility/unavailable-heap fixtures pass. Desktop/320/390/760px, reduced motion, no overflow, no page errors and no failed resources pass. Representative desktop/mobile screenshots for each target were visually reviewed.

These are observations of this machine with four concurrent browser processes. rAF intervals and forced DOM/layout timing are rendering proxies, not direct GPU paint or a universal hardware score. Approximate Chromium JS heap may fall with garbage collection and is excluded from the documented composite index. Synthetic tile data is labeled. No data is stored or uploaded.

|Issue|Mode|FPS|Jitter ms|DOM/layout ms|Callbacks|Layout reads|
|---|---|---:|---:|---:|---:|---:|
|2061|dev|60.008|0.082|0.250|61|60|
|2061|production|60.000|0.088|0.287|61|60|
|2057|dev|60.000|0.075|0.302|61|60|
|2057|production|60.008|0.079|0.247|61|60|
|2053|dev|59.994|0.078|0.293|61|60|
|2053|production|60.006|0.075|0.277|61|60|
|2049|dev|60.006|0.073|0.305|61|60|
|2049|production|60.006|0.086|0.283|61|60|
|2045|dev|60.004|0.089|0.280|61|60|
|2045|production|60.006|0.088|0.302|61|60|
|2041|dev|60.000|0.068|0.285|61|60|
|2041|production|60.000|0.086|0.310|61|60|

## Reproduce

Check out the source commit for the desired issue. With Node 22 and the repository's installed dependencies, run `node --test public/showcase/SLUG/telemetry-stress-tester.test.mjs`, `npm run build`, then `npm run dev -- --host 127.0.0.1 --port 5432 --strictPort` (or `npm run preview` for production). Install Playwright outside the repository and set PLAYWRIGHT_MODULE to its importable entry point; the recorded environment uses Chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome.

```sh
BASE=http://127.0.0.1:5432 FOLDER=SLUG OUT=/tmp/rendering-proof PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node browser-harness.mjs
```

Choose SLUG from source.json. Reports label every simulated failure/visibility/memory fixture; the normal callback/DOM workload is real. The harness creates its output directory. No source, dependency or workflow gate is changed by the harness.
