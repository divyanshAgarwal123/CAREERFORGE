# Compression acceptance

Each assigned issue adds exactly its four dedicated compression-suite files. Exact source heads and actual parent are in source.json. These adapt the existing repository LZW module to product-feed and festival-setlist examples. No shared/core/dependency/configuration file changes are included.

Both normal Node 22 builds, 12 Node tests per issue and scoped oxlint pass. Tests cover a known LZW vector, Unicode/BOM/NUL/combining marks, empty input, binary byte order/offsets, malformed codes/headers, invalid surrogate input, 256KiB input/output caps, expansion, dictionary freeze, 200 deterministic reference comparisons and modeled bandwidth validation.

Development and production browser checks pass five native downloads per page. The harness independently parses and decodes actual downloaded binary data; reported sizes match file bytes including the header. It tests keyboard analysis, Unicode preservation, source-edit invalidation, empty/expanded payloads, oversized input, link-model errors, download failure/retry, URL/anchor cleanup, reduced motion and desktop/320/390/760px layouts without errors or failed resources. Screenshots were inspected. Transfer times are explicitly a model, not observed network performance.

## Reproduce

Check out a source SHA from source.json. With Node 22 run npm ci, node --test public/showcase/[folder]/compression-suite.test.mjs, scoped oxlint and npm run build. Use normal Vite dev/preview. Set PLAYWRIGHT_MODULE to an installed Playwright ESM module, FOLDER to ecommerce-store or festival-hub, BASE to the local URL and OUT to an evidence directory, then run browser-check.mjs. It uses a fresh headless Chrome profile at the default macOS Chrome path.
