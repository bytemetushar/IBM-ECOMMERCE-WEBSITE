import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { API_BASE_URL } from '../config';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/api/products');
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
      <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 0.8s ease-out forwards' }}>
        <h1 className="h1 text-gradient mb-4">Welcome to byteBazaar</h1>
        <p className="text-secondary mb-8" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
          Discover gear that empowers your creativity. Build the setup of your dreams with our curated collection of premium tech.
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
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
