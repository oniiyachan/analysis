# BUSINESS WORKFLOW: BOOKING & TRANSACTION

> **Overview**: The financial transfer phase.

## 1. THE CHECKOUT (NicePay Gateway)
Users inject coupon modifiers onto the winning bid. The payload routes to NicePay SDK.

## 2. TRANSACTION INTEGRITY
Aggressive Idempotency locks on the `order_id` prevent double-charging users during network lag or duplicate callback HTTP hooks.

## 3. FULFILLMENT
Post-payment, the request transitions to `assigned`. The Partner’s calendar syncs the new block.