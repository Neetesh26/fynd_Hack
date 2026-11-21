import { formatINR } from '../utils/formatters';

export default function ProductCard({ product, onAddToCart }) {
  // Minimalist SVG graphic tailored for each product
  const renderProductIllustration = (id) => {
    if (id === 'prod-1') {
      // Wireless Mouse
      return (
        <svg
          className="w-16 h-16 text-purple-600/80 transition-transform group-hover:scale-105 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="6" y="2" width="12" height="20" rx="6" />
          <line x1="12" y1="6" x2="12" y2="10" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }
    // Mechanical Keyboard
    return (
      <svg
        className="w-16 h-16 text-purple-600/80 transition-transform group-hover:scale-105 duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="2.5" />
        <line x1="5" y1="9" x2="7" y2="9" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="9" y1="9" x2="11" y2="9" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="13" y1="9" x2="15" y2="9" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="17" y1="9" x2="19" y2="9" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="5" y1="12" x2="8" y2="12" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="10" y1="12" x2="14" y2="12" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="16" y1="12" x2="19" y2="12" strokeLinecap="round" strokeWidth="1.75" />
        <line x1="7" y1="15" x2="17" y2="15" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <article className="group bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between">
      <div>
        {/* Subtle Product Visual Container */}
        <div className="w-full h-32 rounded-xl bg-gradient-to-b from-slate-50 to-purple-50/30 border border-slate-100 flex items-center justify-center mb-4">
          {renderProductIllustration(product.id)}
        </div>

        {/* Title and Category */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-slate-900 text-lg leading-snug group-hover:text-purple-950 transition-colors">
            {product.name}
          </h3>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 uppercase tracking-wider shrink-0">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed mb-5">
          {product.description}
        </p>
      </div>

      {/* Pricing and Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
            Price (INR)
          </span>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {formatINR(product.price)}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${product.name} to cart`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
