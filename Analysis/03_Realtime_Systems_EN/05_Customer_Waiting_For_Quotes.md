# REALTIME ANALYSIS: CUSTOMER BID WAITING ROOM (waiting-client.tsx)

## 1. What Does This Feature Do?
This is the "Wow Effect" — the most engaging screen in the entire CleanHi project.
When a customer submits their cleaning request, the system transitions to a **24-hour countdown timer screen**. While the customer watches their phone: *"Ting! Company A just bid ₩500,000."* *"Ting! Company B undercut with ₩400,000."* Quote cards progressively stack onto the screen in real-time — an irresistibly compelling experience.

## 2. What Powers This Magic?
The heart of this feature lives in `waiting-client.tsx` (this is a Component, not a standalone Hook like the other 3 realtime features).

**It juggles 2 simultaneous responsibilities:**
1. **Client-Side Timer**: A `setInterval(tick, 1000)` countdown that subtracts one second at a time, showing hours and minutes remaining. If the timer reaches 0 with no partner bids, it displays a sad-face apology screen inviting the customer to resubmit.
2. **Live Bid Listener (Realtime INSERT on Quotes)**: Whenever a partner submits a price (`quotes INSERT`), the screen flashes and inserts the new bid card at the top of the list.

## 3. The Clever JOIN Fetch Mechanism
A major database challenge: When the Realtime pipe delivers a new quote record, the screen **doesn't know** the partner's name, rating, or profile photo (because partner names live in the `partners` table, not the `quotes` table).

**The Developer's Elegant Solution:**
Instead of calling `router.refresh()` (which would reload the entire page and destroy the countdown timer state), the code implements a silent background fetch: "When a new bid card drops in, pause 0.5 seconds... then quietly send a scout query to the Database's `partners` table to retrieve the bidder's business name, star rating, and avatar URL. Attach that metadata to the bid card, THEN render it on screen for the customer."

*(This is hidden behind an elegant Supabase query: `supabase.from("quotes").select("*, partners(business_name, rating, ...")`)` — ensuring that even anonymous guest users who haven't logged in can still see partner information.)*