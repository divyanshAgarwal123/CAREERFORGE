# Podcast whiteboard validation

Issue #2079. Source commit: 5d53569afdf75d0ac56061adc0b5302ca8c04ac4.

Open /showcase/podcast-audio-stream/canvas-whiteboard.html using Node 22 and
the repository's npm run dev or npm run preview command. The preview requires
npm run build first.

Run node --test public/showcase/podcast-audio-stream/canvas-whiteboard.test.mjs
for the drawing model. The browser harness accepts the local server origin and
an output directory. It requires Playwright and a local Google Chrome binary.
The attached reports exercised pointer and touch input, keyboard drawing,
eraser, undo and redo, viewport sizing, and a real SVG download.
