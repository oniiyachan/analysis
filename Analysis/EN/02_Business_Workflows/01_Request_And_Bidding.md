# BUSINESS WORKFLOW: REQUEST & LIVE BIDDING

This is the most critical function of the Reverse Auction model — the engine that connects Customers with Cleaning Partners.

## 1. Creating a Cleaning Request (Customer Side)
- **8-Step Wizard**: The customer progresses through 8 sequential form steps: Select Cleaning Type (residential, post-construction, recurring) → Choose Sub-package → Enter Floor Area (pyeong) → Input Address via Kakao Daum Postcode API → Select up to 3 Preferred Time Slots → Rate Contamination Level + Upload Photos → Additional Options & Memo.
- **AI Price Estimate**: Before final submission, the AI engine calculates an expected price range based on the `service_categories` base rates and floor area (e.g. "₩800,000 – ₩1,200,000") so the customer can set realistic expectations.
- **Database Storage**: All data is persisted into the `cleaning_requests` table via a Server Action.

## 2. The Bidding Arena (Half-Batch Reverse Auction)
- **5 + 5 Logic**:
  - Once a request is posted, the system fires a real-time push notification (via Supabase Realtime) to all active cleaning partners within the customer's geospatial zone (e.g. Gangnam-gu, Seoul).
  - Only the **fastest 5 partners** to submit bids enter the first round. (This prevents the customer from being flooded with 50+ low-quality quotes.)
  - The customer reviews the 5 bids — comparing prices, ratings, and portfolios. If unsatisfied, they can press "Extend" to accept 5 more bids → maximum 10 total quotes.

## 3. Bid Management — `quotes` Table (Partner Side)
- Partners see a live feed of nearby requests. They can tap to view contamination photos and floor area.
- The partner composes a bid: total price (`total_price`), a persuasive message (e.g. "Our team guarantees a spotless result..."), and selects an available time slot. This data is persisted into the `quotes` table with a foreign key to `cleaning_requests`.
- Upon bid submission, the customer receives an Email/Push notification: "A new quote has arrived!"

## 4. Anti-Spam Protection (Rate Limiting)
- To prevent competitors from deploying bot armies to submit junk requests, Server Actions combine with Vercel Firewall to throttle a maximum of **3 requests per 15 minutes** for non-authenticated (guest) quote submissions. The `rate_limits` table records all throttle events for audit.