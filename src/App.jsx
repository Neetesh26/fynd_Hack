import { useState, useRef } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import { PRODUCTS } from './data/products';
import { generateOrderReference } from './utils/formatters';

export default function App() {
  // Cart state: array of { id, name, price, quantity, category }
  const [cart, setCart] = useState([]);

  // Form input state
  const [customerName, setCustomerName] = useState('');

  // Validation feedback state
  const [nameError, setNameError] = useState('');
  const [cartError, setCartError] = useState('');

  // Order submission state & synchronous guard
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  // Confirmed order record
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Derived state
  const totalCartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Cart actions
  const handleAddToCart = (product) => {
    // Clear any previous cart error once items are added
    if (cartError) setCartError('');

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Prevent duplicate cart entries by combining quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          // Prevent invalid quantities (< 1)
          const newQty = item.quantity - 1;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCustomerNameChange = (val) => {
    setCustomerName(val);
    if (nameError) setNameError('');
  };

  // Order submission with duplicate guard & validation
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 1. Synchronous Guard: Block rapid double clicks before React state updates
    if (isSubmittingRef.current) {
      return;
    }

    // 2. Cart validation: prevent order placement if cart is empty
    if (cart.length === 0) {
      setCartError('Your cart is empty. Please add at least one product to checkout.');
      return;
    }

    // 3. Customer name validation: required field check
    if (!customerName.trim()) {
      setNameError('Customer name is required.');
      return;
    }

    // 4. Synchronously lock submission immediately
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setNameError('');
    setCartError('');

    // Capture snapshot of current order details
    const orderDetails = {
      reference: generateOrderReference(),
      customerName: customerName.trim(),
      items: cart.map((item) => ({ ...item })),
      total: grandTotal,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    // 5. Short simulated asynchronous settlement
    setTimeout(() => {
      setOrderConfirmation(orderDetails);
      // Empty cart to prevent same cart from being submitted again
      setCart([]);
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }, 250);
  };

  const handleResetOrder = () => {
    setOrderConfirmation(null);
    setCustomerName('');
    setNameError('');
    setCartError('');
    isSubmittingRef.current = false;
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Top ambient highlight line */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 w-full" />

      <Header cartItemCount={totalCartItemCount} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {orderConfirmation ? (
          <OrderConfirmation order={orderConfirmation} onResetOrder={handleResetOrder} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Catalog Column (Left) */}
            <div className="lg:col-span-7">
              <ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />
            </div>

            {/* Cart & Checkout Column (Right) */}
            <div className="lg:col-span-5">
              <Cart
                cart={cart}
                customerName={customerName}
                onCustomerNameChange={handleCustomerNameChange}
                nameError={nameError}
                cartError={cartError}
                isSubmitting={isSubmitting}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveFromCart}
                onSubmitOrder={handlePlaceOrder}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-700">SwiftCart — Checkout Quality Lab</p>
          <p className="text-slate-400">
            Crafted for SDET Intern Hiring Hackathon • Built with React, Vite & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
