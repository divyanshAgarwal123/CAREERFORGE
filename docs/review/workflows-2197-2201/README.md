# Guarded workflow acceptance: #2197 and #2201

The exact source commits, parents and four-file scopes are in [source.json](source.json). These are local domain models without API publication or kitchen/booking connections.

All seven focused Node tests per issue, scoped Oxlint and normal Node 22 production builds pass. Development AND production reports cover actual domain cycles, guard rejection and recovery, custom transitions/self loops, duplicate rejection, keyboard focus, native Mermaid downloads, synthetic download failure/retry and object-URL cleanup. Eight maximum-width Unicode state/event labels remain within the SVG and page; full labels survive list/title/export. Reset clears approval and history. Fresh desktop and 320/390/760px screens, reduced motion, zero page errors and zero failed requests pass.

Boundary checks found wide-event page overflow and clipped SVG labels before submission. The source wraps event buttons and measures/elides SVG text while preserving full names elsewhere. Capture waits for fonts, scroll reset and rendered frames after resizing; an initial stale Chrome capture was replaced after checking the actual DOM and recapturing all four browser runs.

Actual downloaded normal/custom and eight-state exports, plus a hostile-label fixture, were parsed AND rendered by Mermaid 12.3: three cases per implementation. See each production folder's mermaid-validation.json. Mermaid is a QA-only dependency; application dependencies are unchanged.

## Reproduce

Check out the corresponding exact source from source.json and use Node 22:

```sh
npm ci
node --test public/showcase/docs-portal/state-diagram.test.mjs
npx oxlint public/showcase/docs-portal/state-diagram.js public/showcase/docs-portal/state-diagram.test.mjs
npm run build
npm run preview -- --host 127.0.0.1 --port 5401
```

Use culinary-bistro for #2201. Start npm run dev on another loopback port to repeat development. Install Playwright separately; set PLAYWRIGHT_MODULE to its importable module path, FOLDER to the showcase, BASE to the loopback server, and OUT to an empty output directory, then run node fsm-check.mjs. The harness uses the installed macOS Google Chrome executable; adapt that executable path on other systems. Set MERMAID_DIST to Mermaid 12.3's dist directory and run mermaid-check.mjs with the generated production OUT to parse/render the actual exports and hostile-label fixture.
