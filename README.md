# SwiftCart — Checkout Quality Lab

> A high-reliability, lightweight e-commerce checkout application and browser test suite built for the SDET Intern Hiring Hackathon.

---

## 1. Project Overview

**SwiftCart** is a single-page checkout application designed to demonstrate robust checkout functionality, accessible form controls, bulletproof duplicate-order prevention, and automated end-to-end testing with **Playwright**.

The application eliminates common junior-developer pitfalls such as:
- Hardcoded calculated totals in UI components.
- Susceptibility to duplicate orders from rapid button clicking.
- Missing accessible attributes (`aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"`).
- Fragile test locators (such as complex CSS selectors or hardcoded timing sleeps).

---

## 2. Key Features

- **Dynamic Cart Management**:
  - Add synthetic catalog items (Wireless Mouse at ₹799, Mechanical Keyboard at ₹2,499).
  - Intelligent quantity combining: clicking "Add to Cart" on an existing item increments its quantity rather than creating duplicate entries.
  - Interactive quantity controls (`+` and `−`) with minimum quantity boundaries (`quantity >= 1`).
  - Explicit item removal with immediate subtotal updates.
- **Accurate Numeric Calculations**:
  - Line subtotals and grand totals calculated using integer arithmetic in Indian Rupee (INR).
  - Standardized formatting (`₹799`, `₹1,598`, `₹2,499`) using the ECMAScript `Intl.NumberFormat('en-IN')` API.
  - Zero hardcoding of calculated totals.
- **Form Validation**:
  - Required customer name validation before submission.
  - Accessible error states utilizing `role="alert"` and `aria-describedby`.
  - Empty cart submission protection.
  - Preserves user input and cart items across failed validation attempts.
- **Duplicate-Order Guard**:
  - Employs a synchronous `useRef` guard (`isSubmittingRef.current`) combined with React state (`isSubmitting`) to immediately drop rapid double-clicks before React re-renders.
  - Disables the Place Order button during in-flight processing.
  - Generates a single unique order reference (`ORD-XXXXXX`).
  - Clears the cart upon successful placement so identical orders cannot be re-submitted.
- **Order Confirmation**:
  - High-clarity success summary displaying customer name, order reference, breakdown of ordered items, and final total.
  - Provides a "Start New Order" reset button for continuous workflows.

---

## 3. Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: JavaScript (ES Modules)
- **Styling**: Tailwind CSS 3
- **Test Runner & Automation**: Playwright Test
- **Runtime**: Node.js (v18+)

*Note: No backend, database, payment gateway, external APIs, authentication, or heavyweight libraries are included, keeping the codebase fully auditable and easy to explain during interviews.*

---

## 4. Prerequisites

- **Node.js**: `v18.0.0` or later (tested on Node v22)
- **npm**: `v9.0.0` or later

---

## 5. Installation & Setup

1. **Clone or navigate to the workspace**:
   ```bash
   cd c:\Users\shara\Desktop\fynd
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browser binaries (Chromium)**:
   ```bash
   npx playwright install chromium
   ```

---

## 6. Running the Application

### Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will be accessible at:
```
http://127.0.0.1:5180
```

### Production Build & Preview
To verify production bundle build:
```bash
npm run build
npm run preview
```

---

## 7. Automated End-to-End Testing (Playwright)

### Run all tests in headless mode
```bash
npm test
```

### Run tests with visible browser (Headed mode)
```bash
npm run test:headed
```

### Run tests in interactive UI mode
```bash
npm run test:ui
```

### View Test Reports & Failure Artifacts
If any test fails or to view the latest execution details:
```bash
npm run test:report
```

---

## 8. Trace & Screenshot Evidence Collection

Playwright is pre-configured with the following failure diagnosis artifacts in `playwright.config.js`:
- **Screenshots on failure**: `screenshot: 'only-on-failure'`
- **Tracing on failure**: `trace: 'retain-on-failure'`
- **Artifacts directory**: `test-results/`
- **HTML Report directory**: `playwright-report/`

To inspect a recorded trace:
```bash
npx playwright show-trace test-results/<failed-test-folder>/trace.zip
```

---

## 9. Project Structure

```
fynd/
├── index.html                   # HTML entry point with meta viewport
├── package.json                 # Project scripts and dependencies
├── postcss.config.js            # PostCSS configuration for Tailwind
├── tailwind.config.js           # Tailwind utility configuration
├── vite.config.js               # Vite dev server and React plugin setup
├── playwright.config.js         # Playwright test runner and webServer config
├── tests/
│   └── checkout.spec.js         # End-to-end automated test cases
├── src/
│   ├── main.jsx                 # React root mount point
│   ├── App.jsx                  # Main orchestration component and state machine
│   ├── index.css                # Tailwind base, components, and utilities
│   ├── data/
│   │   └── products.js          # Synthetic catalog data (Mouse & Keyboard)
│   ├── utils/
│   │   └── formatters.js        # Currency (INR) and order reference helpers
│   └── components/
│       ├── Header.jsx           # Application navigation and cart item badge
│       ├── ProductList.jsx      # Catalog grid container
│       ├── ProductCard.jsx      # Individual product display with Add to Cart
│       ├── Cart.jsx             # Cart summary, pricing breakdown, and form
│       ├── CartItem.jsx         # Line item controls (+, −, Remove, subtotal)
│       └── OrderConfirmation.jsx# Post-checkout order summary screen
├── README.md                    # Project documentation
├── TEST_PLAN.md                 # Test plan specification
├── TEST_RESULTS.md              # Test execution log
└── DEFECT_REPORT.md             # Defect reporting template and log
```

---

## 10. Known Limitations & Architectural Notes

1. **Frontend-Only Idempotency Guard**:
   - The React `useRef` + state guard successfully prevents accidental double-clicks within the same browser session.
   - *However*, this does not replace backend payment-grade idempotency. In real-world enterprise applications, unique idempotency tokens (e.g. UUIDv4 generated per intent) must be transmitted to the server via the `Idempotency-Key` HTTP header to protect against network drops, user page refreshes, and multi-tab race conditions.
2. **In-Memory Cart & Order State**:
   - Cart data and order confirmations reside in component memory. Refreshing the browser resets the application to the initial empty state.
