# REALTIME ANALYSIS: NOTIFICATION BELL SYSTEM (use-notifications-realtime.ts)

## 1. What Does This Feature Do?
This powers the notification bell icon in the corner of the screen. It pumps the red badge counter ("You have 1, 2, 3... new notifications") whenever system events occur — such as "Cleaner has completed the job", "Payment successful", "New message received", etc.

## 2. How Does It Work?
- **Hidden Engine**: The file `use-notifications-realtime.ts`.
- The screen subscribes to the `notifications` table. Whenever a new row is inserted (event: `INSERT`) where the `user_id` matches the current logged-in user, the bell rings.

## 3. Why Server Refresh Instead of Direct State Push?
For the Notification feature, the developer chose **NOT** to inject notification data directly into the UI (unlike the Chat feature). Instead, when the bell signal arrives, the client tells the server: *"Please recount exactly how many unread notifications I have."*
- The command is: `router.refresh()`.
- **Rationale**: This approach lets the server (Server Components) be the single source of truth for unread counts and security enforcement. It avoids distributing count logic across multiple client devices, which would risk desynchronization and UI lag.

## 4. Connection Leak & Duplicate Subscription Prevention
When a user logs out and then logs into a different account on the same device, the old WebSocket channel is immediately severed via `removeChannel()`. The system then establishes a fresh channel for the new user's ID. This prevents the "one person ringing two phones" bug — where notifications from the previous session bleed into the current one.