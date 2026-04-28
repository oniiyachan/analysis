# REALTIME ANALYSIS: CUSTOMER WAITING ROOM

> **Core Engine**: `waiting-client.tsx`

## EXECUTION MODEL
- Orchestrates an internalized JS interval timer (T-24h).
- Reactively listens to `quotes` INSERTS.
- **The Clever Join Fetch**: When an isolated Quote INSERT rings the socket, the client pauses, secretly pings the DB using a deep `SELECT partners(name, rating)` query to attach the Company Avatar onto the financial payload before smoothly mounting it into the visual HTML DOM.