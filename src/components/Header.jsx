export default function Header({ cartItemCount = 0 }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-purple-500/20 ring-1 ring-purple-500/30">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                SwiftCart
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/60 uppercase tracking-wide">
                Quality Lab
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              High-Reliability Checkout & Validation Suite
            </p>
          </div>
        </div>

        {/* Dynamic Cart Status Pill */}
        <div className="flex items-center gap-2 text-sm bg-slate-50 hover:bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/80 transition-colors">
          <svg
            className="w-4 h-4 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="font-medium text-slate-600 text-xs sm:text-sm">Cart:</span>
          <span
            aria-label="Total items in cart"
            className="font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full text-xs"
          >
            {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </header>
  );
}
