import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav style={{ 
      background: 'rgba(18, 18, 18, 0.8)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0'
    }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h3 text-gradient">byteBazaar</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/shop" className="text-secondary hover:text-cyan">Shop</Link>
          
          <Link to="/cart" className="flex items-center gap-2 text-secondary hover:text-cyan" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--accent-purple)',
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
              <span className="text-muted text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="text-secondary hover:text-cyan">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-secondary hover:text-cyan">
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
