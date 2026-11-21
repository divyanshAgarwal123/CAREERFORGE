# Studio compression and festival workflow acceptance

Sources and their actual parent are recorded in source.json. Each assigned issue adds exactly four dedicated files. Existing repository engines are reused with the studio brief and festival lifecycle; no shared/core/dependency/configuration file is changed.

Studio: all 12 Node tests, scoped oxlint and the normal Node 22 production build pass. Native development and production acceptance independently decodes five actual binary downloads each: the studio example, Unicode/BOM/NUL, expansion, empty input and retry. It checks byte counts including the header, edited input invalidation, bounded input, invalid bandwidth, modeled times, URL cleanup, keyboard and reduced-motion/mobile layouts. The transfer estimates are a model, not measured network performance.

Festival: all 7 Node tests, scoped oxlint and the normal Node 22 production build pass. Native development and production acceptance covers guarded start, rejected attempts, pause/resume/end/next cycles, keyboard focus, custom self-loop, duplicate rejection, actual Mermaid download, simulated download failure/retry, URL cleanup, reset and 320/390/760px layouts. A genuine clipped self-loop label was fixed by increasing the top margin; the final measured SVG bounds are retained. This is a local rehearsal model, not a live festival control or safety system. Custom transitions have no stage-check guard.

All four browser reports pass without page errors or failed resources. Desktop and mobile screenshots were inspected.

## Reproduce

Check out one source head. With Node 22 run npm ci, node --test on that dedicated test file, scoped oxlint and npm run build. Start normal Vite dev or preview. Set PLAYWRIGHT_MODULE to an installed Playwright ESM module, BASE to the local URL, OUT to an evidence directory; for compression also set FOLDER=agency-studio. Run the corresponding check.mjs harness using local Chrome at the macOS default path. The harnesses use fresh headless profiles and synthetic local data only.
