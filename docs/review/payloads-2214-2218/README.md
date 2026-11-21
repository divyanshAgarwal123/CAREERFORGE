# Replay and activity payload acceptance: #2214 and #2218

[source.json](source.json) records exact source heads, parents and the four requested dedicated files per issue. These features were absent in current main. The implementations reuse the repository's bounded UTF-8 LZW format with fictional replay/activity payloads and local showcase themes. Examples are synthetic; there is no live gameplay, health-data collection or medical interpretation. Transfer timing is a mathematical model.

All 12 focused Node tests per issue, scoped lint and normal Node 22 production builds pass. Native development AND production checks independently decode five actual downloaded files each: example, Unicode/BOM/NUL, expansion, empty and retry. Real file sizes match the complete 12-byte-header format and UI. Edit invalidation, bounded inputs/output, invalid bandwidth/recovery, keyboard shortcut, object-URL/anchor cleanup, reduced motion and 320/390/760px layouts pass with no page errors, resource failures or overflow. Desktop and mobile screenshots were visually reviewed.

## Reproduce

Check out the corresponding source in source.json. With Node 22, run npm ci, node --test public/showcase/gaming-esports-hub/compression-suite.test.mjs, npx oxlint against that JS/test pair, and npm run build. Start npm run dev or npm run preview on a loopback port. Use health-vitality for #2218.

Install Playwright separately. Set PLAYWRIGHT_MODULE to its importable module path, FOLDER to gaming-esports-hub or health-vitality, SAMPLE_TOKEN to Vortex fictional training replay or VitalityAI fictional activity example respectively, BASE to the loopback server and OUT to an empty directory; run node browser-check.mjs. The script uses the installed macOS Google Chrome executable; adapt that path for other systems. It validates downloaded bytes using a separate decoder rather than importing the implementation. Screenshots wait for fonts, scroll reset and rendered frames.
