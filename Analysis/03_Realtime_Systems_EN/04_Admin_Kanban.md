# REALTIME ANALYSIS: ADMIN KANBAN

> **Core Engine**: `use-matching-realtime.ts`

## EXECUTION MODEL
- Tracks dual-tables: both `cleaning_requests` (for Status mutations) and `quotes` (for bid counts).
- Requires no spatial filters. Broadly listens to the entire ecosystem due to its macro-Administrative scope.
- Protected strictly by Administrative RLS bounds dropping malicious socket hijack attempts.