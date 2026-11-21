/**
 * Format numeric value to INR currency string.
 * Example: 799 -> ₹799, 1598 -> ₹1,598, 2499 -> ₹2,499
 */
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generate a unique order reference.
 * Format: ORD-XXXXXX (e.g. ORD-839210)
 */
export const generateOrderReference = () => {
  const timestamp = Date.now().toString().slice(-4);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${timestamp}${randomPart}`;
};

