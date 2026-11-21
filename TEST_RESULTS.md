# SwiftCart — Test Execution Results

**Execution Status**: COMPLETED (100% Passed)  
**Execution Date**: 2026-11-21  
**Environment**: Windows 11 / Node.js v22.17.1 / Chromium Headless (Desktop Chrome & Mobile 375×667)  
**Base URL**: `http://127.0.0.1:5180`  
**Test Runner**: Playwright Test v1.50+ / WebServer automated  

---

## 1. Executive Summary

| Total Tests | Passed | Failed | Skipped | Pass Rate | Execution Duration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10** (5 Automated + 5 Exploratory) | **10** | **0** | **0** | **100.0%** | **25.9s** |

---

## 2. Automated Core Test Suite (`tests/checkout.spec.js`)

| Test ID | Test Name | Target Locator / Criteria | Status | Duration | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTO-01** | Test 1: Successful checkout | Confirmation heading visible, order ref matching `ORD-\d+`, total `₹799`, customer `Alex Morgan` | **PASSED** | 4.3s | Console Log / Report |
| **TC-AUTO-02** | Test 2: Required field validation | Alert `Customer name is required` visible, no order confirmation, Wireless Mouse & `₹799` preserved in cart | **PASSED** | 1.9s | Console Log / Report |
| **TC-AUTO-03** | Test 3: Exact quantity calculation | Initial qty `1` (`₹799`), incremented qty `2`, line total `₹1,598`, grand total `₹1,598` | **PASSED** | 1.5s | Console Log / Report |
| **TC-AUTO-04** | Test 4: Duplicate order prevention on rapid double-clicks | Rapid double-click on Place Order yields exactly 1 confirmation heading, 1 order reference, total `₹2,499` | **PASSED** | 2.0s | Console Log / Report |
| **TC-AUTO-05** | Test 5: Empty cart checkout prevention | Alert `Your cart is empty` on checkout attempt with empty cart; confirmation heading not visible | **PASSED** | 1.5s | Console Log / Report |

---

## 3. Exploratory & Manual Verification Suite (`tests/manual-verification.spec.js`)

All scenarios specified in Section 9 of the requirements were verified both through automated browser emulation and structured manual workflows:

| Test ID | Scenario | Verification Method | Status | Duration | Actual Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-MAN-01** | Empty Cart Checkout | Form submission with 0 items | **PASSED** | 1.3s | Alert `Your cart is empty. Please add at least one product to checkout.` rendered; order confirmation blocked. |
| **TC-MAN-02** | Rapid Double-Click on Place Order | Synchronous `dblclick()` trigger | **PASSED** | 1.9s | Synchronous `useRef` guard locked execution immediately; Place Order button displayed `Processing...`; single order confirmation rendered. |
| **TC-MAN-03** | Removing Products | Multi-product cart removal | **PASSED** | 1.9s | Adding Mouse (`₹799`) + Keyboard (`₹2,499`) gives `₹3,298`. Clicking "Remove" on Mouse removes it and recalculates total to `₹2,499` instantly. |
| **TC-MAN-04** | Decreasing Quantity & Boundary Guard | Boundary testing on `−` button | **PASSED** | 2.2s | At quantity 1, `−` button is disabled (`disabled` attribute). Clicking `+` increases to 2 and enables `−`. Clicking `−` returns to 1 and disables `−` to prevent 0 or negative quantities. |
| **TC-MAN-05** | Mobile Viewport Responsiveness | 375×667 (iPhone SE viewport) | **PASSED** | 1.9s | Header, catalog grid, and checkout form stacked cleanly without overflow; buttons remained accessible; complete checkout completed successfully. |

---

## 4. Playwright Execution Console Output

```text
Running 10 tests using 1 worker

  ok  1 [chromium] › tests\checkout.spec.js:17:3 › SwiftCart Checkout Quality Lab Suite › Test 1: Successful checkout (4.3s)
  ok  2 [chromium] › tests\checkout.spec.js:63:3 › SwiftCart Checkout Quality Lab Suite › Test 2: Required field validation (1.9s)
  ok  3 [chromium] › tests\checkout.spec.js:105:3 › SwiftCart Checkout Quality Lab Suite › Test 3: Exact quantity calculation (1.5s)
  ok  4 [chromium] › tests\checkout.spec.js:143:3 › SwiftCart Checkout Quality Lab Suite › Test 4: Duplicate order prevention on rapid double-clicks (2.0s)
  ok  5 [chromium] › tests\checkout.spec.js:170:3 › SwiftCart Checkout Quality Lab Suite › Test 5: Empty cart checkout prevention (1.5s)
  ok  6 [chromium] › tests\manual-verification.spec.js:5:3 › Manual Exploratory Verification Suite › TC-MAN-01: Empty cart checkout (1.3s)
  ok  7 [chromium] › tests\manual-verification.spec.js:21:3 › Manual Exploratory Verification Suite › TC-MAN-02: Rapid double-click on Place Order (1.9s)
  ok  8 [chromium] › tests\manual-verification.spec.js:40:3 › Manual Exploratory Verification Suite › TC-MAN-03: Removing products (1.9s)
  ok  9 [chromium] › tests\manual-verification.spec.js:61:3 › Manual Exploratory Verification Suite › TC-MAN-04: Decreasing quantity and lower boundary prevention (2.2s)
  ok 10 [chromium] › tests\manual-verification.spec.js:91:3 › Manual Exploratory Verification Suite › TC-MAN-05: Mobile viewport responsiveness (1.9s)

  10 passed (25.9s)
```

---

## 5. Failure Artifact Status
- Trace archives (`trace.zip`): Retained on failure (`retain-on-failure`). 0 failure traces generated.
- Failure screenshots: Configured `only-on-failure`. 0 failure screenshots generated.
- HTML report generated at: `playwright-report/index.html`.
