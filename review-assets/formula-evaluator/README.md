# Formula workbench review evidence

Source: `99e2cc5fe36dd9087ba905b23c932d6496261271`. Images show synthetic demo inputs in the actual Vite production preview, captured with Chromium at1360px desktop and375px mobile. The source PR contains only the four assigned formula-evaluator files; these images live only on this separate evidence branch.

Checked Vite dev initial rendering, production calculations, numeric and keyboard-slider updates, precedence, error clearing/recovery, unknown variables, duplicate/invalid variable names, 12-variable cap, removal focus, operator insertion, reload behavior and320/375/430/850/1360px layouts. No uncaught browser errors, failed resources or third-party requests.

Local checks: `node --test public/showcase/supply-chain-logistics/formula-evaluator.test.mjs` (14cases including300 arithmetic baseline comparisons), `npm run lint` (zero new-file findings; existing warnings elsewhere), and `npm run build`.

Arithmetic is approximate floating point, not arbitrary precision; the page does not persist inputs across refresh. No real shipment data or service integrations are used.
