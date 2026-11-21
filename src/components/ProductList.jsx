import ProductCard from './ProductCard';

export default function ProductList({ products, onAddToCart }) {
  return (
    <section aria-labelledby="products-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
        <div>
          <h2 id="products-heading" className="text-xl font-bold tracking-tight text-slate-900">
            Available Products
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synthetic catalog items with fixed INR pricing for quality benchmark tests.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
          {products.length} products
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
