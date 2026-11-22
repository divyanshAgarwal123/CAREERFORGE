# CAREERFORGE showcase verification

- Podcast cost planner, issue #2080, `f369cfadf02e9bc203b6e2dc487b3f02cd1416f6`
- Edtech voice shortcuts, issue #2074, `3c2be8db94fb1c1ce7da8be28826e70e1d007749`

Both commits start at 6c0eb878e96386710f33fbc08dcef9b8d53d6763. Each contains the four dedicated showcase files. Seven cost tests and six voice tests passed on Node 22. Scoped lint and the normal production build passed for both. The served build copies of the feature assets matched the source.

The Chromium harness exercised local Vite development and production-preview routes at 1360, 760, 390 and 320 pixels. The cost planner used native keyboard controls and reproduced the zero and maximum annual quotes, matching the resource subtotal and both discounts. The voice page tested typed navigation and simulated permission denial, stale recognition events, successful retry and synthesis. It exercised the typed fallback with recognition missing. No live microphone or speech-provider output was used.

To reproduce, check out the corresponding source commit and serve it with Vite. Run the replay with `PLAYWRIGHT_MODULE=playwright node browser.mjs cost http://127.0.0.1:5173 ./results` for the cost planner or use `voice` for the voice shortcuts.
