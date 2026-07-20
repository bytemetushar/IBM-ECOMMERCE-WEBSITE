import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag, Truck, Plus, Minus, ShieldCheck, Package } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const freeShippingThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="pt-20 pb-16 min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-500/10 dark:to-purple-500/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag size={40} className="text-indigo-400 dark:text-indigo-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet.<br />Browse our collection and find something you love.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link to="/shop" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            &larr; Continue Shopping
          </Link>
        </div>

        <div className="bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/10 p-4 sm:p-5 mb-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center shrink-0">
                <Truck size={18} className="text-indigo-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {cartTotal >= freeShippingThreshold
                    ? 'You\'ve unlocked FREE shipping!'
                    : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more for free shipping`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Free shipping on orders above ₹{freeShippingThreshold.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm shrink-0">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/80 dark:bg-gray-800/80 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item, idx) => {
              const product = item.product || item;
              const unitPrice = product.salePrice || product.price || item.price;
              const itemId = product._id || item._id;

              return (
                <div
                  key={itemId}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <div className="shrink-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <img
                          src={product.image || product.thumbnail || item.image || 'https://via.placeholder.com/80'}
                          alt={product.name || item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                              {product.category?.name || 'Hardware'}
                            </span>
                            <Link to={`/product/${itemId}`}>
                              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1 mt-0.5">
                                {product.name || item.name}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shrink-0 -mt-1 -mr-1"
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 hidden sm:inline">Qty</span>
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                            <button
                              onClick={() => updateQuantity(itemId, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-400 hidden sm:block">Item Total</p>
                          <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                            ₹{(unitPrice * item.quantity).toLocaleString('en-IN')}
                          </p>
                          <p className="text-[11px] text-gray-400 sm:hidden">
                            ₹{unitPrice?.toLocaleString('en-IN')} / ea
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5 sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                  <Package size={16} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Order Summary</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                  <span className={`font-semibold ${cartTotal >= freeShippingThreshold ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                    {cartTotal >= freeShippingThreshold ? 'FREE' : '₹99'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-baseline">
                <span className="text-sm text-gray-900 dark:text-white font-semibold">Total</span>
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  ₹{(cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + 99).toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                to="/checkout"
                className="group relative w-full py-3.5 mt-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.12),transparent)] translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[600ms]" />
                <span className="flex items-center gap-2">
                  Proceed to Pay
                  <span className="text-white/80 text-xs font-medium px-2 py-0.5 bg-white/15 rounded-md">
                    ₹{(cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + 99).toLocaleString('en-IN')}
                  </span>
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-gray-400">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Secure checkout with 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
