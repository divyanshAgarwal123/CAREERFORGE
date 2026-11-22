# Bloom and circuit-breaker engine acceptance

The source manifest records exact commits, actual parent e2e3f40 and separate issue branches. Both issues were actually assigned before any feature branch or code. Each change contains only its four requested showcase files. Existing pages and shared/protected files are preserved.

## Bloom filter: Agency Studio, issue2812

The engine stores a bounded byte array, uses deterministic non-cryptographic double hashing over UTF-8 strings, and exports defensive snapshots. An odd second hash produces distinct positions in the supported power-of-two arrays. The UI has native insert/probe forms, a256-bit grid, reused-bit highlights and an independent demo insertion list that explains actual false positives.

The probability formula assumes uniform independent hashes. It counts insertion attempts; repeats can inflate its estimate. It is not a universal query-accuracy guarantee or a security check.13 Node tests cover no false negatives for the deterministic inserted corpus, Unicode/case/whitespace, duplicate collisions, immutable configuration, defensive copies, invalid-state retention, insertion bounds, an independent numeric probability reference, distribution sanity and an empirical absent-query corpus. The observed browser false positive absent-42 is not in the sample insertion list; reinserting it reuses all four already-set positions.

## Circuit breaker: Festival Hub, issue2815

execute(fn) wraps a real asynchronous callback with AbortSignal cancellation and a bounded deadline. Three consecutive failures open the default circuit. Open calls do not invoke callbacks; after cooldown exactly one recovery probe is admitted. Failed probes double cooldown up to a cap; successful probes close/reset it. Generation checks prevent stale in-flight outcomes from reopening or closing a newer state. resetTimeout restarts the current cooldown without bypassing it or erasing backoff. Disposal cancels in-flight work. Admission is bounded to32 active callbacks and telemetry to50 events.

The page deliberately runs local mock request functions, not real HTTP calls or production service protection. Success/failure take120ms, timeout mocks1000ms and breaker deadline300ms.16 Node tests cover concurrency, stale success/failure, abort/deadline cleanup, pre-dispatch cancellation, idempotent trip, single half-open admission, capped backoff, cooldown restart, disposal, snapshots and bounded telemetry.

## Native acceptance and boundaries

Both normal Node22 builds and scoped oxlint pass. Exact test, lint and build receipts are attached as per-issue .txt files. All four development/production browser reports pass. Bloom checks use actual keyboard forms/bit updates, the false-positive example, invalid-input retention, Unicode and motion preferences. Circuit checks use real browser timers and native buttons/double-clicks for threshold/open rejection, single half-open trial, failed-trial1600ms cooldown, restart, recovery and timeout retention. The pagehide/pageshow persisted events are explicitly injected lifecycle fixtures; no actual back-forward-cache navigation acceptance is claimed. Service outcomes are labeled local simulations. No page/resource failures or fetch/XHR were observed.

Desktop and mobile screenshots for both modules were visually reviewed; all1360/760/390/320px layouts have no horizontal overflow. Local validation, hosted CI, review, merge and official credit are separate states. The upstream auto-merge workflow was removed in2909; this evidence does not imply approval or merge.

## Reproduce

Check out the chosen source head and install the repository dependencies under Node22. For2812 use FOLDER=agency-studio and FEATURE=bloom-filter; for2815 use FOLDER=festival-hub and FEATURE=circuit-breaker.

```sh
node --test public/showcase/FOLDER/FEATURE.test.mjs
npm run build
npm run dev -- --host 127.0.0.1 --port 5432 --strictPort
```

After stopping development, use npm run preview with the same host/port flags for production. Install Playwright outside the source repository; point PLAYWRIGHT_MODULE to its importable entry. Chrome defaults to the macOS installed Chrome binary; CHROME_PATH can override it.

```sh
BASE=http://127.0.0.1:5432 FOLDER=agency-studio FEATURE=bloom-filter OUT=/tmp/bloom-proof PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node browser-harness.mjs
```

The harness creates its output directory and writes browser-report.json and screenshots. Reports describe the recorded local Chrome/macOS environment, not universal performance or production-service measurements.
