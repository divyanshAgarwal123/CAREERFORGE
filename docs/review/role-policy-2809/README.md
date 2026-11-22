# Role policy simulator validation

Issue #2809. Source commit: 825cfe295e8d0c9a47fc3e0d02537111433f2278.

The standalone page at /showcase/ecommerce-store/rbac-matrix.html models role
inheritance and permission checks with fictional users and in-memory data.

Use Node 22, install dependencies, run
`node --test public/showcase/ecommerce-store/rbac-matrix.test.mjs`, and run
`npm run build`. Open the page with `npm run dev` or `npm run preview`.
The attached Chromium reports cover native grant, revoke, denial, keyboard,
focus, and responsive table interactions. The reports were captured before
the final whitespace-only CSS formatting. The final source was rebuilt.
