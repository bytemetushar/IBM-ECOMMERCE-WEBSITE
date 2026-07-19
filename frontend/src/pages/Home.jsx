import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          // Just take the first 3 for featured
          setFeaturedProducts(data.products.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="container py-16">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="h1 text-gradient mb-4">Welcome to byteBazaar</h1>
        <p className="text-secondary mb-8" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Discover the latest and greatest in tech. From high-performance processors and motherboards to cutting-edge peripherals.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Start Shopping
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="h2 mb-8 text-center">Featured Gear</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
