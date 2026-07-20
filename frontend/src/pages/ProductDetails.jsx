import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API_BASE_URL + `/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-16 flex items-center justify-center">
        <div className="text-primary-accent h3" style={{ animation: 'pulse 1.5s infinite' }}>Loading Product...</div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center gap-4">
        <h2 className="h2 text-gradient">Oops!</h2>
        <p className="text-secondary">{error || 'Product not found.'}</p>
        <Link to="/shop" className="btn btn-outline mt-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 fade-in">
      <Link to="/shop" className="text-secondary hover-primary-accent mb-8" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, transition: 'var(--transition-fast)' }}>
        <ArrowLeft size={18} /> Back to Shop
      </Link>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Image */}
        <div className="card" style={{
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: '1/1',
          position: 'relative',
          backgroundColor: 'var(--bg-tertiary)'
        }}>
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ) : (
            <div className="text-muted">No Image Available</div>
          )}
          
          {/* Decorative Glow */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '20px',
            background: 'var(--accent-primary)',
            filter: 'blur(30px)',
            opacity: 0.3,
            zIndex: -1
          }}></div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span style={{ 
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-primary-dim)',
              color: 'var(--accent-primary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {product.category?.name || 'Uncategorized'}
            </span>
            <h1 className="h1 text-gradient mb-2" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <span className="text-primary-accent font-bold" style={{ fontSize: '2rem' }}>₹{product.price?.toLocaleString('en-IN')}</span>
              {product.stock > 0 ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#4ade80', fontSize: '0.875rem', fontWeight: 500 }}>
                  <CheckCircle size={16} /> In Stock ({product.stock})
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f87171', fontSize: '0.875rem', fontWeight: 500 }}>
                  <XCircle size={16} /> Out of Stock
                </span>
              )}
            </div>
          </div>

          <div style={{ 
            height: '1px', 
            background: 'linear-gradient(90deg, var(--border-color), transparent)', 
            width: '100%' 
          }}></div>

          <div className="text-secondary" style={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
            {product.description}
          </div>

          <div className="mt-4 flex gap-4">
            <button 
              className="btn btn-primary" 
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              style={{
                flex: 1,
                padding: '1rem',
                fontSize: '1.125rem',
                opacity: product.stock <= 0 ? 0.5 : 1,
                cursor: product.stock <= 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                gap: '0.75rem'
              }}
            >
              <ShoppingCart size={22} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          <div className="text-muted mt-4" style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p>✓ Free shipping on orders over ₹1500</p>
            <p>✓ 30-day return policy</p>
            <p>✓ 24/7 priority customer support</p>
          </div>
        </div>
      </div>
      
      {/* Inline styles for hover classes used */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-primary-accent:hover { color: var(--accent-primary) !important; }
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
