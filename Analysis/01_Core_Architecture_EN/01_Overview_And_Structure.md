# ARCHITECTURE OVERVIEW & DIRECTORY STRUCTURE

> **Overview**: High-level analysis of the CleanHi project's architecture, tech stack, and primary directory layout.

## 1. TECH STACK
- **Framework**: Next.js 14/16 (App Router paradigm)
- **Database**: Supabase PostgreSQL with RLS (Row Level Security)
- **Styling**: Tailwind CSS with custom Design System tokens

## 2. PROJECT DIRECTORY TOPOLOGY
- `src/app/(admin)`: Internal Operations dashboards.
- `src/app/(partner)`: Sub-contractor portals and bidding interfaces.
- `src/app/(user)`: Customer-facing request wizards and payment gateways.
- `src/core/actions`: Pure Server Actions handling DB mutations.
- `src/components`: Reusable UI elements strictly split into Server/Client chunks.