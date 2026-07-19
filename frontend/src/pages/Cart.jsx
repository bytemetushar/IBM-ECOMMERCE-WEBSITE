import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-8 flex-col items-center" style={{ minHeight: '60vh', justifyContent: 'center' }}>
        <h2 className="h2 mb-4 text-gradient">Your Cart is Empty</h2>
        <p className="text-secondary mb-6 text-center">Looks like you haven't added any tech to your cart yet.</p>
        <Link to="/shop" className="btn btn-primary flex items-center gap-2">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h2 className="h2 mb-6 text-gradient">Your Cart</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item) => (
            <div key={item._id} className="card flex items-center gap-4" style={{ padding: '1rem', flexDirection: 'row' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--bg-tertiary)', flexShrink: 0 }}>
                {item.image ? (
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-muted">No Img</div>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="h3 mb-1" style={{ fontSize: '1.1rem' }}>{item.name}</h3>
                </Link>
                <p className="text-primary-accent font-bold" style={{ fontSize: '1.1rem' }}>₹{item.price?.toLocaleString('en-IN')}</p>
              </div>

              <div className="flex items-center gap-3" style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.5rem', borderRadius: 'var(--radius-full)' }}>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontWeight: '500', minWidth: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div style={{ paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card" style={{ position: 'sticky', top: '100px' }}>
          <h3 className="h3 mb-4">Order Summary</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="flex items-center justify-between text-secondary">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-secondary">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex items-center justify-between text-secondary">
              <span>Tax (Included)</span>
              <span>₹0</span>
            </div>
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="font-bold" style={{ fontSize: '1.25rem' }}>Total</span>
              <span className="text-primary-accent font-bold" style={{ fontSize: '1.5rem' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
              Proceed to Checkout
            </button>
          </Link>
          
          <p className="text-muted mt-4 text-center" style={{ fontSize: '0.8rem' }}>
            Secure checkout powered by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
