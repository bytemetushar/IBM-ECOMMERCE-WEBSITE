import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card flex-col justify-between h-100">
      <Link to={`/product/${product._id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{
          width: '100%',
          height: '200px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1rem',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span className="text-muted">No Image</span>
          )}
        </div>
        <h3 className="h3 mb-2" style={{ fontSize: '1.25rem' }}>{product.name}</h3>
        <p className="text-secondary mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>
      </Link>
      
      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <span className="text-cyan font-bold" style={{ fontSize: '1.25rem' }}>${product.price?.toFixed(2)}</span>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          style={{ padding: '0.5rem 1rem' }}
        >
          <ShoppingCart size={16} /> Add
        </button>
      </div>
    </div>
  );
}
