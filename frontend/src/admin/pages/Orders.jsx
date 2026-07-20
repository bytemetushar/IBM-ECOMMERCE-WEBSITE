import { useState, useEffect, useCallback } from 'react';
import { Eye, CheckCircle, Clock, XCircle, Sparkles } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import { admin } from '../adminApi';

export default function Orders() {
  const addToast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [viewOrder, setViewOrder] = useState(null);
  const [statusModal, setStatusModal] = useState(null);

  const loadOrders = useCallback(async (p = page, s = search) => {
    try {
      setLoading(true);
      const res = await admin.getOrders({ page: p, limit: 15, search: s });
      setOrders(res.orders || []);
      setPage(res.pagination?.page || 1);
      setPages(res.pagination?.pages || 1);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadOrders();
  }, [page]);

  const handleStatusUpdate = async () => {
    if (!statusModal) return;
    try {
      await admin.updateOrderStatus(statusModal._id, {
        isPaid: !statusModal.isPaid,
        isDelivered: !statusModal.isDelivered
      });
      addToast('Order status updated', 'success');
      setStatusModal(null);
      loadOrders();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const columns = [
    {
      key: '_id', label: 'Order ID',
      render: (row) => <span className="font-mono font-bold text-xs">#{row._id?.slice(-8).toUpperCase()}</span>,
    },
    { key: 'user', label: 'Customer', render: (row) => <span className="font-bold text-xs">{row.user?.FullName || 'Guest Customer'}</span> },
    { key: 'totalPrice', label: 'Total Amount', render: (row) => <span className="font-mono font-bold text-xs">₹{row.totalPrice?.toLocaleString()}</span> },
    {
      key: 'isPaid', label: 'Payment',
      render: (row) => (
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
          row.isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
        }`}>
          {row.isPaid ? 'Paid' : 'Unpaid'}
        </span>
      ),
    },
    {
      key: 'isDelivered', label: 'Delivery',
      render: (row) => (
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
          row.isDelivered ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500'
        }`}>
          {row.isDelivered ? 'Delivered' : 'Pending'}
        </span>
      ),
    },
    {
      key: 'createdAt', label: 'Order Date',
      render: (row) => <span className="text-xs text-slate-400">{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
    { key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={async () => {
          try {
            const res = await admin.getOrder(row._id);
            setViewOrder(res.order);
          } catch (err) {
            addToast(err.message, 'error');
          }
        }} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition-colors" title="View Details">
          <Eye size={15} />
        </button>
        <button onClick={() => setStatusModal(row)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Toggle Status">
          <CheckCircle size={15} />
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
          <Sparkles size={13} /> ORDER FULFILLMENT
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Customer Orders</h1>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        page={page}
        pages={pages}
        onPageChange={setPage}
        loading={loading}
        searchable
        onSearch={(v) => { setSearch(v); setPage(1); loadOrders(1, v); }}
        searchPlaceholder="Search by order ID or city..."
        emptyMessage="No customer orders found"
      />

      <Modal open={!!viewOrder} onClose={() => setViewOrder(null)} title={`Order #${viewOrder?._id?.slice(-8).toUpperCase()}`} size="lg">
        {viewOrder && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Customer Details</p>
                <p className="font-bold text-slate-900 dark:text-white">{viewOrder.user?.FullName}</p>
                <p className="text-slate-500">{viewOrder.user?.email}</p>
                <p className="text-slate-500">{viewOrder.user?.contact}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Shipping Address</p>
                <p className="text-slate-900 dark:text-white font-medium">{viewOrder.shippingAddress?.address}</p>
                <p className="text-slate-500">{viewOrder.shippingAddress?.city}, {viewOrder.shippingAddress?.postalCode}</p>
                <p className="text-slate-500">{viewOrder.shippingAddress?.country}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Order Items ({viewOrder.orderItems?.length})</p>
              <div className="space-y-2">
                {viewOrder.orderItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <img src={item.image || 'https://via.placeholder.com/40'} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-slate-400">Qty: {item.qty} x ₹{item.price}</p>
                    </div>
                    <p className="font-mono font-bold">₹{item.qty * item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!statusModal} onClose={() => setStatusModal(null)} title="Update Status" size="sm">
        <div className="text-center p-2">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Toggle payment and delivery status for order #{statusModal?._id?.slice(-8).toUpperCase()}?
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setStatusModal(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">Cancel</button>
            <button onClick={handleStatusUpdate} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md">Apply Update</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
