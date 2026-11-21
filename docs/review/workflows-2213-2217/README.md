# Match and activity workflows: #2213 and #2217

Exact source heads, actual parents and four-file scopes are in [source.json](source.json). Both features were absent on current main. They reuse the bounded FSM with domain-specific guarded cycles and themes. These local models do not connect to a live tournament, collect health data or provide health assessments.

All eight focused Node tests per issue, scoped lint and normal Node 22 production builds pass. Development AND production browser reports cover domain cycles, guards and rejected events, keyboard focus, self loops/duplicates, eight maximum-width Unicode states, all 32 transitions and rejected 33rd transition, reset clearing approval/history, native Mermaid downloads, synthetic download failure/retry and object-URL cleanup. Desktop and 320/390/760px screens, reduced motion, zero page/resource errors and zero page overflow pass. The prior bounded parallel-curve spacing is preserved; the complete transition list/export remains available for dense graphs whose labels can overlap.

Mermaid 12.3 parsed AND rendered four cases per implementation: native normal/custom, eight-state and 32-transition downloads plus a hostile-label fixture. See each production folder's mermaid-validation.json. Health's initial QA fixture incorrectly expected a literal hyphen in encoded Mermaid source; its expected check#45;in string was corrected, then both modes passed without changing source. The module already escaped punctuation correctly. Mermaid is QA-only and does not change app dependencies.

## Reproduce

Check out the corresponding head in source.json and use Node 22. Run npm ci, node --test public/showcase/gaming-esports-hub/state-diagram.test.mjs, scoped npx oxlint on the JS/test pair, and npm run build. Use health-vitality for #2217. Start npm run dev or npm run preview on loopback ports to check both modes.

Install Playwright separately. Set PLAYWRIGHT_MODULE to its importable module, FOLDER to the showcase, BASE to the server and OUT to an empty directory, then run node fsm-check.mjs. The script uses installed macOS Google Chrome; adapt its executable path for other systems. Set MERMAID_DIST to Mermaid12.3's dist directory and run mermaid-check.mjs against the generated production OUT. Screenshots wait for fonts, scroll reset and rendered frames.
