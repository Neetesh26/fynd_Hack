import { test, expect } from '@playwright/test';

test.describe('Manual Exploratory Verification Suite', () => {

  test('TC-MAN-01: Empty cart checkout', async ({ page }) => {
    await page.goto('/');

    // With empty cart, fill customer name and attempt checkout
    await page.getByLabel(/customer name/i).fill('Sam Altman');
    await page.getByRole('button', { name: /place order/i }).click();

    // Verify empty cart error alert is visible
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/cart is empty/i);

    // Verify no order confirmation rendered
    await expect(page.getByRole('heading', { name: /order confirmed!/i })).not.toBeVisible();
  });

  test('TC-MAN-02: Rapid double-click on Place Order', async ({ page }) => {
    await page.goto('/');

    // Add Mechanical Keyboard (₹2,499)
    await page.getByRole('button', { name: 'Add Mechanical Keyboard to cart' }).click();
    await page.getByLabel(/customer name/i).fill('Speedy Clicker');

    const placeOrderBtn = page.getByRole('button', { name: /place order/i });

    // Perform rapid double-click
    await placeOrderBtn.dblclick();

    // Confirmation must appear exactly once
    await expect(page.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /order confirmed!/i })).toHaveCount(1);
    await expect(page.getByText('Speedy Clicker')).toBeVisible();
    await expect(page.getByLabel('Order total')).toHaveText('₹2,499');
  });

  test('TC-MAN-03: Removing products', async ({ page }) => {
    await page.goto('/');

    // Add both products
    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();
    await page.getByRole('button', { name: 'Add Mechanical Keyboard to cart' }).click();

    // Total should be ₹799 + ₹2,499 = ₹3,298
    await expect(page.getByLabel('Grand total')).toHaveText('₹3,298');

    // Remove Wireless Mouse
    await page.getByRole('button', { name: 'Remove Wireless Mouse from cart' }).click();

    // Verify Wireless Mouse removed from cart
    const cartSection = page.getByRole('region', { name: /order summary & checkout/i });
    await expect(cartSection.getByText('Wireless Mouse')).not.toBeVisible();

    // Verify grand total recalculated to ₹2,499 immediately
    await expect(page.getByLabel('Grand total')).toHaveText('₹2,499');
  });

  test('TC-MAN-04: Decreasing quantity and lower boundary prevention', async ({ page }) => {
    await page.goto('/');

    // Add Wireless Mouse
    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();
    await expect(page.getByLabel('Current quantity of Wireless Mouse')).toHaveText('1');

    // At quantity 1, decrease button should be disabled to prevent invalid quantities (0 or negative)
    const decreaseBtn = page.getByRole('button', { name: 'Decrease quantity of Wireless Mouse' });
    await expect(decreaseBtn).toBeDisabled();

    // Increase to 2
    await page.getByRole('button', { name: 'Increase quantity of Wireless Mouse' }).click();
    await expect(page.getByLabel('Current quantity of Wireless Mouse')).toHaveText('2');
    await expect(page.getByLabel('Line total for Wireless Mouse')).toHaveText('₹1,598');
    await expect(page.getByLabel('Grand total')).toHaveText('₹1,598');

    // Now decrease button should be enabled
    await expect(decreaseBtn).toBeEnabled();

    // Click decrease back to 1
    await decreaseBtn.click();
    await expect(page.getByLabel('Current quantity of Wireless Mouse')).toHaveText('1');
    await expect(page.getByLabel('Line total for Wireless Mouse')).toHaveText('₹799');
    await expect(page.getByLabel('Grand total')).toHaveText('₹799');

    // Once again at 1, decrease button should be disabled
    await expect(decreaseBtn).toBeDisabled();
  });

  test('TC-MAN-05: Mobile viewport responsiveness', async ({ page }) => {
    // Set viewport to iPhone SE (375 x 667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify title and layout components render cleanly
    await expect(page.getByRole('heading', { name: 'SwiftCart' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Products' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Order Summary & Checkout' })).toBeVisible();

    // Execute mobile checkout
    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();
    await page.getByLabel(/customer name/i).fill('Mobile Shopper');
    await page.getByRole('button', { name: /place order/i }).click();

    // Assert successful confirmation on mobile
    await expect(page.getByRole('heading', { name: /order confirmed!/i })).toBeVisible();
    await expect(page.getByText('Mobile Shopper')).toBeVisible();
    await expect(page.getByLabel('Order total')).toHaveText('₹799');
  });

});

