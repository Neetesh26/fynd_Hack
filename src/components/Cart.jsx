import CartItem from './CartItem';
import { formatINR } from '../utils/formatters';

export default function Cart({
  cart,
  customerName,
  onCustomerNameChange,
  nameError,
  cartError,
  isSubmitting,
  onIncrease,
  onDecrease,
  onRemove,
  onSubmitOrder,
}) {
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section
      role="region"
      aria-labelledby="cart-heading"
      className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm"
    >
      {/* Header with item count pill */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 id="cart-heading" className="text-xl font-bold tracking-tight text-slate-900">
            Order Summary & Checkout
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review cart items and enter customer details.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Cart Items or Enhanced Empty State */}
      <div className="py-1">
        {cart.length === 0 ? (
          <div className="py-6 px-4 text-center bg-slate-50/70 border border-dashed border-slate-200/90 rounded-2xl my-1">
            <div className="w-10 h-10 mx-auto rounded-full bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-2 shadow-2xs">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Your cart is empty.</p>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xs mx-auto">
              Add products from the catalog on the left to activate checkout.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 max-h-52 overflow-y-auto pr-1">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Validation Alert */}
      {cartError && (
        <div
          role="alert"
          className="p-3 my-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
        >
          <svg className="w-4 h-4 shrink-0 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{cartError}</span>
        </div>
      )}

      {/* Highly Prominent Grand Total Card (UX Goal #5) */}
      <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-purple-50/80 via-slate-50 to-indigo-50/50 border border-purple-100/90 shadow-2xs">
        <div className="space-y-1 pb-2.5 border-b border-purple-100/80 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span>Items subtotal</span>
            <span className="font-semibold text-slate-900 tabular-nums">{formatINR(grandTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Standard Shipping</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              FREE
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Estimated Taxes</span>
            <span>Included</span>
          </div>
        </div>

        <div className="pt-2.5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
              Grand Total
            </span>
            <span className="text-[11px] text-slate-500">All taxes included</span>
          </div>
          <span
            aria-label="Grand total"
            className="text-2xl font-black text-purple-700 tracking-tight tabular-nums"
          >
            {formatINR(grandTotal)}
          </span>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={onSubmitOrder} noValidate className="mt-4 pt-3 border-t border-slate-100 space-y-3">
        <div>
          <label htmlFor="customer-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Customer Name <span className="text-rose-500" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <input
              id="customer-name"
              name="customerName"
              type="text"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="e.g. Alex Morgan"
              aria-required="true"
              aria-invalid={nameError ? 'true' : 'false'}
              aria-describedby={nameError ? 'customer-name-error' : undefined}
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all ${
                nameError
                  ? 'border-rose-400 bg-rose-50/30 ring-1 ring-rose-500'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            />
          </div>
          {nameError && (
            <p
              id="customer-name-error"
              role="alert"
              className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{nameError}</span>
            </p>
          )}
        </div>

        {/* Place Order CTA Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-purple-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Place Order</span>
              </>
            )}
          </button>

          {cart.length === 0 && (
            <p className="text-[11px] text-center text-slate-400 mt-1.5 font-medium">
              Cart is currently empty. Add at least one item to checkout.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
