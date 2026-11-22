# Event-sourcing ledger acceptance - issue2818

source.json records the exact source commit, actual parent e2e3f40 and isolated branch. Actual assignment was confirmed before branching or coding. Only the four requested event-sourcing files are added. The existing audit-trail and snapshot-debugger modules remain intact: they do not provide this immutable event fold/timestamp projection, and the debugger deliberately truncates redo snapshots when branching.

## Model and invariants

This is a fictional in-memory workspace with a name, seat count and demo plan. Three typed event schemas reject unknown/extra fields and prototype-shaped inputs. Seat counts stay within1..1000; no-op events are rejected. Events and validated primitive payloads are frozen privately, exposed records/states are defensive copies, and historical queries never mutate the live materialization or truncate events. Appending while viewing history still applies to the current head.

Ordering timestamps come from the local clock and advance by one millisecond when necessary to preserve strict order. They are not authoritative distributed timestamps. The ledger is bounded to500 events and has no persistence, cryptographic audit or real account/billing claim. Reset/reload clears the local state.

## Validation

-13 Node tests pass: initial state, deterministic folding, inclusive replay boundaries, same-time/backward clocks, append after rewind, input/return/export isolation, state copies, invalid/prototype-field atomic retention, seat bounds, no-op rejection, clock overflow, invalid queries and the500-event cap.
- Scoped oxlint and the normal Node22 build pass. Exact receipts are attached as .txt files.
- Both actual Vite development and production browser reports pass. Native keyboard submissions and Home/Arrow/End/previous/next/chip controls produce independently known historical/live states. Appending after rewind preserves all prior rows and uses the live head.
- Actual malformed JSON and prototype-shaped payloads retain the ledger and recover on valid input. An HTML/img canary stays literal text and makes no request. Real500ms playback advances, pauses, completes, and cancels on reset. pagehide is an explicitly dispatched lifecycle fixture, not real cache-navigation acceptance.
- All1360/760/390/320px layouts have no body overflow, page/resource failures or fetch/XHR. Representative desktop/mobile screenshots were visually reviewed.

## Reproduce

Check out the source head, install repository dependencies under Node22, then run:

```sh
node --test public/showcase/saas-launchpad/event-sourcing.test.mjs
npm run build
npm run dev -- --host 127.0.0.1 --port 5432 --strictPort
```

Open /showcase/saas-launchpad/event-sourcing.html. For production, stop development and run npm run preview with the same host/port flags. Install Playwright outside the source repository and point PLAYWRIGHT_MODULE at its importable entry. Chrome defaults to the installed macOS Chrome binary; CHROME_PATH can override it.

```sh
BASE=http://127.0.0.1:5432 OUT=/tmp/event-proof PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node browser-harness.mjs
```

The harness creates reports/screenshots in OUT. These are local Chrome/macOS observations. Local acceptance, hosted CI, maintainer approval, merge and official credit remain separate states.
