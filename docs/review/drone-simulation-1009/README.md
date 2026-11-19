# Drone delivery scenario simulator evidence

Source `aaba15c0f78e2410767f42a5062ed28e3492276d` based on upstream `d3e13b6c72e5bf4a468533c1081ca08672e864ac`. Issue #1009 was assigned before coding. Only the four dedicated simulation-sandbox files change.

The model generates independent normal flight-time variations with a one-minute minimum, using hypothetical inputs and a repeatable seed. Percentile bands describe generated individual outcomes. The Wilson interval describes Monte Carlo sampling uncertainty in the late-outcome share; it does not calibrate the model to an observed fleet.

Validation: 11 Node tests include 150 independent numerical score inversions for confidence bounds, known quantile/population-SD fixtures, seeded 50,000-draw moment/tail checks, histogram conservation, invalid inputs, cancellation preservation and superseded-run races. Root lint has exactly the same 94 inherited findings as clean main, with zero additions. Normal Node 24 production build passes.

Actual development and production Chromium checks verify 1,000 default and 50,000 full runs with UI frames still rendering, exact native zero-variation controls, the visible histogram geometry and preserved header graphic, table/bin counts, native invalid-seed handling, cancel/retry without losing prior results, focus return, reduced motion, 320–1360px containment and served source identity. No page errors, failed resources or outbound requests. The screenshot review caught an initially wrong SVG target before commit; final tests explicitly require bars inside the visible histogram.

Screenshots show the completed 50,000-scenario example. Measured browser results are included. Final hosted CI/review/merge state belongs to the PR. Evidence stays on this separate fork-only branch and is excluded from the source diff.
