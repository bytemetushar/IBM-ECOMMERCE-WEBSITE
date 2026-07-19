import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav style={{ 
      background: 'rgba(255, 255, 255, 0.85)', 
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h3 text-gradient">byteBazaar</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/shop" className="text-secondary">Shop</Link>
          
          <Link to="/cart" className="flex items-center gap-2 text-secondary" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--accent-secondary)',
                color: 'white',
                fontSize: '0.75rem',
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="flex items-center gap-2 text-secondary" title="Buy History">
                <Package size={20} />
              </Link>
              <span className="text-muted text-sm" style={{ fontWeight: '500' }}>Hi, {user.FullName?.split(' ')[0]}</span>
              <button onClick={logout} className="text-secondary" style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-secondary font-bold" style={{ textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
