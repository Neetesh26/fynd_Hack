# SwiftCart — Master Test Plan

**Project**: SwiftCart Checkout Quality Lab  
**Author**: SDET Quality Assurance  
**Target Application**: Single-Page React Checkout Application  
**Version**: 1.0.0  

---

## 1. Test Objectives

1. Validate the core functional checkout flow from product selection to order confirmation.
2. Verify strict client-side validation for mandatory fields (Customer Name) and empty cart submissions.
3. Verify calculations of line totals and grand totals in INR currency without rounding anomalies.
4. Ensure robust client-side duplicate-order prevention against rapid user double-clicks.
5. Establish maintainable, accessible, and deterministic automated browser tests using Playwright.

---

## 2. Scope

### In Scope
- Product listing and item attributes (name, price, category).
- Shopping cart actions: Add, combine duplicates, increment, decrement, and remove.
- Real-time arithmetic calculations for item subtotals and grand total.
- Form validation: Required customer name and empty cart protection.
- State preservation across validation failures.
- Synchronous duplicate-order guard (`useRef` lock).
- Order confirmation rendering (customer name, reference ID, items, total).
- Accessibility attributes: ARIA labels, semantic roles, heading levels.
- Automated tests in `tests/checkout.spec.js`.
- Cross-browser validation on Chromium.

### Out of Scope
- Backend database persistence.
- Third-party payment gateway integration (Razorpay, Stripe).
- User authentication and persistent login sessions.
- Multi-currency conversion or international tax rules.

---

## 3. Test Environment

- **Operating System**: Windows 11 / Linux / macOS
- **Node.js**: v18+ (tested on Node v22.17.1)
- **Framework**: React 18, Vite 5, Tailwind CSS 3
- **Test Framework**: `@playwright/test` v1.50+
- **Browser**: Chromium (Desktop Chrome viewport: 1280×720)
- **Base URL**: `http://127.0.0.1:5180` (automated via Playwright `webServer`)

---

## 4. Prioritized Test Cases

### Automated Test Cases

| Test ID | Name | Priority | Category | Objective |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AUTO-01** | Successful checkout | P0 (Blocker) | Functional | Verify end-to-end successful purchase of Wireless Mouse. |
| **TC-AUTO-02** | Required field validation | P0 (Blocker) | Validation | Ensure customer name is mandatory and preserves cart state when empty. |
| **TC-AUTO-03** | Exact quantity calculation | P0 (Blocker) | Calculation | Verify incrementing quantity to 2 updates line and grand totals to ₹1,598. |
| **TC-AUTO-04** | Duplicate order prevention | P1 (Critical) | Concurrency | Verify rapid double-click creates exactly 1 order confirmation. |
| **TC-AUTO-05** | Empty cart checkout prevention | P1 (Critical) | Validation | Verify checkout is blocked when the shopping cart is empty. |

---

### Test Case Specifications (Automated)

#### TC-AUTO-01: Successful checkout
- **Preconditions**: Application loaded at `http://127.0.0.1:5180` with clean state.
- **Steps**:
  1. Locate "Wireless Mouse" in catalog.
  2. Click "Add to Cart" button.
  3. Fill "Customer Name" input with `"Alex Morgan"`.
  4. Click "Place Order" button.
- **Expected Results**:
  1. Success heading "Order Confirmed!" is displayed.
  2. "Thank you for your order!" message is visible.
  3. Customer name `"Alex Morgan"` is visible.
  4. Unique order reference matching regex `ORD-\d+` is visible.
  5. Order total displays exact price `₹799`.

#### TC-AUTO-02: Required field validation
- **Preconditions**: Application loaded with clean state.
- **Steps**:
  1. Add "Wireless Mouse" to cart.
  2. Leave "Customer Name" field empty (or clear text).
  3. Click "Place Order" button.
- **Expected Results**:
  1. Accessible validation message (`role="alert"`) displays `"Customer name is required."`.
  2. Order confirmation heading does NOT appear.
  3. "Wireless Mouse" remains in cart with line total `₹799` and grand total `₹799`.

#### TC-AUTO-03: Exact quantity calculation
- **Preconditions**: Application loaded with clean state.
- **Steps**:
  1. Add "Wireless Mouse" to cart (unit price ₹799).
  2. Verify initial quantity is `1` and total is `₹799`.
  3. Click "Increase quantity" (`+`) button once.
- **Expected Results**:
  1. Displayed item quantity updates to `2`.
  2. Line total updates to `₹1,598`.
  3. Grand total updates to `₹1,598`.

---

## 5. Manual Exploratory Test Procedures

| Test ID | Scenario | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-MAN-01** | Empty Cart Checkout | 1. Open app.<br>2. Leave cart empty.<br>3. Enter customer name.<br>4. Click Place Order. | Order is blocked; validation alert indicates cart is empty. |
| **TC-MAN-02** | Rapid Double-Click Guard | 1. Add Mechanical Keyboard.<br>2. Fill customer name.<br>3. Rapidly double click Place Order. | Button disables immediately with spinner; single order reference generated; exactly one confirmation rendered. |
| **TC-MAN-03** | Product Removal | 1. Add Wireless Mouse and Mechanical Keyboard.<br>2. Click Remove on Wireless Mouse. | Wireless Mouse removed; cart count decrements; grand total recalculates to ₹2,499. |
| **TC-MAN-04** | Quantity Decrement Boundary | 1. Add Wireless Mouse.<br>2. Click Increase (`+`) to reach 2.<br>3. Click Decrease (`−`).<br>4. Check `−` button state at quantity 1. | Quantity decrements to 1; line total drops to ₹799; at quantity 1, `−` button is disabled to prevent invalid quantities. |
| **TC-MAN-05** | Mobile Responsiveness | 1. Open DevTools responsive mode (375×667 iPhone SE).<br>2. Inspect layout and controls.<br>3. Execute checkout flow. | Layout stacks vertically; buttons are touch-friendly (>=44px); text does not overflow; complete checkout functions seamlessly. |

---

## 6. Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Asynchronous React state lag during rapid clicks** | High (Duplicate orders created) | Combine synchronous `useRef` guard with React state to reject duplicate invocations synchronously. |
| **Floating point arithmetic inaccuracies** | Medium (Incorrect currency display) | Use clean integer arithmetic for INR amounts (pennies/paise not needed for synthetic products). |
| **Flaky Playwright assertions due to animation/timing** | Medium (Intermittent CI failures) | Use web-first assertions (`expect(locator).toBeVisible()`) with auto-retrying; zero hardcoded sleeps. |
