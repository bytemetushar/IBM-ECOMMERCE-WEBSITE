import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Copy, Download, AlertTriangle, Sparkles } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import { admin } from '../adminApi';

export default function Products() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);

  const loadProducts = useCallback(async (p = page, s = search) => {
    try {
      setLoading(true);
      const params = { page: p, limit: 15, search: s };
      const res = await admin.getProducts(params);
      setProducts(res.products || []);
      setPage(res.pagination?.page || 1);
      setPages(res.pagination?.pages || 1);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const handleDelete = async () => {
    try {
      await admin.deleteProduct(deleteModal);
      addToast('Product deleted', 'success');
      setDeleteModal(null);
      loadProducts();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await admin.bulkDeleteProducts(selectedIds);
      addToast(`${selectedIds.length} products deleted`, 'success');
      setSelectedIds([]);
      setBulkDeleteModal(false);
      loadProducts();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const columns = [
    {
      key: 'name', label: 'Product Item',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.thumbnail || row.image || 'https://via.placeholder.com/40'} alt={row.name} className="w-10 h-10 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div>
            <p className="font-bold text-slate-900 dark:text-white truncate max-w-[200px] text-xs">{row.name}</p>
            <p className="text-[11px] font-mono text-slate-400">{row.sku || 'No SKU'}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', label: 'Category', render: (row) => <span className="font-bold text-xs">{row.category?.name || '-'}</span> },
    { key: 'brand', label: 'Brand', render: (row) => <span className="text-xs text-slate-400">{row.brand || '-'}</span> },
    { key: 'price', label: 'Price', render: (row) => <span className="font-mono font-bold text-xs">₹{row.salePrice || row.price}</span> },
    { key: 'stock', label: 'Stock', render: (row) => <span className={`text-xs font-bold ${row.stock === 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{row.stock}</span> },
    { key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => navigate(`/admin/products/edit/${row._id}`)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500" title="Edit">
          <Edit size={15} />
        </button>
        <button onClick={() => setDeleteModal(row._id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500" title="Delete">
          <Trash2 size={15} />
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
            <Sparkles size={13} /> INVENTORY CATALOG
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Products Catalog</h1>
        </div>

        <button onClick={() => navigate('/admin/products/add')} className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-500 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-xs">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        page={page}
        pages={pages}
        onPageChange={setPage}
        loading={loading}
        onRowClick={(row) => navigate(`/admin/products/edit/${row._id}`)}
        searchable
        onSearch={(v) => { setSearch(v); setPage(1); loadProducts(1, v); }}
        searchPlaceholder="Search products..."
        emptyMessage="No products match your search"
      />

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Product" size="sm">
        <div className="text-center p-2">
          <AlertTriangle size={40} className="text-rose-500 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Delete Product Item</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Are you sure you want to delete this product?</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setDeleteModal(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md">Delete Item</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
