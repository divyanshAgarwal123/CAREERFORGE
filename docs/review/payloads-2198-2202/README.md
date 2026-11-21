# Documentation and bistro payload acceptance

Each assigned issue adds exactly the four required compression-suite files. Exact source heads and actual parents are recorded in source.json. The existing repository bounded UTF-8 LZW implementation is reused with synthetic Prisma API event examples and French-language Lumière menu examples. No shared files or dependencies change.

All 12 Node tests per issue, scoped lint and normal Node 22 production builds pass. Native development/production checks independently decode five real downloads per page: example, Unicode/BOM/NUL, expansion, empty and retry. They verify exact packed sizes, input-edit invalidation, input bounds, error recovery, modeled transfer times, URL cleanup, keyboard, reduced motion and 320/390/760px layouts. No page errors or failed resources were observed. Screenshots were inspected. Example data stays in the tab and is explicitly fictional; transfer times are a model, not a network benchmark.

## Reproduce

Check out one source head with Node 22. Run npm ci, node --test on the dedicated test, scoped oxlint and npm run build. Start normal Vite dev/preview. Set PLAYWRIGHT_MODULE to an installed Playwright ESM module, BASE to the local URL, OUT to an existing evidence location, FOLDER to docs-portal or culinary-bistro and SAMPLE_TOKEN to Prisma documentation example or Lumière demo menu. Run browser-check.mjs with local Chrome at the default macOS path.
