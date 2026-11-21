import { formatINR } from '../utils/formatters';

export default function OrderConfirmation({ order, onResetOrder }) {
  return (
    <section
      aria-labelledby="confirmation-heading"
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100 max-w-2xl mx-auto"
    >
      {/* Success Badge & Heading */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-500/20 ring-4 ring-emerald-50">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 id="confirmation-heading" className="text-3xl font-extrabold tracking-tight text-slate-900">
          Order Confirmed!
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Thank you for your order! Your purchase has been successfully processed.
        </p>
      </div>

      {/* Order Meta details Grid */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
            Order Reference
          </span>
          <span className="font-mono font-bold text-slate-900 text-base">{order.reference}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
            Customer
          </span>
          <span className="font-semibold text-slate-900 text-base">{order.customerName}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
            Placed At
          </span>
          <span className="text-slate-700 font-medium">{order.placedAt}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">
            Payment Status
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            Confirmed (Mock)
          </span>
        </div>
      </div>

      {/* Ordered Items Summary */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Ordered Items Breakdown
        </h3>
        <div className="divide-y divide-slate-100 border-t border-b border-slate-200">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">{item.name}</span>
                <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  × {item.quantity}
                </span>
              </div>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatINR(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total Highlight */}
      <div className="p-4 mb-6 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-purple-50/50 border border-purple-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
            Order Total
          </span>
          <span className="text-xs text-slate-500">Free delivery applied</span>
        </div>
        <span
          aria-label="Order total"
          className="text-2xl font-black text-purple-700 tracking-tight tabular-nums"
        >
          {formatINR(order.total)}
        </span>
      </div>

      {/* Clear Guidance: What To Do Next (UX Goal #8) */}
      <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
        <p className="font-bold text-slate-800 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          What happens next?
        </p>
        <p>
          This transaction has been recorded for your checkout benchmarking session. You can copy your order reference above for reference, or start a new order to test other cart configurations.
        </p>
      </div>

      {/* Action to Start New Order */}
      <div className="text-center">
        <button
          type="button"
          onClick={onResetOrder}
          className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Start New Order
        </button>
      </div>
    </section>
  );
}
