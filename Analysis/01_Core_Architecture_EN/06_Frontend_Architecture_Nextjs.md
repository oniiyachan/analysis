# FRONTEND RENDERING ARCHITECTURE (NEXT.JS)

> **Overview**: Layout paradigms, caching, and client/server chunking.

## 1. ROUTE GROUPS & LAYOUTS
- Physical separation utilizing `(admin)`, `(partner)`, `(user)` root nodes ensuring CSS and Layout isolation without polluting the URL strings.
- Enforced `<ErrorBoundary>` and `<Suspense>` boundaries at the layout roots.

## 2. RENDERING PHILOSOPHY
- **React Server Components (RSC)** default strictly for 90% of nodes. Emits zero JS payload to the browser, maximizing SEO and speed.
- **'"use client"' directives**: Highly localized to interactive leaf nodes (buttons, text inputs, websockets).

## 3. SERVER ACTIONS MUTATION
- Legacy `fetch()` API calls deprecated. Forms interact directly with Node backend via asynchronous Action functions, slashing intermediate latency.