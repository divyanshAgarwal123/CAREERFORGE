# Expedition and project release workflow acceptance: #2221 and #2193

[source.json](source.json) records exact source heads, actual parents and the four requested dedicated files per issue. Existing workflow-pipeline pages are task boards, so they are preserved. These new bounded FSM/Mermaid pages use local domain models and do not book a trip, build code or deploy projects.

All eight focused Node tests per issue, scoped lint and normal Node 22 production builds pass. Development AND production browser reports cover actual guarded cycles, throwing/rejected guards, keyboard focus, custom/self-loop/duplicate transitions, eight maximum-width Unicode states/events, all32transitions, rejected33rdtransition without mutation, reset clearing approval/history, native downloads, synthetic download failure/retry and object-URL cleanup. Dense graph labels can overlap, so full names remain in the textual list, title and export. Desktop and320/390/760px screens, reduced motion, zero page errors, zero failed resources and zero page overflow pass. Screenshots were visually reviewed, including the portfolio's system monospace theme.

Mermaid12.3 parsed AND rendered four cases per implementation: actual normal/custom, eight-state and32-transition downloads, plus a hostile-label fixture. See each production folder's mermaid-validation.json. The renderer is a QA-only dependency and changes no app dependencies.

## Reproduce

Check out the corresponding source head and use Node22. Run npm ci, node --test public/showcase/travel-odyssey/state-diagram.test.mjs, scoped npx oxlint on the JS/test pair and npm run build. Use developer-portfolio for #2193. Start npm run dev or npm run preview on loopback ports for both modes.

Install Playwright separately. Set PLAYWRIGHT_MODULE to its importable module, FOLDER to the showcase, BASE to the server and OUT to an empty directory, then run node fsm-check.mjs. The harness uses installed macOS Google Chrome; adapt that executable for other systems. Set MERMAID_DIST to Mermaid12.3's dist directory and run mermaid-check.mjs against the generated production OUT. Capture waits for fonts, scroll reset and rendered frames.
