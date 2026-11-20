# Agency FSM and Agritech field board validation

Source heads: FSM `35878c3e7bd39936e610f65049c8afc44e052e88`, whiteboard `8d5d74b36d286f4ab3858d3ed9c638f483651fbc`; both have real upstream parent `8a067d869a4ac9c54673975cd5d2ee0b33975625`.

Both four-file features pass their six focused Node tests, scoped oxlint with zero warnings/errors, and the normal TypeScript/Vite production build on Node 22.23.5. Build/test transcripts, screenshots, downloaded exports and the native browser report are included. This is local validation, not hosted CI or merge approval.

The browser harness drives actual event buttons, focus and keyboard dispatch, approval guards, cycles, duplicate transitions, real downloads, mouse drawing, brush selection/width, pen/line/rectangle, stroke erasure/undo/redo, native keyboard drawing/cancellation, clear undo, resize preservation, reload reset and mobile CDP touch drawing/cancellation. It decodes the downloaded SVG and checks colored pixels, not just its file name. It compares each production JavaScript response byte for byte with its source. Portable harness was rerun separately after parameterization and passed.

`mermaid-validation.json` records real Mermaid 12.3.0 parse and render of the downloaded definition and an adversarial quoted/HTML-like state name. Mermaid is a validation-only dependency, not added to the showcase. The shipped UI has no external runtime dependencies. The FSM graph uses native SVG.

## Repeat browser validation

1. Check out each source head in separate clones, install existing dependencies with `npm ci`, then `npm run build` on Node 22.23.5.
2. Serve the FSM build with `npm run preview -- --host 127.0.0.1 --port 5374 --strictPort`, and the whiteboard build on port 5375.
3. Install Playwright in a separate scratch directory, install its Chromium browser, and set `PLAYWRIGHT_MODULE` to that installation's absolute `node_modules/playwright/index.mjs` path.
4. Create a fresh output directory. Set `EVIDENCE_DIR` to it and set `FSM_ROOT` and `BOARD_ROOT` to the two source clone paths. Run `node browser-check.mjs`. Optional `FSM_URL` and `BOARD_URL` override the page URLs.

The drawings/history are device-local and intentionally reset on reload. SVG export has a white logical 1000 by 650 sheet, and includes completed strokes only. The eraser removes entire touched strokes; it is not a partial-pixel eraser. This feature does not implement a multi-user network or autosave.

The agency export contains graph definitions, not execution history. Custom added transitions have no client-approval guard; the demo's Deliver event explicitly requires the approval checkbox. Shared showcase indexes and protected root/src/workflow files are untouched in both source PRs. Evidence stays on this separate fork branch.
