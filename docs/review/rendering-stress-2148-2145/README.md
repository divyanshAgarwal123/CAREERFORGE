# Native rendering stress acceptance

Issues #2148 and #2145 add the requested standalone stress engines and interfaces in exactly their four dedicated files each. Actual source heads and parents are in source.json. Existing CPU-throughput and generated-series telemetry pages are preserved. The synthetic 64-node workload measures actual requestAnimationFrame intervals and DOM/layout work; optional approximate Chromium heap readings are excluded from the workload index. No device rating or direct GPU timing is claimed. Data stays local, without storage or uploads.

Twenty focused Node cases, scoped oxlint and both normal Node 22 builds pass. Tests cover metric values, independent jitter arrays, score bounds/monotonicity, invalid data, cancellation/stale callbacks/restarts, overlapping work, failures and optional/decreasing heap readings.

All four development/production reports pass keyboard start/stop, 64 real nodes, 60 real measured intervals independently checked against 61 observed rAF callbacks and 60 forced geometry reads, report expansion, invalid-input preservation, layout errors/retry, cleanup, explicitly simulated visibility and unavailable-memory branches, reduced motion and desktop/320/390/760px. Browser errors and failed resources are empty. Representative screenshots were visually inspected. Four browser processes ran concurrently; FPS near 30 is an observation of these runs, not a general hardware claim or diagnosed performance problem.

Reproduce under Node 22 with npm ci, node --test public/showcase/PROJECT/telemetry-stress-tester.test.mjs, scoped npm run lint and npm run build. Start normal Vite dev or preview; run browser-check.mjs with PLAYWRIGHT_MODULE pointing to Playwright, BASE to the local origin, FOLDER=weather-radar-atlas or neurotech-interface, and OUT to an evidence folder. It uses installed Chrome.

Measurement limits: [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) and [legacy Chromium heap](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory).
