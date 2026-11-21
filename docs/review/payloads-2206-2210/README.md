# Property and ledger payload acceptance: #2206 and #2210

[source.json](source.json) records exact source heads, parents and the four requested dedicated files per issue. These features were absent in current main. The implementations reuse the repository's bounded UTF-8 LZW format with fictional property/ledger payloads and local showcase themes. No real listings, account data, live transfer performance or transactions are represented.

All 12 focused Node tests per issue, scoped lint and normal Node 22 production builds pass. Native development AND production checks independently decode five actual downloaded files each: example, Unicode/BOM/NUL, expansion, empty and retry. Real file sizes match the complete 12-byte-header format and UI. Edit invalidation, bounded inputs/output, invalid bandwidth/recovery, keyboard shortcut, object-URL/anchor cleanup, reduced motion and 320/390/760px layouts pass with no page errors, resource failures or overflow. Desktop and mobile screenshots were visually reviewed.

## Reproduce

Check out the corresponding source in source.json. With Node 22, run npm ci, node --test public/showcase/real-estate-luxe/compression-suite.test.mjs, npx oxlint against that JS/test pair, and npm run build. Start npm run dev or npm run preview on a loopback port. Use fintech-vault for #2210.

Install Playwright separately. Set PLAYWRIGHT_MODULE to its importable module path, FOLDER to real-estate-luxe or fintech-vault, SAMPLE_TOKEN to Vanguard fictional residences or ApexVault fictional ledger respectively, BASE to the loopback server and OUT to an empty directory; run node browser-check.mjs. The script uses the installed macOS Google Chrome executable; adapt that path for other systems. It validates downloaded bytes using a separate decoder rather than importing the implementation. Screenshots wait for fonts, scroll reset and rendered frames.
