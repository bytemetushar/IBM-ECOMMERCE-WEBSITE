import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: address,
        paymentMethod: 'Credit Card', // Mock default
        totalPrice: cartTotal
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      if (data.success) {
        clearCart();
        navigate('/orders');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred during checkout');
    }
  };

  return (
    <div className="container py-8" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2 className="h2 mb-6 text-gradient text-center">Secure Checkout</h2>
        
        <div className="mb-6 p-4 rounded-md" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <h3 className="font-bold mb-2">Order Summary</h3>
          <p className="text-secondary">{cartItems.length} items</p>
          <p className="text-primary-accent font-bold" style={{ fontSize: '1.25rem' }}>Total: ₹{cartTotal.toLocaleString('en-IN')}</p>
        </div>

        {error && <div className="mb-4 text-center" style={{ color: '#ef4444' }}>{error}</div>}
        
        <form className="flex-col gap-4" onSubmit={handleCheckout}>
          <h3 className="font-bold mb-2 mt-4">Shipping Address</h3>
          
          <div className="flex-col gap-1">
            <label className="text-secondary">Street Address</label>
            <input type="text" name="address" className="input" required onChange={handleChange} />
          </div>
          <div className="flex-col gap-1">
            <label className="text-secondary">City</label>
            <input type="text" name="city" className="input" required onChange={handleChange} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="flex-col gap-1">
              <label className="text-secondary">Postal Code</label>
              <input type="text" name="postalCode" className="input" required onChange={handleChange} />
            </div>
            <div className="flex-col gap-1">
              <label className="text-secondary">Country</label>
              <input type="text" name="country" className="input" required onChange={handleChange} />
            </div>
          </div>
          
          <button className="btn btn-primary mt-6" type="submit" style={{ width: '100%', padding: '1rem' }}>
            Pay ₹{cartTotal.toLocaleString('en-IN')}
          </button>
        </form>
      </div>
    </div>
  );
}
