# Nonprofit certificate / PNG review evidence

Source 8e47d14ff2f53a86c4386ba02bf2d709f9693270, assigned CAREERFORGE #1083.

All certificate data is fictional. Actual Vite development and production browser flows passed. Native PNG downloads were decoded as 2000 x 1400; reference bars were sampled from the decoded raster, reconstructed as DEMO-2026-01, and independently checked for odd parity and quiet zones.

12 Node cases passed: printable data/date bounds, golden/reference parity for all 37 characters, all 24 code-length geometry cases, text bounds and atomic invalid-preview retention, Blob/data URL delegation and encoder failures. Root lint: 92 inherited warnings, zero findings in the four new files. Node 24 production build passed.

Browser acceptance also covered native input/error recovery and inert HTML-like text, PNG failure/retry, delayed encoding plus duplicate click protection and invalid-input preservation, released object URLs, normal/reduced motion, fit/detail keyboard scrolling and 320/375/430/850/1360 layouts. No errors, failed resources or external requests. Actual PNG and both page screenshots visually reviewed.

Source PR has exactly the four requested feature files. This fork-only branch holds review images; no additional evidence PR.
