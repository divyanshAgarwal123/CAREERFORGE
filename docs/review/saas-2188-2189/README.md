# SaaS feature acceptance

Each source PR changes exactly its four assigned files in saas-launchpad, on upstream parent 7c9ba050ada6dcafde807523df51f4d1623f9e3d. Exact source heads are in source.json. These adapt the existing repository modules to a SaaS deployment lifecycle and illustrative edge-region workflow.

Node 22 canonical installation and normal production builds pass. All 6 FSM and 12 geometry tests pass; geometry compares to an independent 3D vector oracle and analytical distances. Scoped oxlint is clean; root lint warnings remain in existing unrelated paths.

Production native-browser evidence covers FSM invalid/guarded transitions, retry, cyclic and self-loop graph, custom transition/duplicate rejection, focus retention, downloaded Mermaid, reset and graph containment. Mermaid 12.3.0 parses and renders both the normal download and hostile quoted/HTML-like names. Radar evidence covers native keyboard blips and list selection, antimeridian proximity, invalid-input preservation, undefined polar headings, reduced motion and pause. Both features pass desktop and 320/390/760px layouts with no browser errors or failed resources. Development checks also passed.

## Reproduce

Check out either source SHA from source.json. With Node 22 run npm ci, node --test public/showcase/saas-launchpad/state-diagram.test.mjs (or geo-tracker.test.mjs), npm run lint and npm run build. Run npm run dev -- --host 127.0.0.1 --port 5383 or npm exec vite preview -- --host 127.0.0.1 --port 5385.

Run browser-check.mjs with KIND=fsm or KIND=geo, BASE set to the local server URL, OUT to an output directory and PLAYWRIGHT_MODULE to an installed Playwright ESM module. The harness uses a fresh headless Chrome profile at the default macOS Chrome path.
