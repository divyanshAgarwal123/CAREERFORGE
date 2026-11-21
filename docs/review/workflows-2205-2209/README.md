# Guarded property and transfer workflow acceptance: #2205 and #2209

Exact heads, parents and the four dedicated files per issue are in [source.json](source.json). These are local viewing and transfer-review models; they do not book property visits, connect bank accounts or send transfers. They reuse the existing bounded FSM with domain-specific lifecycles and guard tests.

All eight focused Node tests per issue, scoped lint and normal Node 22 production builds pass. Development AND production browser checks cover actual guarded cycles, invalid events, keyboard focus, custom/self-loop/duplicate transitions, eight maximum-width Unicode states/events, all 32 transitions, rejected 33rd transition, native downloads, synthetic download failure/retry, object-URL cleanup and reset clearing approval/history. Desktop and 320/390/760px screens, reduced motion, zero page errors, zero resource failures and zero page overflow pass.

The max-transition browser check first reproduced clipping: the graph reached y=471.3757 outside its 470-unit viewBox. Parallel-curve spacing now scales to the sibling count instead of growing without a bound. The same 32-transition check finishes inside the viewBox (bottom401); full names remain in title/list/export. Dense graphs can have overlapping labels: the complete textual transition list and Mermaid export remain available. The original failing report/screenshot is preserved under estate-before. The fixed state is covered by all four acceptance reports.

Mermaid 12.3 parsed AND rendered four cases per implementation: actual normal/custom download, eight-state export, 32-transition export, and a hostile-label fixture. See each production folder's mermaid-validation.json. The Mermaid dependency is QA-only; application dependencies/core files are unchanged.

## Reproduce

Use the corresponding source head and Node 22. Run npm ci, node --test public/showcase/real-estate-luxe/state-diagram.test.mjs, scoped npx oxlint on the JS/test pair, and npm run build. Use fintech-vault for #2209. Start npm run dev and npm run preview on loopback ports for both modes.

Install Playwright separately. Set PLAYWRIGHT_MODULE to its importable module path, FOLDER to the showcase directory, BASE to the loopback server, OUT to an empty directory, then run node fsm-check.mjs. The harness uses macOS Google Chrome; adapt the executable on other systems. Set MERMAID_DIST to Mermaid 12.3's dist directory and run mermaid-check.mjs against the generated production OUT. Screenshots wait for fonts, scroll reset and rendered frames.
