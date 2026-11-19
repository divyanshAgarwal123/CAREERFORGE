# Private interaction telemetry evidence

Source `a800897cb6726b0cc0149c0326ea008d383f1558`, based on upstream `011dd460a205d929b21c4eeb6e8134df8428ff91`. Issue #1008 was assigned before coding. Only the four dedicated analytics-telemetry files change.

Collection is opt-in and memory-only. The report contains fixed target names, 8x6 coarse cells, scroll depth in 5-percent steps, relative visible active time and at most 100 events. Forms, URLs, credentials and persistent identifiers are excluded.

Validation:13 Node tests cover synthetic secret canaries, strict serialization, all48 cell counts, keyboard clicks without invented coordinates, scroll/time clamping, hidden/paused time, clock rollback, bounded history, immutable snapshots and clearing. Root lint exactly matches clean main:94 inherited findings, zero additions. Normal Node24 production build passes.

Actual development and production Chromium checks pass: collection starts paused, three native pointer clicks and one keyboard click map to correct aggregates, private note and unknown-target canaries are absent from the native downloaded JSON, pause time stays stable, End-key scroll reaches100% without the log changing page height, keyboard scroll works inside the fixed log, failed export retry produces byte-identical JSON, and clear confirmation works both ways. Zero storage API calls, unchanged local/session sentinel values, no outbound requests/page errors/failed resources, reduced motion,320–1360px containment and served source identity all pass.

Screenshots and native-report.json show the same paused four-click fixture. The excluded synthetic note was cleared after export verification and before screenshots. The log is scrolled to older entries through native keyboard input. Initial QA found the growing log changed page height; the final fixed viewport and fractional bottom-edge handling passed the real scrolling regression.

Hosted CI and review/merge state are recorded separately in the PR. Evidence stays on this fork-only branch, excluded from the source diff.
