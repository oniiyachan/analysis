# FRONTEND RENDERING ARCHITECTURE (NEXT.JS APP ROUTER)

> **Purpose**: The governing principles of Layout composition, Component boundaries, Caching strategy, and how the browser-side UI interacts with CleanHi's backend logic. Built on Next.js v14/v16 App Router paradigm.

---

## 1. The Root Layout (Skeletal Frames)
- The project splits `src/app/` into 4 isolated territories using the parenthetical notation `(admin)`, `(user)`, `(partner)`.
- This technique — called **Route Groups** — ensures the group name never leaks into the visible URL (e.g. the browser shows `cleanhi.kr/quote`, not `cleanhi.kr/(user)/quote`). More importantly, each group can mount its own independent layout shell:
  - `(admin)/layout.tsx`: Injects the left-side navigation sidebar for internal operations.
  - `(user)/layout.tsx`: Mounts the elegant horizontal nav bar with brand logo.
  - Global error shield: The entire application is wrapped in a `<ErrorBoundary>` at the Root Layout level — preventing catastrophic white-screen crashes from propagating.

## 2. Core Rendering Paradigm
- **Principle #1: Ship as little JavaScript to the client as possible.** By default, 100% of pages render as RSC (React Server Components) inside Vercel's server RAM — emitting flat, inert HTML to the browser. This yields exceptional Google SEO performance and prevents hackers from inspecting sensitive variables in the Chrome Console (because the JS execution stays server-side).
- **The `"use client"` Carve-Out Exception**:
  - Whenever a component requires interactive input fields (`<input>`) or click handlers (`<button onClick={...}>`), that specific UI block is extracted into a separate file marked with `"use client"`. Only that isolated chunk gets hydrated with JavaScript on the browser.

## 3. Server Actions Over API Routes (The Modern Paradigm)
This represents the most significant architectural departure from legacy PHP or early React systems. CleanHi does **not** use traditional API route folders (no `fetch("http://...")` patterns).
- **Data Mutations**: All form submissions (Signup, Upload, Submit Payment, Add Bid) invoke Server Actions directly via `await serverAction()`. The function executes silently on the server, performs DB operations, and returns — completely eliminating the loading-state boilerplate of older libraries (Redux, React Query, SWR mutation patterns).

## 4. Design System & Style Guide (Tailwind)
- Abandons the legacy approach of writing long CSS class files. All styling uses the Tailwind Utility Engine.
- Custom semantic tokens are defined: `border-surface-container`, `text-primary`, `bg-primary-container`. Raw color values (`red-500`, `blue-600`) are never used manually except for warning/penalty indicators. Everything feeds from a centralized corporate Design System token set. Dark Mode support is baked in without color conflicts.