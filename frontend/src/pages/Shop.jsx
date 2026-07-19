import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch products. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories from the fetched products
  const categories = ['All', ...new Set(products.filter(p => p.category?.name).map(p => p.category.name))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.name === selectedCategory);

  return (
    <div className="container py-8 fade-in">
      <h2 className="h2 mb-8 text-gradient text-center" style={{ fontSize: '2.5rem' }}>All Computer Parts & Electronics</h2>
      
      {!loading && !error && categories.length > 1 && (
        <div style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none', // Firefox
          WebkitOverflowScrolling: 'touch',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '1px solid',
                borderColor: selectedCategory === category ? 'transparent' : 'var(--border-color)',
                background: selectedCategory === category 
                  ? 'var(--accent-primary)'
                  : 'var(--bg-secondary)',
                color: selectedCategory === category ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: selectedCategory === category ? '0 4px 14px 0 rgba(99, 102, 241, 0.39)' : 'none'
              }}
              onMouseOver={e => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }
              }}
              onMouseOut={e => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {loading && <div className="text-center text-primary-accent py-16" style={{ animation: 'pulse 1.5s infinite', fontSize: '1.25rem' }}>Loading products...</div>}
      {error && <p className="text-center py-16" style={{ color: '#f87171' }}>{error}</p>}
      
      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-muted py-16">
              No products found in this category.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2.5rem'
            }}>
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        /* Hide scrollbar for category container */
        div::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
