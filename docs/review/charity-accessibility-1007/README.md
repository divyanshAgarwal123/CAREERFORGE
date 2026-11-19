# Charity accessibility review evidence

Source `fd5e3a3a033dd0164e5c3d51586dd3e9b6e52305`, based on upstream `cf3a72403ff6fdd88e20c3985042efa397f1a335`. Issue #1007 was assigned before coding. Exactly four dedicated accessibility-assistant files change.

This is a scoped sample review, not a full WCAG certification. It computes visible annotated sample text contrast, validates in-sample ARIA references and expanded values, and displays a predicted sample tab order. Real keyboard operation, meaningful ordering, focus visibility, screen-reader announcements and other criteria remain manual. Unsupported backgrounds/effects are unverified and never counted as passes. The reversible repair preview changes only the sample and preserves entered values.

Nine Node tests pass, including101 inverse-luminance fixtures,36 RGB symmetry/bounds fixtures, unrounded AA/AAA thresholds and large-text boundaries, input validation, alpha compositing, missing/duplicate/empty ARIA references, stable positive-tab priority and excluded controls. Root lint exactly matches untouched upstream:94 inherited findings, zero additions. The normal Node24 production build passes.

Actual development and production Chromium tests pass: original sample1/5 to repaired5/5, native Tab/Shift+Tab route and visible3px focus rings, positive-index navigation through the actual full page, disclosure activation, exact undo with inputs preserved, live color changes, independent alpha contrast calculation, ancestor opacity and gradients marked manual, invalid ARIA, disabled/negative controls, bounded inspection failure clearing stale passes, and recovery. Zero storage API calls, no external requests/page errors/failed resources, served source identity, reduced motion and320–1360px containment pass.

An initial harness assumed the sample's positive tab index bypassed page controls. The final test follows native full-page navigation and the interface explains that the displayed route is scoped. No focus trap was added.

The screenshots show the repaired sample. Hosted CI/review/merge and official point credit are separate states recorded in the PR and sprint ledger. These artifacts remain on a fork-only branch and are excluded from the source PR.
