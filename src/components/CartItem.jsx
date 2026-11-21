import { formatINR } from '../utils/formatters';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="py-3.5 border-b border-slate-100 last:border-b-0 flex items-center justify-between gap-3 group">
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-slate-900 text-sm truncate group-hover:text-purple-950 transition-colors">
          {item.name}
        </h4>
        <div className="text-xs text-slate-500 mt-0.5">
          <span>{formatINR(item.price)} each</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Modern Quantity Stepper */}
        <div className="inline-flex items-center border border-slate-200/90 rounded-xl bg-slate-50/70 p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            −
          </button>
          <span
            aria-label={`Current quantity of ${item.name}`}
            className="w-8 text-center text-xs font-bold text-slate-900 select-none tabular-nums"
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            aria-label={`Increase quantity of ${item.name}`}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            +
          </button>
        </div>

        {/* Line Subtotal */}
        <div className="text-right min-w-[76px]">
          <span
            aria-label={`Line total for ${item.name}`}
            className="font-bold text-slate-900 text-sm block tabular-nums"
          >
            {formatINR(lineTotal)}
          </span>
        </div>

        {/* Accessible Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
