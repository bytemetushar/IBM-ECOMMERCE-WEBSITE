import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { api } from '../config';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await api('/api/orders/myorders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  if (loading) return <div className="container py-8 text-center"><h2 className="h2 text-gradient">Loading Buy History...</h2></div>;

  return (
    <div className="container py-8">
      <h2 className="h2 mb-6 text-gradient flex items-center gap-3">
        <Package size={32} /> Your Buy History
      </h2>

      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {orders.length === 0 && !error ? (
        <div className="card text-center py-12">
          <p className="text-secondary mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn btn-primary inline-flex items-center gap-2">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map(order => (
            <div key={order._id} className="card">
              <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Order ID</p>
                  <p className="font-bold">{order._id}</p>
                </div>
                <div>
                  <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Date</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Total Amount</p>
                  <p className="text-primary-accent font-bold">₹{order.totalPrice?.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: order.isPaid ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: order.isPaid ? '#166534' : '#991b1b',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {order.isPaid ? 'Paid' : 'Payment Pending'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {order.orderItems.map(item => (
                  <div key={item._id} className="flex items-center gap-4" style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h4 className="font-bold">{item.name}</h4>
                      </Link>
                      <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Qty: {item.qty}</p>
                    </div>
                    <div className="font-bold">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
