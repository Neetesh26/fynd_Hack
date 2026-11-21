import { test, expect } from '@playwright/test';

test.describe('SwiftCart Checkout Quality Lab Suite', () => {

  /**
   * Test 1: Successful checkout
   *
   * Flow:
   * 1. Start from a clean application state.
   * 2. Add the Wireless Mouse to the cart.
   * 3. Enter a valid customer name.
   * 4. Place the order.
   * 5. Assert that the success confirmation is visible.
   * 6. Assert that the order reference is visible.
   * 7. Assert that the correct order total is displayed.
   */
  test('Test 1: Successful checkout', async ({ page }) => {
    // 1. Start from a clean application state
    await page.goto('/');

    // 2. Add the Wireless Mouse to the cart
    const addMouseBtn = page.getByRole('button', { name: 'Add Wireless Mouse to cart' });
    await expect(addMouseBtn).toBeVisible();
    await addMouseBtn.click();

    // 3. Enter a valid customer name
    const customerNameInput = page.getByLabel(/customer name/i);
    await expect(customerNameInput).toBeVisible();
    await customerNameInput.fill('Alex Morgan');

    // 4. Place the order
    const placeOrderBtn = page.getByRole('button', { name: /place order/i });
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // 5. Assert that the success confirmation is visible
    const confirmationHeading = page.getByRole('heading', { name: /order confirmed!/i });
    await expect(confirmationHeading).toBeVisible();
    await expect(page.getByText(/thank you for your order!/i)).toBeVisible();
    await expect(page.getByText('Alex Morgan')).toBeVisible();

    // 6. Assert that the order reference is visible
    const orderRefLocator = page.getByText(/ORD-\d+/);
    await expect(orderRefLocator).toBeVisible();

    // 7. Assert that the correct order total is displayed (₹799 for Wireless Mouse)
    const orderTotalLocator = page.getByLabel('Order total');
    await expect(orderTotalLocator).toHaveText('₹799');
  });

  /**
   * Test 2: Required field validation
   *
   * Flow:
   * 1. Start from a clean application state.
   * 2. Add a product.
   * 3. Leave the customer name blank.
   * 4. Attempt checkout.
   * 5. Assert that the validation message is visible.
   * 6. Assert that no order confirmation appears.
   * 7. Assert that the product remains in the cart.
   */
  test('Test 2: Required field validation', async ({ page }) => {
    // 1. Start from a clean application state
    await page.goto('/');

    // 2. Add a product (Wireless Mouse)
    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();

    // 3. Leave the customer name blank (or explicitly clear it)
    const customerNameInput = page.getByLabel(/customer name/i);
    await customerNameInput.fill('');

    // 4. Attempt checkout
    const placeOrderBtn = page.getByRole('button', { name: /place order/i });
    await placeOrderBtn.click();

    // 5. Assert that the validation message is visible
    const validationAlert = page.getByRole('alert');
    await expect(validationAlert).toBeVisible();
    await expect(validationAlert).toContainText(/customer name is required/i);

    // 6. Assert that no order confirmation appears
    const confirmationHeading = page.getByRole('heading', { name: /order confirmed!/i });
    await expect(confirmationHeading).not.toBeVisible();

    // 7. Assert that the product remains in the cart
    const cartSection = page.getByRole('region', { name: /order summary & checkout/i });
    await expect(cartSection.getByText('Wireless Mouse')).toBeVisible();
    await expect(page.getByLabel('Line total for Wireless Mouse')).toHaveText('₹799');
    await expect(page.getByLabel('Grand total')).toHaveText('₹799');
  });

  /**
   * Test 3: Exact quantity calculation
   *
   * Flow:
   * 1. Start from a clean application state.
   * 2. Add the Wireless Mouse.
   * 3. Increase quantity to two.
   * 4. Assert that quantity is two.
   * 5. Assert that the line total is ₹1,598.
   * 6. Assert that the order total is ₹1,598.
   */
  test('Test 3: Exact quantity calculation', async ({ page }) => {
    // 1. Start from a clean application state
    await page.goto('/');

    // 2. Add the Wireless Mouse
    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();

    // Verify initial quantity is 1 and totals are ₹799
    await expect(page.getByLabel('Current quantity of Wireless Mouse')).toHaveText('1');
    await expect(page.getByLabel('Line total for Wireless Mouse')).toHaveText('₹799');
    await expect(page.getByLabel('Grand total')).toHaveText('₹799');

    // 3. Increase quantity to two
    const increaseBtn = page.getByRole('button', { name: 'Increase quantity of Wireless Mouse' });
    await increaseBtn.click();

    // 4. Assert that quantity is two
    const quantityBadge = page.getByLabel('Current quantity of Wireless Mouse');
    await expect(quantityBadge).toHaveText('2');

    // 5. Assert that the line total is ₹1,598 (₹799 * 2)
    const lineTotal = page.getByLabel('Line total for Wireless Mouse');
    await expect(lineTotal).toHaveText('₹1,598');

    // 6. Assert that the order total is ₹1,598
    const grandTotal = page.getByLabel('Grand total');
    await expect(grandTotal).toHaveText('₹1,598');
  });

  /**
   * Test 4: Duplicate order prevention on rapid double-clicks
   *
   * Flow:
   * 1. Start from clean state.
   * 2. Add product and fill customer name.
   * 3. Rapidly click Place Order twice in succession.
   * 4. Assert only one order confirmation is produced.
   */
  test('Test 4: Duplicate order prevention on rapid double-clicks', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Add Mechanical Keyboard to cart' }).click();
    await page.getByLabel(/customer name/i).fill('Dev Tester');

    const placeOrderBtn = page.getByRole('button', { name: /place order/i });

    // Double-click rapidly
    await placeOrderBtn.dblclick();

    // Confirmation must appear exactly once
    const confirmationHeading = page.getByRole('heading', { name: /order confirmed!/i });
    await expect(confirmationHeading).toBeVisible();
    await expect(page.getByRole('heading', { name: /order confirmed!/i })).toHaveCount(1);
    await expect(page.getByText('Dev Tester')).toBeVisible();
    await expect(page.getByLabel('Order total')).toHaveText('₹2,499');
  });

  /**
   * Test 5: Empty cart checkout prevention
   *
   * Flow:
   * 1. Start with an empty cart.
   * 2. Fill customer name.
   * 3. Attempt to place order.
   * 4. Assert empty cart alert is shown and no confirmation is displayed.
   */
  test('Test 5: Empty cart checkout prevention', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/customer name/i).fill('John Doe');

    const placeOrderBtn = page.getByRole('button', { name: /place order/i });
    await placeOrderBtn.click();

    // Alert should indicate cart is empty
    await expect(page.getByRole('alert')).toContainText(/cart is empty/i);
    await expect(page.getByRole('heading', { name: /order confirmed!/i })).not.toBeVisible();
  });

});
